import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, X, Heart, Sparkles } from 'lucide-react'
import { contentConfig } from '../contentConfig'
import { soundManager } from '../utils/audio'

export const SectionFiveEnvelopes: React.FC = () => {
  const { heading, subheading, envelopes } = contentConfig.sectionFive
  const [openedEnvelopeId, setOpenedEnvelopeId] = useState<string | null>(null)

  const activeEnvelope = envelopes.find((e) => e.id === openedEnvelopeId)

  const handleOpenEnvelope = (id: string) => {
    soundManager.playEnvelopeOpen()
    setOpenedEnvelopeId(id)
  }

  const handleCloseEnvelope = () => {
    soundManager.playStarChime()
    setOpenedEnvelopeId(null)
  }

  // Visual styling depending on colorTheme
  const getThemeStyles = (theme: 'blush' | 'ivory' | 'burgundy') => {
    switch (theme) {
      case 'blush':
        return {
          bg: 'bg-gradient-to-b from-[#F8E3E9] to-[#D9A0B0]',
          border: 'border-[#D9A0B0]',
          text: 'text-[#682D45]',
          sealBg: 'bg-[#682D45]',
          sealText: 'text-[#F8E3E9]',
          ribbonColor: '#682D45',
        }
      case 'ivory':
        return {
          bg: 'bg-gradient-to-b from-[#FFFDF9] to-[#FFF8F1]',
          border: 'border-[#D7B878]',
          text: 'text-[#261927]',
          sealBg: 'bg-[#D7B878]',
          sealText: 'text-[#261927]',
          ribbonColor: '#D7B878',
        }
      case 'burgundy':
        return {
          bg: 'bg-gradient-to-b from-[#853958] to-[#4d1d32]',
          border: 'border-[#D7B878]/60',
          text: 'text-[#FFF8F1]',
          sealBg: 'bg-[#D7B878]',
          sealText: 'text-[#261927]',
          ribbonColor: '#D7B878',
        }
    }
  }

  return (
    <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#682D45]/30 border border-[#D7B878]/30 text-[#D7B878] text-xs uppercase tracking-widest mb-4"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Keep These Close</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl font-light text-[#FFF8F1] tracking-tight mb-4"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-handwriting text-2xl text-[#D9A0B0]"
        >
          {subheading}
        </motion.p>
      </div>

      {/* 3 Envelopes Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {envelopes.map((env, idx) => {
          const styles = getThemeStyles(env.colorTheme)

          return (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleOpenEnvelope(env.id)}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              {/* Envelope Body */}
              <div
                className={`w-full aspect-[4/3] rounded-2xl relative shadow-2xl overflow-hidden border ${styles.border} ${styles.bg} transition-transform duration-300`}
                style={{ perspective: '1000px' }}
              >
                {/* Diagonal envelope crease lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" />
                  <line x1="100%" y1="0" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" />
                  <line x1="0" y1="100%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" />
                  <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" />
                </svg>

                {/* Decorative Satin Ribbon Crossing */}
                <div
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 opacity-40 shadow-inner"
                  style={{ backgroundColor: styles.ribbonColor }}
                />

                {/* Wax Seal in Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full ${styles.sealBg} ${styles.sealText} flex items-center justify-center shadow-lg border-2 border-[#D7B878]/50 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-[10px] uppercase font-sans tracking-widest font-semibold mt-1 opacity-80">
                    {env.sealText}
                  </span>
                </div>

                {/* Top Flap Effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 origin-top group-hover:opacity-80 transition-all duration-300" />
              </div>

              {/* Handwritten Envelope Label Below */}
              <div className="mt-4 text-center">
                <span className="font-handwriting text-2xl text-[#FFF8F1] group-hover:text-[#D7B878] transition-colors block">
                  "{env.title}"
                </span>
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#D9A0B0]/80 group-hover:text-[#D9A0B0] flex items-center justify-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3 text-[#D7B878]" />
                  <span>Click to open letter</span>
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Realistic Letter Modal Dialog */}
      <AnimatePresence>
        {activeEnvelope && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={handleCloseEnvelope}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full max-h-[85vh] overflow-y-auto bg-[#FFF8F1] text-[#261927] rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-[#D7B878]/50"
              style={{
                backgroundImage: 'radial-gradient(#D9A0B0 0.5px, transparent 0.5px)',
                backgroundSize: '20px 20px',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseEnvelope}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#261927]/10 hover:bg-[#261927]/20 text-[#261927] transition-colors"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-[#D7B878]/40 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#853958] font-bold">
                    For Parthiv (Babesssss)
                  </span>
                  <h3 className="font-handwriting text-3xl text-[#682D45] mt-1">
                    {activeEnvelope.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#682D45] text-[#FFF8F1] flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
              </div>

              {/* Letter Content */}
              <div className="font-serif text-lg sm:text-xl leading-relaxed text-[#261927] space-y-4 whitespace-pre-line">
                {activeEnvelope.letter}
              </div>

              {/* Letter Footer */}
              <div className="mt-8 pt-6 border-t border-[#D7B878]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-handwriting text-2xl text-[#853958]">
                  Forever in your corner ♡
                </span>
                <button
                  onClick={handleCloseEnvelope}
                  className="px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest font-semibold bg-[#682D45] hover:bg-[#853958] text-[#FFF8F1] transition-colors shadow-md"
                >
                  Fold & Put Away ♡
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
