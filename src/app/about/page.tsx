'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  Star, 
  Upload, 
  Clock, 
  Mail, 
  MessageSquare,
  Sparkles,
  Target,
  Play,
  FileText,
  PlayCircle,
  ExternalLink,
  Database,
  Settings,
  Code,
  Smartphone
} from 'lucide-react'
import ContactPopup from '@/components/ui/contact-popup'
import { EmailVerificationPopup } from '@/components/auth/email-verification-popup'
import RateLimitPopup from '@/components/ui/rate-limit-popup'
import { ParticleBackground } from '@/components/ui/particle-background'


export default function AboutPage() {
  const router = useRouter()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [showRateLimitPopup, setShowRateLimitPopup] = useState(false)
  const [rateLimitData] = useState<{
    type: 'ip' | 'email';
    resetTime: number;
    current: number;
    max: number;
  } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)

      // Scroll animations
      const elements = document.querySelectorAll('.scroll-animate')
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('animate')
        }
      })

      // Parallax effect
      const parallaxElements = document.querySelectorAll('.parallax')
      parallaxElements.forEach((el) => {
        const speed = 0.5
        const yPos = -(scrollTop * speed)
        ;(el as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAuthSuccess = () => {
    setShowAuthPopup(false)
    router.push('/services/ia')
  }

  const handleAuthClose = () => {
    setShowAuthPopup(false)
  }

  const handleRateLimitClose = () => {
    setShowRateLimitPopup(false)
  }



  return (
    <div className="antialiased bg-zinc-950 text-zinc-200 overflow-x-hidden">
      {/* Scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      


      {/* Hero Section with Particles */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Particles Animation - Only in Hero Section */}
        <div className="absolute inset-0">
          <ParticleBackground />
        </div>
        
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24 relative z-10">
          {/* Section centrée en haut */}
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-300 animate-fade-in-up delay-200 font-medium tracking-tight mb-6">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span> 
              Nouveau : Analyse IA avancée et matching automatique
            </p>
            
            {/* Logo et titre centrés */}
            <div className="flex flex-col items-center gap-4 mb-8 animate-fade-in-up delay-100">
              <Image 
                src="/IARecrutPRO.png" 
                alt="IA Recrutement Pro Logo" 
                width={80} 
                height={80} 
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                IA Recrutement Pro
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl leading-tight animate-fade-in-up delay-400">
                <span className="block text-2xl md:text-3xl font-light text-zinc-300 mb-2">Révolutionnez votre</span>
                <span className="block font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                  processus de recrutement
                </span>
                <span className="block text-3xl md:text-4xl font-medium text-white mt-2">
                  avec l&apos;<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">IA</span>
                </span>
              </h1>
              <p className="max-w-xl text-base text-zinc-400 animate-fade-in-up delay-600 font-medium tracking-tight">
                Analysez automatiquement vos CV, identifiez les meilleurs talents et gagnez un temps précieux grâce à notre intelligence artificielle de pointe.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row animate-fade-in-up delay-800">
                <Link href="/" className="inline-flex items-center justify-center gap-2 font-medium tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-sm rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 h-12">
                  <Brain className="h-4 w-4" />
                  Commencer une analyse
                </Link>
                <Link href="/services/ia">
                  <Button variant="outline" className="inline-flex items-center justify-center gap-2 font-medium tracking-tight border-white/30 bg-white/15 backdrop-blur-md text-white hover:bg-white/25 hover:border-white/50 hover:text-white px-8 py-4 text-sm rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/25 h-12">
                    <PlayCircle className="h-4 w-4 text-white hover:text-white" />
                    Voir une démo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-2 animate-fade-in-up delay-1000">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-zinc-950">MD</div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-zinc-950">PM</div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-zinc-950">SL</div>
                </div>
                <p className="text-sm text-zinc-400 font-medium tracking-tight">
                  Déjà utilisé par de nombreux professionnels RH
                </p>
              </div>
            </div>
            
            {/* Right Column - Candidate Cards Stack */}
            <div className="relative animate-slide-in-right delay-600">
              <div className="space-y-4">
                {/* Top Candidate Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-white/20 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">MC</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-base">Marie Curie</h4>
                        <p className="text-zinc-300 text-sm">Data Scientist Senior</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">97%</div>
                      <div className="text-green-400 text-xs font-medium">Match parfait</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">Python</Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">ML</Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">PhD</Badge>
                  </div>
                </div>

                {/* Second Candidate Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-white/20 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">JD</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-base">Jean Dupont</h4>
                        <p className="text-zinc-300 text-sm">Développeur Full-Stack</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">89%</div>
                      <div className="text-blue-400 text-xs font-medium">Très bon match</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">React</Badge>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">Node.js</Badge>
                    <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 text-xs">5 ans exp</Badge>
                  </div>
                </div>

                {/* Third Candidate Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-white/20 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">SL</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-base">Sophie Laurent</h4>
                        <p className="text-zinc-300 text-sm">UX/UI Designer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">82%</div>
                      <div className="text-purple-400 text-xs font-medium">Bon potentiel</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs">Figma</Badge>
                    <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">Design</Badge>
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">Creative</Badge>
                  </div>
                </div>

                {/* Analysis Summary */}
                <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">Analyse en temps réel</span>
                    </div>
                    <span className="text-zinc-400 text-xs">3 candidats analysés</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl leading-tight mb-6">
              <span className="block text-lg md:text-xl font-light text-zinc-400 mb-2">Découvrez nos</span>
              <span className="block font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                Fonctionnalités avancées
              </span>
              <span className="block text-2xl md:text-3xl font-medium text-white mt-2">
                pour le recrutement <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold">moderne</span>
              </span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Découvrez comment notre IA révolutionne votre processus de recrutement avec des outils puissants et intuitifs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-blue-500/30 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors group-hover:shadow-lg group-hover:shadow-blue-500/50">
                  <Brain className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Analyse IA Avancée</CardTitle>
                <CardDescription className="text-zinc-400">
                  Notre IA analyse en profondeur chaque CV pour identifier les compétences, l&apos;expérience et le potentiel des candidats.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-purple-500/30 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Matching Précis</CardTitle>
                <CardDescription className="text-zinc-400">
                  Obtenez des scores de compatibilité précis entre vos offres d&apos;emploi et les profils candidats pour un recrutement optimal.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-cyan-500/30 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors group-hover:shadow-lg group-hover:shadow-cyan-500/50">
                  <Clock className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Gain de Temps</CardTitle>
                <CardDescription className="text-zinc-400">
                  Réduisez de 80% le temps consacré au tri des CV grâce à notre système de pré-sélection automatique intelligent.
                </CardDescription>
              </CardHeader>
            </Card>


          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Comment ça
              </span>
              <span className="text-white font-extrabold text-5xl md:text-6xl ml-3">
                marche ?
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Un processus simple et efficace en 3 étapes pour révolutionner votre recrutement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40 transition-all duration-300">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-blue-500/30 pb-2">Téléchargez vos CV</h3>
              <p className="text-zinc-400">
                Importez facilement vos CV en lot ou individuellement. Formats PDF, DOC, DOCX supportés.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40 transition-all duration-300">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-purple-500/30 pb-2">Analyse IA Instantanée</h3>
              <p className="text-zinc-400">
                Notre IA analyse automatiquement les compétences, l&apos;expérience et la compatibilité avec vos critères.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40 transition-all duration-300">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-cyan-500/30 pb-2">Résultats Précis</h3>
              <p className="text-zinc-400">
                Recevez un classement détaillé des candidats avec scores de compatibilité et recommandations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Ce que disent
              </span>
              <span className="text-white font-extrabold text-5xl md:text-6xl ml-3">
                nos clients
              </span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Découvrez comment IA Recrutement Pro transforme le quotidien des professionnels RH
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-blue-500/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">SM</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Sophie Martin</h4>
                    <p className="text-zinc-400 text-sm">DRH - TechCorp</p>
                  </div>
                </div>
                <CardDescription className="text-zinc-300 italic">
                  &quot;Grâce à IA Recrutement Pro, nous avons réduit notre temps de recrutement de 60%. L&apos;analyse des CV est d&apos;une précision remarquable et nous aide à identifier les meilleurs talents rapidement.&quot;
                </CardDescription>
                <div className="flex text-yellow-400 mt-4">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardHeader>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Jean Dupont</h4>
                    <p className="text-zinc-400 text-sm">Responsable Recrutement - InnovateLab</p>
                  </div>
                </div>
                <CardDescription className="text-zinc-300 italic">
                  &quot;L&apos;outil révolutionne notre approche du recrutement. Les scores de compatibilité sont très fiables et nous permettent de nous concentrer sur les candidats les plus prometteurs.&quot;
                </CardDescription>
                <div className="flex text-yellow-400 mt-4">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardHeader>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-cyan-500/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">AL</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Anne Leroy</h4>
                    <p className="text-zinc-400 text-sm">Consultante RH - TalentFirst</p>
                  </div>
                </div>
                <CardDescription className="text-zinc-300 italic">
                  &quot;Interface intuitive et résultats impressionnants. Nos clients sont ravis de la qualité des candidatures présélectionnées. Un vrai game-changer pour notre activité.&quot;
                </CardDescription>
                <div className="flex text-yellow-400 mt-4">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* be2web Section */}
      <section className="relative py-24 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image 
                src="/be2web-icon-transparent.png" 
                alt="Be2Web Logo" 
                width={60} 
                height={60} 
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Créé par
                </span>
                <span className="text-green-400 font-extrabold text-5xl md:text-6xl ml-3 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                  be2web
                </span>
              </h2>
            </div>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              L&apos;agence web spécialisée dans l&apos;innovation technologique et l&apos;intelligence artificielle
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">
                  <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent text-4xl font-extrabold">
                    Votre partenaire
                  </span>
                  <br />
                  <span className="text-green-400 text-2xl font-semibold drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                    technologique de confiance
                  </span>
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  be2web est une agence web innovante spécialisée dans le développement d&apos;applications web modernes, 
                  l&apos;intégration d&apos;intelligence artificielle et la création de solutions digitales sur mesure.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  Avec une expertise reconnue dans les technologies de pointe, nous accompagnons les entreprises 
                  dans leur transformation digitale en créant des outils performants et intuitifs.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-2xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-zinc-400 text-sm">Projets réalisés</div>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-2xl font-bold text-green-400 mb-2">10+</div>
                  <div className="text-zinc-400 text-sm">Années d&apos;expérience</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white border-0 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <a href="https://be2web-agence.francoform.com/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Découvrir be2web
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsContactPopupOpen(true)}
                  className="border-green-500/50 text-green-400 bg-white/10 backdrop-blur-sm hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Nous contacter
                </Button>
              </div>
            </div>
            
            {/* Right Content - Services */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Nos expertises
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 hover:border-blue-500/30 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Développement Web</h4>
                    <p className="text-zinc-400 text-sm">Applications web modernes avec React, Next.js, Node.js</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 hover:border-purple-500/30 transition-colors">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Intelligence Artificielle</h4>
                    <p className="text-zinc-400 text-sm">Intégration d&apos;IA, machine learning, automatisation</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 hover:border-cyan-500/30 transition-colors">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Solutions Mobiles</h4>
                    <p className="text-zinc-400 text-sm">Applications mobiles natives et web progressives</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 hover:border-emerald-500/30 transition-colors">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Optimisation & Performance</h4>
                    <p className="text-zinc-400 text-sm">SEO, vitesse, expérience utilisateur optimale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Integrations Section */}
      <section className="relative py-24 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                Intégrations
              </span>
              <span className="text-white font-extrabold text-5xl md:text-6xl ml-3">
                natives
              </span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Connectez IA Recrutement Pro à vos outils RH existants pour un workflow optimisé
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Integration 1 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-blue-500/30 transition-all duration-300 group text-center p-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Database className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">ATS Systems</h3>
              <p className="text-zinc-400 text-sm">Workday, BambooHR, Greenhouse</p>
            </Card>

            {/* Integration 2 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-purple-500/30 transition-all duration-300 group text-center p-6">
              <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Mail className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Email & CRM</h3>
              <p className="text-zinc-400 text-sm">Outlook, Gmail, Salesforce</p>
            </Card>

            {/* Integration 3 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-cyan-500/30 transition-all duration-300 group text-center p-6">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <FileText className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Job Boards</h3>
              <p className="text-zinc-400 text-sm">LinkedIn, Indeed, Monster</p>
            </Card>

            {/* Integration 4 */}
            <Card className="bg-zinc-900/60 border-white/10 hover:border-emerald-500/30 transition-all duration-300 group text-center p-6">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/30 transition-colors">
                <Settings className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">API & Webhooks</h3>
              <p className="text-zinc-400 text-sm">Intégration personnalisée</p>
            </Card>
          </div>
          

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-cyan-900/30">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">
              Prêt à révolutionner
            </span>
            <span className="text-white font-extrabold text-5xl md:text-6xl ml-3">
              votre recrutement ?
            </span>
          </h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Rejoignez les centaines d&apos;entreprises qui font confiance à IA Recrutement Pro 
            pour optimiser leur processus de recrutement.
          </p>
          
          <div className="flex flex-col gap-6 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 text-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Commencer une analyse
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="outline" 
                size="lg"
                asChild
                className="bg-blue-500/10 backdrop-blur-md border border-blue-500/50 text-white hover:bg-blue-500/20 hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-500/50 hover:text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-lg"
              >
                <Link href="/services/ia">
                  <Play className="mr-2 h-5 w-5 text-white" />
                  Voir une démo
                </Link>
              </Button>
              <Button 
                onClick={() => setIsContactPopupOpen(true)}
                variant="outline"
                size="lg"
                className="bg-purple-500/10 backdrop-blur-md border border-purple-500/50 text-white hover:bg-purple-500/20 hover:border-purple-500/70 hover:shadow-lg hover:shadow-purple-500/50 hover:text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5 text-white" />
                Nous contacter
              </Button>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-zinc-400">Précision d&apos;analyse</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">80%</div>
              <div className="text-zinc-400">Gain de temps</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
              <div className="text-zinc-400">Entreprises satisfaites</div>
            </div>
          </div>
          
          {/* Copyright intégré dans la dernière section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="text-center text-zinc-400">
              <a 
                href="https://be2web-agence.francoform.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors duration-300 hover:underline"
              >
                © 2024 be2web. Tous droits réservés. Made with ❤️
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />
      
      {/* Auth Popup */}
      {showAuthPopup && (
        <EmailVerificationPopup
          isOpen={showAuthPopup}
          onClose={handleAuthClose}
          onVerificationSuccess={handleAuthSuccess}
        />
      )}
      
      {/* Rate Limit Popup */}
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
    </div>
  );
}