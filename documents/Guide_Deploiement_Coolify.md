# Guide de Déploiement Coolify - IA Recrutement Pro

## 📋 Vue d'ensemble

Ce guide vous accompagne dans le déploiement de l'application **IA Recrutement Pro** sur Coolify, en résolvant les erreurs communes et en configurant correctement toutes les variables d'environnement.

## 🔧 Variables d'Environnement Requises

### Variables Supabase (OBLIGATOIRES)
```bash
# URL de votre projet Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co

# Clé publique anonyme Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Clé de service Supabase (pour les opérations admin)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Variables API (OBLIGATOIRES)
```bash
# Clé API OpenAI pour l'analyse IA
OPENAI_API_KEY=sk-...

# Clé API Resend pour l'envoi d'emails
RESEND_API_KEY=re_...
```

### Variables de Configuration
```bash
# Environnement de production
NODE_ENV=production

# URL de base de l'application (optionnel)
NEXT_PUBLIC_BASE_URL=https://votre-domaine.com
```

## 🚀 Étapes de Déploiement

### 1. Configuration dans Coolify

1. **Accédez à votre projet** dans l'interface Coolify
2. **Allez dans les paramètres** de votre application
3. **Section "Environment Variables"**
4. **Ajoutez toutes les variables** listées ci-dessus
5. **Sauvegardez** la configuration

### 2. Configuration du Repository

```bash
# Assurez-vous que votre code est à jour
git add .
git commit -m "Configuration pour déploiement Coolify"
git push origin main
```

### 3. Déclenchement du Déploiement

1. **Redéployez** depuis l'interface Coolify
2. **Surveillez les logs** de build
3. **Vérifiez** que le déploiement se termine sans erreur

## 🔍 Résolution des Erreurs Communes

### Erreur Edge Runtime avec Supabase

**Symptôme :**
```
A Node.js API is used (process.versions) which is not supported in the Edge Runtime
```

**Solution :** ✅ **DÉJÀ CORRIGÉE**
- Toutes les routes API utilisent maintenant `export const runtime = 'nodejs'`
- Le problème avec `@supabase/realtime-js` est résolu

### Erreur de Variables d'Environnement Manquantes

**Symptôme :**
```
Error: Missing environment variables
```

**Solution :**
1. Vérifiez que toutes les variables sont configurées dans Coolify
2. Redéployez après avoir ajouté les variables manquantes

### Erreur de Build

**Symptôme :**
```
yarn run build failed with exit code 1
```

**Solution :**
1. Vérifiez les logs de build pour identifier l'erreur spécifique
2. Assurez-vous que toutes les dépendances sont installées
3. Vérifiez que le code compile localement avec `yarn build`

## 🗄️ Configuration Supabase

### 1. Récupération des Clés

1. **Connectez-vous** à votre dashboard Supabase
2. **Sélectionnez votre projet**
3. **Allez dans Settings > API**
4. **Copiez :**
   - URL du projet
   - Clé `anon` (publique)
   - Clé `service_role` (privée)

### 2. Configuration des Tables

Assurez-vous que ces tables existent :
- `email_verifications`
- `rate_limits`
- `analytics`

### 3. Politiques RLS (Row Level Security)

Vérifiez que les politiques RLS sont configurées pour :
- Permettre l'accès aux utilisateurs authentifiés
- Protéger les données sensibles

## 🧪 Tests Post-Déploiement

### 1. Test de Base

1. **Accédez** à votre application déployée
2. **Vérifiez** que la page d'accueil se charge
3. **Testez** l'upload d'un CV

### 2. Test d'Authentification

1. **Entrez un email** valide
2. **Vérifiez** la réception du code de vérification
3. **Confirmez** l'authentification

### 3. Test d'Analyse

1. **Uploadez un CV** de test
2. **Vérifiez** que l'analyse IA fonctionne
3. **Confirmez** l'affichage des résultats

### 4. Test des Limites

1. **Effectuez 3 analyses** avec le même email
2. **Vérifiez** que la 4ème est bloquée
3. **Confirmez** l'affichage du compte à rebours

## 📊 Monitoring

### Logs à Surveiller

```bash
# Logs d'application
- Erreurs de connexion Supabase
- Erreurs API OpenAI
- Erreurs d'envoi d'email

# Logs de performance
- Temps de réponse des analyses
- Utilisation mémoire
- Erreurs de timeout
```

### Métriques Importantes

- **Taux de succès** des analyses
- **Temps de réponse** moyen
- **Nombre d'utilisateurs** actifs
- **Erreurs** par heure

## 🆘 Support et Dépannage

### Contacts

- **Email technique :** ia-recrutement-pro@francoform.com
- **Documentation :** Consultez les autres fichiers dans `/documents/`

### Commandes Utiles

```bash
# Test local avant déploiement
yarn build
yarn start

# Vérification des variables
echo $NEXT_PUBLIC_SUPABASE_URL

# Logs de déploiement
# Consultez l'interface Coolify
```

## ✅ Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] Code pushé sur le repository
- [ ] Build réussi localement
- [ ] Supabase configuré et accessible
- [ ] APIs externes (OpenAI, Resend) fonctionnelles
- [ ] Tests post-déploiement réussis
- [ ] Monitoring en place

---

**🎉 Félicitations !** Votre application IA Recrutement Pro est maintenant déployée sur Coolify et prête à analyser des CVs !