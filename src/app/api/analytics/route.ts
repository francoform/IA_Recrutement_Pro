import { NextRequest, NextResponse } from 'next/server'
import { recordAnalyticsEvent, getAnalyticsData } from '@/lib/analytics'
import { supabase } from '@/lib/supabase'

// Fonction pour obtenir la clé du jour
function getDayKey(date: Date = new Date()): string {
  return date.toISOString().split('T')[0]
}

// Fonction pour obtenir la clé de l'heure
function getHourKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 13)
}

// API pour récupérer les analytics (protégée par mot de passe admin)
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const authHeader = request.headers.get('authorization')
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 401 }
      )
    }

    // Obtenir les données analytics et les statistiques de Supabase
    const analytics = getAnalyticsData()
    
    // Obtenir les statistiques depuis Supabase
    const { data: rateLimitStats } = await supabase
      .from('rate_limits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    // Préparer les données pour l'affichage
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return getDayKey(date)
    }).reverse()

    const last24Hours = Array.from({ length: 24 }, (_, i) => {
      const date = new Date()
      date.setHours(date.getHours() - i)
      return getHourKey(date)
    }).reverse()

    const dailyData = last7Days.map(day => ({
      date: day,
      ...analytics.dailyStats.get(day) || { access: 0, verifications: 0, blocked: 0, analyses: 0 }
    }))

    const hourlyData = last24Hours.map(hour => ({
      hour: hour.split('T')[1],
      ...analytics.hourlyStats.get(hour) || { access: 0, verifications: 0, blocked: 0, analyses: 0 }
    }))

    // Top 10 IPs
    const topIPs = Array.from(analytics.topIPs.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }))

    // Top 10 emails
    const topEmails = Array.from(analytics.topEmails.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([email, count]) => ({ email, count }))

    // Activités suspectes récentes (dernières 24h)
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
    const recentSuspicious = analytics.suspiciousActivities
      .filter(activity => activity.timestamp > oneDayAgo)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 50)
      .map(activity => ({
        ...activity,
        timestamp: new Date(activity.timestamp).toISOString()
      }))

    return NextResponse.json({
      summary: {
        totalAccess: analytics.totalAccess,
        totalVerifications: analytics.totalVerifications,
        totalBlocked: analytics.totalBlocked,
        totalAnalyses: analytics.totalAnalyses,
        totalRateLimits: rateLimitStats?.length || 0
      },
      charts: {
        daily: dailyData,
        hourly: hourlyData
      },
      rankings: {
        topIPs,
        topEmails
      },
      security: {
        recentSuspicious,
        totalSuspicious: analytics.suspiciousActivities.length
      }
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des analytics:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// API pour enregistrer manuellement un événement
export async function POST(request: NextRequest) {
  try {
    const { type, ip, email, details } = await request.json()
    
    if (!type || !ip) {
      return NextResponse.json(
        { error: 'Type et IP requis' },
        { status: 400 }
      )
    }

    recordAnalyticsEvent(type, ip, email, details)
    
    return NextResponse.json(
      { message: 'Événement enregistré' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// La fonction recordAnalyticsEvent est déjà exportée ci-dessus