# Système d'Authentification avec Vérification par Email et Supabase

## Vue d'ensemble

Ce document détaille l'implémentation complète d'un système d'authentification basé sur l'envoi de codes de vérification par email, intégré avec Supabase. Ce système permet une authentification sans mot de passe (passwordless) avec gestion des sessions et rate limiting.

## Architecture du Système

### Composants Principaux

1. **Frontend** : Interface utilisateur avec popup de vérification
2. **Backend API** : Routes pour l'envoi et la vérification des codes
3. **Supabase** : Base de données et authentification
4. **Service Email** : Envoi des codes de vérification
5. **Rate Limiting** : Protection contre les abus

### Flux d'Authentification

```
Utilisateur saisit email → Envoi code → Vérification code → Session Supabase → Accès autorisé
```

## Configuration Supabase

### 1. Création du Projet Supabase

```bash
# Créer un nouveau projet sur https://supabase.com
# Récupérer les clés API :
# - SUPABASE_URL
# - SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

### 2. Configuration des Variables d'Environnement

```env
# .env.local
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
EMAIL_FROM=noreply@votredomaine.com
EMAIL_API_KEY=votre_cle_api_email
```

### 3. Tables Supabase Requises

#### Table `verification_codes`

```sql
CREATE TABLE verification_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_verification_codes_email ON verification_codes(email);
CREATE INDEX idx_verification_codes_code ON verification_codes(code);
CREATE INDEX idx_verification_codes_expires_at ON verification_codes(expires_at);
```

#### Table `rate_limits` (optionnelle)

```sql
CREATE TABLE rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  daily_count INTEGER DEFAULT 0,
  last_reset DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Politiques RLS (Row Level Security)

```sql
-- Activer RLS
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Politiques pour verification_codes
CREATE POLICY "Allow service role full access" ON verification_codes
  FOR ALL USING (auth.role() = 'service_role');

-- Politiques pour rate_limits
CREATE POLICY "Allow service role full access" ON rate_limits
  FOR ALL USING (auth.role() = 'service_role');

-- Permissions pour les rôles
GRANT ALL PRIVILEGES ON verification_codes TO service_role;
GRANT ALL PRIVILEGES ON rate_limits TO service_role;
```

## Implémentation Backend

### 1. Configuration Supabase Client

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Client pour le frontend
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Service de Génération de Codes

```typescript
// lib/verification-service.ts
import { supabaseAdmin } from './supabase'

export class VerificationService {
  static generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  static async createVerificationCode(email: string): Promise<string> {
    const code = this.generateCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Supprimer les anciens codes
    await supabaseAdmin
      .from('verification_codes')
      .delete()
      .eq('email', email)

    // Créer le nouveau code
    const { error } = await supabaseAdmin
      .from('verification_codes')
      .insert({
        email,
        code,
        expires_at: expiresAt.toISOString()
      })

    if (error) throw error
    return code
  }

  static async verifyCode(email: string, code: string): Promise<boolean> {
    const { data, error } = await supabaseAdmin
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !data) return false

    // Marquer le code comme utilisé
    await supabaseAdmin
      .from('verification_codes')
      .update({ used: true })
      .eq('id', data.id)

    return true
  }
}
```

### 3. Service d'Envoi d'Email

```typescript
// lib/email-service.ts
export class EmailService {
  static async sendVerificationCode(email: string, code: string): Promise<void> {
    // Exemple avec Resend, Nodemailer, ou autre service
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Code de vérification - IA Recrutement Pro',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Code de vérification</h2>
            <p>Votre code de vérification est :</p>
            <div style="background: #f0f0f0; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px;">
              ${code}
            </div>
            <p>Ce code expire dans 10 minutes.</p>
          </div>
        `
      })
    })

    if (!response.ok) {
      throw new Error('Erreur envoi email')
    }
  }
}
```

### 4. Routes API

#### Route d'envoi de code

```typescript
// app/api/auth/send-code/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { VerificationService } from '@/lib/verification-service'
import { EmailService } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Générer et sauvegarder le code
    const code = await VerificationService.createVerificationCode(email)
    
    // Envoyer l'email
    await EmailService.sendVerificationCode(email, code)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi code:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
```

#### Route de vérification

```typescript
// app/api/auth/verify-code/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { VerificationService } from '@/lib/verification-service'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    // Vérifier le code
    const isValid = await VerificationService.verifyCode(email, code)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Code invalide ou expiré' },
        { status: 400 }
      )
    }

    // Créer une session Supabase
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email
    })

    if (error) throw error

    return NextResponse.json({ 
      success: true,
      session: data.properties?.session
    })
  } catch (error) {
    console.error('Erreur vérification:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
```

## Implémentation Frontend

### 1. Composant de Vérification

```typescript
// components/ui/email-verification-popup.tsx
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface EmailVerificationPopupProps {
  isOpen: boolean
  onVerificationSuccess: () => void
  onClose: () => void
}

export function EmailVerificationPopup({ 
  isOpen, 
  onVerificationSuccess, 
  onClose 
}: EmailVerificationPopupProps) {
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendCode = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setStep('code')
      } else {
        const data = await response.json()
        setError(data.error || 'Erreur envoi')
      }
    } catch (error) {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      })

      if (response.ok) {
        const data = await response.json()
        
        // Établir la session Supabase côté client
        if (data.session) {
          await supabase.auth.setSession(data.session)
        }
        
        onVerificationSuccess()
      } else {
        const data = await response.json()
        setError(data.error || 'Code invalide')
      }
    } catch (error) {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {step === 'email' ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Vérification Email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              className="w-full p-3 border rounded mb-4"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleSendCode}
                disabled={loading || !email}
                className="flex-1 bg-blue-500 text-white p-3 rounded disabled:opacity-50"
              >
                {loading ? 'Envoi...' : 'Envoyer le code'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-3 border rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Code de Vérification</h2>
            <p className="mb-4">Code envoyé à {email}</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code à 6 chiffres"
              className="w-full p-3 border rounded mb-4"
              maxLength={6}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleVerifyCode}
                disabled={loading || code.length !== 6}
                className="flex-1 bg-green-500 text-white p-3 rounded disabled:opacity-50"
              >
                {loading ? 'Vérification...' : 'Vérifier'}
              </button>
              <button
                onClick={() => setStep('email')}
                className="px-4 py-3 border rounded"
              >
                Retour
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

### 2. Intégration dans la Page Principale

```typescript
// app/page.tsx
import { useState } from 'react'
import { EmailVerificationPopup } from '@/components/ui/email-verification-popup'

export default function HomePage() {
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  const handleStartAnalysis = () => {
    // Vérifier si l'utilisateur est connecté
    const token = getAuthToken() // Fonction utilitaire
    
    if (!token) {
      setShowAuthPopup(true)
      return
    }
    
    // Rediriger vers l'application
    router.push('/services/ia')
  }

  const handleAuthSuccess = () => {
    setShowAuthPopup(false)
    router.push('/services/ia')
  }

  return (
    <main>
      {/* Contenu de la page */}
      <button onClick={handleStartAnalysis}>
        Commencer l'analyse
      </button>

      {/* Popup d'authentification */}
      {showAuthPopup && (
        <EmailVerificationPopup
          isOpen={showAuthPopup}
          onVerificationSuccess={handleAuthSuccess}
          onClose={() => setShowAuthPopup(false)}
        />
      )}
    </main>
  )
}
```

## Rate Limiting (Optionnel)

### Service de Rate Limiting

```typescript
// lib/rate-limit-service.ts
import { supabaseAdmin } from './supabase'

export class RateLimitService {
  static async checkLimits(email: string): Promise<{
    allowed: boolean
    current: number
    max: number
    resetTime?: number
  }> {
    const maxDaily = 3
    const today = new Date().toISOString().split('T')[0]

    // Récupérer ou créer l'enregistrement
    let { data: rateLimit } = await supabaseAdmin
      .from('rate_limits')
      .select('*')
      .eq('email', email)
      .single()

    if (!rateLimit) {
      const { data: newLimit } = await supabaseAdmin
        .from('rate_limits')
        .insert({ email, daily_count: 0, last_reset: today })
        .select()
        .single()
      
      rateLimit = newLimit
    }

    // Réinitialiser si nouveau jour
    if (rateLimit.last_reset !== today) {
      await supabaseAdmin
        .from('rate_limits')
        .update({ daily_count: 0, last_reset: today })
        .eq('email', email)
      
      rateLimit.daily_count = 0
    }

    const allowed = rateLimit.daily_count < maxDaily
    const resetTime = allowed ? undefined : new Date().setHours(24, 0, 0, 0)

    return {
      allowed,
      current: rateLimit.daily_count,
      max: maxDaily,
      resetTime
    }
  }

  static async incrementCounter(email: string): Promise<void> {
    await supabaseAdmin
      .from('rate_limits')
      .update({ 
        daily_count: supabaseAdmin.raw('daily_count + 1'),
        updated_at: new Date().toISOString()
      })
      .eq('email', email)
  }
}
```

## Déploiement et Configuration

### 1. Variables d'Environnement de Production

```env
# Production .env
SUPABASE_URL=https://votre-projet-prod.supabase.co
SUPABASE_ANON_KEY=votre_anon_key_prod
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_prod
EMAIL_FROM=noreply@votredomaine.com
EMAIL_API_KEY=votre_cle_api_email_prod
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet-prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_prod
```

### 2. Configuration Vercel (si applicable)

```json
// vercel.json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

## Sécurité et Bonnes Pratiques

### 1. Validation des Données

- Valider tous les emails avec regex
- Limiter la longueur des codes
- Vérifier l'expiration des codes
- Nettoyer les anciens codes régulièrement

### 2. Protection contre les Abus

- Rate limiting par IP et par email
- Délai entre les envois de codes
- Limitation du nombre de tentatives
- Logs des tentatives suspectes

### 3. Gestion des Erreurs

- Messages d'erreur génériques côté client
- Logs détaillés côté serveur
- Fallbacks en cas d'échec
- Monitoring des erreurs

## Maintenance et Monitoring

### 1. Nettoyage Automatique

```sql
-- Supprimer les codes expirés (à exécuter quotidiennement)
DELETE FROM verification_codes 
WHERE expires_at < NOW() - INTERVAL '1 day';
```

### 2. Métriques à Surveiller

- Taux de succès des envois d'emails
- Temps de vérification moyen
- Nombre de tentatives par utilisateur
- Erreurs d'authentification

## Prompts pour Réimplémentation

### Prompt 1 : Configuration Initiale

```
Je veux implémenter un système d'authentification par email avec code de vérification. 
Crée-moi :
1. La configuration Supabase avec les tables nécessaires
2. Les variables d'environnement requises
3. Le client Supabase configuré

Utilise TypeScript et Next.js 14 avec App Router.
```

### Prompt 2 : Backend API

```
Crée les routes API pour :
1. /api/auth/send-code - Génère et envoie un code par email
2. /api/auth/verify-code - Vérifie le code et crée une session

Inclus la gestion d'erreurs, la validation des données, et l'intégration avec Supabase.
Utilise un service d'email comme Resend ou Nodemailer.
```

### Prompt 3 : Interface Utilisateur

```
Crée un composant React de popup d'authentification avec :
1. Étape 1 : Saisie de l'email
2. Étape 2 : Saisie du code de vérification
3. Gestion des états de chargement et d'erreur
4. Design moderne avec Tailwind CSS

Le composant doit s'intégrer facilement dans une page existante.
```

### Prompt 4 : Rate Limiting

```
Ajoute un système de rate limiting qui :
1. Limite à 3 analyses par jour par email
2. Stocke les compteurs dans Supabase
3. Affiche un message avec compte à rebours
4. Se réinitialise automatiquement chaque jour

Inclus une popup d'information quand la limite est atteinte.
```

## Conclusion

Ce système d'authentification offre :
- Sécurité sans mot de passe
- Expérience utilisateur fluide
- Protection contre les abus
- Facilité de maintenance
- Scalabilité avec Supabase

La documentation est conçue pour permettre une réimplémentation rapide sur d'autres projets en suivant les prompts fournis.