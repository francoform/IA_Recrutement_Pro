'use client'

import React, { useState, useRef } from 'react'
import { Upload, FileText, Trash2, AlertTriangle, CheckCircle, Briefcase, Heart, User, Clock, Zap } from 'lucide-react'

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

  const handleSubmit = async () => {
    if (!canAnalyze()) return
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
      const formData = new FormData()
      
      // Ajouter tous les fichiers
      files.jobDescription.forEach(f => formData.append("file", f))
      files.cvs.forEach(f => formData.append("file", f))
      files.motivationLetters.forEach(f => formData.append("file", f))

      const res = await fetch(
        "https://n8nify.francoform.com/webhook/690fb674-2054-44c2-8805-5bb30c6091fa",
        { 
          method: "POST", 
          body: formData,
          mode: 'cors'
        }
      )
      
      if (!res.ok) throw new Error("Erreur d'analyse")

      // Finaliser le progrès
      clearInterval(progressInterval)
      setAnalysisProgress(100)
      
      // Attendre un peu pour montrer 100% puis rediriger
      setTimeout(() => {
        // Stocker les résultats dans sessionStorage pour éviter les problèmes CORS
        const analysisId = Date.now().toString()
        sessionStorage.setItem('analysisId', analysisId)
        window.location.href = "/recruiter-results"
      }, 1500)
      
    } catch (err) {
      console.error(err)
      clearInterval(progressInterval)
      setShowLoadingPopup(false)
      alert("Échec de l'analyse. Veuillez réessayer.")
    } finally {
      setIsUploading(false)
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
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
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
            <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-6">
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

            <div className="grid md:grid-cols-2 gap-6">
              {/* Zone CV - Couleur Bleue */}
              <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6">
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
              <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-6">
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
          </div>
        </div>
      </div>

      {/* Popup de chargement glassmorphism */}
      {showLoadingPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
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
    </section>
  )
}