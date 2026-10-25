import React, { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  color: string
  opacity: number
}

interface RosePetalsProps {
  active?: boolean
}

export const RosePetalsCanvas: React.FC<RosePetalsProps> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!active) return
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
    }

    window.addEventListener('resize', handleResize)

    const petalCount = 26
    const petals: Petal[] = []
    const petalColors = [
      '#D9A0B0', // Dusty rose
      '#F8E3E9', // Soft blush pink
      '#C87890', // Warm rose
      '#682D45', // Romantic burgundy translucent
    ]

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: Math.random() * 0.9 + 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.3,
      })
    }

    // Helper to draw a delicate organic rose petal shape
    const drawPetal = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 1.2, size * 0.6, 0, size * 1.4)
      ctx.bezierCurveTo(-size * 1.2, size * 0.6, -size * 0.8, -size * 0.8, 0, 0)
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of petals) {
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.4
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        if (p.y > height + 20) {
          p.y = -20
          p.x = Math.random() * width
        }
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20

        drawPetal(p.x, p.y, p.size, p.rotation, p.color, p.opacity)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  )
}
