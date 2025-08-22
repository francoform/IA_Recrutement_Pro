# Guide de Déploiement Coolify - IA Recrutement Pro

## Variables d'Environnement Requises

### Configuration Supabase
Dans Coolify, vous devez configurer les variables d'environnement suivantes :

```bash
# Variables Supabase (OBLIGATOIRES)
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Configuration Email SMTP (OBLIGATOIRE)
SMTP_PASSWORD=votre_mot_de_passe_smtp

# Configuration Admin (OPTIONNEL)
ADMIN_PASSWORD=votre_mot_de_passe_admin

# Configuration OpenAI (OBLIGATOIRE pour l'analyse)
OPENAI_API_KEY=sk-...
```

### Comment Obtenir les Clés Supabase

1. **NEXT_PUBLIC_SUPABASE_URL** :
   - Connectez-vous à votre projet Supabase
   - Allez dans Settings > API
   - Copiez l'URL du projet

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** :
   - Dans Settings > API
   - Copiez la clé "anon public"

3. **SUPABASE_SERVICE_ROLE_KEY** :
   - Dans Settings > API
   - Copiez la clé "service_role" (⚠️ GARDEZ-LA SECRÈTE)

## Configuration dans Coolify

### Étape 1 : Accéder aux Variables d'Environnement
1. Ouvrez votre projet dans Coolify
2. Allez dans l'onglet "Environment Variables"
3. Ajoutez chaque variable une par une

### Étape 2 : Ajouter les Variables
Pour chaque variable :
1. Cliquez sur "Add Environment Variable"
2. Nom : `NEXT_PUBLIC_SUPABASE_URL`
3. Valeur : `https://votre-projet.supabase.co`
4. Cochez "Build Time" ET "Runtime" pour les variables NEXT_PUBLIC_*
5. Cochez seulement "Runtime" pour les autres variables
6. Cliquez sur "Save"

### Étape 3 : Variables Critiques

**Variables Build Time + Runtime :**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Variables Runtime Seulement :**
- `SUPABASE_SERVICE_ROLE_KEY`
- `SMTP_PASSWORD`
- `ADMIN_PASSWORD`
- `OPENAI_API_KEY`

## Résolution du Problème Edge Runtime

### Problème Identifié
L'erreur provient de `@supabase/realtime-js` qui utilise `process.versions` non supporté dans l'Edge Runtime de Next.js.

### Solution Appliquée
Le fichier `next.config.js` a été modifié pour exclure les packages Supabase de l'Edge Runtime :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  serverExternalPackages: ['@supabase/supabase-js', '@supabase/realtime-js'],
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js', '@supabase/realtime-js']
  }
}

module.exports = nextConfig
```

## Vérification du Déploiement

### Après Configuration
1. Redéployez votre application dans Coolify
2. Vérifiez les logs de build pour s'assurer qu'il n'y a plus d'erreurs
3. Testez l'authentification par email
4. Testez l'analyse de CV

### Tests de Fonctionnement
1. **Page d'accueil** : Doit se charger sans erreur
2. **Authentification** : Envoi de code par email
3. **Vérification** : Validation du code à 6 chiffres
4. **Analyse** : Upload et analyse de CV
5. **Rate Limiting** : Limite de 3 analyses par jour

## Dépannage

### Erreur "Supabase URL not found"
- Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` est bien configurée
- Assurez-vous qu'elle est marquée comme "Build Time"

### Erreur "Invalid API Key"
- Vérifiez `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Vérifiez `SUPABASE_SERVICE_ROLE_KEY`

### Erreur SMTP
- Vérifiez `SMTP_PASSWORD`
- Testez l'envoi d'email depuis Supabase

### Erreur OpenAI
- Vérifiez `OPENAI_API_KEY`
- Assurez-vous que le compte OpenAI a du crédit

## Structure de Base de Données Supabase

Assurez-vous que ces tables existent :

### Table `users`
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  verification_code TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table `rate_limits`
```sql
CREATE TABLE rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'daily',
  analysis_count INTEGER DEFAULT 0,
  daily_count INTEGER DEFAULT 0,
  last_analysis TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_reset DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Permissions RLS
```sql
-- Activer RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Permissions pour les rôles
GRANT ALL PRIVILEGES ON users TO authenticated;
GRANT ALL PRIVILEGES ON rate_limits TO authenticated;
GRANT SELECT ON users TO anon;
GRANT SELECT ON rate_limits TO anon;
```

## Support

En cas de problème :
1. Vérifiez les logs Coolify
2. Vérifiez les logs Supabase
3. Contactez : ia-recrutement-pro@francoform.com