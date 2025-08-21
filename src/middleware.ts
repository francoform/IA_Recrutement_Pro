import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { AuthService } from './lib/auth-service'

// Configuration Supabase pour le middleware
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fonction pour obtenir l'IP du client
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return '127.0.0.1'
}

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

  // Les vérifications d'activité suspecte ont été supprimées
  // Seules les limites de taux standard s'appliquent maintenant

  // Récupérer le token d'authentification depuis le cookie
  const cookieHeader = request.headers.get('cookie')
  console.log('🍪 [MIDDLEWARE] Cookie header:', cookieHeader)
  let token = null
  
  if (cookieHeader) {
    const cookies = cookieHeader.split(';')
    console.log('🍪 [MIDDLEWARE] Cookies trouvés:', cookies.length)
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('supabase-session='))
    console.log('🍪 [MIDDLEWARE] Cookie supabase-session:', authCookie ? 'TROUVÉ' : 'NON TROUVÉ')
    
    if (authCookie) {
      const rawToken = authCookie.split('=')[1].trim()
      token = decodeURIComponent(rawToken)
      console.log('🔑 [MIDDLEWARE] Token extrait:', token ? `${token.substring(0, 20)}...` : 'null')
    }
  }
  
  if (!token) {
    console.log('❌ [MIDDLEWARE] Aucun token trouvé')
    logAccess(ip, pathname, 'NO_TOKEN')
    return NextResponse.redirect(new URL('/?error=auth-required', request.url))
  }
  
  console.log('✅ [MIDDLEWARE] Token trouvé, vérification avec AuthService...')

  // Vérifier la validité du token avec AuthService
  const tokenVerification = await AuthService.verifySessionToken(token)
  
  if (!tokenVerification.valid || !tokenVerification.email) {
    console.log('❌ [MIDDLEWARE] Token invalide ou email manquant')
    logAccess(ip, pathname, 'INVALID_TOKEN')
    return NextResponse.redirect(new URL('/?error=session-expired', request.url))
  }

  const userEmail = tokenVerification.email
  console.log('✅ [MIDDLEWARE] Token valide pour:', userEmail)

  // Vérifier si l'utilisateur est vérifié
  const { data: userData } = await supabase
    .from('users')
    .select('verified')
    .eq('email', userEmail)
    .single()

  if (!userData?.verified) {
    console.log('❌ [MIDDLEWARE] Utilisateur non vérifié:', userEmail)
    logAccess(ip, pathname, 'NOT_VERIFIED', userEmail)
    return NextResponse.redirect(new URL('/?error=not-verified', request.url))
  }

  console.log('✅ [MIDDLEWARE] Utilisateur vérifié:', userEmail)
  
  // Vérifier les limites de rate limiting avec Supabase
  const now = new Date()
  const oneHour = new Date(now.getTime() - 60 * 60 * 1000)

  // Compter les requêtes de la dernière heure pour cette IP
  const { data: ipLimits } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('ip_address', ip)
    .gte('created_at', oneHour.toISOString())

  // Compter les requêtes de la dernière heure pour cet email
  const { data: emailLimits } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('email', userEmail)
    .gte('created_at', oneHour.toISOString())

  const ipCount = ipLimits?.length || 0
  const emailCount = emailLimits?.length || 0

  // Limites: 100 requêtes par IP par heure, 50 par email par heure
  if (ipCount >= 100) {
    logAccess(ip, pathname, 'IP_RATE_LIMITED', userEmail)
    return NextResponse.redirect(
      new URL(`/?error=rate-limit&type=ip&current=${ipCount}&max=100`, request.url)
    )
  }

  if (emailCount >= 50) {
    logAccess(ip, pathname, 'EMAIL_RATE_LIMITED', userEmail)
    return NextResponse.redirect(
      new URL(`/?error=rate-limit&type=email&current=${emailCount}&max=50`, request.url)
    )
  }

  // Accès autorisé
  logAccess(ip, pathname, 'ALLOWED', userEmail)
  
  // Ajouter des headers avec les informations de rate limiting
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-IP-Remaining', (100 - ipCount).toString())
  response.headers.set('X-RateLimit-Email-Remaining', (50 - emailCount).toString())
  
  return response
}

// Configuration du middleware
export const config = {
  matcher: [
    '/services/ia/:path*',
    '/recruiter-results/:path*'
  ]
}