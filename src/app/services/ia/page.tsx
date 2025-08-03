import { Metadata } from 'next'
import { UploadZone } from '@/components/sections/upload-zone'

export const metadata: Metadata = {
  title: 'IA Recrutement - Analyse automatique de CV',
  description: 'Analysez et classez vos candidats automatiquement avec notre IA',
}

export default function IAServicePage() {
  return (
    <div className="h-screen overflow-auto">
      <div className="min-h-full flex flex-col">
        {/* Header de la page */}
        <div className="flex-shrink-0 text-center py-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent px-4">
            Service IA de Recrutement
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto px-6">
            Transformez votre processus de recrutement avec notre IA avancée
          </p>
        </div>
        
        {/* Zone de contenu principal */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
            <UploadZone />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="flex-shrink-0 py-6">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400 text-sm">&copy; 2014 be2web. Tous droits réservés. Made with ❤️</p>
          </div>
        </footer>
      </div>
    </div>
  )
}