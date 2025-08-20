import { NextRequest, NextResponse } from 'next/server'
import { verifyAuthToken } from './lib/auth-utils'
import { 
  getClientIP, 
  checkSuspiciousActivity, 
  recordSuspiciousActivity,
  checkIPRateLimit,
  checkEmailRateLimit,
  isEmailWhitelisted,
  isDevelopmentIP
} from './lib/rate-limiter'

// Routes protégées
const PROTECTED_ROUTES = ['/services/ia', '/recruiter-results']

// Fonction pour logger les tentatives d'accès
function logAccess(ip: string, path: string, status: string, email?: string) {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ACCESS: ${ip} -> ${path} | Status: ${status} | Email: ${email || 'N/A'}`)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getClientIP(request)
  
  // Vérifier si la route est protégée
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Vérifier l'activité suspecte (sauf en développement pour les IPs locales)
  const isDevMode = process.env.NODE_ENV !== 'production'
  const isDevIP = isDevelopmentIP(ip)
  const suspiciousCheck = checkSuspiciousActivity(ip)
  
  if (suspiciousCheck.blocked && !(isDevMode && isDevIP)) {
    logAccess(ip, pathname, 'BLOCKED_SUSPICIOUS')
    return NextResponse.redirect(new URL('/?error=blocked', request.url))
  }
  
  // Log spécial pour le développement
  if (isDevMode && isDevIP && suspiciousCheck.blocked) {
    console.log(`DEV MODE: IP ${ip} would be blocked but allowed in development`)
  }

  // Récupérer le token d'authentification
  const authToken = request.cookies.get('auth-session')?.value
  
  if (!authToken) {
    logAccess(ip, pathname, 'NO_TOKEN')
    recordSuspiciousActivity(ip)
    return NextResponse.redirect(new URL('/?error=auth-required', request.url))
  }

  // Vérifier la validité du token
  const tokenData = await verifyAuthToken(authToken)
  
  if (!tokenData.valid || !tokenData.verified) {
    logAccess(ip, pathname, 'INVALID_TOKEN', tokenData.email || undefined)
    recordSuspiciousActivity(ip)
    
    // Supprimer le cookie invalide
    const response = NextResponse.redirect(new URL('/?error=session-expired', request.url))
    response.cookies.delete('auth-session')
    return response
  }

  const userEmail = tokenData.email || undefined
  
  // Vérifier si l'email est dans la liste blanche (pas de limite)
  if (userEmail && isEmailWhitelisted(userEmail)) {
    logAccess(ip, pathname, 'WHITELISTED', userEmail)
    return NextResponse.next()
  }

  // Vérifier les limites de rate limiting
  const ipLimit = checkIPRateLimit(ip)
  const emailLimit = userEmail ? checkEmailRateLimit(userEmail) : { allowed: false, remaining: 0, resetTime: Date.now() }
  
  if (!ipLimit.allowed) {
    logAccess(ip, pathname, 'IP_RATE_LIMITED', userEmail)
    const resetTime = ipLimit.resetTime.toString()
    const currentCount = 5 - ipLimit.remaining // Assuming IP_HOURLY = 5 in production
    return NextResponse.redirect(
      new URL(`/?error=rate-limit&type=ip&reset=${encodeURIComponent(resetTime)}&current=${currentCount}&max=5`, request.url)
    )
  }
  
  if (!emailLimit.allowed) {
    logAccess(ip, pathname, 'EMAIL_RATE_LIMITED', userEmail)
    const resetTime = emailLimit.resetTime.toString()
    const currentCount = 10 - emailLimit.remaining // Assuming EMAIL_DAILY = 10 in production
    return NextResponse.redirect(
      new URL(`/?error=rate-limit&type=email&reset=${encodeURIComponent(resetTime)}&current=${currentCount}&max=10`, request.url)
    )
  }

  // Vérifier si un captcha est requis
  if (suspiciousCheck.needsCaptcha) {
    logAccess(ip, pathname, 'CAPTCHA_REQUIRED', userEmail)
    return NextResponse.redirect(new URL('/?error=captcha-required', request.url))
  }

  // Accès autorisé
  logAccess(ip, pathname, 'ALLOWED', userEmail)
  
  // Ajouter des headers avec les informations de rate limiting
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-IP-Remaining', ipLimit.remaining.toString())
  response.headers.set('X-RateLimit-IP-Reset', ipLimit.resetTime.toString())
  response.headers.set('X-RateLimit-Email-Remaining', emailLimit.remaining.toString())
  response.headers.set('X-RateLimit-Email-Reset', emailLimit.resetTime.toString())
  
  return response
}

// Configuration du middleware
export const config = {
  matcher: [
    '/services/ia/:path*',
    '/recruiter-results/:path*'
  ]
}