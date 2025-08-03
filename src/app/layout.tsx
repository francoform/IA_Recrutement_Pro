import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "IA Recrutement Pro - Analyse automatique de CV par Intelligence Artificielle",
  description: "Transformez votre processus de recrutement avec l'IA. Analysez, classez et sélectionnez les meilleurs candidats en quelques secondes. Scoring intelligent et gain de temps de 90%.",
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  keywords: [
    "IA recrutement",
    "analyse CV automatique",
    "scoring candidats IA",
    "tri CV intelligence artificielle",
    "matching CV poste",
    "logiciel recrutement IA",
    "ATS intelligent",
    "sélection candidats automatique",
    "analyse lettre motivation IA",
    "classement candidatures",
    "recrutement par IA",
    "évaluation CV automatisée",
    "algorithme recrutement",
    "parsing CV intelligent",
    "optimisation processus recrutement",
    "intelligence artificielle RH",
    "screening candidats automatique",
    "notation CV IA",
    "filtre candidatures intelligent",
    "recrutement digital"
  ].join(", "),

  authors: [{ name: "IA Recrutement Pro" }],
  creator: "Be2Web",
  publisher: "IA Recrutement Pro",

  openGraph: {
    title: "IA Recrutement Pro - Analyse automatique de CV par Intelligence Artificielle",
    description: "Transformez votre processus de recrutement avec l'IA. Analysez, classez et sélectionnez les meilleurs candidats en quelques secondes. Scoring intelligent et gain de temps de 90%.",
    url: "https://ia-recrutement-pro.com",
    siteName: "IA Recrutement Pro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IA Recrutement Pro - Service d'analyse CV par IA"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "IA Recrutement Pro - Analyse automatique de CV par Intelligence Artificielle",
    description: "Transformez votre processus de recrutement avec l'IA. Analysez, classez et sélectionnez les meilleurs candidats en quelques secondes. Scoring intelligent et gain de temps de 90%.",
    images: ["/og-image.jpg"]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link rel="icon" href="/IARecrutPRO.ico" sizes="any" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          {children}
        </div>
      </body>
    </html>
  )
}
