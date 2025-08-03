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
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2014 be2web. Tous droits réservés. Made with ❤️</p>
        </div>
      </div>
    </footer>
  )
}