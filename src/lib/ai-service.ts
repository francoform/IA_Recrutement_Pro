export async function analyzeFiles(files: File[]) {
  const formData = new FormData()
  
  // Générer un ID unique pour cette analyse
  const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  // Ajouter l'ID d'analyse
  formData.append('analysisId', analysisId)
  
  // Ajouter tous les fichiers au FormData
  files.forEach((file, index) => {
    formData.append(`file_${index}`, file)
  })
  
  try {
    // Envoyer au webhook n8n POUR L'UPLOAD (différent de celui des résultats)
    const response = await fetch('https://n8nify.francoform.com/webhook/NOUVEAU_WEBHOOK_UPLOAD_ID', {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error(`Erreur webhook: ${response.status}`)
    }
    
    // Stocker l'ID d'analyse pour récupérer les résultats plus tard
    sessionStorage.setItem('analysisId', analysisId)
    
    const result = await response.json()
    return { ...result, analysisId }
  } catch (error) {
    console.error('Erreur envoi webhook:', error)
    throw error
  }
}