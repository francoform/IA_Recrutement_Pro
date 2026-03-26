'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { EmailVerificationPopup } from '@/components/auth/email-verification-popup'
import RateLimitPopup from '@/components/ui/rate-limit-popup'
import { AnimationBackground } from '@/components/ui/animation-background'
import { Footer } from '@/components/layout/footer'
import { clearAllClientCaches } from '@/lib/cache-cleaner'
import HeroBanner from '@/components/ui/hero-banner'

function HomePageContent() {
  const router = useRouter()
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [showRateLimitPopup, setShowRateLimitPopup] = useState(false)
  const [rateLimitData, setRateLimitData] = useState<{
    type: 'ip' | 'email';
    resetTime: number;
    current: number;
    max: number;
  } | null>(null)

  useEffect(() => {
    // Nettoyer les caches côté client au démarrage pour un test propre
    const shouldClearCache = new URLSearchParams(window.location.search).get('clear-cache');
    if (shouldClearCache === 'true') {
      clearAllClientCaches();
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('clear-cache');
      window.history.replaceState({}, '', newUrl.toString());
    }
    
    // La vérification RGPD est maintenant intégrée dans la popup de vérification email

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
    // Ne pas supprimer rateLimitData pour permettre la réaffichage
  }



  // Fonction utilitaire pour récupérer le token depuis les cookies
  const getAuthToken = () => {
    const cookies = document.cookie.split(';')
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('supabase-session='))

    if (!authCookie) return null

    return decodeURIComponent(authCookie.split('=')[1].trim())
  }

  const handleStartAnalysis = async () => {
    const token = getAuthToken()

    if (!token) {
      setShowAuthPopup(true);
      return;
    }

    try {
      const checkResponse = await fetch('/api/analysis/check-limits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (checkResponse.status === 429) {
        const limitData = await checkResponse.json();
        setRateLimitData({
          type: limitData.type || 'email',
          current: limitData.current || 0,
          max: limitData.max || 0,
          resetTime: limitData.resetTime || Date.now() + 86400000
        });
        setShowRateLimitPopup(true);
        return;
      }

      if (checkResponse.status === 401) {
        setShowAuthPopup(true);
        return;
      }

      const data = await checkResponse.json();

      if (data.allowed) {
        router.push('/services/ia');
      } else {
        setShowAuthPopup(true);
      }
    } catch (error) {
      console.error('Erreur vérification limites:', error)
      setShowAuthPopup(true);
    }
  }
  return (
    <>
      {/* Background fixe sur toute la viewport */}
      <div className="fixed inset-0 z-0">
        {/* Animation WebGL de fond */}
        <AnimationBackground />
        
        {/* Background de base harmonisé */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background sombre comme la page about */}
          <div className="absolute inset-0 bg-zinc-950"></div>
          
          {/* Overlay pour adoucir et harmoniser avec l'animation WebGL */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
      
      {/* Contenu scrollable */}
      <main className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide">
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col justify-center py-8 md:py-0">
            <Hero onStartAnalysis={handleStartAnalysis} />
            <div className="mb-12">
              <Features />
            </div>
            
            {/* Hero Banner entre les fonctionnalités et le footer */}
            <div className="my-16">
              <HeroBanner />
            </div>
          </div>
          
          {/* Footer */}
          <Footer />
        </div>
      </main>

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
          resetTime={rateLimitData.resetTime}
          limitType={rateLimitData.type}
          currentCount={rateLimitData.current}
          maxCount={rateLimitData.max}
        />
      )}
    </>
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
