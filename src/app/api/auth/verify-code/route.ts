import { NextRequest, NextResponse } from 'next/server'
import { createAuthToken } from '@/lib/auth-utils'
import { verifyCode } from '@/lib/verification-store'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    // Validation des données
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email et code requis' },
        { status: 400 }
      )
    }

    // Logs de débogage
    console.log('🔍 Vérification du code:', { email, code })
    
    // Vérifier le code
    const verification = verifyCode(email, code)
    console.log('📊 Résultat de vérification:', verification)
    
    if (verification.expired) {
      console.log('❌ Code expiré pour:', email)
      return NextResponse.json(
        { error: 'Code expiré ou invalide' },
        { status: 400 }
      )
    }

    if (!verification.valid) {
      return NextResponse.json(
        { error: 'Code incorrect' },
        { status: 400 }
      )
    }

    // Créer le JWT token (valide 24h)
    const token = await createAuthToken(email, true)

    // Créer la réponse avec le cookie sécurisé
    const response = NextResponse.json(
      { 
        message: 'Vérification réussie',
        verified: true
      },
      { status: 200 }
    )

    // Définir le cookie sécurisé (24h)
    response.cookies.set('auth-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24h en secondes
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Erreur lors de la vérification:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    )
  }
}

// Note: verifyAuthToken a été déplacé vers /lib/auth-utils.ts pour compatibilité Edge Runtime