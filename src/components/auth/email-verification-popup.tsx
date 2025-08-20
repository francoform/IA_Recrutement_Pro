'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Shield, Clock, CheckCircle } from 'lucide-react'

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

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
      setError('Veuillez saisir une adresse email valide')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setStep('code')
        // Démarrer le countdown de 60 secondes
        setCountdown(60)
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

      const data = await response.json()

      if (response.ok) {
        setStep('success')
        setTimeout(() => {
          onVerificationSuccess()
          onClose()
        }, 1500)
      } else {
        setError(data.error || 'Code incorrect. Veuillez réessayer.')
      }
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.')
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
                
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
                
                <Button
                  onClick={handleSendCode}
                  disabled={isLoading || !email}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium"
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
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
                      onClick={handleSendCode}
                      disabled={isLoading}
                      className="text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                      Renvoyer le code
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