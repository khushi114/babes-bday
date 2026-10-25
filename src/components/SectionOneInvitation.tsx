import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Sparkles, Heart } from 'lucide-react'
import { contentConfig } from '../contentConfig'
import { soundManager } from '../utils/audio'

interface SectionOneProps {
  onEnter: () => void
}

export const SectionOneInvitation: React.FC<SectionOneProps> = ({ onEnter }) => {
  const [showSecretModal, setShowSecretModal] = useState(false)
  const [isEntering, setIsEntering] = useState(false)

  const handleHiddenStarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    soundManager.playSecretFound()
    setShowSecretModal(true)
  }

  const handleEnterClick = () => {
    soundManager.playStarChime()
    soundManager.startMusic()
    setIsEntering(true)
    setTimeout(() => {
      onEnter()
    }, 600)
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden select-none bg-gradient-to-b from-[#261927] via-[#3a1d35] to-[#261927]">
      {/* Background Twilight Glow & Soft Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D9A0B0]/20 via-[#682D45]/30 to-transparent pointer-events-none" />

      {/* Floating Crescent Moon */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute top-12 md:top-20 right-8 md:right-28 pointer-events-none z-10"
      >
        <div className="relative">
          {/* Glowing Aura */}
          <div className="absolute -inset-4 bg-[#D7B878]/25 rounded-full blur-xl animate-pulse-subtle" />
          <svg
            className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_0_20px_rgba(215,184,120,0.6)]"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50 10 C30 10 15 25 15 50 C15 75 35 90 60 90 C45 80 40 60 45 40 C48 26 58 16 75 15 C67 11 58 10 50 10 Z"
              fill="url(#moonGrad)"
            />
            <defs>
              <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8F1" />
                <stop offset="50%" stopColor="#F8E3E9" />
                <stop offset="100%" stopColor="#D7B878" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Delicate Soft Floating Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          animate={{ x: [-40, 40, -40] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-96 h-40 bg-gradient-to-r from-transparent via-[#D9A0B0]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [30, -30, 30] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-2/3 -right-20 w-[30rem] h-48 bg-gradient-to-r from-transparent via-[#682D45]/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* TINY HIDDEN STAR (Secret Message Trigger) */}
      <div className="absolute top-28 md:top-36 left-12 md:left-32 z-30">
        <motion.button
          onClick={handleHiddenStarClick}
          whileHover={{ scale: 1.6 }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative group p-2 cursor-pointer focus:outline-none"
          title="A quiet glimmer in the night sky..."
          aria-label="Secret glowing star"
        >
          <div className="absolute inset-0 bg-[#D7B878]/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <Star className="w-3.5 h-3.5 text-[#D7B878] fill-[#D7B878] drop-shadow-[0_0_8px_rgba(215,184,120,0.8)]" />
        </motion.button>
      </div>

      {/* Secret Star Discovery Modal / Reveal */}
      <AnimatePresence>
        {showSecretModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -15 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setShowSecretModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full p-8 rounded-2xl glass-panel border border-[#D7B878]/50 text-center shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                <span className="p-3 rounded-full bg-[#682D45]/40 text-[#D7B878] border border-[#D7B878]/40 shadow-inner">
                  <Sparkles className="w-6 h-6 animate-spin [animation-duration:12s]" />
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#D7B878] mb-3 tracking-wide">
                You Found A Hidden Star ✨
              </h3>
              <p className="font-serif italic text-lg text-[#FFF8F1] leading-relaxed mb-6">
                "{contentConfig.sectionOne.hiddenStarMessage}"
              </p>
              <button
                onClick={() => setShowSecretModal(false)}
                className="px-6 py-2 rounded-full text-xs font-sans uppercase tracking-widest bg-[#682D45] hover:bg-[#853958] text-[#FFF8F1] border border-[#D7B878]/40 transition-all duration-300"
              >
                Keep in my heart ♡
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Box */}
      <motion.div
        animate={isEntering ? { opacity: 0, scale: 0.95, y: -30 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Handwritten line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#D9A0B0] mb-4 tracking-wide glow-text-rose"
        >
          {contentConfig.sectionOne.handwrittenIntro}
        </motion.p>

        {/* Main Reveal Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#FFF8F1] tracking-tight leading-tight mb-6"
        >
          Babesssss, <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F8E3E9] via-[#D7B878] to-[#D9A0B0]">
            I made a little universe
          </span>{' '}
          for you.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="text-base sm:text-lg text-[#F8E3E9]/80 font-sans font-light max-w-lg mb-10 leading-relaxed"
        >
          {contentConfig.sectionOne.supportingText}
        </motion.p>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        >
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#682D45] via-[#853958] to-[#682D45] border border-[#D7B878]/60 text-[#FFF8F1] font-sans text-sm tracking-wider uppercase font-semibold shadow-xl shadow-[#682D45]/50 hover:shadow-[#D7B878]/30 hover:border-[#D7B878] transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
          >
            {/* Shimmer light bar across button */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform" />

            <Sparkles className="w-4 h-4 text-[#D7B878] group-hover:rotate-45 transition-transform duration-500" />
            <span>{contentConfig.sectionOne.buttonText}</span>
            <Heart className="w-4 h-4 text-[#D9A0B0] group-hover:scale-125 transition-transform duration-300 fill-[#D9A0B0]/40" />
          </button>
        </motion.div>

        {/* Hint for the hidden star */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 3, duration: 2 }}
          className="mt-8 text-xs font-handwriting text-[#D9A0B0] flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-[#D7B878]" />
          <span>(psst... there is a secret star hidden in the sky above)</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
