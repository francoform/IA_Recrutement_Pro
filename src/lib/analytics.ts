// Système d'analytics en mémoire
interface AnalyticsData {
  totalAccess: number
  totalVerifications: number
  totalBlocked: number
  totalAnalyses: number
  dailyStats: Map<string, { access: number; verifications: number; blocked: number; analyses: number }>
  hourlyStats: Map<string, { access: number; verifications: number; blocked: number; analyses: number }>
  topIPs: Map<string, number>
  topEmails: Map<string, number>
  suspiciousActivities: Array<{
    timestamp: number
    ip: string
    action: string
    email?: string
    details?: string
  }>
}

const analytics: AnalyticsData = {
  totalAccess: 0,
  totalVerifications: 0,
  totalBlocked: 0,
  totalAnalyses: 0,
  dailyStats: new Map(),
  hourlyStats: new Map(),
  topIPs: new Map(),
  topEmails: new Map(),
  suspiciousActivities: []
}

function getDayKey(date: Date): string {
  return date.toISOString().split('T')[0]
}

function getHourKey(date: Date): string {
  return date.toISOString().slice(0, 13) + ':00:00.000Z'
}

export function recordAnalyticsEvent(
  type: 'access' | 'verifications' | 'blocked' | 'analyses',
  ip: string,
  email?: string,
  details?: string
) {
  const now = new Date()
  const dayKey = getDayKey(now)
  const hourKey = getHourKey(now)

  // Statistiques globales
  switch (type) {
    case 'access':
      analytics.totalAccess++
      break
    case 'verifications':
      analytics.totalVerifications++
      break
    case 'blocked':
      analytics.totalBlocked++
      break
    case 'analyses':
      analytics.totalAnalyses++
      break
  }

  // Statistiques quotidiennes
  const dailyStat = analytics.dailyStats.get(dayKey) || {
    access: 0,
    verifications: 0,
    blocked: 0,
    analyses: 0
  }
  if (type === 'verifications') {
    dailyStat.verifications++
  } else {
    dailyStat[type as keyof typeof dailyStat]++
  }
  analytics.dailyStats.set(dayKey, dailyStat)

  // Statistiques horaires
  const hourlyStat = analytics.hourlyStats.get(hourKey) || {
    access: 0,
    verifications: 0,
    blocked: 0,
    analyses: 0
  }
  if (type === 'verifications') {
    hourlyStat.verifications++
  } else {
    hourlyStat[type as keyof typeof hourlyStat]++
  }
  analytics.hourlyStats.set(hourKey, hourlyStat)

  // Top IPs
  const ipCount = analytics.topIPs.get(ip) || 0
  analytics.topIPs.set(ip, ipCount + 1)

  // Top emails
  if (email) {
    const emailCount = analytics.topEmails.get(email) || 0
    analytics.topEmails.set(email, emailCount + 1)
  }

  // Activités suspectes
  if (type === 'blocked') {
    analytics.suspiciousActivities.push({
      timestamp: now.getTime(),
      ip,
      action: type,
      email,
      details
    })

    // Garder seulement les 1000 dernières activités suspectes
    if (analytics.suspiciousActivities.length > 1000) {
      analytics.suspiciousActivities = analytics.suspiciousActivities.slice(-1000)
    }
  }

  // Nettoyer les anciennes données (garder 30 jours)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const cutoffDay = getDayKey(thirtyDaysAgo)
  const cutoffHour = getHourKey(thirtyDaysAgo)

  for (const [key] of analytics.dailyStats) {
    if (key < cutoffDay) {
      analytics.dailyStats.delete(key)
    }
  }

  for (const [key] of analytics.hourlyStats) {
    if (key < cutoffHour) {
      analytics.hourlyStats.delete(key)
    }
  }
}

export function getAnalyticsData(): AnalyticsData {
  return analytics
}