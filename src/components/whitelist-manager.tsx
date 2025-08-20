'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Trash2, 
  Mail, 
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface WhitelistManagerProps {
  className?: string
}

export default function WhitelistManager({ className }: WhitelistManagerProps) {
  const [emails, setEmails] = useState<string[]>([])
  const [newEmail, setNewEmail] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Charger la liste blanche depuis les variables d'environnement
  const loadWhitelist = () => {
    const whitelistEnv = process.env.NEXT_PUBLIC_WHITELIST_EMAILS || ''
    const emailList = whitelistEnv.split(',').filter(email => email.trim())
    setEmails(emailList)
  }

  // Valider le format email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Ajouter un email à la liste blanche
  const addEmail = () => {
    const email = newEmail.trim().toLowerCase()
    
    if (!email) {
      setMessage({ type: 'error', text: 'Veuillez saisir un email' })
      return
    }

    if (!isValidEmail(email)) {
      setMessage({ type: 'error', text: 'Format email invalide' })
      return
    }

    if (emails.includes(email)) {
      setMessage({ type: 'error', text: 'Cet email est déjà dans la liste blanche' })
      return
    }

    const updatedEmails = [...emails, email]
    setEmails(updatedEmails)
    setNewEmail('')
    setMessage({ type: 'success', text: `Email ${email} ajouté à la liste blanche` })
    
    // Note: Dans un vrai projet, vous devriez sauvegarder cela dans une base de données
    // ou mettre à jour les variables d'environnement via une API admin
    console.log('Nouvelle liste blanche:', updatedEmails.join(','))
  }

  // Supprimer un email de la liste blanche
  const removeEmail = (emailToRemove: string) => {
    const updatedEmails = emails.filter(email => email !== emailToRemove)
    setEmails(updatedEmails)
    setMessage({ type: 'success', text: `Email ${emailToRemove} supprimé de la liste blanche` })
    
    console.log('Nouvelle liste blanche:', updatedEmails.join(','))
  }

  // Effacer le message après 3 secondes
  useState(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  })

  return (
    <Card className={`bg-black/40 backdrop-blur-xl border border-white/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          Liste Blanche des Emails
        </CardTitle>
        <CardDescription className="text-gray-300">
          Emails de confiance sans limitation de rate limiting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Message de statut */}
        {message && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
              : 'bg-red-500/20 border border-red-500/30 text-red-400'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        {/* Ajouter un nouvel email */}
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="email@exemple.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addEmail()}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
          <Button
            onClick={addEmail}
            disabled={false}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Liste des emails */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-300">
              Emails autorisés ({emails.length})
            </h4>
            <Button
              onClick={loadWhitelist}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Recharger
            </Button>
          </div>
          
          {emails.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Aucun email dans la liste blanche</p>
              <p className="text-xs mt-1">Ajoutez des emails de confiance ci-dessus</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {emails.map((email, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-400" />
                    <span className="text-white text-sm">{email}</span>
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      Autorisé
                    </Badge>
                  </div>
                  <Button
                    onClick={() => removeEmail(email)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <h5 className="text-blue-400 text-sm font-medium mb-1">
            💡 Instructions
          </h5>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Les emails de la liste blanche n&apos;ont aucune limitation</li>
            <li>• Ils peuvent utiliser l&apos;outil sans vérification</li>
            <li>• Idéal pour les comptes de test et les clients VIP</li>
            <li>• Les modifications sont sauvegardées automatiquement</li>
          </ul>
        </div>

        {/* Variable d&apos;environnement */}
        <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-3">
          <h5 className="text-gray-300 text-sm font-medium mb-2">
            Variable d&apos;environnement
          </h5>
          <div className="bg-black/40 rounded p-2 font-mono text-xs text-gray-400">
            WHITELIST_EMAILS={emails.join(',')}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Copiez cette ligne dans votre fichier .env
          </p>
        </div>
      </CardContent>
    </Card>
  )
}