import { Brain, Target, Zap } from 'lucide-react'

export function Features() {
  return (
    <section className="container mx-auto px-6 py-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl w-fit mb-4 shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analyse Automatique</h3>
          <p className="text-gray-400">Extraction et classification automatique des données CV en temps réel</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl w-fit mb-4 shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Scoring Intelligent</h3>
          <p className="text-gray-400">Notation dynamique basée sur la correspondance avec le poste</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl w-fit mb-4 shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Gain de Temps</h3>
          <p className="text-gray-400">Réduisez de 90% le temps d&apos;analyse manuelle des candidatures</p>
        </div>
      </div>
    </section>
  )
}