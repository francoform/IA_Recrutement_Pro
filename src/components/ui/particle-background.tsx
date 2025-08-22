'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  pulsePhase: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration des particules
    const PARTICLE_COUNT = 80
    const colors = [
      '#06b6d4', // Cyan
      '#e440b4', // Rose/Magenta
      '#ff6600', // Orange
      '#00C755', // Vert
      '#8b5cf6', // Violet
      '#f59e0b', // Amber
      '#ef4444', // Rouge
      '#10b981'  // Emerald
    ]

    // Fonction pour redimensionner le canvas
    function resizeCanvas() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    // Initialiser les particules
    function initParticles() {
      if (!canvas) return
      particlesRef.current = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Vitesse horizontale lente
          vy: (Math.random() - 0.5) * 0.5, // Vitesse verticale lente
          size: Math.random() * 3 + 0.5, // Tailles variées de 0.5 à 3.5px
          opacity: Math.random() * 0.8 + 0.2, // Opacité entre 0.2 et 1
          color: colors[Math.floor(Math.random() * colors.length)],
          pulsePhase: Math.random() * Math.PI * 2 // Phase de pulsation aléatoire
        })
      }
    }

    // Fonction d'animation
    function animate() {
      if (!ctx || !canvas) return

      // Effacer le canvas avec un fond transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Dessiner et animer chaque particule
      particlesRef.current.forEach((particle) => {
        // Mettre à jour la position
        particle.x += particle.vx
        particle.y += particle.vy

        // Rebond sur les bords
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Effet de pulsation
        const pulse = Math.sin(time * 2 + particle.pulsePhase) * 0.3 + 0.7
        const currentOpacity = particle.opacity * pulse
        const currentSize = particle.size * pulse

        // Dessiner la particule avec un effet de glow
        ctx.save()
        
        // Glow effect
        ctx.shadowColor = particle.color
        ctx.shadowBlur = currentSize * 3
        ctx.globalAlpha = currentOpacity * 0.8
        
        // Particule principale
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Centre plus lumineux
        ctx.shadowBlur = 0
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize * 0.3, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      })

      // Dessiner des connexions entre particules proches (effet constellation)
      ctx.save()
      particlesRef.current.forEach((particle1, i) => {
        particlesRef.current.slice(i + 1).forEach((particle2) => {
          const dx = particle1.x - particle2.x
          const dy = particle1.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Connecter les particules si elles sont assez proches
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.15
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle1.x, particle1.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.stroke()
          }
        })
      })
      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    // Gestionnaire de redimensionnement
    function handleResize() {
      resizeCanvas()
      initParticles()
    }

    // Initialisation
    resizeCanvas()
    initParticles()
    animate()

    // Écouter les redimensionnements
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}