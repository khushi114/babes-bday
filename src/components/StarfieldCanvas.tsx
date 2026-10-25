import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  baseAlpha: number
  alpha: number
  speed: number
  flickerSpeed: number
  color: string
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  alpha: number
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initStars()
    }

    window.addEventListener('resize', handleResize)

    const starCount = Math.min(Math.floor((width * height) / 8000), 160)
    let stars: Star[] = []
    const shootingStars: ShootingStar[] = []

    const starColors = ['#FFF8F1', '#F8E3E9', '#D9A0B0', '#D7B878']

    const initStars = () => {
      stars = []
      for (let i = 0; i < starCount; i++) {
        const size = Math.random() < 0.85 ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 1.2
        const baseAlpha = Math.random() * 0.6 + 0.3
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseAlpha,
          alpha: baseAlpha,
          speed: (Math.random() - 0.5) * 0.15,
          flickerSpeed: Math.random() * 0.02 + 0.005,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        })
      }
    }

    initStars()

    // Trigger occasional shooting stars
    let lastShootingStarTime = Date.now()

    const addShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 10 + 12,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
        alpha: 1,
      })
    }

    let time = 0

    const render = () => {
      time++
      ctx.clearRect(0, 0, width, height)

      // Periodically add shooting star
      const now = Date.now()
      if (now - lastShootingStarTime > 8000 + Math.random() * 6000) {
        addShootingStar()
        lastShootingStarTime = now
      }

      // Draw stationary & twinkling stars
      for (const star of stars) {
        star.y += star.speed
        if (star.y < 0) star.y = height
        if (star.y > height) star.y = 0

        const flicker = Math.sin(time * star.flickerSpeed) * 0.25
        const currentAlpha = Math.max(0.1, Math.min(1, star.baseAlpha + flicker))

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = currentAlpha
        ctx.fill()

        // Soft halo on larger stars
        if (star.size > 1.8) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.globalAlpha = currentAlpha * 0.2
          ctx.fill()
        }
      }

      // Draw and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        const tailX = s.x - Math.cos(s.angle) * s.length
        const tailY = s.y - Math.sin(s.angle) * s.length

        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(255, 248, 241, ${s.alpha})`)
        gradient.addColorStop(0.5, `rgba(215, 184, 120, ${s.alpha * 0.6})`)
        gradient.addColorStop(1, 'rgba(215, 184, 120, 0)')

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tailX, tailY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.6
        ctx.stroke()

        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.alpha -= 0.015

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
