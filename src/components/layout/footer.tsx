"use client";

export function Footer() {
  return (
    <footer className="mt-20 pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Footer simple sans logo */}
            <button 
              onClick={() => window.open('https://be2web-agence.francoform.com/', '_blank')}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95 z-50 relative"
            >
              <span>&copy; 2014 be2web. Tous droits réservés. Made with ❤️</span>
            </button>
      </div>
    </footer>
  )
}