import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth-service';
import { RateLimitService } from '@/lib/rate-limit-service';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  console.log('🔢 === [SUPABASE-INCREMENT] API INCREMENT-COUNTERS APPELÉE ===');
  console.log('🔢 [SUPABASE-INCREMENT] Méthode:', request.method);
  console.log('🔢 [SUPABASE-INCREMENT] URL:', request.url);
  
  try {
    console.log('🔢 [SUPABASE-INCREMENT] Parsing du body JSON...');
    const body = await request.json();
    console.log('🔢 [SUPABASE-INCREMENT] Body reçu:', body);
    
    const { token } = body;
    
    if (!token) {
      console.log('❌ [SUPABASE-INCREMENT] Token manquant dans la requête');
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 400 }
      );
    }

    console.log('🔢 [SUPABASE-INCREMENT] Token reçu - longueur:', token.length);
    
    // Vérifier le token avec Supabase
    console.log('🔢 [SUPABASE-INCREMENT] Vérification du token avec Supabase...');
    const tokenResult = await AuthService.verifySessionToken(token);
    
    if (!tokenResult.valid || !tokenResult.email) {
      console.error('❌ [SUPABASE-INCREMENT] Token invalide');
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
      console.log('❌ [SUPABASE-INCREMENT] Utilisateur non trouvé:', email);
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }
    
    console.log('🔢 [SUPABASE-INCREMENT] === DONNÉES EXTRAITES ===');
    console.log('🔢 [SUPABASE-INCREMENT] User ID:', user.id);
    console.log('🔢 [SUPABASE-INCREMENT] Email:', user.email);
    
    console.log('🔢 [SUPABASE-INCREMENT] Appel de RateLimitService.incrementCounters...');
    
    // Incrémenter les compteurs de rate-limiting avec Supabase
    const incrementResult = await RateLimitService.incrementCounters(user.id, user.email);
    
    if (!incrementResult) {
      console.error('❌ [SUPABASE-INCREMENT] Échec de l\'incrémentation des compteurs');
      return NextResponse.json(
        { error: 'Erreur lors de l\'incrémentation des compteurs' },
        { status: 500 }
      );
    }
    
    console.log('✅ [SUPABASE-INCREMENT] Compteurs incrémentés avec succès');
    
    const response = {
      success: true,
      message: 'Compteurs incrémentés avec succès',
      data: { 
        userId: user.id,
        email: user.email 
      }
    };
    
    console.log('🔢 [SUPABASE-INCREMENT] Réponse à envoyer:', response);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('💥 [SUPABASE-INCREMENT] ERREUR GLOBALE dans l\'API increment-counters:', error);
    console.error('💥 [SUPABASE-INCREMENT] Type d\'erreur:', error instanceof Error ? error.name : typeof error);
    console.error('💥 [SUPABASE-INCREMENT] Message:', error instanceof Error ? error.message : String(error));
    console.error('💥 [SUPABASE-INCREMENT] Stack trace:', error instanceof Error ? error.stack : 'Pas de stack trace');
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    console.log('🔢 [SUPABASE-INCREMENT] === FIN API INCREMENT-COUNTERS ===');
  }
}