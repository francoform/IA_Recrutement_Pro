const { createClient } = require('@supabase/supabase-js');

// Variables d'environnement depuis .env
const SUPABASE_URL = 'https://lqdttnagdzndlpvdaryj.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc4NjM2NSwiZXhwIjoyMDcxMzYyMzY1fQ.lEOLH0N71wO6OX9QS7WfUh4q5aGVdkYBk3weiYv5ue8';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function testWithRealCode() {
  try {
    // 1. Récupérer le code de vérification depuis la base de données
    const { data: user, error } = await supabase
      .from('users')
      .select('email, verification_code, verified')
      .eq('email', 'test@example.com')
      .single();

    if (error) {
      console.log('❌ Erreur lors de la récupération:', error.message);
      return;
    }

    if (!user) {
      console.log('❌ Utilisateur non trouvé');
      return;
    }

    console.log('📋 Utilisateur trouvé:', user);

    if (!user.verification_code) {
      console.log('❌ Aucun code de vérification trouvé');
      return;
    }

    // 2. Tester l'API verify-code avec le vrai code
    console.log('🔍 Test de vérification avec le code:', user.verification_code);
    
    const response = await fetch('http://localhost:3000/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'test@example.com', 
        code: user.verification_code 
      })
    });

    const result = await response.json();
    
    console.log('📊 Statut de la réponse:', response.status);
    console.log('📊 Réponse de l\'API:', result);

    if (response.ok) {
      console.log('✅ Vérification réussie!');
    } else {
      console.log('❌ Vérification échouée:', result.error);
    }

  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

testWithRealCode();