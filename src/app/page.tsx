'use client'

import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Footer } from '@/components/layout/footer'
import { AnimationBackground } from '@/components/ui/animation-background'
import { EmailVerificationPopup } from '@/components/auth/email-verification-popup'
import RateLimitPopup from '@/components/ui/rate-limit-popup'
import GDPRPopup from '@/components/ui/gdpr-popup'
import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'

function HomePageContent() {
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [showRateLimitPopup, setShowRateLimitPopup] = useState(false)
  const [showGDPRPopup, setShowGDPRPopup] = useState(false)
  const [rateLimitData, setRateLimitData] = useState<{
    type: 'ip' | 'email';
    resetTime: number;
    current: number;
    max: number;
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté le RGPD
    const gdprAccepted = localStorage.getItem('gdpr-accepted');
    if (!gdprAccepted) {
      setShowGDPRPopup(true);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    const rateLimitType = urlParams.get('type');
    const rateLimitReset = urlParams.get('reset');
    const rateLimitCurrent = urlParams.get('current');
    const rateLimitMax = urlParams.get('max');

    if (errorParam === 'rate-limit' && rateLimitType && rateLimitReset && rateLimitCurrent && rateLimitMax) {
      setRateLimitData({
        type: rateLimitType as 'ip' | 'email',
        resetTime: parseInt(rateLimitReset),
        current: parseInt(rateLimitCurrent),
        max: parseInt(rateLimitMax)
      });
      setShowRateLimitPopup(true);
      
      // Nettoyer les paramètres de l'URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      newUrl.searchParams.delete('type');
      newUrl.searchParams.delete('reset');
      newUrl.searchParams.delete('current');
      newUrl.searchParams.delete('max');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, []);

  const handleAuthSuccess = () => {
    setShowAuthPopup(false)
    // Rediriger vers /services/ia après authentification réussie
    router.push('/services/ia')
  }

  const handleAuthClose = () => {
    setShowAuthPopup(false)
  }

  const handleRateLimitClose = () => {
    setShowRateLimitPopup(false)
    setRateLimitData(null)
  }

  const handleGDPRAccept = () => {
    localStorage.setItem('gdpr-accepted', 'true')
    setShowGDPRPopup(false)
  }

  const handleGDPRDecline = () => {
    // Rediriger vers une page d'information ou fermer l'application
    alert('Vous devez accepter la politique de confidentialité pour utiliser ce service.')
  }

  const handleStartAnalysis = async () => {
    try {
      const response = await fetch('/api/auth/validate-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.valid) {
        router.push('/services/ia');
      } else {
        setShowAuthPopup(true);
      }
    } catch {
      setShowAuthPopup(true);
    }
  };
  return (
    <main className="min-h-screen overflow-auto relative md:h-screen md:overflow-hidden">
      {/* Animation WebGL de fond */}
      <AnimationBackground />
      
      {/* Background de base harmonisé */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient de base - Bleu foncé harmonisé avec l'animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        
        {/* Overlay pour adoucir et harmoniser avec l'animation WebGL */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Contenu centré */}
      <div className="relative z-10 min-h-screen flex flex-col md:h-full md:justify-center">
        <div className="flex-1 flex flex-col justify-center py-8 md:py-0">
          <Hero onStartAnalysis={handleStartAnalysis} />
          <div className="">
            <Features />
          </div>
        </div>
        
        {/* Footer fixé en bas */}
        <Footer />
      </div>

      {/* Popup d'authentification */}
      {showAuthPopup && (
        <EmailVerificationPopup
          isOpen={showAuthPopup}
          onVerificationSuccess={handleAuthSuccess}
          onClose={handleAuthClose}
        />
      )}

      {/* Popup de limite de rate limiting */}
      {showRateLimitPopup && rateLimitData && (
        <RateLimitPopup
          isOpen={showRateLimitPopup}
          onClose={handleRateLimitClose}
          resetTime={new Date(rateLimitData.resetTime).toISOString()}
          limitType={rateLimitData.type}
          currentCount={rateLimitData.current}
          maxCount={rateLimitData.max}
        />
      )}

      {/* Popup RGPD */}
      <GDPRPopup
        isOpen={showGDPRPopup}
        onAccept={handleGDPRAccept}
        onDecline={handleGDPRDecline}
      />
    </main>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-white">Chargement...</div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}
