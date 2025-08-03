import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Résultats de l\'analyse IA - Classement des candidats | IA Recrutement Pro',
  description: 'Découvrez les résultats de l\'analyse IA de vos candidats. Scores détaillés, classement intelligent et recommandations pour optimiser votre recrutement.',
  
  keywords: [
    "résultats analyse CV IA",
    "classement candidats intelligent",
    "scores recrutement IA",
    "dashboard recrutement",
    "statistiques candidatures",
    "rapport analyse IA",
    "sélection candidats automatique"
  ].join(", "),

  openGraph: {
    title: 'Résultats de l\'analyse IA - Classement des candidats',
    description: 'Découvrez les résultats de l\'analyse IA de vos candidats avec scores détaillés et classement intelligent.',
    url: 'https://ia-recrutement-pro.com/recruiter-results',
  },
}

export default function RecruiterResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}