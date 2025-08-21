import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client Supabase pour le frontend
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour l'authentification
export interface User {
  id: string
  email: string
  verification_code?: string
  verified: boolean
  created_at: string
  updated_at: string
}

// Types pour le rate limiting
export interface RateLimit {
  id: string
  user_id: string
  analysis_count: number
  daily_count: number
  last_analysis: string
  last_reset: string
  created_at: string
  updated_at: string
}

// Fonctions d'authentification
export const authService = {
  // Créer ou récupérer un utilisateur par email
  async getOrCreateUser(email: string): Promise<User | null> {
    try {
      // Vérifier si l'utilisateur existe
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (existingUser && !fetchError) {
        return existingUser
      }

      // Créer un nouveau code de vérification
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

      // Créer un nouvel utilisateur
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email,
          verification_code: verificationCode,
          verified: false
        })
        .select()
        .single()

      if (createError) {
        console.error('Erreur création utilisateur:', createError)
        return null
      }

      return newUser
    } catch (error) {
      console.error('Erreur authService.getOrCreateUser:', error)
      return null
    }
  },

  // Vérifier le code de vérification
  async verifyCode(email: string, code: string): Promise<User | null> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('verification_code', code)
        .single()

      if (error || !user) {
        return null
      }

      // Marquer comme vérifié
      const { data: verifiedUser, error: updateError } = await supabase
        .from('users')
        .update({ verified: true, verification_code: null })
        .eq('id', user.id)
        .select()
        .single()

      if (updateError) {
        console.error('Erreur vérification:', updateError)
        return null
      }

      return verifiedUser
    } catch (error) {
      console.error('Erreur authService.verifyCode:', error)
      return null
    }
  },

  // Générer un nouveau code de vérification
  async generateNewCode(email: string): Promise<string | null> {
    try {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString()

      const { error } = await supabase
        .from('users')
        .update({ verification_code: newCode })
        .eq('email', email)

      if (error) {
        console.error('Erreur génération nouveau code:', error)
        return null
      }

      return newCode
    } catch (error) {
      console.error('Erreur authService.generateNewCode:', error)
      return null
    }
  }
}

// Fonctions de rate limiting
export const rateLimitService = {
  // Vérifier les limites pour un utilisateur
  async checkLimits(userId: string): Promise<{ allowed: boolean; remaining: number }> {
    try {
      const today = new Date().toISOString().split('T')[0]
      
      // Récupérer ou créer l'enregistrement de rate limit
      const { data: rateLimitData, error } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      let rateLimit = rateLimitData

      if (error && error.code === 'PGRST116') {
        // Créer un nouvel enregistrement
        const { data: newRateLimit, error: createError } = await supabase
          .from('rate_limits')
          .insert({
            user_id: userId,
            analysis_count: 0,
            daily_count: 0,
            last_analysis: new Date().toISOString(),
            last_reset: today
          })
          .select()
          .single()

        if (createError) {
          console.error('Erreur création rate limit:', createError)
          return { allowed: false, remaining: 0 }
        }

        rateLimit = newRateLimit
      } else if (error) {
        console.error('Erreur récupération rate limit:', error)
        return { allowed: false, remaining: 0 }
      }

      if (!rateLimit) {
        return { allowed: false, remaining: 0 }
      }

      // Vérifier si on doit réinitialiser le compteur quotidien
      const lastReset = rateLimit.last_reset.split('T')[0]
      if (lastReset !== today) {
        const { error: resetError } = await supabase
          .from('rate_limits')
          .update({
            daily_count: 0,
            last_reset: today
          })
          .eq('user_id', userId)

        if (resetError) {
          console.error('Erreur reset quotidien:', resetError)
        } else {
          rateLimit.daily_count = 0
        }
      }

      // Vérifier les limites (5 analyses par jour)
      const dailyLimit = 5
      const allowed = rateLimit.daily_count < dailyLimit
      const remaining = Math.max(0, dailyLimit - rateLimit.daily_count)

      return { allowed, remaining }
    } catch (error) {
      console.error('Erreur rateLimitService.checkLimits:', error)
      return { allowed: false, remaining: 0 }
    }
  },

  // Incrémenter les compteurs après une analyse
  async incrementCounters(userId: string): Promise<boolean> {
    try {
      // Récupérer les valeurs actuelles
      const { data: currentData, error: fetchError } = await supabase
        .from('rate_limits')
        .select('analysis_count, daily_count')
        .eq('user_id', userId)
        .single()

      if (fetchError) {
        console.error('Erreur récupération compteurs:', fetchError)
        return false
      }

      // Incrémenter les valeurs
      const { error } = await supabase
        .from('rate_limits')
        .update({
          analysis_count: (currentData.analysis_count || 0) + 1,
          daily_count: (currentData.daily_count || 0) + 1,
          last_analysis: new Date().toISOString()
        })
        .eq('user_id', userId)

      if (error) {
        console.error('Erreur incrémentation compteurs:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Erreur rateLimitService.incrementCounters:', error)
      return false
    }
  },

  // Obtenir les statistiques d'un utilisateur
  async getUserStats(userId: string): Promise<RateLimit | null> {
    try {
      const { data, error } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Erreur récupération stats:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Erreur rateLimitService.getUserStats:', error)
      return null
    }
  }
}