import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Récupérer le token d'autorisation depuis les headers
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { valid: false, message: 'Aucun token d\'authentification trouvé' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Enlever "Bearer "

    // Vérifier le token avec Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return NextResponse.json(
        { valid: false, message: 'Token invalide ou expiré' },
        { status: 401 }
      )
    }

    // Récupérer les informations utilisateur depuis la table users
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single()

    // Token valide
    return NextResponse.json(
      { 
        valid: true,
        email: user.email,
        verified: userData?.verified || false,
        verifiedAt: userData?.updated_at
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Erreur lors de la validation de session:', error)
    return NextResponse.json(
      { valid: false, message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}