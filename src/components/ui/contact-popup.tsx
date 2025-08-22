'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, User, MessageSquare, Send, X } from 'lucide-react'

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Fermer la popup après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      onClose()
    }, 3000)
  }

  const resetAndClose = () => {
    setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    setIsSubmitted(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl bg-zinc-900/95 border border-white/20 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Contactez-nous
            </DialogTitle>
            <button
              onClick={resetAndClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-zinc-400 text-left">
            Vous avez des questions sur IA Recrutement Pro ? Notre équipe est là pour vous aider.
          </p>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Message envoyé !</h3>
            <p className="text-zinc-400">
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom complet *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom complet"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Téléphone
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Votre numéro de téléphone"
                  className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                  Entreprise
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Nom de votre entreprise"
                  className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message *
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Décrivez votre projet ou vos besoins..."
                required
                rows={4}
                className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetAndClose}
                className="flex-1 border-gray-500/50 text-gray-400 hover:bg-gray-500/20 hover:text-gray-300"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Envoyer le message
                  </div>
                )}
              </Button>
            </div>

            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-sm text-zinc-400">
                Vous pouvez aussi nous contacter directement :
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
                <a 
                  href="mailto:contact-be2web@francoform.com"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  contact-be2web@francoform.com
                </a>
                <a 
                  href="https://be2web-agence.francoform.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  be2web-agence.francoform.com
                </a>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}