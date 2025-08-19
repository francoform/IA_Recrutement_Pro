import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Footer } from '@/components/layout/footer'


export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden relative">
      {/* Background animé avec particules */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient de base - Bleu foncé */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        
        {/* Particules animées */}
        <div className="absolute inset-0">
          {/* Particule 1 - Cyan */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/30 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
          
          {/* Particule 2 - Blue */}
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/40 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}></div>
          
          {/* Particule 3 - Indigo */}
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-indigo-500/25 rounded-full blur-2xl animate-bounce" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          
          {/* Particule 4 - Navy */}
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-blue-800/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-blue-800/35 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1.5s'}}></div>
          
          {/* Particule 5 - Teal */}
          <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-teal-400/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-teal-400/40 rounded-full blur-xl animate-bounce" style={{animationDuration: '2.5s', animationDelay: '2s'}}></div>
        </div>
        
        {/* Overlay pour adoucir */}
        <div className="absolute inset-0 bg-black/20"></div>
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
