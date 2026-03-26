import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth-service'
import { RateLimitService } from '@/lib/rate-limit-service'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Vérifier le token d'authentification
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'authentification manquant' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    // Vérifier le token avec Supabase
    const tokenResult = await AuthService.verifySessionToken(token)

    if (!tokenResult.valid || !tokenResult.email) {
      return NextResponse.json(
        { error: 'Token d\'authentification invalide' },
        { status: 401 }
      )
    }

    const email = tokenResult.email

    // Récupérer l'utilisateur depuis la base de données
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les limites sans les incrémenter
    const limitCheck = await RateLimitService.checkLimits(user.id, user.email)
    const stats = await RateLimitService.getUserStats(user.id)

    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          allowed: false,
          type: limitCheck.type,
          current: limitCheck.current,
          max: limitCheck.max,
          resetTime: limitCheck.resetTime,
          remaining: limitCheck.remaining,
          stats,
          error: limitCheck.error
        },
        { status: 429 }
      )
    }

    return NextResponse.json({
      allowed: true,
      remaining: limitCheck.remaining,
      current: limitCheck.current,
      max: limitCheck.max,
      resetTime: limitCheck.resetTime,
      stats
    })

  } catch (error) {
    console.error('Erreur vérification limites:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
