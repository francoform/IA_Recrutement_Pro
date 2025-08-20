import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ia-recrutement-pro.francoform.com'),
  title: "IA Recrutement Pro - Solution de recrutement rapide pour TPE, PME et artisans",
  description: "Révolutionnez votre recrutement ! Outil IA spécialement conçu pour les TPE, PME et artisans. Triez et analysez vos CV en 2 minutes. Économisez 90% de votre temps de présélection.",
  
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
    // Mots-clés TPE/PME/Artisans
    "recrutement TPE PME",
    "solution recrutement artisan",
    "recrutement rapide petite entreprise",
    "tri CV automatique TPE",
    "aide recrutement PME",
    "outil recrutement artisan",
    "recrutement efficace TPE",
    "sélection candidats PME",
    "gain temps recrutement",
    "recrutement sans RH",
    "premier tri CV automatique",
    "présélection candidats rapide",
    // Mots-clés IA et fonctionnalités
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
    "évaluation CV automatisée",
    "screening candidats automatique",
    "notation CV IA",
    "filtre candidatures intelligent",
    "recrutement digital",
    "optimisation processus recrutement"
  ].join(", "),

  authors: [{ name: "IA Recrutement Pro" }],
  creator: "Be2Web",
  publisher: "IA Recrutement Pro",

  openGraph: {
    title: "IA Recrutement Pro - Solution de recrutement rapide pour TPE, PME et artisans",
    description: "Révolutionnez votre recrutement ! Outil IA spécialement conçu pour les TPE, PME et artisans. Triez et analysez vos CV en 2 minutes. Économisez 90% de votre temps de présélection.",
    url: "https://ia-recrutement-pro.francoform.com",
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
    title: "IA Recrutement Pro - Solution de recrutement rapide pour TPE, PME et artisans",
    description: "Révolutionnez votre recrutement ! Outil IA spécialement conçu pour les TPE, PME et artisans. Triez et analysez vos CV en 2 minutes. Économisez 90% de votre temps de présélection.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "IA Recrutement Pro",
              "description": "Solution de recrutement par intelligence artificielle spécialement conçue pour les TPE, PME et artisans. Analyse automatique de CV et lettres de motivation.",
              "url": "https://ia-recrutement-pro.francoform.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "description": "Service gratuit d'analyse de CV par IA"
              },
              "creator": {
                "@type": "Organization",
                "name": "Be2Web",
                "url": "https://be2web.fr"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "TPE, PME, Artisans, Entrepreneurs"
              },
              "featureList": [
                "Analyse automatique de CV par IA",
                "Scoring intelligent des candidats",
                "Tri automatique des candidatures",
                "Analyse des lettres de motivation",
                "Gain de temps de 90%",
                "Interface simple et intuitive"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          {children}
        </div>
      </body>
    </html>
  )
}
