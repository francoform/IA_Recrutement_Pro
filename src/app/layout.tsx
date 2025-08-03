import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IA Recrutement Pro',
  description: 'Plateforme IA pour le recrutement intelligent',
  icons: {
    icon: '/IARecrutPRO.ico',
    shortcut: '/IARecrutPRO.ico',
    apple: '/IARecrutPRO.ico',
  },
}

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
