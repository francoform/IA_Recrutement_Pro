// Système de détection d'emails temporaires/jetables
// Utilise la liste disposable/disposable de GitHub

interface DisposableEmailCache {
  domains: Set<string>
  lastUpdated: number
  updateInProgress: boolean
}

// Cache en mémoire pour les domaines jetables
const cache: DisposableEmailCache = {
  domains: new Set(),
  lastUpdated: 0,
  updateInProgress: false
}

// Configuration
const CONFIG = {
  // URL de la liste disposable/disposable (domains.txt)
  DOMAINS_URL: 'https://raw.githubusercontent.com/disposable/disposable/master/domains.txt',
  // Durée de cache : 24 heures
  CACHE_DURATION: 24 * 60 * 60 * 1000,
  // Timeout pour la requête HTTP
  FETCH_TIMEOUT: 10000
}

// Domaines jetables connus (fallback si l'API est indisponible)
const FALLBACK_DOMAINS = new Set([
  '10minutemail.com',
  '0-mail.com',
  '0815.ru',
  '4warding.com',
  'guerrillamail.com',
  'mailinator.com',
  'tempmail.org',
  'yopmail.com',
  'throwaway.email',
  'temp-mail.org',
  'maildrop.cc',
  'sharklasers.com',
  'grr.la',
  'guerrillamailblock.com',
  'pokemail.net',
  'spam4.me',
  'bccto.me',
  'chacuo.net',
  'dispostable.com',
  'fakeinbox.com'
])

// Fonction pour télécharger la liste des domaines jetables
async function fetchDisposableDomains(): Promise<Set<string>> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT)
    
    const response = await fetch(CONFIG.DOMAINS_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'IA-Recrutement-Pro/1.0'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const text = await response.text()
    const domains = new Set(
      text
        .split('\n')
        .map(line => line.trim().toLowerCase())
        .filter(line => line && !line.startsWith('#'))
    )
    
    console.log(`[DisposableEmailDetector] Loaded ${domains.size} disposable domains`)
    return domains
    
  } catch (error) {
    console.warn('[DisposableEmailDetector] Failed to fetch domains:', error)
    return new Set()
  }
}

// Fonction pour mettre à jour le cache
async function updateCache(): Promise<void> {
  if (cache.updateInProgress) {
    return
  }
  
  cache.updateInProgress = true
  
  try {
    const domains = await fetchDisposableDomains()
    
    if (domains.size > 0) {
      cache.domains = domains
      cache.lastUpdated = Date.now()
      console.log(`[DisposableEmailDetector] Cache updated with ${domains.size} domains`)
    } else {
      console.warn('[DisposableEmailDetector] Using fallback domains')
      cache.domains = new Set(FALLBACK_DOMAINS)
      cache.lastUpdated = Date.now()
    }
  } catch (error) {
    console.error('[DisposableEmailDetector] Cache update failed:', error)
    // Utiliser les domaines de fallback si aucun cache n'existe
    if (cache.domains.size === 0) {
      cache.domains = new Set(FALLBACK_DOMAINS)
      cache.lastUpdated = Date.now()
    }
  } finally {
    cache.updateInProgress = false
  }
}

// Fonction pour vérifier si le cache doit être mis à jour
function shouldUpdateCache(): boolean {
  const now = Date.now()
  return (
    cache.domains.size === 0 || 
    (now - cache.lastUpdated) > CONFIG.CACHE_DURATION
  )
}

// Fonction principale pour vérifier si un email est jetable
export async function isDisposableEmail(email: string): Promise<boolean> {
  try {
    // Extraire le domaine de l'email
    const domain = email.toLowerCase().split('@')[1]
    if (!domain) {
      return false
    }
    
    // Mettre à jour le cache si nécessaire
    if (shouldUpdateCache()) {
      // Mise à jour asynchrone pour ne pas bloquer
      updateCache().catch(console.error)
    }
    
    // Si le cache est vide, utiliser les domaines de fallback
    if (cache.domains.size === 0) {
      return FALLBACK_DOMAINS.has(domain)
    }
    
    // Vérifier dans le cache
    return cache.domains.has(domain)
    
  } catch (error) {
    console.error('[DisposableEmailDetector] Error checking email:', error)
    // En cas d'erreur, ne pas bloquer l'email
    return false
  }
}

// Fonction synchrone pour vérifier avec le cache actuel uniquement
export function isDisposableEmailSync(email: string): boolean {
  try {
    const domain = email.toLowerCase().split('@')[1]
    if (!domain) {
      return false
    }
    
    // Utiliser le cache actuel ou les domaines de fallback
    const domainsToCheck = cache.domains.size > 0 ? cache.domains : FALLBACK_DOMAINS
    return domainsToCheck.has(domain)
    
  } catch (error) {
    console.error('[DisposableEmailDetector] Error in sync check:', error)
    return false
  }
}

// Fonction pour initialiser le cache au démarrage
export async function initializeDisposableEmailDetector(): Promise<void> {
  console.log('[DisposableEmailDetector] Initializing...')
  await updateCache()
}

// Fonction pour obtenir les statistiques du cache
export function getDisposableEmailStats() {
  return {
    domainsCount: cache.domains.size,
    lastUpdated: cache.lastUpdated,
    cacheAge: Date.now() - cache.lastUpdated,
    updateInProgress: cache.updateInProgress
  }
}

// Fonction pour forcer la mise à jour du cache
export async function refreshDisposableEmailCache(): Promise<void> {
  await updateCache()
}

// Initialisation automatique du cache au chargement du module
if (typeof window === 'undefined') {
  // Côté serveur uniquement
  initializeDisposableEmailDetector().catch(console.error)
}