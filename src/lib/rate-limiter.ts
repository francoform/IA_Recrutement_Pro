// Système de rate limiting avec Map

interface RateLimitData {
  count: number
  resetTime: number
  lastRequest: number
}

interface SuspiciousActivity {
  attempts: number
  lastAttempt: number
  blocked: boolean
}

// Stockage en mémoire (en production, utiliser Redis)
const ipLimits = new Map<string, RateLimitData>()
const emailLimits = new Map<string, RateLimitData>()
const suspiciousIPs = new Map<string, SuspiciousActivity>()

// Configuration des limites
const LIMITS = {
  IP_HOURLY: process.env.NODE_ENV === 'production' ? 5 : 50,           // 5 analyses par heure par IP en prod, 50 en dev
  EMAIL_DAILY: process.env.NODE_ENV === 'production' ? 10 : 100,        // 10 analyses par jour par email vérifié en prod, 100 en dev
  SUSPICIOUS_THRESHOLD: 3, // 3 tentatives rapprochées = suspect
  SUSPICIOUS_WINDOW: 60000, // 1 minute
  BLOCK_DURATION: 3600000  // 1 heure de blocage
}

// Nettoyage automatique des données expirées
setInterval(() => {
  const now = Date.now()
  
  // Nettoyer les limites IP expirées
  for (const [ip, data] of ipLimits.entries()) {
    if (now > data.resetTime) {
      ipLimits.delete(ip)
    }
  }
  
  // Nettoyer les limites email expirées
  for (const [email, data] of emailLimits.entries()) {
    if (now > data.resetTime) {
      emailLimits.delete(email)
    }
  }
  
  // Nettoyer les IPs suspectes débloquées
  for (const [ip, data] of suspiciousIPs.entries()) {
    if (data.blocked && now > data.lastAttempt + LIMITS.BLOCK_DURATION) {
      suspiciousIPs.delete(ip)
    }
  }
}, 60000) // Nettoyage toutes les minutes

// Fonction pour obtenir l'IP du client
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// Vérifier si une IP est suspecte
export function checkSuspiciousActivity(ip: string): { blocked: boolean; needsCaptcha: boolean } {
  const suspicious = suspiciousIPs.get(ip)
  const now = Date.now()
  
  if (!suspicious) {
    return { blocked: false, needsCaptcha: false }
  }
  
  // Si bloqué et le temps n'est pas écoulé
  if (suspicious.blocked && now < suspicious.lastAttempt + LIMITS.BLOCK_DURATION) {
    return { blocked: true, needsCaptcha: false }
  }
  
  // Si débloqué, nettoyer
  if (suspicious.blocked && now >= suspicious.lastAttempt + LIMITS.BLOCK_DURATION) {
    suspiciousIPs.delete(ip)
    return { blocked: false, needsCaptcha: false }
  }
  
  // Captcha requis après 3 tentatives
  return { blocked: false, needsCaptcha: suspicious.attempts >= LIMITS.SUSPICIOUS_THRESHOLD }
}

// Enregistrer une tentative suspecte
export function recordSuspiciousActivity(ip: string) {
  const now = Date.now()
  const existing = suspiciousIPs.get(ip)
  
  if (!existing) {
    suspiciousIPs.set(ip, {
      attempts: 1,
      lastAttempt: now,
      blocked: false
    })
    return
  }
  
  // Si les tentatives sont dans la fenêtre de temps
  if (now - existing.lastAttempt < LIMITS.SUSPICIOUS_WINDOW) {
    existing.attempts++
    existing.lastAttempt = now
    
    // Bloquer après trop de tentatives
    if (existing.attempts >= LIMITS.SUSPICIOUS_THRESHOLD * 2) {
      existing.blocked = true
    }
  } else {
    // Réinitialiser si trop de temps écoulé
    existing.attempts = 1
    existing.lastAttempt = now
    existing.blocked = false
  }
  
  suspiciousIPs.set(ip, existing)
}

// Vérifier la limite par IP (5 par heure en prod, 50 en dev)
export function checkIPRateLimit(ip: string): { allowed: boolean; resetTime: number; remaining: number } {
  // Exemption automatique pour les IPs de développement en mode non-production
  if (process.env.NODE_ENV !== 'production' && isDevelopmentIP(ip)) {
    return { allowed: true, resetTime: Date.now() + 60 * 60 * 1000, remaining: 999 }
  }
  
  const now = Date.now()
  const oneHour = 60 * 60 * 1000
  
  const existing = ipLimits.get(ip)
  
  if (!existing) {
    // Première requête
    ipLimits.set(ip, {
      count: 1,
      resetTime: now + oneHour,
      lastRequest: now
    })
    return { allowed: true, resetTime: now + oneHour, remaining: LIMITS.IP_HOURLY - 1 }
  }
  
  // Si la période est expirée, réinitialiser
  if (now > existing.resetTime) {
    ipLimits.set(ip, {
      count: 1,
      resetTime: now + oneHour,
      lastRequest: now
    })
    return { allowed: true, resetTime: now + oneHour, remaining: LIMITS.IP_HOURLY - 1 }
  }
  
  // Vérifier la limite
  if (existing.count >= LIMITS.IP_HOURLY) {
    return { allowed: false, resetTime: existing.resetTime, remaining: 0 }
  }
  
  // Incrémenter le compteur
  existing.count++
  existing.lastRequest = now
  ipLimits.set(ip, existing)
  
  return { 
    allowed: true, 
    resetTime: existing.resetTime, 
    remaining: LIMITS.IP_HOURLY - existing.count 
  }
}

// Vérifier la limite par email (10 par jour en prod, 100 en dev)
export function checkEmailRateLimit(email: string): { allowed: boolean; resetTime: number; remaining: number } {
  // Exemption pour les emails en liste blanche
  if (isEmailWhitelisted(email)) {
    return { allowed: true, resetTime: Date.now() + 24 * 60 * 60 * 1000, remaining: 999 }
  }
  
  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000
  
  const existing = emailLimits.get(email)
  
  if (!existing) {
    // Première requête
    emailLimits.set(email, {
      count: 1,
      resetTime: now + oneDay,
      lastRequest: now
    })
    return { allowed: true, resetTime: now + oneDay, remaining: LIMITS.EMAIL_DAILY - 1 }
  }
  
  // Si la période est expirée, réinitialiser
  if (now > existing.resetTime) {
    emailLimits.set(email, {
      count: 1,
      resetTime: now + oneDay,
      lastRequest: now
    })
    return { allowed: true, resetTime: now + oneDay, remaining: LIMITS.EMAIL_DAILY - 1 }
  }
  
  // Vérifier la limite
  if (existing.count >= LIMITS.EMAIL_DAILY) {
    return { allowed: false, resetTime: existing.resetTime, remaining: 0 }
  }
  
  // Incrémenter le compteur
  existing.count++
  existing.lastRequest = now
  emailLimits.set(email, existing)
  
  return { 
    allowed: true, 
    resetTime: existing.resetTime, 
    remaining: LIMITS.EMAIL_DAILY - existing.count 
  }
}

// Obtenir les statistiques de rate limiting
export function getRateLimitStats() {
  return {
    ipLimits: ipLimits.size,
    emailLimits: emailLimits.size,
    suspiciousIPs: suspiciousIPs.size,
    blockedIPs: Array.from(suspiciousIPs.values()).filter(s => s.blocked).length
  }
}

// Liste blanche d'emails (à configurer via variables d'environnement)
const WHITELIST_EMAILS = process.env.WHITELIST_EMAILS?.split(',').map(e => e.trim()) || []

// Vérifier si un email est dans la liste blanche
export function isEmailWhitelisted(email: string): boolean {
  return WHITELIST_EMAILS.includes(email.toLowerCase())
}

// Fonction pour débloquer manuellement une IP suspecte (utile en développement)
export function clearSuspiciousIP(ip: string): boolean {
  const existed = suspiciousIPs.has(ip)
  suspiciousIPs.delete(ip)
  return existed
}

// Fonction pour débloquer toutes les IPs suspectes (utile en développement)
export function clearAllSuspiciousIPs(): number {
  const count = suspiciousIPs.size
  suspiciousIPs.clear()
  return count
}

// Vérifier si une IP est de développement
export function isDevelopmentIP(ip: string): boolean {
  const devIPs = ['127.0.0.1', '::1', 'localhost', 'unknown']
  return devIPs.includes(ip)
}

// Export des constantes pour utilisation externe
export { LIMITS }