import Image from 'next/image'

export function Hero() {
  return (
    <section className="container mx-auto px-6 py-12 md:py-16 lg:py-20 text-center">
      <div className="flex justify-center items-center mb-4 md:mb-6">
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-xl shadow-lg">
          <Image 
            src="/IARecrutPRO.ico" 
            alt="IA Recrutement Pro" 
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
        IA Recrutement Pro
      </h1>
      
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-8">
        Transformez votre processus de recrutement avec l&apos;IA. 
        Analysez, classez et sélectionnez les meilleurs candidats en quelques secondes.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2 md:mb-4">
        <a 
          href="/services/ia" 
          className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
        >
          Commencer l&apos;analyse
        </a>
        <a 
          href="/about" 
          className="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-xl font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300"
        >
          En savoir plus
        </a>
      </div>
    </section>
  )
}