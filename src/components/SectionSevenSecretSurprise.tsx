import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Sparkles, Heart, X, Lock } from 'lucide-react'
import confetti from 'canvas-confetti'
import { contentConfig } from '../contentConfig'
import { soundManager } from '../utils/audio'

type SurpriseStep = 'idle' | 'star-trail' | 'constellation-formed' | 'letter-opened'

export const SectionSevenSecretSurprise: React.FC = () => {
  const {
    clueText,
    buttonLabel,
    starTrailSteps,
    constellationRevealHeading,
    sealedLetterLabel,
    finalSecretMessage,
  } = contentConfig.sectionSeven

  const [activeStep, setActiveStep] = useState<SurpriseStep>('idle')
  const [currentStarIndex, setCurrentStarIndex] = useState<number>(0)

  // Positions for the 5 stars on screen in star trail mode (percentages)
  const starCoords = [
    { x: 18, y: 35 },
    { x: 34, y: 62 },
    { x: 50, y: 30 },
    { x: 66, y: 65 },
    { x: 82, y: 40 },
  ]

  const handleStartSurprise = () => {
    soundManager.playSecretFound()
    setCurrentStarIndex(0)
    setActiveStep('star-trail')
  }

  const handleStarClick = (idx: number) => {
    if (idx !== currentStarIndex) return
    soundManager.playStarChime()

    if (idx < starTrailSteps.length - 1) {
      setCurrentStarIndex(idx + 1)
    } else {
      // Reached the final 5th star! Transform into constellation
      setTimeout(() => {
        soundManager.playSecretFound()
        setActiveStep('constellation-formed')
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D7B878', '#D9A0B0', '#FFF8F1'],
        })
      }, 700)
    }
  }

  const handleOpenSealedLetter = () => {
    soundManager.playEnvelopeOpen()
    setActiveStep('letter-opened')
  }

  const handleClose = () => {
    setActiveStep('idle')
    setCurrentStarIndex(0)
  }

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Step 1: The Clue in Page Flow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative text-center p-8 sm:p-12 rounded-3xl glass-panel border border-[#D7B878]/50 shadow-2xl overflow-hidden"
      >
        {/* Shimmering background radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#D7B878]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#682D45] border border-[#D7B878] flex items-center justify-center text-[#D7B878] mb-4 shadow-[0_0_20px_rgba(215,184,120,0.5)]">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="font-handwriting text-3xl sm:text-4xl text-[#D9A0B0] mb-3">
            {clueText}
          </h3>

          <p className="font-serif italic text-base sm:text-lg text-[#FFF8F1]/80 max-w-lg mb-8 leading-relaxed">
            A trail of stars is waiting to show you how our universe came together.
          </p>

          <button
            onClick={handleStartSurprise}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D7B878] via-[#F8E3E9] to-[#D7B878] text-[#261927] font-sans text-xs uppercase tracking-widest font-bold shadow-xl shadow-[#D7B878]/30 hover:shadow-[#D7B878]/60 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Star className="w-4 h-4 fill-current text-[#261927] group-hover:rotate-180 transition-transform duration-700" />
            <span>{buttonLabel}</span>
            <Sparkles className="w-4 h-4 text-[#682D45]" />
          </button>
        </div>
      </motion.div>

      {/* FULL-SCREEN IMMERSIVE SURPRISE EXPERIENCE MODAL */}
      <AnimatePresence>
        {activeStep !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140c17]/95 backdrop-blur-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF8F1] transition-colors"
              aria-label="Close surprise"
            >
              <X className="w-6 h-6" />
            </button>

            {/* STAGE 2: THE STAR TRAIL */}
            {activeStep === 'star-trail' && (
              <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
                {/* Header Guide */}
                <div className="absolute top-10 text-center px-4">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#D7B878] font-semibold block mb-1">
                    Step {currentStarIndex + 1} of {starTrailSteps.length}
                  </span>
                  <p className="font-handwriting text-2xl sm:text-3xl text-[#FFF8F1]">
                    Touch the glowing star to reveal the next memory...
                  </p>
                </div>

                {/* Sky Area with Trail */}
                <div className="relative w-full max-w-4xl h-[65vh]">
                  {/* Connecting SVG Constellation Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {starCoords.map((coord, i) => {
                      if (i >= currentStarIndex || i === 0) return null
                      const prevCoord = starCoords[i - 1]
                      return (
                        <motion.line
                          key={`line-${i}`}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 0.8 }}
                          x1={`${prevCoord.x}%`}
                          y1={`${prevCoord.y}%`}
                          x2={`${coord.x}%`}
                          y2={`${coord.y}%`}
                          stroke="#D7B878"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      )
                    })}
                  </svg>

                  {/* 5 Stars */}
                  {starCoords.map((coord, idx) => {
                    const isUnlocked = idx <= currentStarIndex
                    const isCurrent = idx === currentStarIndex

                    return (
                      <div
                        key={idx}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
                      >
                        {/* Glow halo if active */}
                        {isCurrent && (
                          <div className="absolute -inset-4 bg-[#D7B878]/30 rounded-full blur-lg animate-pulse" />
                        )}

                        <motion.button
                          onClick={() => handleStarClick(idx)}
                          whileHover={{ scale: isCurrent ? 1.3 : 1.1 }}
                          animate={
                            isCurrent
                              ? { scale: [1, 1.25, 1], rotate: [0, 15, 0] }
                              : { scale: 1 }
                          }
                          transition={{ duration: 1.8, repeat: isCurrent ? Infinity : 0 }}
                          className={`relative p-3.5 rounded-full border transition-all duration-500 cursor-pointer ${
                            isCurrent
                              ? 'bg-[#D7B878] text-[#261927] border-white shadow-[0_0_25px_rgba(215,184,120,0.8)]'
                              : isUnlocked
                              ? 'bg-[#682D45] text-[#D7B878] border-[#D7B878]/40'
                              : 'bg-white/5 text-gray-500 border-white/10 opacity-30 cursor-not-allowed'
                          }`}
                          aria-label={`Star ${idx + 1}`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              isUnlocked ? 'fill-current' : ''
                            }`}
                          />
                        </motion.button>

                        {/* Revealed Phrase tooltip beneath star */}
                        {isUnlocked && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute top-14 left-1/2 -translate-x-1/2 w-48 sm:w-60 p-3 rounded-xl glass-panel border border-[#D7B878]/40 text-center shadow-lg pointer-events-none"
                          >
                            <p className="font-serif italic text-sm text-[#FFF8F1]">
                              "{starTrailSteps[idx]}"
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STAGE 3: CONSTELLATION FORMED & SEALED LOVE LETTER */}
            {activeStep === 'constellation-formed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative max-w-xl w-full text-center flex flex-col items-center"
              >
                {/* Glowing Heart Constellation SVG */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative w-48 h-48 mb-6 flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-[#D9A0B0]/20 rounded-full blur-3xl animate-pulse" />
                  <svg className="w-40 h-40 drop-shadow-[0_0_25px_rgba(217,160,176,0.8)]" viewBox="0 0 100 100">
                    <path
                      d="M50 85 C20 60 5 45 5 25 C5 12 15 5 28 5 C38 5 46 12 50 18 C54 12 62 5 72 5 C85 5 95 12 95 25 C95 45 80 60 50 85 Z"
                      stroke="#D7B878"
                      strokeWidth="2"
                      fill="rgba(104, 45, 69, 0.4)"
                      strokeDasharray="4 3"
                    />
                    {/* Glowing Star Nodes on Heart */}
                    <circle cx="28" cy="18" r="3" fill="#FFF8F1" />
                    <circle cx="50" cy="18" r="3.5" fill="#D7B878" />
                    <circle cx="72" cy="18" r="3" fill="#FFF8F1" />
                    <circle cx="90" cy="30" r="3" fill="#D9A0B0" />
                    <circle cx="10" cy="30" r="3" fill="#D9A0B0" />
                    <circle cx="50" cy="85" r="4" fill="#D7B878" />
                  </svg>
                </motion.div>

                {/* Constellation Heading */}
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FFF8F1] mb-6 px-4">
                  "{constellationRevealHeading}"
                </h3>

                {/* Sealed Letter Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenSealedLetter}
                  className="group relative p-6 sm:p-8 rounded-3xl bg-[#682D45] border-2 border-[#D7B878] shadow-2xl flex flex-col items-center gap-3 cursor-pointer text-[#FFF8F1]"
                >
                  <div className="w-14 h-14 rounded-full bg-[#D7B878] text-[#261927] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Heart className="w-7 h-7 fill-current" />
                  </div>
                  <span className="font-handwriting text-3xl text-[#FFF8F1]">
                    {sealedLetterLabel}
                  </span>
                  <span className="text-xs uppercase font-sans tracking-widest text-[#D7B878] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Touch to break seal & open letter</span>
                  </span>
                </motion.button>
              </motion.div>
            )}

            {/* STAGE 4: OPENED FINAL SECRET LETTER */}
            {activeStep === 'letter-opened' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-[#FFF8F1] text-[#261927] rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-[#D7B878]"
                style={{
                  backgroundImage: 'radial-gradient(#D9A0B0 0.5px, transparent 0.5px)',
                  backgroundSize: '24px 24px',
                }}
              >
                {/* Floating Starlight Particle background in letter */}
                <div className="border-b border-[#D7B878]/40 pb-5 mb-8 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-sans uppercase tracking-widest text-[#853958] font-bold">
                      A Secret Written For You
                    </span>
                    <h2 className="font-handwriting text-4xl text-[#682D45] mt-1">
                      Babesssss ♡
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#682D45] text-[#D7B878] flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

                {/* Full Secret Message Text */}
                <div className="font-serif text-lg sm:text-xl leading-relaxed text-[#261927] space-y-5 whitespace-pre-line">
                  {finalSecretMessage}
                </div>

                {/* Footer Controls */}
                <div className="mt-10 pt-6 border-t border-[#D7B878]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-handwriting text-2xl text-[#853958]">
                    Forever your happiness ♡
                  </span>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest font-semibold bg-[#682D45] hover:bg-[#853958] text-[#FFF8F1] transition-colors shadow-md"
                  >
                    Close Secret Universe
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
