import { Brain } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              IA Recrutement Pro
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              Accueil
            </a>
            <a href="/services/ia" className="text-gray-300 hover:text-white transition-colors">
              Services IA
            </a>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">
              À propos
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}