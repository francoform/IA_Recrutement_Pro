'use client';

import { useState, useEffect } from 'react';
import { X, Clock, AlertTriangle } from 'lucide-react';

interface RateLimitPopupProps {
  isOpen: boolean;
  onClose: () => void;
  resetTime?: string; // Timestamp de reset
  limitType: 'ip' | 'email';
  currentCount: number;
  maxCount: number;
}

export default function RateLimitPopup({
  isOpen,
  onClose,
  resetTime,
  limitType,
  currentCount,
  maxCount
}: RateLimitPopupProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!resetTime) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const reset = new Date(resetTime).getTime();
      const diff = reset - now;

      if (diff <= 0) {
        setTimeRemaining('Limite réinitialisée');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [resetTime]);

  if (!isOpen) return null;

  const getLimitMessage = () => {
    if (limitType === 'ip') {
      return {
        title: 'Limite d&apos;analyses atteinte',
        description: `Vous avez effectué ${currentCount}/${maxCount} analyses autorisées par heure depuis votre adresse IP.`,
        resetMessage: 'Votre quota sera réinitialisé dans :'
      };
    } else {
      return {
        title: 'Limite quotidienne atteinte',
        description: `Vous avez effectué ${currentCount}/${maxCount} analyses autorisées par jour avec cette adresse email.`,
        resetMessage: 'Votre quota sera réinitialisé dans :'
      };
    }
  };

  const { title, description, resetMessage } = getLimitMessage();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-white/90 text-sm mt-1">Limite temporaire</p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Compteur de temps */}
          {resetTime && timeRemaining && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-gray-800">{resetMessage}</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 text-center">
                {timeRemaining}
              </div>
            </div>
          )}

          {/* Informations supplémentaires */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Le saviez-vous ?</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Votre session d&apos;authentification reste valide pendant <strong>24 heures</strong>, 
              même si vous fermez votre navigateur. Vous n&apos;aurez pas besoin de re-vérifier 
              votre email lors de votre prochaine visite !
            </p>
          </div>

          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            J&apos;ai compris
          </button>
        </div>
      </div>
    </div>
  );
}