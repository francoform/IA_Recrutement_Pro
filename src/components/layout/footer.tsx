export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-lg mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">IA Recrutement Pro</h3>
            <p className="text-gray-400 text-sm">
              Transformez votre processus de recrutement avec l&apos;intelligence artificielle.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/services/ia" className="hover:text-white transition-colors">Analyse IA</a></li>
              <li><a href="/services/consulting" className="hover:text-white transition-colors">Consulting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Contact</h4>
            <p className="text-sm text-gray-400">
              Email: contact@ia-recrutement-pro.com<br />
              Téléphone: +33 1 23 45 67 89
            </p>
            {/* Nouveau bouton glassmorphism be2web */}
            <div className="mt-4">
              <a 
                href="https://be2web-agence.francoform.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 hover:from-cyan-400/30 hover:to-blue-500/30 hover:border-cyan-300/50 hover:text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-sm font-medium"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">✨ Powered by be2web</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2014 be2web. Tous droits réservés. Made with ❤️</p>
        </div>
      </div>
    </footer>
  )
}