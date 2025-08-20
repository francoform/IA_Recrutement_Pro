import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Footer } from '@/components/layout/footer'
import { AnimationBackground } from '@/components/ui/animation-background'

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden relative">
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
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="flex-1 flex flex-col justify-center">
          <Hero />
          <div className="">
            <Features />
          </div>
        </div>
        
        {/* Footer fixé en bas */}
        <Footer />
      </div>
    </main>
  )
}
