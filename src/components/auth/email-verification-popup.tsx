'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Shield, Clock, CheckCircle, Info } from 'lucide-react'

interface EmailVerificationPopupProps {
  isOpen: boolean
  onClose: () => void
  onVerificationSuccess: () => void
}

type VerificationStep = 'email' | 'code' | 'loading' | 'success'

export function EmailVerificationPopup({ 
  isOpen, 
  onClose, 
  onVerificationSuccess 
}: EmailVerificationPopupProps) {
  const [step, setStep] = useState<VerificationStep>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [gdprAccepted, setGdprAccepted] = useState(false)
  const [isCodeExpired, setIsCodeExpired] = useState(false)

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
      setError('Veuillez saisir une adresse email valide')
      return
    }

    if (!gdprAccepted) {
      setError('Vous devez accepter la politique de confidentialité pour continuer')
      return
    }

    setIsLoading(true)
    setError('')
    setIsCodeExpired(false) // Réinitialiser l'état d'expiration

    try {
      const response = await fetch('/api/auth/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        // Marquer le RGPD comme accepté dans localStorage
        localStorage.setItem('gdpr-accepted', 'true')
        setStep('code')
        // Démarrer le countdown de 60 secondes
        setCountdown(60)
        setIsCodeExpired(false) // Réinitialiser l'état d'expiration lors du succès
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(data.error || 'Erreur lors de l&#39;envoi du code')
      }
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      setError('Veuillez saisir le code à 6 chiffres')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      })

      if (!response.ok) {
        // Gérer les erreurs HTTP spécifiques
        if (response.status === 500) {
          setError('Erreur serveur interne. Veuillez réessayer dans quelques instants.')
          return
        }
        
        // Essayer de parser la réponse JSON pour les autres erreurs
        try {
          const data = await response.json()
          const errorMessage = data.error || `Erreur ${response.status}. Veuillez réessayer.`
          
          // Détecter si le code a expiré
          if (errorMessage.includes('Code expiré') || errorMessage.includes('expiré')) {
            setIsCodeExpired(true)
            setError('⏰ Votre code de vérification a expiré (valide 10 minutes). Cliquez sur "Renvoyer le code" pour en recevoir un nouveau.')
          } else {
            setError(errorMessage)
          }
        } catch {
          setError(`Erreur ${response.status}. Veuillez réessayer.`)
        }
        return
      }

      await response.json()
      setStep('success')
      setTimeout(() => {
        onVerificationSuccess()
        onClose()
      }, 1500)
      
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
      setError('Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setStep('email')
    setEmail('')
    setCode('')
    setError('')
    setCountdown(0)
    setGdprAccepted(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-white flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            Vérification de sécurité
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300 text-sm">
            Confirmez votre identité pour accéder au service d&#39;analyse IA
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          {/* Étape 1: Saisie email */}
          {step === 'email' && (
            <div className="space-y-4">
              <div className="text-center">
                <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <p className="text-gray-300 text-sm mb-3">
                  Pour protéger notre service contre les abus, veuillez confirmer votre adresse email.
                </p>
                
                {/* Message informatif sur la persistance des sessions */}
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 mb-4">
                  <p className="text-blue-200 text-xs leading-relaxed">
                    <strong>💡 Bon à savoir :</strong> Votre session restera active pendant <strong>24 heures</strong>, 
                     même si vous fermez votre navigateur. Vous n&apos;aurez pas besoin de vous re-vérifier 
                     lors de votre prochaine visite !
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                  disabled={isLoading}
                />
                
                {/* Section RGPD intégrée */}
                <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-gray-300 leading-relaxed">
                      <p className="mb-2 font-medium text-blue-200">Protection des données (RGPD)</p>
                      <p className="mb-2">Nous collectons et traitons :</p>
                      <ul className="space-y-1 mb-3 text-xs">
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span><strong>Adresse email :</strong> authentification et communication</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span><strong>Adresse IP :</strong> sécurité et limitation des requêtes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span><strong>Données d&apos;analyse :</strong> CV et offres soumis</span>
                        </li>
                      </ul>
                      <p className="text-xs text-gray-400">
                        Conservation : 24h pour les sessions. Droits d&apos;accès, rectification et suppression disponibles.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 pt-2 border-t border-blue-400/20">
                    <input
                      type="checkbox"
                      id="gdpr-consent"
                      checked={gdprAccepted}
                      onChange={(e) => setGdprAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="gdpr-consent" className="text-xs text-gray-300 leading-relaxed cursor-pointer">
                      J&apos;accepte que mes données soient traitées conformément à la politique de confidentialité
                    </label>
                  </div>
                </div>
                
                {error && (
                  <div className={`mb-4 p-3 border rounded-md ${
                    isCodeExpired 
                      ? 'bg-orange-50 border-orange-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <p className={`text-sm ${
                      isCodeExpired 
                        ? 'text-orange-700' 
                        : 'text-red-600'
                    }`}>{error}</p>
                  </div>
                )}
                
                <Button
                  onClick={handleSendCode}
                  disabled={isLoading || !email || !gdprAccepted}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Envoi en cours...' : 'Demander le code'}
                </Button>
              </div>
            </div>
          )}

          {/* Étape 2: Saisie code */}
          {step === 'code' && (
            <div className="space-y-4">
              <div className="text-center">
                <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <p className="text-gray-300 text-sm mb-2">
                  Un code à 6 chiffres a été envoyé à :
                </p>
                <p className="text-cyan-400 font-medium">{email}</p>
              </div>
              
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setCode(value)
                    // Réinitialiser l'état d'expiration quand l'utilisateur tape
                    if (isCodeExpired) {
                      setIsCodeExpired(false)
                      setError('')
                    }
                  }}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 text-center text-lg tracking-widest"
                  disabled={isLoading}
                  maxLength={6}
                />
                
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
                
                <Button
                  onClick={handleVerifyCode}
                  disabled={isLoading || code.length !== 6}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium"
                >
                  {isLoading ? 'Vérification...' : 'Vérifier le code'}
                </Button>
                
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-gray-400 text-sm">
                      Renvoyer le code dans {countdown}s
                    </p>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setStep('email')
                        setCode('')
                        setError('')
                        setIsCodeExpired(false)
                      }}
                      disabled={isLoading}
                      className={`text-sm transition-colors ${
                        isCodeExpired 
                          ? 'text-orange-400 hover:text-orange-300 font-semibold' 
                          : 'text-cyan-400 hover:text-cyan-300'
                      }`}
                    >
                      {isCodeExpired ? '🔄 Renvoyer un nouveau code' : 'Renvoyer le code'}
                    </Button>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  onClick={() => setStep('email')}
                  className="w-full text-gray-400 hover:text-white text-sm"
                >
                  Modifier l&#39;adresse email
                </Button>
              </div>
            </div>
          )}

          {/* Étape 3: Succès */}
          {step === 'success' && (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Vérification réussie !
                </h3>
                <p className="text-gray-300 text-sm">
                  Vous pouvez maintenant utiliser notre service pendant 24h.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmailVerificationPopup