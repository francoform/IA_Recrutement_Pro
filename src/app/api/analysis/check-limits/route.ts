import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth-service'
import { RateLimitService } from '@/lib/rate-limit-service'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Vérifier le token d'authentification
    const authHeader = request.headers.get('authorization')
    console.log('🔍 [SUPABASE-RATE-LIMIT] Auth header reçu:', authHeader ? `Bearer ${authHeader.substring(7, 27)}...` : 'null')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ [SUPABASE-RATE-LIMIT] Token manquant ou format incorrect')
      return NextResponse.json(
        { error: 'Token d\'authentification manquant' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    console.log('🔑 [SUPABASE-RATE-LIMIT] Token extrait:', `${token.substring(0, 20)}...`)
    
    // Vérifier le token avec Supabase
    const tokenResult = await AuthService.verifySessionToken(token)
    
    if (!tokenResult.valid || !tokenResult.email) {
      console.log('❌ [SUPABASE-RATE-LIMIT] Token invalide')
      return NextResponse.json(
        { error: 'Token d\'authentification invalide' },
        { status: 401 }
      )
    }

    const email = tokenResult.email
    console.log('✅ [SUPABASE-RATE-LIMIT] Token vérifié pour utilisateur:', email)

    // Récupérer l'utilisateur depuis la base de données
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (userError || !user) {
      console.log('❌ [SUPABASE-RATE-LIMIT] Utilisateur non trouvé:', email)
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les limites sans les incrémenter
    const limitCheck = await RateLimitService.checkLimits(user.id, user.email)
    console.log('📊 [SUPABASE-RATE-LIMIT] Résultat vérification limites:', limitCheck)
    
    // Obtenir les statistiques actuelles
    const stats = await RateLimitService.getUserStats(user.id)
    console.log('📈 [SUPABASE-RATE-LIMIT] Statistiques utilisateur:', stats)
    
    if (!limitCheck.allowed) {
      console.log('❌ [SUPABASE-RATE-LIMIT] Limite atteinte pour utilisateur:', user.email)
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

    // Retourner les statistiques actuelles sans incrémenter les compteurs
    // L'incrémentation se fera uniquement après une analyse réussie
    console.log('✅ [SUPABASE-RATE-LIMIT] Limites OK pour utilisateur:', user.email)
    return NextResponse.json({
      allowed: true,
      remaining: limitCheck.remaining,
      current: limitCheck.current,
      max: limitCheck.max,
      resetTime: limitCheck.resetTime,
      stats
    })

  } catch (error) {
    console.error('❌ [SUPABASE-RATE-LIMIT] Erreur lors de la vérification des limites:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}