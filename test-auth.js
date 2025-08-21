// Script de test pour l'authentification Supabase
const fetch = require('node-fetch');

async function testAuth() {
  try {
    console.log('🧪 Test de l\'authentification Supabase');
    
    // Test 1: Créer un utilisateur
    console.log('\n1. Test création utilisateur...');
    const createResponse = await fetch('http://localhost:3000/api/auth/send-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    });
    
    const createResult = await createResponse.json();
    console.log('Résultat création:', createResult);
    
    if (!createResponse.ok) {
      console.error('❌ Erreur création utilisateur:', createResult);
      return;
    }
    
    // Test 2: Vérifier avec un code invalide
    console.log('\n2. Test vérification avec code invalide...');
    const verifyResponse = await fetch('http://localhost:3000/api/auth/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        code: '123456'
      })
    });
    
    const verifyResult = await verifyResponse.json();
    console.log('Résultat vérification:', verifyResult);
    console.log('Status:', verifyResponse.status);
    
    if (!verifyResponse.ok) {
      console.log('✅ Erreur attendue pour code invalide');
    } else {
      console.log('⚠️ Code invalide accepté - problème potentiel');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

testAuth();