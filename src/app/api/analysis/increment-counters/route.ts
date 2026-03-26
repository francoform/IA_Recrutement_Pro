import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth-service';
import { RateLimitService } from '@/lib/rate-limit-service';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 400 }
      );
    }

    // Vérifier le token avec Supabase
    const tokenResult = await AuthService.verifySessionToken(token);

    if (!tokenResult.valid || !tokenResult.email) {
      return NextResponse.json(
        { error: 'Token d\'authentification invalide' },
        { status: 401 }
      );
    }

    const email = tokenResult.email;

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
      );
    }

    // Incrémenter les compteurs de rate-limiting avec Supabase
    const incrementResult = await RateLimitService.incrementCounters(user.id, user.email);

    if (!incrementResult) {
      console.error('Échec incrémentation compteurs pour:', email);
      return NextResponse.json(
        { error: 'Erreur lors de l\'incrémentation des compteurs' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Compteurs incrémentés avec succès',
      data: {
        userId: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Erreur API increment-counters:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
