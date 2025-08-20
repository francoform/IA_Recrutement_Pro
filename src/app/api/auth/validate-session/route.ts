import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    // Récupérer le cookie auth-session
    const authCookie = request.cookies.get('auth-session');
    
    if (!authCookie || !authCookie.value) {
      return NextResponse.json(
        { valid: false, message: 'Aucun token d\'authentification trouvé' },
        { status: 401 }
      );
    }

    // Vérifier la validité du token JWT
    const tokenData = await verifyAuthToken(authCookie.value);
    
    if (!tokenData) {
      return NextResponse.json(
        { valid: false, message: 'Token invalide ou expiré' },
        { status: 401 }
      );
    }

    // Token valide
    return NextResponse.json(
      { 
        valid: true, 
        email: tokenData.email,
        verified: tokenData.verified,
        verifiedAt: tokenData.verifiedAt
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Erreur lors de la validation de session:', error);
    return NextResponse.json(
      { valid: false, message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}