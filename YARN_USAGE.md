# 📦 YARN - Gestionnaire de Paquets Exclusif

## ⚠️ IMPORTANT - RÈGLE ABSOLUE

**CE PROJET UTILISE EXCLUSIVEMENT YARN COMME GESTIONNAIRE DE PAQUETS**

### ✅ Commandes à utiliser :

```bash
# Installation des dépendances
yarn install

# Ajout d'une dépendance
yarn add [package-name]

# Ajout d'une dépendance de développement
yarn add -D [package-name]

# Suppression d'une dépendance
yarn remove [package-name]

# Démarrage du serveur de développement
yarn dev

# Build de production
yarn build

# Vérification du code (lint + typecheck)
yarn check
```

### ❌ Commandes INTERDITES :

```bash
# NE JAMAIS UTILISER :
npm install
npm run dev
npm run build
npx [command]
```

## 🚨 Problèmes causés par l'usage de npm :

1. **Création de `package-lock.json`** - Conflit avec `yarn.lock`
2. **Installation dans `node_modules/`** - Versions incohérentes
3. **Erreurs de dépendances** - Résolution différente des packages
4. **Builds instables** - Particulièrement sur Coolify

## 🔧 En cas d'erreur npm :

```bash
# Nettoyer complètement
rm -rf node_modules package-lock.json

# Réinstaller avec yarn
yarn install

# Redémarrer le serveur
yarn dev
```

## 📋 Checklist avant commit :

- [ ] Aucun fichier `package-lock.json` présent
- [ ] Seul `yarn.lock` est présent
- [ ] `yarn check` passe sans erreur
- [ ] `yarn dev` démarre correctement

---

**Rappel : Ce projet a été configuré avec yarn dès le début. Maintenir cette cohérence est essentiel pour la stabilité du projet et les déploiements sur Coolify.**