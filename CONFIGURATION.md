# Guide de Configuration - IA Recrutement Pro

## Problème Actuel

L'erreur 500 sur `/api/auth/send-verification-code` est causée par l'absence de la variable d'environnement `SMTP_PASSWORD` sur le serveur de production Coolify.

## Variables d'Environnement Requises

### 1. SMTP_PASSWORD (OBLIGATOIRE)
- **Description** : Mot de passe SMTP pour l'envoi d'emails
- **Compte** : noreply@francoform.com
- **Serveur** : pro.mail.ovh.net
- **Sans cette variable** : Erreur 500 lors de l'envoi de codes de vérification

### 2. NEXTAUTH_URL
- **Production** : `https://ia-recrutement-pro.be2web.fr`
- **Développement** : `http://localhost:3000`

### 3. NEXTAUTH_SECRET
- **Description** : Clé secrète pour le chiffrement des sessions
- **Génération** : Utilisez une clé aléatoire sécurisée (32+ caractères)

## Configuration sur Coolify

### Étapes pour ajouter les variables d'environnement :

1. **Accédez à votre projet sur Coolify**
   - Connectez-vous à votre interface Coolify
   - Sélectionnez le projet `ia-recrutement-pro`

2. **Naviguez vers les variables d'environnement**
   - Cliquez sur l'onglet "Environment Variables" ou "Variables d'environnement"

3. **Ajoutez les variables suivantes :**
   ```
   SMTP_PASSWORD=votre_mot_de_passe_smtp_réel
   NEXTAUTH_URL=https://ia-recrutement-pro.be2web.fr
   NEXTAUTH_SECRET=votre_clé_secrète_aléatoire_32_caractères_minimum
   ```

4. **Sauvegardez et redéployez**
   - Cliquez sur "Save" ou "Sauvegarder"
   - Redéployez l'application pour que les nouvelles variables prennent effet

## Vérification

Après configuration :
1. L'erreur 500 sur `/api/auth/send-verification-code` devrait disparaître
2. L'envoi de codes de vérification par email devrait fonctionner
3. L'authentification complète devrait être opérationnelle

## Sécurité

- **Ne jamais** commiter le fichier `.env.local` dans Git
- Utilisez des mots de passe forts pour SMTP
- Générez une clé NEXTAUTH_SECRET unique pour la production
- Gardez les variables d'environnement confidentielles

## Support

Si le problème persiste après configuration :
1. Vérifiez les logs de Coolify
2. Confirmez que toutes les variables sont bien définies
3. Redéployez complètement l'application