'use client'

import React, { useState, useRef } from 'react'
import { Upload, FileText, Trash2, User, Heart, Briefcase, Zap, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { EmailVerificationPopup } from '@/components/auth/email-verification-popup'
// Services Supabase importés mais utilisés indirectement via les APIs

interface FileValidationResult {
  isValid: boolean
  errors: string[]
}

interface FilesByType {
  jobDescription: File[]
  motivationLetters: File[]
  cvs: File[]
}

export function UploadZone() {
  const [files, setFiles] = useState<FilesByType>({
    jobDescription: [],
    motivationLetters: [],
    cvs: []
  })
  const [isUploading, setIsUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [dragOverZone, setDragOverZone] = useState<string | null>(null)
  const [showLoadingPopup, setShowLoadingPopup] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [showRateLimitPopup, setShowRateLimitPopup] = useState(false)
  const [rateLimitMessage, setRateLimitMessage] = useState('')
  const [rateLimitType, setRateLimitType] = useState<'hourly' | 'daily'>('hourly')

  // Vérification des doublons
  const checkForDuplicates = (newFiles: File[], existingFiles: File[], type: keyof FilesByType): string[] => {
    const errors: string[] = []
    
    // Vérifier les doublons dans les nouveaux fichiers
    const newFileNames = newFiles.map(f => f.name.toLowerCase())
    const duplicatesInNew = newFileNames.filter((name, index) => newFileNames.indexOf(name) !== index)
    if (duplicatesInNew.length > 0) {
      errors.push(`Fichiers dupliqués détectés : ${[...new Set(duplicatesInNew)].join(', ')}`)
    }
    
    // Vérifier les doublons avec les fichiers existants
    const existingFileNames = existingFiles.map(f => f.name.toLowerCase())
    const duplicatesWithExisting = newFiles.filter(newFile => 
      existingFileNames.includes(newFile.name.toLowerCase())
    )
    if (duplicatesWithExisting.length > 0) {
      errors.push(`Fichiers déjà uploadés : ${duplicatesWithExisting.map(f => f.name).join(', ')}`)
    }
    
    // Limite pour la fiche de poste
    if (type === 'jobDescription' && existingFiles.length > 0) {
      errors.push('Une seule fiche de poste est autorisée')
    }
    
    return errors
  }

  // Validation des fichiers
  const validateFile = (file: File): FileValidationResult => {
    const errors: string[] = []
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt']
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    // Vérification de l'extension
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!allowedTypes.includes(fileExtension)) {
      errors.push(`${file.name}: Type de fichier non autorisé (${fileExtension})`)
    }
    
    // Vérification de la taille
    if (file.size > maxSize) {
      errors.push(`${file.name}: Fichier trop volumineux (max 10MB)`)
    }
    
    // Vérification du nom de fichier (pas de caractères suspects)
    const suspiciousChars = /[<>:"|?*\\]/
    if (suspiciousChars.test(file.name)) {
      errors.push(`${file.name}: Nom de fichier contient des caractères non autorisés`)
    }
    
    // Vérification basique du contenu pour les fichiers texte
    if (fileExtension === '.txt' && file.size < 50) {
      errors.push(`${file.name}: Fichier texte trop petit, probablement corrompu`)
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  const validateFiles = (fileList: File[]): { validFiles: File[], allErrors: string[] } => {
    const validFiles: File[] = []
    const allErrors: string[] = []
    
    fileList.forEach(file => {
      const validation = validateFile(file)
      if (validation.isValid) {
        validFiles.push(file)
      } else {
        allErrors.push(...validation.errors)
      }
    })
    
    return { validFiles, allErrors }
  }

  const processFiles = (newFiles: File[], type: keyof FilesByType) => {
    // Vérifier les doublons d'abord
    const duplicateErrors = checkForDuplicates(newFiles, files[type], type)
    
    // Si il y a des doublons, on arrête le processus
    if (duplicateErrors.length > 0) {
      setValidationErrors(duplicateErrors)
      setShowErrorPopup(true)
      return
    }
    
    const { validFiles, allErrors } = validateFiles(newFiles)
    
    if (allErrors.length > 0) {
      setValidationErrors(allErrors)
      setShowErrorPopup(true)
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => ({
        ...prev,
        [type]: type === 'jobDescription' ? validFiles : [...prev[type], ...validFiles]
      }))
    }
  }

  // Gestion du glisser-déposer
  const handleDragOver = (e: React.DragEvent, zone: string) => {
    e.preventDefault()
    setDragOverZone(zone)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOverZone(null)
  }

  const handleDrop = (e: React.DragEvent, type: keyof FilesByType) => {
    e.preventDefault()
    setDragOverZone(null)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles, type)
  }

  const removeFile = (type: keyof FilesByType, indexToRemove: number) => {
    setFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, index) => index !== indexToRemove)
    }))
  }

  const clearAllFiles = (type: keyof FilesByType) => {
    setFiles(prev => ({
      ...prev,
      [type]: []
    }))
  }

  // Calcul du nombre de candidats
  const calculateCandidates = () => {
    const cvCount = files.cvs.length
    const letterCount = files.motivationLetters.length
    return Math.min(cvCount, letterCount)
  }

  // Vérification de la cohérence des fichiers
  const getValidationMessage = () => {
    const candidateCount = calculateCandidates()
    const cvCount = files.cvs.length
    const letterCount = files.motivationLetters.length
    const jobDescCount = files.jobDescription.length

    if (jobDescCount === 0) return "⚠️ Fiche de poste manquante"
    if (jobDescCount > 1) return "⚠️ Une seule fiche de poste autorisée"
    if (cvCount !== letterCount) return `⚠️ Nombre de CV (${cvCount}) et lettres (${letterCount}) différent`
    if (candidateCount === 0) return "Aucun candidat détecté"
    return `✅ ${candidateCount} candidat${candidateCount > 1 ? 's' : ''} détecté${candidateCount > 1 ? 's' : ''}`
  }

  const canAnalyze = () => {
    return files.jobDescription.length === 1 && 
           files.cvs.length > 0 && 
           files.motivationLetters.length > 0 && 
           files.cvs.length === files.motivationLetters.length
  }

  // Fonction utilitaire pour récupérer le token Supabase depuis les cookies
  const getAuthToken = () => {
    console.log('🔍 [DEBUG] Vérification de la session Supabase...')
    console.log('🍪 Tous les cookies disponibles:', document.cookie)
    
    const cookies = document.cookie.split(';')
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('supabase-session='))
    console.log('🍪 Cookie supabase-session trouvé:', authCookie)
    
    if (!authCookie) {
      console.log('❌ Aucun cookie supabase-session trouvé - session expirée ou perdue')
      return null
    }
    
    const token = decodeURIComponent(authCookie.split('=')[1].trim())
    console.log('🔑 Token Supabase extrait:', token ? `${token.substring(0, 20)}...` : 'null')
    
    return token
  }

  const handleSubmit = async () => {
    console.log('🎯 === DÉBUT HANDLESUBMIT ===');
    console.log('🎯 canAnalyze():', canAnalyze());
    
    if (!canAnalyze()) {
      console.log('❌ canAnalyze() retourne false - arrêt');
      return;
    }
    
    try {
      console.log('🔑 === RÉCUPÉRATION TOKEN ===');
      // Récupérer le token d'authentification
      const token = getAuthToken();
      console.log('🔑 Token récupéré:', token ? 'PRÉSENT' : 'ABSENT');
      console.log('🔑 Longueur du token:', token?.length || 0);
      
      if (!token) {
        console.log('❌ Pas de token - affichage vérification email');
        setShowEmailVerification(true);
        return;
      }

      console.log('🚦 === VÉRIFICATION RATE-LIMITING SUPABASE ===');
      console.log('🚦 Appel de /api/analysis/check-limits...');
      
      // Vérifier directement les limites avec le token Supabase
      const limitsResponse = await fetch('/api/analysis/check-limits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      
      console.log('🚦 Réponse check-limits reçue:', {
        status: limitsResponse.status,
        statusText: limitsResponse.statusText,
        ok: limitsResponse.ok
      })
      
      const limitsResult = await limitsResponse.json()
      console.log('🚦 Données check-limits parsées:', limitsResult)
      
      // Si le token est invalide, l'API retournera une erreur 401
      if (limitsResponse.status === 401) {
        console.log('❌ Token Supabase invalide (401) - affichage vérification email')
        setShowEmailVerification(true)
        return
      }
      
      if (!limitsResult.allowed) {
        console.log('🚫 Rate limit atteint - affichage popup')
        console.log('🚫 Détails rate limit:', {
          current: limitsResult.current,
          max: limitsResult.max,
          type: limitsResult.type
        })
        
        // Rate limit atteint, afficher la popup
        const message = `Vous avez effectué ${limitsResult.current}/${limitsResult.max} analyses autorisées aujourd'hui.\n\nVotre quota sera réinitialisé demain à minuit.`
        
        setRateLimitMessage(message)
        setRateLimitType('daily')
        setShowRateLimitPopup(true)
        return
      }
      
      console.log('✅ Rate limit OK - procéder à l\'analyse');
      console.log('✅ Limites actuelles:', {
        current: limitsResult.current,
        max: limitsResult.max,
        type: limitsResult.type
      });
      
      // Token valide et pas de rate limiting, procéder à l'analyse
      console.log('🚀 Appel de performAnalysis avec le token...');
      await performAnalysis(token);
      
    } catch (error) {
      console.error('💥 === EXCEPTION DANS HANDLESUBMIT ===');
      console.error('💥 Type d\'erreur:', typeof error);
      console.error('💥 Message d\'erreur:', error instanceof Error ? error.message : String(error));
      console.error('💥 Stack trace:', error instanceof Error ? error.stack : 'Pas de stack trace');
      console.error('💥 Erreur complète:', error);
      
      // En cas d'erreur, déclencher la vérification email par sécurité
      console.log('🔄 Affichage vérification email par sécurité');
      setShowEmailVerification(true);
    }
    
    console.log('🎯 === FIN HANDLESUBMIT ===');
  }

  const performAnalysis = async (authToken: string) => {
    console.log('🎯 === DÉBUT DE L\'ANALYSE ===');
    console.log('🎯 authToken disponible:', !!authToken);
    console.log('🎯 authToken longueur:', authToken?.length || 0);
    
    setIsUploading(true)
    setShowLoadingPopup(true)
    setAnalysisProgress(0)

    // Simulation du progrès d'analyse
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 1000)

    try {
      // 1) Créer l'ID AVANT le FormData
      const analysisId = Date.now().toString();
      sessionStorage.setItem('analysisId', analysisId);

      console.log('🚀 Envoi des données vers le proxy API:', {
         analysisId,
         files: {
           jobDescription: files.jobDescription.map(f => f.name),
           cvs: files.cvs.map(f => f.name),
           motivationLetters: files.motivationLetters.map(f => f.name)
         }
       });

      // 2) Construire le FormData complet
      const formData = new FormData();
      formData.append('analysisId', analysisId);
      files.jobDescription.forEach(f => formData.append('file', f));
      files.cvs.forEach(f => formData.append('file', f));
      files.motivationLetters.forEach(f => formData.append('file', f));

      console.log('📤 AVANT appel webhook n8n - Début de la requête');
      console.log('📤 FormData préparée, taille approximative:', formData.entries ? Array.from(formData.entries()).length : 'inconnu');
      
      let res;
      try {
        console.log('🌐 Début de l\'appel fetch au webhook n8n...');
        
        // 3) Appeler directement le webhook n8n
        res = await fetch('https://n8nify.francoform.com/webhook/690fb674-2054-44c2-8805-5bb30c6091fa', {
          method: 'POST',
          body: formData,
          mode: 'cors'
        });
        
        console.log('✅ Fetch terminé avec succès');
        console.log('📡 APRÈS appel webhook n8n - Réponse reçue:', {
          status: res.status,
          statusText: res.statusText,
          ok: res.ok,
          headers: Object.fromEntries(res.headers.entries())
        });
        
      } catch (fetchError) {
        console.error('❌ ERREUR lors du fetch webhook n8n:', fetchError);
        console.error('❌ Type d\'erreur:', fetchError instanceof Error ? fetchError.constructor.name : typeof fetchError);
        console.error('❌ Message d\'erreur:', fetchError instanceof Error ? fetchError.message : String(fetchError));
        console.error('❌ Stack trace:', fetchError instanceof Error ? fetchError.stack : 'Pas de stack trace');
        throw fetchError;
      }

      if (!res.ok) {
        console.log('❌ Webhook n8n a échoué - Status non OK');
        console.log('❌ Tentative de lecture du corps de l\'erreur...');
        
        let errorData;
        try {
          errorData = await res.json();
          console.log('❌ Corps de l\'erreur parsé:', errorData);
        } catch (jsonError) {
          console.error('❌ Impossible de parser le JSON d\'erreur:', jsonError);
          errorData = { error: 'Erreur inconnue' };
        }
        
        throw new Error(errorData.error || `Erreur HTTP du webhook: ${res.status} ${res.statusText}`);
      }

      console.log('✅ Webhook n8n réussi - Parsing de la réponse JSON...');
      
      let resultsData;
      try {
        console.log('🔄 Début du parsing JSON de la réponse...');
        resultsData = await res.json();
        console.log('✅ JSON parsé avec succès');
      } catch (jsonParseError) {
        console.error('❌ ERREUR lors du parsing JSON:', jsonParseError);
        console.error('❌ Type d\'erreur JSON:', jsonParseError instanceof Error ? jsonParseError.constructor.name : typeof jsonParseError);
        console.error('❌ Message d\'erreur JSON:', jsonParseError instanceof Error ? jsonParseError.message : String(jsonParseError));
        throw new Error('Impossible de parser la réponse JSON du webhook');
      }
      console.log('✅ Données reçues du webhook n8n:', resultsData);
      console.log('📊 Type des données:', typeof resultsData);
      console.log('📊 Est-ce un array?', Array.isArray(resultsData));
      console.log('📊 Nombre d\'éléments si array:', Array.isArray(resultsData) ? resultsData.length : 'N/A');
      console.log('📊 Clés de l\'objet si objet:', typeof resultsData === 'object' && !Array.isArray(resultsData) ? Object.keys(resultsData) : 'N/A');
      
      console.log('🎯 Finalisation du progrès...');
      // Finaliser le progrès
      clearInterval(progressInterval)
      setAnalysisProgress(100)
      console.log('✅ Progrès finalisé à 100%');
      
      console.log('💾 STOCKAGE - Début du stockage des résultats...');
      
      try {
        // Stocker les résultats JSON dans sessionStorage avec logs détaillés
        console.log('🔄 Conversion des données en JSON...');
        const dataToStore = JSON.stringify(resultsData);
        console.log('✅ JSON stringifié, longueur:', dataToStore.length);
        
        console.log('🔄 Stockage dans sessionStorage...');
        sessionStorage.setItem('analysisResults', dataToStore);
        console.log('✅ Données stockées dans sessionStorage');
        
        // Vérifier que les données ont bien été stockées
        console.log('🔄 Vérification du stockage...');
        const storedData = sessionStorage.getItem('analysisResults');
        console.log('✅ Vérification stockage - données récupérées:', storedData ? 'OK' : 'ERREUR');
        console.log('✅ Longueur des données stockées:', storedData?.length || 0);
        
      } catch (storageError) {
        console.error('❌ ERREUR lors du stockage:', storageError);
        console.error('❌ Type d\'erreur stockage:', storageError instanceof Error ? storageError.constructor.name : typeof storageError);
        console.error('❌ Message d\'erreur stockage:', storageError instanceof Error ? storageError.message : String(storageError));
        // Continuer malgré l'erreur de stockage
      }
      
      console.log('🔢 === DÉBUT INCRÉMENTATION RATE-LIMITING SUPABASE ===');
      console.log('🔢 Tentative d\'incrémentation des compteurs...');
      console.log('🔢 Token Supabase à envoyer:', authToken ? 'PRÉSENT' : 'ABSENT')
      
      // Incrémenter les compteurs de rate-limiting après succès de l'analyse
      try {
        console.log('🔢 Appel de l\'API increment-counters...')
        const incrementResponse = await fetch('/api/analysis/increment-counters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: authToken }),
        })
        
        console.log('🔢 Réponse de l\'API increment-counters:', {
          status: incrementResponse.status,
          statusText: incrementResponse.statusText,
          ok: incrementResponse.ok
        })
        
        if (incrementResponse.ok) {
          const incrementResult = await incrementResponse.json().catch(() => null)
          console.log('✅ Compteurs Supabase incrémentés avec succès')
          console.log('✅ Réponse complète de l\'API:', incrementResult)
        } else {
          const errorText = await incrementResponse.text().catch(() => 'Impossible de lire l\'erreur')
          console.error('❌ Erreur lors de l\'incrémentation des compteurs Supabase:', {
            status: incrementResponse.status,
            statusText: incrementResponse.statusText,
            errorText
          })
        }
      } catch (incrementError) {
        console.error('❌ Exception lors de l\'appel d\'incrémentation Supabase:', incrementError)
        console.error('❌ Stack trace:', incrementError instanceof Error ? incrementError.stack : 'Pas de stack trace')
        // Ne pas bloquer la suite même si l'incrémentation échoue
      }
      
      console.log('🔢 === FIN INCRÉMENTATION RATE-LIMITING SUPABASE ===');
      
      // Attendre un peu pour montrer 100% puis rediriger
      console.log('🔄 Redirection dans 1.5 secondes...');
      setTimeout(() => {
        console.log('🔄 Début de la redirection vers /recruiter-results/');
        try {
          window.location.replace("/recruiter-results/")
          console.log('✅ Redirection initiée');
        } catch (redirectError) {
          console.error('❌ ERREUR lors de la redirection:', redirectError);
        }
      }, 1500)
      
    } catch (err) {
      console.error('💥 ERREUR GLOBALE lors de l\'analyse:', err)
      console.error('💥 Stack trace:', err instanceof Error ? err.stack : 'Pas de stack trace')
      clearInterval(progressInterval)
      setShowLoadingPopup(false)
      
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      alert(`Échec de l'analyse: ${errorMessage}\n\nVeuillez réessayer.`);
    } finally {
      setIsUploading(false)
      console.log('🎯 === FIN DE L\'ANALYSE ===');
    }
  }

  const FileUploadZone = ({ 
    type, 
    title, 
    description, 
    icon: Icon, 
    accept, 
    multiple = true,
    colorScheme
  }: {
    type: keyof FilesByType
    title: string
    description: string
    icon: React.ElementType
    accept: string
    multiple?: boolean
    colorScheme: {
      primary: string
      secondary: string
      bg: string
      border: string
      hover: string
    }
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleBrowseClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    
    return (
      <div className="mb-6">
        <h3 className={`text-lg font-medium mb-3 flex items-center ${colorScheme.primary}`}>
          <Icon className={`w-5 h-5 mr-2 ${colorScheme.primary}`} />
          {title}
        </h3>
        
        <div 
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
            dragOverZone === type
              ? `${colorScheme.border} ${colorScheme.bg}` 
              : `border-gray-600 ${colorScheme.hover}`
          }`}
          onDragOver={(e) => handleDragOver(e, type)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, type)}
        >
          <Upload className={`w-8 h-8 mx-auto mb-3 transition-colors duration-300 ${
            dragOverZone === type ? colorScheme.primary : 'text-gray-400'
          }`} />
          
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || [])
              processFiles(selectedFiles, type)
              // Réinitialiser l'input pour permettre la sélection du même fichier
              e.target.value = ''
            }}
            className="hidden"
          />
          
          <div className="text-sm font-medium mb-2">{description}</div>
          <button
            type="button"
            onClick={handleBrowseClick}
            className={`${colorScheme.secondary} text-white px-4 py-2 rounded-lg inline-block hover:shadow-lg transition-all duration-300 text-sm cursor-pointer`}
          >
            Parcourir
          </button>
        </div>

      {files[type].length > 0 && (
        <div className="mt-4">
          <div className="space-y-2">
            {files[type].map((file, index) => (
              <div key={index} className={`flex items-center ${colorScheme.bg} rounded-lg p-3 group border ${colorScheme.border}`}>
                <FileText className={`w-4 h-4 ${colorScheme.primary} mr-3 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm block truncate">{file.name}</span>
                </div>
                <span className="text-xs text-gray-400 mx-3 flex-shrink-0">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <button
                  onClick={() => removeFile(type, index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1 rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
                  title="Supprimer ce fichier"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          {files[type].length > 0 && (
            <div className="mt-2 text-center">
              <button
                onClick={() => clearAllFiles(type)}
                className="text-red-400 hover:text-red-300 text-xs underline"
              >
                Supprimer tous
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
  }

  // Schémas de couleurs pour chaque section
  const colorSchemes = {
    jobDescription: {
      primary: 'text-amber-400',
      secondary: 'bg-gradient-to-r from-amber-500 to-orange-500',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400',
      hover: 'hover:border-amber-400'
    },
    cvs: {
      primary: 'text-blue-400',
      secondary: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400',
      hover: 'hover:border-blue-400'
    },
    motivationLetters: {
      primary: 'text-emerald-400',
      secondary: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400',
      hover: 'hover:border-emerald-400'
    }
  }

  return (
    <section className="w-full px-0 py-0 md:container md:mx-auto md:px-6">
      <div className="max-w-4xl mx-auto px-1 md:px-0">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-8 border border-white/10 mx-1 md:mx-0">
          <h2 className="text-2xl font-semibold mb-6 text-center">Uploadez vos fichiers de recrutement</h2>
          
          {/* Instructions */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 mb-8">
            <h3 className="font-medium text-blue-200 mb-2">📋 Instructions importantes :</h3>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• <strong>Nommage des fichiers :</strong> Incluez le nom et prénom du candidat dans le nom des fichiers (ex: &quot;CV_Jean_Dupont.pdf&quot;, &quot;LM_Jean_Dupont.txt&quot;)</li>
              <li>• <strong>Un candidat = 1 CV + 1 lettre de motivation</strong></li>
              <li>• <strong>Une seule fiche de poste</strong> pour l&apos;ensemble des candidatures</li>
              <li>• <strong>Pas de doublons :</strong> Chaque fichier doit être unique</li>
              <li>• Formats acceptés : PDF, DOC, DOCX, TXT (max 10MB par fichier)</li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* Zone fiche de poste - Couleur Ambre/Orange */}
            <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-4 md:p-6">
              <FileUploadZone
                type="jobDescription"
                title=" Fiche de poste"
                description="Glissez-déposez ou sélectionnez LA fiche de poste (1 seul fichier)"
                icon={Briefcase}
                accept=".pdf,.doc,.docx,.txt"
                multiple={false}
                colorScheme={colorSchemes.jobDescription}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Zone CV - Couleur Bleue */}
              <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 md:p-6">
                <FileUploadZone
                  type="cvs"
                  title=" CV des candidats"
                  description="Glissez-déposez ou sélectionnez les CV (pas de doublons)"
                  icon={User}
                  accept=".pdf,.doc,.docx"
                  colorScheme={colorSchemes.cvs}
                />
              </div>

              {/* Zone lettres de motivation - Couleur Verte */}
              <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 md:p-6">
                <FileUploadZone
                  type="motivationLetters"
                  title=" Lettres de motivation"
                  description="Glissez-déposez ou sélectionnez les lettres (pas de doublons)"
                  icon={Heart}
                  accept=".pdf,.doc,.docx,.txt"
                  colorScheme={colorSchemes.motivationLetters}
                />
              </div>
            </div>
          </div>

          {/* Résumé et validation */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl">
            <div className="text-center mb-4">
              <div className="text-lg font-medium">{getValidationMessage()}</div>
              <div className="text-sm text-gray-400 mt-1">
                Fiche de poste: {files.jobDescription.length} | 
                CV: {files.cvs.length} | 
                Lettres: {files.motivationLetters.length}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canAnalyze() || isUploading}
              className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyse en cours...
                </div>
              ) : (
                `Analyser ${calculateCandidates()} candidat${calculateCandidates() > 1 ? 's' : ''}`
              )}
            </button>

            {/* Popup de vérification email */}
            <EmailVerificationPopup
              isOpen={showEmailVerification}
              onClose={() => setShowEmailVerification(false)}
              onVerificationSuccess={() => {
                setShowEmailVerification(false)
                window.location.href = '/services/ia'
              }}
            />
          </div>
        </div>
      </div>

      {/* Popup de chargement glassmorphism */}
      {showLoadingPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              {/* Icône animée */}
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-cyan-400 animate-bounce" />
                </div>
              </div>
              
              {/* Titre */}
              <h3 className="text-xl font-semibold text-white mb-2">
                Analyse en cours...
              </h3>
              
              {/* Description */}
              <p className="text-slate-300 mb-6 text-sm">
                Notre IA analyse vos candidatures.
                <br />
                Cela peut prendre quelques minutes.
              </p>
              

              
              {/* Barre de progression */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Progression</span>
                  <span>{Math.round(analysisProgress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Étapes d'analyse */}
              <div className="space-y-2 text-left">
                <div className={`flex items-center text-sm ${
                  analysisProgress > 20 ? 'text-green-400' : 'text-slate-400'
                }`}>
                  <CheckCircle className={`w-4 h-4 mr-2 ${
                    analysisProgress > 20 ? 'text-green-400' : 'text-slate-600'
                  }`} />
                  Lecture des fichiers
                </div>
                <div className={`flex items-center text-sm ${
                  analysisProgress > 50 ? 'text-green-400' : 'text-slate-400'
                }`}>
                  <CheckCircle className={`w-4 h-4 mr-2 ${
                    analysisProgress > 50 ? 'text-green-400' : 'text-slate-600'
                  }`} />
                  Extraction des compétences
                </div>
                <div className={`flex items-center text-sm ${
                  analysisProgress > 80 ? 'text-green-400' : 'text-slate-400'
                }`}>
                  <CheckCircle className={`w-4 h-4 mr-2 ${
                    analysisProgress > 80 ? 'text-green-400' : 'text-slate-600'
                  }`} />
                  Calcul des scores
                </div>
                <div className={`flex items-center text-sm ${
                  analysisProgress >= 100 ? 'text-green-400' : 'text-slate-400'
                }`}>
                  <CheckCircle className={`w-4 h-4 mr-2 ${
                    analysisProgress >= 100 ? 'text-green-400' : 'text-slate-600'
                  }`} />
                  Génération du rapport
                </div>
              </div>
              
              {/* Message de patience */}
              <div className="mt-6 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-center justify-center text-blue-200 text-xs">
                  <Clock className="w-4 h-4 mr-2" />
                  Merci de patienter, ne fermez pas cette fenêtre
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'erreur de validation */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-red-900/90 backdrop-blur-lg border border-red-500 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
              <h3 className="text-lg font-semibold text-red-100">Fichiers non conformes</h3>
            </div>
            <p className="text-red-200 mb-4">
              Les fichiers suivants ne respectent pas les normes et ne pourront pas être traités par notre système :
            </p>
            <div className="bg-red-800/50 rounded-lg p-3 mb-4 max-h-40 overflow-y-auto">
              {validationErrors.map((error, index) => (
                <div key={index} className="text-sm text-red-100 mb-1">
                  • {error}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowErrorPopup(false)
                setValidationErrors([])
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-200"
            >
              Compris
            </button>
          </div>
        </div>
      )}

      {/* Popup de limitation de taux */}
      {showRateLimitPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-orange-900/90 backdrop-blur-lg border border-orange-500 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-orange-400 mr-3" />
              <h3 className="text-lg font-semibold text-orange-100">
                {rateLimitType === 'hourly' ? 'Limite horaire atteinte' : 'Limite quotidienne atteinte'}
              </h3>
            </div>
            <p className="text-orange-200 mb-4">
              {rateLimitMessage}
            </p>
            <div className="bg-orange-800/50 rounded-lg p-3 mb-4">
              <div className="text-sm text-orange-100">
                <strong>Limites actuelles :</strong>
                <br />• 5 analyses par heure par IP
                <br />• 3 analyses par jour par email vérifié
              </div>
            </div>
            <button
              onClick={() => setShowRateLimitPopup(false)}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors duration-200"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </section>
  )
}