'use client'

import { Shield, Info } from 'lucide-react'

interface GDPRPopupProps {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
}

export default function GDPRPopup({ isOpen, onAccept, onDecline }: GDPRPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6" />
              <h2 className="text-xl font-bold">Protection des données</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="mb-3">
                Conformément au RGPD, nous vous informons que nous collectons et traitons les données suivantes :
              </p>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Adresse email :</strong> pour l&apos;authentification et la communication des résultats</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Adresse IP :</strong> pour la sécurité et la limitation du taux de requêtes</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Données d&apos;analyse :</strong> CV et offres d&apos;emploi soumis pour traitement</span>
                </li>
              </ul>

              <p className="text-xs text-gray-600">
                Ces données sont conservées 24h pour les sessions et supprimées automatiquement. 
                Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onDecline}
            className="flex-1 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Refuser
          </button>
          <button
            onClick={onAccept}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
          >
            Accepter et continuer
          </button>
        </div>
      </div>
    </div>
  )
}