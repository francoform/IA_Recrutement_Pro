// Stockage des codes de vérification (compatible Edge Runtime)
// Séparé des routes API pour éviter les conflits avec nodemailer

interface VerificationData {
  code: string
  expires: number
  attempts: number
}

// Stockage global pour partager les données entre les routes API
declare global {
  var verificationCodes: Map<string, VerificationData> | undefined
}

// Stockage temporaire des codes (en production, utiliser Redis ou une base de données)
export const verificationCodes = globalThis.verificationCodes ?? new Map<string, VerificationData>()
if (!globalThis.verificationCodes) {
  globalThis.verificationCodes = verificationCodes
}

// Nettoyage automatique des codes expirés
setInterval(() => {
  const now = Date.now()
  for (const [email, data] of verificationCodes.entries()) {
    if (data.expires < now) {
      verificationCodes.delete(email)
    }
  }
}, 60000) // Nettoyage toutes les minutes

// Fonction utilitaire pour générer un code de vérification
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Fonction pour stocker un code de vérification
export function storeVerificationCode(email: string, code: string, expiresInMinutes: number = 10): void {
  const expires = Date.now() + (expiresInMinutes * 60 * 1000)
  const data = {
    code,
    expires,
    attempts: 0
  }
  verificationCodes.set(email, data)
  console.log('💾 Code stocké pour:', email, 'Code:', code, 'Expire à:', new Date(expires).toLocaleString())
  console.log('💾 Taille du Map après stockage:', verificationCodes.size)
}

// Fonction pour vérifier un code
export function verifyCode(email: string, code: string): { valid: boolean; expired: boolean; attempts: number } {
  console.log('🔍 Vérification du code:', { email, code })
  console.log('🔍 Données stockées pour', email, ':', verificationCodes.get(email))
  console.log('🔍 Taille du Map:', verificationCodes.size)
  console.log('🔍 Toutes les clés:', Array.from(verificationCodes.keys()))
  
  const data = verificationCodes.get(email)
  
  if (!data) {
    console.log('❌ Aucune donnée trouvée pour:', email)
    return { valid: false, expired: true, attempts: 0 }
  }
  
  const now = Date.now()
  console.log('⏰ Temps actuel:', now, 'Expiration:', data.expires, 'Différence:', data.expires - now)
  
  if (now > data.expires) {
    console.log('⏰ Code expiré pour:', email)
    verificationCodes.delete(email)
    return { valid: false, expired: true, attempts: data.attempts }
  }
  
  console.log('🔑 Comparaison codes - Reçu:', code, 'Stocké:', data.code, 'Match:', data.code === code)
  
  if (data.code === code) {
    console.log('✅ Code valide pour:', email)
    verificationCodes.delete(email)
    return { valid: true, expired: false, attempts: data.attempts }
  }
  
  // Incrémenter les tentatives
  data.attempts++
  verificationCodes.set(email, data)
  console.log('❌ Code incorrect pour:', email, 'Tentatives:', data.attempts)
  
  return { valid: false, expired: false, attempts: data.attempts }
}

// Fonction pour obtenir les données de vérification
export function getVerificationData(email: string): VerificationData | null {
  return verificationCodes.get(email) || null
}