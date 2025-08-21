// Service d'authentification Supabase
import { supabase } from './supabase'
import { User } from './supabase'

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
}

export interface VerificationResult {
  success: boolean
  verified: boolean
  expired: boolean
  attempts: number
  error?: string
}

export class AuthService {
  // Créer ou récupérer un utilisateur avec code de vérification
  static async getOrCreateUser(email: string): Promise<AuthResult> {
    try {
      console.log('🔍 Recherche utilisateur:', email)
      
      // Vérifier si l'utilisateur existe déjà
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()
      
      if (existingUser && !fetchError) {
        console.log('👤 Utilisateur existant trouvé:', existingUser.id)
        
        // Générer un nouveau code de vérification
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const now = new Date().toISOString()
        
        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({ 
            verification_code: verificationCode,
            verified: false,
            code_generated_at: now,
            updated_at: now
          })
          .eq('id', existingUser.id)
          .select()
          .single()
        
        if (updateError) {
          console.error('❌ Erreur mise à jour utilisateur:', updateError)
          return { success: false, error: 'Erreur lors de la mise à jour' }
        }
        
        return { success: true, user: updatedUser }
      }
      
      // Créer un nouvel utilisateur
      console.log('➕ Création nouvel utilisateur')
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      const now = new Date().toISOString()
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email,
          verification_code: verificationCode,
          verified: false,
          code_generated_at: now
        })
        .select()
        .single()
      
      if (createError) {
        console.error('❌ Erreur création utilisateur:', createError)
        return { success: false, error: 'Erreur lors de la création' }
      }
      
      console.log('✅ Utilisateur créé:', newUser.id)
      return { success: true, user: newUser }
      
    } catch (error) {
      console.error('❌ Erreur AuthService.getOrCreateUser:', error)
      return { success: false, error: 'Erreur interne' }
    }
  }
  
  // Vérifier un code de vérification
  static async verifyCode(email: string, code: string): Promise<VerificationResult> {
    try {
      console.log('🔍 Vérification code:', { email, code })
      
      // Récupérer l'utilisateur avec le code
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('verification_code', code)
        .single()
      
      if (fetchError || !user) {
        console.log('❌ Code invalide ou utilisateur non trouvé')
        return {
          success: false,
          verified: false,
          expired: false,
          attempts: 0,
          error: 'Code invalide'
        }
      }
      
      // Logs de débogage détaillés pour l'expiration
      const now = new Date()
      const codeGeneratedAt = new Date(user.code_generated_at || user.created_at)
      const diffMinutes = (now.getTime() - codeGeneratedAt.getTime()) / (1000 * 60)
      const expirationThreshold = 10
      
      console.log('🔍 [DEBUG] Vérification expiration du code:')
      console.log('📅 Date actuelle:', now.toISOString())
      console.log('📅 code_generated_at depuis DB:', user.code_generated_at)
      console.log('📅 created_at en fallback:', user.created_at)
      console.log('📅 Date utilisée pour calcul:', codeGeneratedAt.toISOString())
      console.log('⏱️ Différence en minutes:', diffMinutes.toFixed(2))
      console.log('⏱️ Seuil d\'expiration:', expirationThreshold, 'minutes')
      console.log('✅ Code valide?', diffMinutes <= expirationThreshold)
      
      // Vérifier l'expiration (10 minutes)
      if (diffMinutes > expirationThreshold) {
        console.log('⏰ Code expiré - différence:', diffMinutes.toFixed(2), 'minutes')
        return {
          success: false,
          verified: false,
          expired: true,
          attempts: 0,
          error: 'Code expiré'
        }
      }
      
      // Marquer comme vérifié
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          verified: true, 
          verification_code: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
      
      if (updateError) {
        console.error('❌ Erreur mise à jour vérification:', updateError)
        return {
          success: false,
          verified: false,
          expired: false,
          attempts: 0,
          error: 'Erreur de vérification'
        }
      }
      
      console.log('✅ Code vérifié avec succès')
      return {
        success: true,
        verified: true,
        expired: false,
        attempts: 0
      }
      
    } catch (error) {
      console.error('❌ Erreur AuthService.verifyCode:', error)
      return {
        success: false,
        verified: false,
        expired: false,
        attempts: 0,
        error: 'Erreur interne'
      }
    }
  }
  
  // Générer un nouveau code pour un utilisateur
  static async generateNewCode(email: string): Promise<AuthResult> {
    try {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      const now = new Date().toISOString()
      const { data: user, error } = await supabase
        .from('users')
        .update({ 
          verification_code: newCode,
          verified: false,
          code_generated_at: now,
          updated_at: now
        })
        .eq('email', email)
        .select()
        .single()
      
      if (error) {
        console.error('❌ Erreur génération nouveau code:', error)
        return { success: false, error: 'Erreur lors de la génération' }
      }
      
      return { success: true, user }
      
    } catch (error) {
      console.error('❌ Erreur AuthService.generateNewCode:', error)
      return { success: false, error: 'Erreur interne' }
    }
  }
  
  // Créer un token JWT simple pour la session
  static async createSessionToken(email: string): Promise<string> {
    const payload = {
      email,
      verified: true,
      verifiedAt: Date.now(),
      exp: Math.floor((Date.now() + 24 * 60 * 60 * 1000) / 1000) // 24h
    }
    
    // Token simple encodé en base64 (pour compatibilité)
    return btoa(JSON.stringify(payload))
  }
  
  // Vérifier un token de session
  static async verifySessionToken(token: string): Promise<{
    valid: boolean
    email: string | null
    verified: boolean
    verifiedAt: number | null
  }> {
    try {
      // Nettoyer le token des caractères invalides
      const cleanToken = token.replace(/[^A-Za-z0-9+/=]/g, '')
      
      // Vérifier que le token a une longueur valide pour base64
      if (cleanToken.length % 4 !== 0) {
        console.error('❌ Token invalide: longueur incorrecte')
        return {
          valid: false,
          email: null,
          verified: false,
          verifiedAt: null
        }
      }
      
      const payload = JSON.parse(atob(cleanToken))
      
      // Vérifier l'expiration
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp && now > payload.exp) {
        return {
          valid: false,
          email: null,
          verified: false,
          verifiedAt: null
        }
      }
      
      return {
        valid: true,
        email: payload.email,
        verified: payload.verified,
        verifiedAt: payload.verifiedAt
      }
      
    } catch (error) {
      console.error('❌ Erreur vérification token:', error)
      return {
        valid: false,
        email: null,
        verified: false,
        verifiedAt: null
      }
    }
  }
}