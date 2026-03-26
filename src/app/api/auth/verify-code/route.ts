import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth-service'
import { supabase } from '@/lib/supabase'

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

    // Vérifier le code avec Supabase
    const verification = await AuthService.verifyCode(email, code)

    if (!verification.success) {
      return NextResponse.json(
        { error: verification.error || 'Code incorrect ou expiré' },
        { status: 400 }
      )
    }

    // Créer un token de session
    const sessionToken = await AuthService.createSessionToken(email)

    // Récupérer les données utilisateur
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    // Créer la réponse avec le cookie sécurisé
    const response = NextResponse.json(
      {
        message: 'Vérification réussie',
        verified: true,
        user: {
          id: user?.id,
          email: user?.email,
          verified: user?.verified
        }
      },
      { status: 200 }
    )

    // Définir le cookie accessible côté client (24h)
    response.cookies.set('supabase-session', sessionToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Erreur vérification code:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    )
  }
}
