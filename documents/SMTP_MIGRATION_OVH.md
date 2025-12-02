# Configuration SMTP pour OVH

Cet email confirme que la configuration SMTP a été migrée avec succès de O2Switch vers **OVH**.

## ✅ Test réussi

L'email de test a été envoyé avec succès à `marcfonseca95150@gmail.com` le **02/12/2025 à 12:42:51**.

## 📋 Configuration actuelle

```env
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=contact@be2web.fr
SMTP_PASSWORD=Maxime%9524
SMTP_SECURE=true
```

## 🔧 Fichiers mis à jour

### Code source
- ✅ `/src/app/api/auth/send-verification-code/route.ts` - Configuration SMTP OVH
- ✅ `/src/app/api/send-email/route.ts` - Configuration SMTP OVH

### Documentation
- ✅ `documents/IA_RECRUTEMENT_PRO_Architecture_Technique.md` - Configuration mise à jour
- ✅ `documents/Plan_Ameliorations_SEO_AntiSpam.md` - Références SMTP mises à jour

### Scripts de test
- ✅ `scripts/test-email.js` - Script de test créé et fonctionnel

## 📝 Notes importantes

1. **Email d'envoi changé** : `noreply@francoform.com` → `contact@be2web.fr`
2. **Serveur SMTP changé** : `kitty.o2switch.net` → `ssl0.ovh.net`
3. **Port** : Reste à 465 (SSL)
4. **Variables d'environnement** : Utilisation de `process.env` pour plus de sécurité

## ⚠️ Action requise sur Coolify/Production

N'oubliez pas de mettre à jour les variables d'environnement sur votre serveur de production :

```env
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=contact@be2web.fr
SMTP_PASSWORD=Maxime%9524
SMTP_SECURE=true
```

## 🧪 Relancer le test

Pour tester à nouveau l'envoi d'email :

```bash
node scripts/test-email.js
```

---

**Date de migration** : 02 décembre 2025  
**Status** : ✅ Opérationnel
