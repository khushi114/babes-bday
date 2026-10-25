import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star, RotateCcw, Flame } from 'lucide-react'
import confetti from 'canvas-confetti'
import { contentConfig } from '../contentConfig'
import { soundManager } from '../utils/audio'

export const SectionEightBirthdayWish: React.FC = () => {
  const { heading, subheading, buttonText, wishResponseText } = contentConfig.sectionEight
  const [wishSent, setWishSent] = useState(false)
  const [animatingStar, setAnimatingStar] = useState(false)

  const handleSendWish = () => {
    soundManager.playWishSent()
    setAnimatingStar(true)

    // Sparkle burst
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D7B878', '#D9A0B0', '#FFF8F1'],
    })

    setTimeout(() => {
      setWishSent(true)
      setAnimatingStar(false)
    }, 1200)
  }

  const handleReplay = () => {
    soundManager.playStarChime()
    setWishSent(false)
  }

  return (
    <section className="relative min-h-[90vh] py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Golden Aura Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D7B878]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Shooting Star Animation when wish is sent */}
      <AnimatePresence>
        {animatingStar && (
          <motion.div
            initial={{ x: 0, y: 100, scale: 0.5, opacity: 1 }}
            animate={{ x: 250, y: -450, scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 z-50 pointer-events-none"
          >
            <div className="relative">
              <Star className="w-8 h-8 text-[#FFF8F1] fill-[#FFF8F1] drop-shadow-[0_0_20px_rgba(255,248,241,1)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-2 bg-gradient-to-r from-[#D7B878] to-transparent blur-xs rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Glowing Candle In Golden Light */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mb-8"
        >
          {/* Candle Halo */}
          <div className="absolute -inset-6 bg-[#D7B878]/30 rounded-full blur-2xl animate-pulse" />

          {/* Candle Container */}
          <div className="relative w-16 h-36 flex flex-col items-center justify-end">
            {/* Flame */}
            <motion.div
              animate={{
                scaleY: [1, 1.25, 0.95, 1.2, 1],
                rotate: [-2, 2, -1, 3, 0],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative -mb-1 flex items-center justify-center"
            >
              <Flame className="w-10 h-10 text-[#FFD275] fill-[#FFD275] drop-shadow-[0_0_15px_rgba(255,210,117,0.9)]" />
            </motion.div>

            {/* Candle Body */}
            <div className="w-10 h-24 rounded-t-lg bg-gradient-to-b from-[#FFF8F1] via-[#F8E3E9] to-[#D9A0B0] border border-[#D7B878]/40 shadow-xl flex items-center justify-center">
              <div className="w-0.5 h-full bg-white/30" />
            </div>

            {/* Wax pool base */}
            <div className="w-16 h-3 bg-[#D7B878]/40 rounded-full blur-[1px]" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl font-light text-[#FFF8F1] tracking-tight mb-4"
        >
          {heading}
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#D9A0B0] mb-8"
        >
          {subheading}
        </motion.p>

        {/* Wish Button or Revealed Warm Blessing */}
        <AnimatePresence mode="wait">
          {!wishSent ? (
            <motion.div
              key="wish-button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleSendWish}
                disabled={animatingStar}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#682D45] via-[#a34b68] to-[#682D45] border border-[#D7B878]/60 text-[#FFF8F1] font-sans text-xs uppercase tracking-widest font-semibold shadow-xl shadow-[#682D45]/50 hover:shadow-[#D7B878]/40 hover:border-[#D7B878] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D7B878]" />
                <span>{buttonText}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="wish-revealed"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-3xl glass-panel border border-[#D7B878] shadow-2xl max-w-lg mx-auto"
            >
              <div className="flex justify-center mb-4">
                <Star className="w-7 h-7 text-[#D7B878] fill-[#D7B878] animate-spin [animation-duration:15s]" />
              </div>
              <p className="font-serif italic text-xl sm:text-2xl text-[#FFF8F1] leading-relaxed mb-6">
                "{wishResponseText}"
              </p>
              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-sans uppercase tracking-widest bg-white/10 hover:bg-white/20 text-[#D7B878] border border-[#D7B878]/30 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Make Another Wish ✨</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
