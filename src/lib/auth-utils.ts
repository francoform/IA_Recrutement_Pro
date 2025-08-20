// Utilitaires d'authentification compatibles Edge Runtime
// Utilise la Web Crypto API au lieu de la bibliothèque jwt

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Fonction pour encoder en base64url (compatible Edge Runtime)
function base64urlEncode(data: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...data))
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

// Fonction pour décoder depuis base64url
function base64urlDecode(str: string): Uint8Array {
  // Ajouter le padding si nécessaire
  str += '='.repeat((4 - str.length % 4) % 4)
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(base64)
  return new Uint8Array(binary.split('').map(char => char.charCodeAt(0)))
}

// Fonction pour créer une signature HMAC-SHA256
async function createSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(data)
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
  return base64urlEncode(new Uint8Array(signature))
}

// Fonction pour vérifier une signature HMAC-SHA256
async function verifySignature(data: string, signature: string, secret: string): Promise<boolean> {
  const expectedSignature = await createSignature(data, secret)
  return expectedSignature === signature
}

// Interface pour les données du token
interface TokenData {
  email: string
  verified: boolean
  verifiedAt: number
  exp: number
}

// Fonction pour vérifier un token JWT (compatible Edge Runtime)
export async function verifyAuthToken(token: string): Promise<{
  valid: boolean
  email: string | null
  verified: boolean
  verifiedAt: number | null
}> {
  try {
    // Séparer les parties du JWT
    const parts = token.split('.')
    if (parts.length !== 3) {
      return {
        valid: false,
        email: null,
        verified: false,
        verifiedAt: null
      }
    }
    
    const [headerB64, payloadB64, signatureB64] = parts
    
    // Vérifier la signature
    const data = `${headerB64}.${payloadB64}`
    const isValidSignature = await verifySignature(data, signatureB64, JWT_SECRET)
    
    if (!isValidSignature) {
      return {
        valid: false,
        email: null,
        verified: false,
        verifiedAt: null
      }
    }
    
    // Décoder le payload
    const payloadBytes = base64urlDecode(payloadB64)
    const payloadStr = new TextDecoder().decode(payloadBytes)
    const payload: TokenData = JSON.parse(payloadStr)
    
    // Vérifier l'expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && now > payload.exp) {
      return {
        valid: false,
        email: null,
        verified: false,
        verifiedAt: null
      }
    }
    
    return {
      valid: true,
      email: payload.email,
      verified: payload.verified,
      verifiedAt: payload.verifiedAt
    }
    
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error)
    return {
      valid: false,
      email: null,
      verified: false,
      verifiedAt: null
    }
  }
}

// Fonction pour créer un token JWT (compatible Edge Runtime)
export async function createAuthToken(email: string, verified: boolean = true): Promise<string> {
  const now = Date.now()
  const exp = Math.floor((now + 24 * 60 * 60 * 1000) / 1000) // 24h en secondes
  
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }
  
  const payload = {
    email,
    verified,
    verifiedAt: now,
    exp
  }
  
  const headerB64 = base64urlEncode(new TextEncoder().encode(JSON.stringify(header)))
  const payloadB64 = base64urlEncode(new TextEncoder().encode(JSON.stringify(payload)))
  
  const data = `${headerB64}.${payloadB64}`
  const signature = await createSignature(data, JWT_SECRET)
  
  return `${data}.${signature}`
}