// Fonction pour nettoyer tous les caches côté client
export function clearAllClientCaches() {
  try {
    // Nettoyer localStorage
    localStorage.clear()
    console.log('localStorage nettoyé')
    
    // Nettoyer sessionStorage
    sessionStorage.clear()
    console.log('sessionStorage nettoyé')
    
    // Nettoyer les cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    console.log('Cookies nettoyés')
    
    console.log('Tous les caches côté client ont été nettoyés')
    return true
  } catch (error) {
    console.error('Erreur lors du nettoyage des caches côté client:', error)
    return false
  }
}

// Fonction pour nettoyer complètement le système (client + serveur)
export async function clearCompleteSystem() {
  try {
    // Nettoyer côté client
    clearAllClientCaches()
    
    // Nettoyer côté serveur
    const response = await fetch('/api/admin/clear-cache', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      console.log('Système complètement nettoyé')
      return true
    } else {
      console.error('Erreur lors du nettoyage côté serveur')
      return false
    }
  } catch (error) {
    console.error('Erreur lors du nettoyage complet:', error)
    return false
  }
}