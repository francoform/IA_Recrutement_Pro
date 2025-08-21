import React from 'react';
import { Users, MessageSquare, Sparkles } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 border border-emerald-400/40 rounded-xl p-5 max-w-lg mx-auto mb-8 shadow-lg backdrop-blur-sm relative overflow-hidden">
      
      {/* Badge Beta flottant */}
      <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
        🚀 BETA
      </div>

      {/* Contenu principal */}
      <div className="text-center mt-2">
        {/* Titre avec animation subtile */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h3 className="text-emerald-400 font-bold text-lg md:text-xl">
            3 Analyses GRATUITES* / jour
          </h3>
          <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
        </div>

        {/* Public cible */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Users className="w-4 h-4 text-teal-400" />
          <span className="text-gray-300 text-sm font-medium">
            Indépendants • Artisans • PME • TPE
          </span>
        </div>

        {/* Encouragement aux retours */}
        <div className="flex items-center justify-center gap-1 mb-3">
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          <a 
            href="mailto:ia-recrutement-pro@francoform.com?subject=Retours sur IA Recrutement Pro&body=Bonjour,%0D%0A%0D%0AJe souhaite partager mes retours sur IA Recrutement Pro :%0D%0A%0D%0A"
            className="text-cyan-300 text-xs hover:text-cyan-200 transition-colors duration-200 underline decoration-dotted underline-offset-2"
          >
            Aidez-nous à améliorer avec vos retours !
          </a>
        </div>

        {/* Note légale */}
        <div className="border-t border-emerald-400/20 pt-2 mt-3">
          <p className="text-gray-400 text-xs italic opacity-80">
            * Pendant la version Beta uniquement
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;