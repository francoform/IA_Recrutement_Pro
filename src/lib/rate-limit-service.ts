// Service de rate-limiting Supabase
import { supabase } from './supabase'

export interface RateLimitResult {
  allowed: boolean
  resetTime?: number
  remaining?: number
  current?: number
  max?: number
  type?: 'ip' | 'email'
  error?: string
}

export interface RateLimitStats {
  daily_count: number
  last_analysis: string | null
  last_reset: string
  remaining: number
  max_daily: number
}

// Configuration des limites
const LIMITS = {
  DAILY_LIMIT: 3 // 3 analyses par jour pour tous les environnements
}

// Liste blanche d'emails (à configurer via variables d'environnement)
const WHITELIST_EMAILS = process.env.WHITELIST_EMAILS?.split(',').map(e => e.trim()) || []

export class RateLimitService {
  // Vérifier si un email est dans la liste blanche
  static isEmailWhitelisted(email: string): boolean {
    return WHITELIST_EMAILS.includes(email.toLowerCase())
  }
  
  // Obtenir l'IP du client
  static getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }
    
    if (realIP) {
      return realIP
    }
    
    return 'unknown'
  }
  
  // Vérifier les limites sans incrémenter
  static async checkLimits(userId: string, email: string): Promise<RateLimitResult> {
    try {
      // Exemption pour les emails en liste blanche
      if (this.isEmailWhitelisted(email)) {
        return { 
          allowed: true, 
          remaining: 999, 
          current: 0, 
          max: LIMITS.DAILY_LIMIT,
          type: 'email'
        }
      }
      
      // Récupérer ou créer l'enregistrement de rate limit
      let rateLimit: {
         id: string
         user_id: string
         daily_count: number
         last_analysis: string | null
         last_reset: string
         created_at: string
         updated_at: string
       } | null
       const { data, error: fetchError } = await supabase
         .from('rate_limits')
         .select('*')
         .eq('user_id', userId)
         .single()
       
       rateLimit = data
       
       if (fetchError && fetchError.code === 'PGRST116') {
        // Aucun enregistrement trouvé, en créer un nouveau
        const { data: newRateLimit, error: createError } = await supabase
          .from('rate_limits')
          .insert({
            user_id: userId,
            daily_count: 0,
            last_analysis: null,
            last_reset: new Date().toISOString().split('T')[0] // Date du jour
          })
          .select()
          .single()
        
        if (createError) {
          console.error('Erreur création rate limit:', createError)
          return { allowed: false, error: 'Erreur de création des limites' }
        }
        
        rateLimit = newRateLimit
      } else if (fetchError) {
        console.error('Erreur récupération rate limit:', fetchError)
        return { allowed: false, error: 'Erreur de récupération des limites' }
      }
      
      if (!rateLimit) {
        return { allowed: false, error: 'Impossible de récupérer les limites' }
      }
      
      // Vérifier si nous devons réinitialiser le compteur quotidien
      const today = new Date().toISOString().split('T')[0]
      const lastReset = rateLimit.last_reset.split('T')[0]
      
      if (today !== lastReset) {
        // Réinitialiser le compteur pour le nouveau jour
        const { data: resetRateLimit, error: resetError } = await supabase
          .from('rate_limits')
          .update({
            daily_count: 0,
            last_reset: new Date().toISOString()
          })
          .eq('user_id', userId)
          .select()
          .single()
        
        if (resetError) {
          console.error('Erreur réinitialisation rate limit:', resetError)
          return { allowed: false, error: 'Erreur de réinitialisation' }
        }
        
        rateLimit = resetRateLimit || rateLimit
        if (rateLimit) {
          rateLimit.daily_count = 0
        }
      }
      
      // Vérifier la limite quotidienne
      if (!rateLimit) {
        return { allowed: false, error: 'Données de rate limit non trouvées' }
      }
      
      const allowed = rateLimit.daily_count < LIMITS.DAILY_LIMIT
      const remaining = Math.max(0, LIMITS.DAILY_LIMIT - rateLimit.daily_count)
      
      // Calculer le temps de réinitialisation (minuit du jour suivant)
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      const resetTime = tomorrow.getTime()
      
      return {
        allowed,
        resetTime,
        remaining,
        current: rateLimit.daily_count,
        max: LIMITS.DAILY_LIMIT,
        type: 'email'
      }
      
    } catch (error) {
      console.error('Erreur RateLimitService.checkLimits:', error)
      return { allowed: false, error: 'Erreur interne' }
    }
  }
  
  // Incrémenter les compteurs après une analyse réussie
  static async incrementCounters(userId: string, email: string): Promise<boolean> {
    try {
      // Exemption pour les emails en liste blanche
      if (this.isEmailWhitelisted(email)) {
        return true
      }
      
      // D'abord récupérer le compteur actuel
      const { data: currentData, error: fetchError } = await supabase
        .from('rate_limits')
        .select('daily_count')
        .eq('user_id', userId)
        .single()
      
      if (fetchError) {
        console.error('Erreur récupération compteur actuel:', fetchError)
        return false
      }
      
      // Puis incrémenter
      const { error: updateError } = await supabase
        .from('rate_limits')
        .update({
          daily_count: (currentData?.daily_count || 0) + 1,
          last_analysis: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single()
      
      if (updateError) {
        console.error('Erreur incrémentation compteurs:', updateError)
        return false
      }
      
      return true
      
    } catch (error) {
      console.error('Erreur RateLimitService.incrementCounters:', error)
      return false
    }
  }
  
  // Obtenir les statistiques d'un utilisateur
  static async getUserStats(userId: string): Promise<RateLimitStats | null> {
    try {
      const { data: rateLimit, error } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error || !rateLimit) {
        console.error('Erreur récupération stats utilisateur:', error)
        return null
      }
      
      // Vérifier si nous devons réinitialiser le compteur quotidien
      const today = new Date().toISOString().split('T')[0]
      const lastReset = rateLimit.last_reset.split('T')[0]
      
      let dailyCount = rateLimit.daily_count
      if (today !== lastReset) {
        dailyCount = 0
      }
      
      return {
        daily_count: dailyCount,
        last_analysis: rateLimit.last_analysis,
        last_reset: rateLimit.last_reset,
        remaining: Math.max(0, LIMITS.DAILY_LIMIT - dailyCount),
        max_daily: LIMITS.DAILY_LIMIT
      }
      
    } catch (error) {
      console.error('❌ Erreur RateLimitService.getUserStats:', error)
      return null
    }
  }
  
  // Réinitialiser les compteurs d'un utilisateur (admin)
  static async resetUserCounters(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('rate_limits')
        .update({
          daily_count: 0,
          last_analysis: null,
          last_reset: new Date().toISOString()
        })
        .eq('user_id', userId)
      
      if (error) {
        console.error('Erreur réinitialisation compteurs utilisateur:', error)
        return false
      }
      
      return true
      
    } catch (error) {
      console.error('Erreur RateLimitService.resetUserCounters:', error)
      return false
    }
  }
  
  // Obtenir les statistiques globales (admin)
  static async getGlobalStats(): Promise<{
    totalUsers: number
    activeToday: number
    totalAnalysesToday: number
  } | null> {
    try {
      const today = new Date().toISOString().split('T')[0]
      
      // Compter le nombre total d'utilisateurs
      const { count: totalUsers, error: usersError } = await supabase
        .from('rate_limits')
        .select('*', { count: 'exact', head: true })
      
      if (usersError) {
        console.error('Erreur comptage utilisateurs:', usersError)
        return null
      }
      
      // Compter les utilisateurs actifs aujourd'hui
      const { count: activeToday, error: activeError } = await supabase
        .from('rate_limits')
        .select('*', { count: 'exact', head: true })
        .gte('last_analysis', today)
      
      if (activeError) {
        console.error('Erreur comptage utilisateurs actifs:', activeError)
        return null
      }
      
      // Sommer les analyses d'aujourd'hui
      const { data: todayStats, error: statsError } = await supabase
        .from('rate_limits')
        .select('daily_count')
        .gte('last_reset', today)
      
      if (statsError) {
        console.error('Erreur récupération stats du jour:', statsError)
        return null
      }
      
      const totalAnalysesToday = todayStats?.reduce((sum, stat) => sum + stat.daily_count, 0) || 0
      
      return {
        totalUsers: totalUsers || 0,
        activeToday: activeToday || 0,
        totalAnalysesToday
      }
      
    } catch (error) {
      console.error('Erreur RateLimitService.getGlobalStats:', error)
      return null
    }
  }
}