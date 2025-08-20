import { NextRequest, NextResponse } from 'next/server'
import { clearSuspiciousIP, clearAllSuspiciousIPs, getRateLimitStats } from '@/lib/rate-limiter'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: NextRequest) {
  try {
    const { password, ip, clearAll } = await request.json()

    // Vérification du mot de passe admin
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Mot de passe administrateur incorrect' },
        { status: 401 }
      )
    }

    if (clearAll) {
      // Débloquer toutes les IPs
      const count = clearAllSuspiciousIPs()
      return NextResponse.json({
        message: `${count} IPs débloquées avec succès`,
        cleared: count
      })
    }

    if (!ip) {
      return NextResponse.json(
        { error: 'IP requise' },
        { status: 400 }
      )
    }

    // Débloquer une IP spécifique
    const existed = clearSuspiciousIP(ip)
    
    return NextResponse.json({
      message: existed 
        ? `IP ${ip} débloquée avec succès` 
        : `IP ${ip} n'était pas bloquée`,
      existed
    })

  } catch (error) {
    console.error('Erreur lors du déblocage:', error)
    return NextResponse.json(
      { error: 'Erreur lors du déblocage' },
      { status: 500 }
    )
  }
}

// Route GET pour obtenir les statistiques
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const password = url.searchParams.get('password')

    // Vérification du mot de passe admin
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Mot de passe administrateur incorrect' },
        { status: 401 }
      )
    }

    const stats = getRateLimitStats()
    
    return NextResponse.json({
      message: 'Statistiques de rate limiting',
      stats
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}