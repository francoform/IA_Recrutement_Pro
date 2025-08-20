# Plan d'Améliorations IA Recrutement Pro

## Vue d'ensemble

Ce document détaille la planification de deux améliorations majeures pour le site IA Recrutement Pro :
1. **Optimisation SEO avancée** pour cibler artisans, TPE, PME
2. **Système anti-spam hybride complet** pour protéger les ressources IA

---

## 1. AMÉLIORATION SEO AVANCÉE

### 1.1 Objectifs SEO

**Cible principale :** Artisans, TPE, PME cherchant des solutions de recrutement rapide et efficace

**Pages à optimiser :**
- Page d'accueil (`/`)
- Page service IA (`/services/ia`)

### 1.2 Stratégie de mots-clés francophones

#### Mots-clés primaires (forte intention commerciale)
- "recrutement rapide TPE"
- "tri CV automatique PME"
- "solution recrutement artisan"
- "aide recrutement intelligence artificielle"
- "sélection candidats automatique"
- "gain temps recrutement"

#### Mots-clés secondaires (longue traîne)
- "comment recruter rapidement artisan"
- "logiciel tri CV gratuit"
- "analyse CV automatique France"
- "recrutement efficace petite entreprise"
- "outil sélection candidats IA"
- "optimiser processus recrutement TPE"

#### Mots-clés locaux/sectoriels
- "recrutement artisan France"
- "solution RH TPE PME"
- "embauche rapide secteur BTP"
- "recrutement commerce proximité"

### 1.3 Optimisations techniques

#### Page d'accueil (`/`)
```typescript
// Nouvelles métadonnées optimisées
export const metadata: Metadata = {
  title: "Recrutement Rapide TPE PME | IA Recrutement Pro - Tri CV Automatique",
  description: "Solution de recrutement IA pour artisans, TPE et PME. Triez et analysez vos CV en 2 minutes. Gagnez 90% de temps sur votre sélection de candidats. Essai gratuit.",
  keywords: [
    "recrutement rapide TPE",
    "tri CV automatique PME", 
    "solution recrutement artisan",
    "aide recrutement IA",
    "sélection candidats automatique",
    "gain temps recrutement",
    "logiciel RH TPE",
    "analyse CV intelligence artificielle",
    "recrutement efficace petite entreprise",
    "outil embauche rapide"
  ].join(", "),
  // ... autres métadonnées
}
```

#### Page service IA (`/services/ia`)
```typescript
export const metadata: Metadata = {
  title: "Analyseur CV IA Gratuit | Upload et Tri Automatique - IA Recrutement Pro",
  description: "Uploadez vos CV et obtenez un classement intelligent en 2 minutes. Analyse IA gratuite pour TPE, PME et artisans. Scoring automatique des candidats.",
  keywords: [
    "upload CV IA gratuit",
    "analyse CV automatique",
    "tri candidats intelligence artificielle",
    "scoring CV automatique",
    "classement candidats IA",
    "outil analyse CV TPE",
    "évaluation candidatures automatique"
  ].join(", "),
  // ... autres métadonnées
}
```

### 1.4 Optimisations de contenu

#### Ajouts de contenu SEO
- **Sections FAQ** avec questions fréquentes des TPE/PME
- **Témoignages sectoriels** (artisans, commerce, services)
- **Guide d'utilisation** optimisé pour les mots-clés
- **Blog/actualités** sur le recrutement TPE/PME

#### Structure de données (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "IA Recrutement Pro",
  "description": "Solution de recrutement par IA pour TPE, PME et artisans",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Essai gratuit"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "TPE PME Artisans"
  }
}
```

---

## 2. SYSTÈME ANTI-SPAM HYBRIDE COMPLET

### 2.1 Architecture générale

```mermaid
graph TD
    A[Utilisateur clique "Commencer"] --> B[Popup Vérification Email]
    B --> C[Envoi Code par Email]
    C --> D[Saisie Code]
    D --> E{Code Valide?}
    E -->|Oui| F[Création Session 24h]
    E -->|Non| G[Erreur + Retry]
    F --> H[Accès /services/ia]
    H --> I[Rate Limiting Check]
    I --> J{Limites OK?}
    J -->|Oui| K[Analyse IA]
    J -->|Non| L[Captcha ou Blocage]
```

### 2.2 Phase 1 : Vérification Email

#### Composant Popup Glassmorphism
```typescript
// /src/components/auth/EmailVerificationPopup.tsx
interface EmailVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EmailVerificationPopup({ isOpen, onClose, onSuccess }: EmailVerificationPopupProps) {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Logique de vérification
}
```

#### API Envoi Code
```typescript
// /src/app/api/auth/send-code/route.ts
export async function POST(request: NextRequest) {
  const { email } = await request.json();
  
  // Génération code 6 chiffres
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Stockage temporaire (Redis ou Map)
  await storeVerificationCode(email, code, 10); // 10 min expiration
  
  // Envoi email avec template HTML
  await sendVerificationEmail(email, code);
  
  return NextResponse.json({ success: true });
}
```

#### Template Email HTML
```html
<!-- Template compatible Outlook avec CSS inline -->
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
  <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #333; text-align: center; margin-bottom: 20px;">🔐 Code de Vérification</h2>
    <p style="color: #555; text-align: center; font-size: 16px;">Votre code de vérification pour IA Recrutement Pro :</p>
    <div style="background: #f8f9fa; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
      <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">{{CODE}}</span>
    </div>
    <p style="color: #888; font-size: 14px; text-align: center;">Ce code expire dans 10 minutes.</p>
  </div>
</div>
```

### 2.3 Phase 2 : Session Persistante

#### Gestion Sessions JWT
```typescript
// /src/lib/auth.ts
import jwt from 'jsonwebtoken';

interface SessionData {
  email: string;
  verified: boolean;
  createdAt: number;
  usageCount: number;
}

export function createSession(email: string): string {
  const payload: SessionData = {
    email,
    verified: true,
    createdAt: Date.now(),
    usageCount: 0
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h'
  });
}

export function verifySession(token: string): SessionData | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as SessionData;
  } catch {
    return null;
  }
}
```

#### Cookies Sécurisés
```typescript
// /src/lib/cookies.ts
import { cookies } from 'next/headers';

export function setSessionCookie(token: string) {
  cookies().set('ia-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 // 24h
  });
}

export function getSessionCookie(): string | undefined {
  return cookies().get('ia-session')?.value;
}
```

### 2.4 Phase 3 : Rate Limiting Intelligent

#### Système Rate Limiting
```typescript
// /src/lib/rate-limit.ts
interface RateLimit {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private ipLimits = new Map<string, RateLimit>();
  private emailLimits = new Map<string, RateLimit>();
  
  checkIPLimit(ip: string): boolean {
    const limit = this.ipLimits.get(ip);
    const now = Date.now();
    
    if (!limit || now > limit.resetTime) {
      this.ipLimits.set(ip, {
        count: 1,
        resetTime: now + (60 * 60 * 1000) // 1h
      });
      return true;
    }
    
    if (limit.count >= 5) return false;
    
    limit.count++;
    return true;
  }
  
  checkEmailLimit(email: string): boolean {
    const limit = this.emailLimits.get(email);
    const now = Date.now();
    
    if (!limit || now > limit.resetTime) {
      this.emailLimits.set(email, {
        count: 1,
        resetTime: now + (24 * 60 * 60 * 1000) // 24h
      });
      return true;
    }
    
    if (limit.count >= 10) return false;
    
    limit.count++;
    return true;
  }
}

export const rateLimiter = new RateLimiter();
```

### 2.5 Phase 4 : Protection Next.js Middleware

#### Middleware de Protection
```typescript
// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';
import { rateLimiter } from '@/lib/rate-limit';

const PROTECTED_ROUTES = ['/services/ia', '/recruiter-results'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si la route est protégée
  if (!PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Récupérer session
  const sessionToken = request.cookies.get('ia-session')?.value;
  
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Vérifier session valide
  const session = verifySession(sessionToken);
  if (!session) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('ia-session');
    return response;
  }
  
  // Rate limiting
  const ip = request.ip || 'unknown';
  if (!rateLimiter.checkIPLimit(ip) || !rateLimiter.checkEmailLimit(session.email)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  // Log accès
  console.log(`Access granted: ${session.email} from ${ip} to ${pathname}`);
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/services/ia/:path*', '/recruiter-results/:path*']
};
```

### 2.6 Fonctionnalités Bonus

#### Analytics et Monitoring
```typescript
// /src/lib/analytics.ts
interface AnalyticsEvent {
  type: 'access' | 'verification' | 'rate_limit' | 'suspicious';
  email?: string;
  ip: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  
  track(event: Omit<AnalyticsEvent, 'timestamp'>) {
    this.events.push({
      ...event,
      timestamp: Date.now()
    });
    
    // Nettoyer les anciens événements (> 30 jours)
    const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
    this.events = this.events.filter(e => e.timestamp > cutoff);
  }
  
  getStats(days: number = 7) {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    const recentEvents = this.events.filter(e => e.timestamp > cutoff);
    
    return {
      totalAccess: recentEvents.filter(e => e.type === 'access').length,
      totalVerifications: recentEvents.filter(e => e.type === 'verification').length,
      rateLimitHits: recentEvents.filter(e => e.type === 'rate_limit').length,
      suspiciousActivity: recentEvents.filter(e => e.type === 'suspicious').length,
      uniqueUsers: new Set(recentEvents.map(e => e.email).filter(Boolean)).size
    };
  }
}

export const analytics = new Analytics();
```

#### Admin Dashboard
```typescript
// /src/app/admin/dashboard/page.tsx
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [whitelist, setWhitelist] = useState<string[]>([]);
  
  // Interface d'administration pour :
  // - Voir statistiques d'utilisation
  // - Gérer liste blanche emails
  // - Voir logs d'accès suspects
  // - Ajuster limites rate limiting
}
```

#### Liste Blanche
```typescript
// /src/lib/whitelist.ts
const WHITELISTED_EMAILS = new Set([
  'admin@be2web.fr',
  'test@francoform.com'
  // Emails de confiance sans limite
]);

export function isWhitelisted(email: string): boolean {
  return WHITELISTED_EMAILS.has(email.toLowerCase());
}
```

---

## 3. PLAN D'IMPLÉMENTATION

### 3.1 Phase SEO (Semaine 1)
1. **Jour 1-2 :** Recherche mots-clés approfondie
2. **Jour 3-4 :** Optimisation métadonnées pages
3. **Jour 5-7 :** Ajout contenu SEO et structure données

### 3.2 Phase Anti-Spam (Semaine 2-3)
1. **Jour 1-3 :** Composants vérification email
2. **Jour 4-6 :** Système sessions et cookies
3. **Jour 7-9 :** Rate limiting et middleware
4. **Jour 10-14 :** Analytics et dashboard admin

### 3.3 Tests et Optimisations (Semaine 4)
1. **Tests fonctionnels** complets
2. **Tests de charge** rate limiting
3. **Optimisations performances**
4. **Documentation utilisateur**

---

## 4. CONFIGURATION TECHNIQUE

### 4.1 Variables d'Environnement
```env
# Existant (SMTP O2Switch)
SMTP_HOST=kitty.o2switch.net
SMTP_PORT=465
SMTP_USER=noreply@francoform.com
SMTP_PASS=Maxime%9524

# Nouveau (Anti-spam)
JWT_SECRET=your-super-secret-jwt-key
ADMIN_PASSWORD=your-admin-password
RATE_LIMIT_IP_HOURLY=5
RATE_LIMIT_EMAIL_DAILY=10
```

### 4.2 Dépendances à Ajouter
```json
{
  "dependencies": {
    "jsonwebtoken": "^9.0.0",
    "@types/jsonwebtoken": "^9.0.0"
  }
}
```

---

## 5. AVANTAGES DE LA SOLUTION

✅ **Protection robuste** contre bots et spam  
✅ **UX fluide** après première vérification  
✅ **Coûts tokens maîtrisés** avec rate limiting intelligent  
✅ **Compatible Next.js App Router** avec middleware natif  
✅ **Évolutif et configurable** avec admin dashboard  
✅ **Utilise infrastructure existante** (SMTP O2Switch)  
✅ **SEO optimisé** pour cible TPE/PME/artisans  
✅ **Analytics intégrées** pour monitoring usage

Cette solution complète garantit une protection efficace tout en maintenant une excellente expérience utilisateur et une visibilité SEO maximale.