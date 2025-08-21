🚀 Envoi des données vers le proxy API: {analysisId: '1755810251560', files: {…}}
upload-zone.tsx:355 📤 AVANT appel webhook n8n - Début de la requête
upload-zone.tsx:356 📤 FormData préparée, taille approximative: 6
upload-zone.tsx:360 🌐 Début de l'appel fetch au webhook n8n...

puis jai ca apres le retour du workflow:
🔢 Token Supabase à envoyer: PRÉSENT
upload-zone.tsx:457 🔢 Appel de l'API increment-counters...
upload-zone.tsx:458  POST http://localhost:3000/api/analysis/increment-counters 500 (Internal Server Error)
performAnalysis @ upload-zone.tsx:458Understand this error
upload-zone.tsx:466 🔢 Réponse de l'API increment-counters: {status: 500, statusText: 'Internal Server Error', ok: false}
upload-zone.tsx:478 ❌ Erreur lors de l'incrémentation des compteurs Supabase: {status: 500, statusText: 'Internal Server Error', errorText: '{"error":"Erreur interne du serveur","details":"Unexpected end of JSON input"}'}
error @ intercept-console-error.js:50
performAnalysis @ upload-zone.tsx:478Understand this error
upload-zone.tsx:490 🔢 === FIN INCRÉMENTATION RATE-LIMITING SUPABASE ===
upload-zone.tsx:493 🔄 Redirection dans 1.5 secondes...
upload-zone.tsx:514 🎯 === FIN DE L'ANALYSE ===
upload-zone.tsx:311 🎯 === FIN HANDLESUBMIT ===
upload-zone.tsx:495 🔄 Début de la redirection vers /recruiter-results/
upload-zone.tsx:498 ✅ Redirection initiée


Puis ca s'affiche avec ca:
[DEBUG] Affichage du loader - loading est true
page.tsx:428 🔄 [DEBUG] Affichage du loader - loading est true
page.tsx:199 🔍 [DEBUG] Données brutes du sessionStorage: {"data":[{"full-name":"ANNE MOREAU","email":"help@enhancv.com","location":"Bordeaux, FR","education-level":"Master en Finance","years-of-experience":12,"salary-expectation":null,"verdict":"Bon profil. Anne affiche une solide expérience de plus de 12 ans en analyse financière et contrôle de gestion, maîtrisant parfaitement les processus budgétaires, SAP, Power BI, Excel avancé, et le business partnering. Son expertise technique et sa capacité à réduire les écarts budgétaires sont des atouts majeurs.","final-score":43,"analyse-financiere":2,"reporting-financier":2,"suivi-kpis":2,"preparation-rapports-financiers":2,"modelisation-financiere":2,"previsions-financieres":2,"evaluation-projets-investissement":1,"cloture-mensuelle":2,"pilotage-cycle-budgetaire":2,"suivi-budgets-sg&a-opex":2,"business-partnering-financier":2,"analyse-ecarts":2,"recommandations-strategiques":2,"optimisation-structure-couts":2,"amelioration-outils-process-financiers":2,"automatisation-processus-financiers":2,"utilisation-outils-bi":2,"maitrise-microsoft-excel":2,"maitrise-vba-macros":1,"maitrise-erp-sap":2,"maitrise-power-bi":2,"connaissance-bloomberg":0,"francais-courant":2,"anglais-professionnel":1},{"full-name":"Paul MARTIN","email":"paul.martin@email.com","location":"Lyon, France","education-level":"Master en Finance","years-of-experience":6,"salary-expectation":null,"verdict":"Bon profil. Paul possède une expérience pertinente en analyse financière senior, avec de solides compétences en modélisation financière, Excel avancé (VBA/Macros), et Bloomberg. Son parcours en banques et cabinet de conseil montre un bon niveau en business partnering et recommandations stratégiques.","final-score":32,"analyse-financiere":2,"reporting-financier":2,"suivi-kpis":1,"preparation-rapports-financiers":2,"modelisation-financiere":2,"previsions-financieres":2,"evaluation-projets-investissement":1,"cloture-mensuelle":0,"pilotage-cycle-budgetaire":1,"suivi-budgets-sg&a-opex":0,"business-partnering-financier":2,"analyse-ecarts":1,"recommandations-strategiques":2,"optimisation-structure-couts":2,"amelioration-outils-process-financiers":0,"automatisation-processus-financiers":0,"utilisation-outils-bi":1,"maitrise-microsoft-excel":2,"maitrise-vba-macros":2,"maitrise-erp-sap":1,"maitrise-power-bi":0,"connaissance-bloomberg":2,"francais-courant":2,"anglais-professionnel":2}]}
page.tsx:200 🔍 [DEBUG] Type: string
page.tsx:201 🔍 [DEBUG] Longueur: 2366
page.tsx:208 📊 [DEBUG] Données parsées du webhook: {data: Array(2)}
page.tsx:209 📊 [DEBUG] Type des données: object
page.tsx:210 📊 [DEBUG] Est-ce un array? false
page.tsx:238 🔍 [DEBUG] Recherche de candidats dans l'objet...
page.tsx:239 🔍 [DEBUG] Propriétés disponibles: ['data']
page.tsx:240 🔍 [DEBUG] Structure complète de l'objet: {
  "data": [
    {
      "full-name": "ANNE MOREAU",
      "email": "help@enhancv.com",
      "location": "Bordeaux, FR",
      "education-level": "Master en Finance",
      "years-of-experience": 12,
      "salary-expectation": null,
      "verdict": "Bon profil. Anne affiche une solide expérience de plus de 12 ans en analyse financière et contrôle de gestion, maîtrisant parfaitement les processus budgétaires, SAP, Power BI, Excel avancé, et le business partnering. Son expertise technique et sa capacité à réduire les écarts budgétaires sont des atouts majeurs.",
      "final-score": 43,
      "analyse-financiere": 2,
      "reporting-financier": 2,
      "suivi-kpis": 2,
      "preparation-rapports-financiers": 2,
      "modelisation-financiere": 2,
      "previsions-financieres": 2,
      "evaluation-projets-investissement": 1,
      "cloture-mensuelle": 2,
      "pilotage-cycle-budgetaire": 2,
      "suivi-budgets-sg&a-opex": 2,
      "business-partnering-financier": 2,
      "analyse-ecarts": 2,
      "recommandations-strategiques": 2,
      "optimisation-structure-couts": 2,
      "amelioration-outils-process-financiers": 2,
      "automatisation-processus-financiers": 2,
      "utilisation-outils-bi": 2,
      "maitrise-microsoft-excel": 2,
      "maitrise-vba-macros": 1,
      "maitrise-erp-sap": 2,
      "maitrise-power-bi": 2,
      "connaissance-bloomberg": 0,
      "francais-courant": 2,
      "anglais-professionnel": 1
    },
    {
      "full-name": "Paul MARTIN",
      "email": "paul.martin@email.com",
      "location": "Lyon, France",
      "education-level": "Master en Finance",
      "years-of-experience": 6,
      "salary-expectation": null,
      "verdict": "Bon profil. Paul possède une expérience pertinente en analyse financière senior, avec de solides compétences en modélisation financière, Excel avancé (VBA/Macros), et Bloomberg. Son parcours en banques et cabinet de conseil montre un bon niveau en business partnering et recommandations stratégiques.",
      "final-score": 32,
      "analyse-financiere": 2,
      "reporting-financier": 2,
      "suivi-kpis": 1,
      "preparation-rapports-financiers": 2,
      "modelisation-financiere": 2,
      "previsions-financieres": 2,
      "evaluation-projets-investissement": 1,
      "cloture-mensuelle": 0,
      "pilotage-cycle-budgetaire": 1,
      "suivi-budgets-sg&a-opex": 0,
      "business-partnering-financier": 2,
      "analyse-ecarts": 1,
      "recommandations-strategiques": 2,
      "optimisation-structure-couts": 2,
      "amelioration-outils-process-financiers": 0,
      "automatisation-processus-financiers": 0,
      "utilisation-outils-bi": 1,
      "maitrise-microsoft-excel": 2,
      "maitrise-vba-macros": 2,
      "maitrise-erp-sap": 1,
      "maitrise-power-bi": 0,
      "connaissance-bloomberg": 2,
      "francais-courant": 2,
      "anglais-professionnel": 2
    }
  ]
}
page.tsx:256 🔍 [DEBUG] Objet détecté mais pas de propriétés candidat, recherche dans les propriétés...
page.tsx:264 ✅ [DEBUG] Candidats trouvés dans la propriété 'data': 2
page.tsx:306 📊 [DEBUG] Array final de candidats: (2) [{…}, {…}]
page.tsx:307 📊 [DEBUG] Nombre de candidats: 2
page.tsx:316 🔄 [DEBUG] Limitation à 10 candidats: 2 -> 2
page.tsx:319 🔄 [DEBUG] Début du mapping des candidats...
page.tsx:321 🔄 [DEBUG] Mapping candidat 1: {full-name: 'ANNE MOREAU', email: 'help@enhancv.com', location: 'Bordeaux, FR', education-level: 'Master en Finance', years-of-experience: 12, …}
page.tsx:326 🔄 [DEBUG] Candidat mappé: {full-name: 'ANNE MOREAU', email: 'help@enhancv.com', location: 'Bordeaux, FR', education-level: 'Master en Finance', years-of-experience: 12, …}
page.tsx:321 🔄 [DEBUG] Mapping candidat 2: {full-name: 'Paul MARTIN', email: 'paul.martin@email.com', location: 'Lyon, France', education-level: 'Master en Finance', years-of-experience: 6, …}
page.tsx:326 🔄 [DEBUG] Candidat mappé: {full-name: 'Paul MARTIN', email: 'paul.martin@email.com', location: 'Lyon, France', education-level: 'Master en Finance', years-of-experience: 6, …}
page.tsx:330 ✅ [DEBUG] Tous les candidats mappés: (2) [{…}, {…}]
page.tsx:466 🎨 [DEBUG] Rendu du composant principal
page.tsx:467 🎨 [DEBUG] Nombre de candidats à afficher: 2
page.tsx:468 🎨 [DEBUG] Liste des candidats: (2) [{…}, {…}]
page.tsx:466 🎨 [DEBUG] Rendu du composant principal
page.tsx:467 🎨 [DEBUG] Nombre de candidats à afficher: 2
page.tsx:468 🎨 [DEBUG] Liste des candidats: (2) [{…}, {…}]


je fais la 2e analyse voir:
🚦 === VÉRIFICATION RATE-LIMITING SUPABASE ===
upload-zone.tsx:244 🚦 Appel de /api/analysis/check-limits...
upload-zone.tsx:255 🚦 Réponse check-limits reçue: {status: 200, statusText: 'OK', ok: true}
upload-zone.tsx:262 🚦 Données check-limits parsées: {allowed: true, remaining: 3, current: 0, max: 3, resetTime: 1755813600000, …}
upload-zone.tsx:288 ✅ Rate limit OK - procéder à l'analyse
upload-zone.tsx:289 ✅ Limites actuelles: {current: 0, max: 3, type: undefined}
upload-zone.tsx:296 🚀 Appel de performAnalysis avec le token...
upload-zone.tsx:315 🎯 === DÉBUT DE L'ANALYSE ===
upload-zone.tsx:316 🎯 authToken disponible: true
upload-zone.tsx:317 🎯 authToken longueur: 132
upload-zone.tsx:339 🚀 Envoi des données vers le proxy API: {analysisId: '1755810409592', files: {…}}
upload-zone.tsx:355 📤 AVANT appel webhook n8n - Début de la requête
upload-zone.tsx:356 📤 FormData préparée, taille approximative: 6
upload-zone.tsx:360 🌐 Début de l'appel fetch au webhook n8n...

puis au retour:
encore:

upload-zone.tsx:453 🔢 Token Supabase à envoyer: PRÉSENT
upload-zone.tsx:457 🔢 Appel de l'API increment-counters...
upload-zone.tsx:458  POST http://localhost:3000/api/analysis/increment-counters 500 (Internal Server Error)
performAnalysis @ upload-zone.tsx:458Understand this error
upload-zone.tsx:466 🔢 Réponse de l'API increment-counters: {status: 500, statusText: 'Internal Server Error', ok: false}
upload-zone.tsx:478 ❌ Erreur lors de l'incrémentation des compteurs Supabase: {status: 500, statusText: 'Internal Server Error', errorText: '{"error":"Erreur interne du serveur","details":"Unexpected end of JSON input"}'}
error @ intercept-console-error.js:50
performAnalysis @ upload-zone.tsx:478Understand this error
upload-zone.tsx:490 🔢 === FIN INCRÉMENTATION RATE-LIMITING SUPABASE ===
upload-zone.tsx:493 🔄 Redirection dans 1.5 secondes...
upload-zone.tsx:514 🎯 === FIN DE L'ANALYSE ===
upload-zone.tsx:311 🎯 === FIN HANDLESUBMIT ===
upload-zone.tsx:495 🔄 Début de la redirection vers /recruiter-results/
upload-zone.tsx:498 ✅ Redirection initiée

Puis affichage des datas dans page result.
3e analyse, je passe, pas de popup!