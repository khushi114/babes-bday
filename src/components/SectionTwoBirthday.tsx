import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, ChevronDown } from 'lucide-react'
import confetti from 'canvas-confetti'
import { contentConfig } from '../contentConfig'
import { soundManager } from '../utils/audio'

interface SectionTwoProps {
  onScrollToStory: () => void
}

export const SectionTwoBirthday: React.FC<SectionTwoProps> = ({ onScrollToStory }) => {
  const [candlesBlown, setCandlesBlown] = useState(false)

  const triggerCandleSparkles = () => {
    soundManager.playWishSent()
    setCandlesBlown(true)

    // Romantic rose gold confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D7B878', '#D9A0B0', '#F8E3E9', '#FFF8F1'],
      disableForReducedMotion: true,
    })
  }

  return (
    <section
      id="birthday-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Cinematic Golden Glow Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-gradient-to-tr from-[#682D45]/40 via-[#D7B878]/15 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-20 max-w-3xl w-full text-center flex flex-col items-center">
        {/* Subtle Decorative Floral Line Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-6"
        >
          <svg className="w-48 h-10 text-[#D7B878]/60 mx-auto" viewBox="0 0 200 40" fill="none">
            <path
              d="M10 20 Q50 5 100 20 T190 20"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <circle cx="100" cy="20" r="4" fill="#D7B878" />
            <circle cx="85" cy="18" r="2.5" fill="#D9A0B0" />
            <circle cx="115" cy="18" r="2.5" fill="#D9A0B0" />
            <path d="M100 12 L100 6" stroke="#D7B878" strokeWidth="1" />
            <path d="M96 9 L104 9" stroke="#D7B878" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Handcrafted Romantic Birthday Cake Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative mb-8 cursor-pointer group"
          onClick={triggerCandleSparkles}
          title="Click the cake for a birthday shimmer!"
        >
          {/* Subtle halo glow */}
          <div className="absolute -inset-4 bg-[#D7B878]/20 rounded-full blur-2xl group-hover:bg-[#D7B878]/35 transition-all duration-500" />

          <svg
            className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_10px_25px_rgba(215,184,120,0.3)] transition-transform duration-500 group-hover:scale-105"
            viewBox="0 0 160 160"
            fill="none"
          >
            {/* Cake Plate */}
            <ellipse cx="80" cy="140" rx="65" ry="12" fill="#D7B878" opacity="0.4" />
            <ellipse cx="80" cy="138" rx="60" ry="10" fill="#FFF8F1" opacity="0.15" />

            {/* Bottom Tier */}
            <path
              d="M30 100 C30 92 45 88 80 88 C115 88 130 92 130 100 L130 128 C130 136 115 140 80 140 C45 140 30 136 30 128 Z"
              fill="url(#cakeBaseGrad)"
            />
            <ellipse cx="80" cy="100" rx="50" ry="10" fill="#F8E3E9" opacity="0.7" />

            {/* Frosting drips bottom tier */}
            <path
              d="M30 100 C40 108 45 102 55 106 C65 110 75 102 85 107 C95 111 105 103 115 108 C125 104 128 102 130 100"
              stroke="#FFF8F1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Top Tier */}
            <path
              d="M45 68 C45 62 58 58 80 58 C102 58 115 62 115 68 L115 94 C115 100 102 104 80 104 C58 104 45 100 45 94 Z"
              fill="url(#cakeTopGrad)"
            />
            <ellipse cx="80" cy="68" rx="35" ry="8" fill="#FFF8F1" opacity="0.9" />

            {/* Candles */}
            <g className="transition-opacity duration-500">
              {/* Candle 1 */}
              <rect x="65" y="42" width="4" height="24" rx="2" fill="#D7B878" />
              {/* Candle 2 (Center) */}
              <rect x="78" y="38" width="4" height="28" rx="2" fill="#D9A0B0" />
              {/* Candle 3 */}
              <rect x="91" y="42" width="4" height="24" rx="2" fill="#D7B878" />

              {/* Candle Flames */}
              <motion.path
                animate={{
                  scaleY: candlesBlown ? [0.8, 1.2, 0.9] : [1, 1.3, 1],
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                d="M67 36 C64 39 65 42 67 42 C69 42 70 39 67 36 Z"
                fill="#FFD275"
                filter="url(#flameGlow)"
              />
              <motion.path
                animate={{
                  scaleY: candlesBlown ? [0.9, 1.3, 0.9] : [1.1, 1.4, 1.1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
                d="M80 30 C76 35 77 38 80 38 C83 38 84 35 80 30 Z"
                fill="#FFEF9F"
                filter="url(#flameGlow)"
              />
              <motion.path
                animate={{
                  scaleY: candlesBlown ? [0.8, 1.2, 0.9] : [1, 1.3, 1],
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{ duration: 1.4, repeat: Infinity }}
                d="M93 36 C90 39 91 42 93 42 C95 42 96 39 93 36 Z"
                fill="#FFD275"
                filter="url(#flameGlow)"
              />
            </g>

            {/* Definitions */}
            <defs>
              <linearGradient id="cakeBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#853958" />
                <stop offset="100%" stopColor="#4d1d32" />
              </linearGradient>
              <linearGradient id="cakeTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D9A0B0" />
                <stop offset="100%" stopColor="#682D45" />
              </linearGradient>
              <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>

          <span className="block mt-2 text-[11px] font-handwriting text-[#D7B878]/70 group-hover:text-[#D7B878] transition-colors">
            {candlesBlown ? '✨ A birthday wish in the making...' : 'Tap the cake to light up a little wish ♡'}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FFF8F1] tracking-tight mb-4"
        >
          {contentConfig.sectionTwo.mainHeading}
        </motion.h2>

        {/* Sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#D9A0B0] mb-6 glow-text-rose"
        >
          {contentConfig.sectionTwo.nextLine}
        </motion.p>

        {/* Supporting Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-serif italic text-lg sm:text-xl text-[#FFF8F1]/90 leading-relaxed max-w-2xl mb-10 px-4"
        >
          "{contentConfig.sectionTwo.supportingMessage}"
        </motion.p>

        {/* Button to Scroll to Story */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <button
            onClick={() => {
              soundManager.playStarChime()
              onScrollToStory()
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#261927]/90 border border-[#D7B878]/60 hover:border-[#D7B878] text-[#FFF8F1] font-sans text-xs uppercase tracking-widest font-medium shadow-lg hover:shadow-[#D7B878]/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>{contentConfig.sectionTwo.buttonText}</span>
            <ChevronDown className="w-4 h-4 text-[#D7B878] group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
