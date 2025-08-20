import { Metadata } from 'next'
import { UploadZone } from '@/components/sections/upload-zone'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Upload CV IA Gratuit - Analyse automatique pour TPE, PME et artisans | IA Recrutement Pro',
  description: 'Uploadez gratuitement vos CV et lettres de motivation. Analyse IA instantanée, scoring automatique et classement des candidats. Parfait pour TPE, PME et artisans. Résultats en 2 minutes !',
  
  keywords: [
    // Mots-clés upload et gratuit
    "upload CV IA gratuit",
    "analyse CV gratuite en ligne",
    "tri CV gratuit automatique",
    "scoring candidats gratuit",
    "upload lettre motivation IA",
    "analyse candidature gratuite",
    // Mots-clés TPE/PME/Artisans
    "recrutement TPE gratuit",
    "outil recrutement PME",
    "aide recrutement artisan",
    "sélection candidats TPE",
    "tri CV petite entreprise",
    "recrutement sans RH",
    // Mots-clés fonctionnalités
    "analyse lettre motivation automatique",
    "service recrutement IA",
    "scoring candidats intelligent",
    "tri automatique CV",
    "évaluation candidatures IA",
    "matching profil poste",
    "analyse compétences IA",
    "classement candidats automatique",
    "présélection CV rapide"
  ].join(", "),

  openGraph: {
    title: 'Upload CV IA Gratuit - Analyse automatique pour TPE, PME et artisans',
    description: 'Uploadez gratuitement vos CV et lettres de motivation. Analyse IA instantanée, scoring automatique et classement des candidats. Résultats en 2 minutes !',
    url: 'https://ia-recrutement-pro.francoform.com/services/ia',
  },
}

export default function IAServicePage() {
  return (
    <div className="min-h-screen overflow-auto md:h-screen">
      <div className="min-h-full flex flex-col">
        {/* Header de la page */}
        <div className="flex-shrink-0 text-center py-8">
           <div className="flex justify-center items-center mb-6">
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-xl shadow-lg">
          <Image 
            src="/IARecrutPRO.ico" 
            alt="IA Recrutement Pro" 
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
        </div>
      </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent px-4">
            Service IA de Recrutement
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto px-6">
            Transformez votre processus de recrutement avec notre IA avancée
          </p>
        </div>
        
        {/* Zone de contenu principal */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-1 md:px-6">
            <UploadZone />
          </div>
        </div>
        
        {/* Footer avec composant */}
        <Footer />
      </div>
    </div>
  )
}