import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowUp, Sparkles } from 'lucide-react'
import { contentConfig } from '../contentConfig'
import { soundManager } from '../utils/audio'

interface SectionNineProps {
  onReturnToTop: () => void
}

export const SectionNineLastLoveLetter: React.FC<SectionNineProps> = ({ onReturnToTop }) => {
  const { title, fullLetter, closingThought, returnButton } = contentConfig.sectionNine

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Decorative floral aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-[#D9A0B0]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Warm Ivory Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative bg-[#FFF8F1] text-[#261927] rounded-3xl p-8 sm:p-14 shadow-2xl border-4 border-[#D7B878]/60 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(#D9A0B0 0.6px, transparent 0.6px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Delicate Floral Corner SVG Illustrations */}
        <div className="absolute top-4 left-4 w-16 h-16 pointer-events-none text-[#D7B878]/50">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 90 Q10 10 90 10" />
            <circle cx="30" cy="30" r="4" fill="#D9A0B0" />
            <circle cx="50" cy="18" r="3" fill="#D7B878" />
            <circle cx="18" cy="50" r="3" fill="#D7B878" />
          </svg>
        </div>
        <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none text-[#D7B878]/50 rotate-90">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 90 Q10 10 90 10" />
            <circle cx="30" cy="30" r="4" fill="#D9A0B0" />
            <circle cx="50" cy="18" r="3" fill="#D7B878" />
            <circle cx="18" cy="50" r="3" fill="#D7B878" />
          </svg>
        </div>

        {/* Letter Header */}
        <div className="text-center mb-10 pt-4">
          <span className="text-[11px] font-sans uppercase tracking-widest text-[#853958] font-bold block mb-2">
            The Last Little Love Letter
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#682D45] tracking-tight">
            {title}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D7B878] to-transparent mx-auto mt-4" />
        </div>

        {/* Letter Paragraphs */}
        <div className="font-serif text-lg sm:text-xl leading-relaxed text-[#261927] space-y-5 max-w-2xl mx-auto">
          {fullLetter.split('\n\n').map((paragraph, pIdx) => (
            <motion.p
              key={pIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: pIdx * 0.05 }}
              className="leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Delicate Golden Wax Seal Stamp in Letter */}
        <div className="mt-12 pt-8 border-t border-[#D7B878]/30 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#682D45] text-[#D7B878] flex items-center justify-center shadow-lg border-2 border-[#D7B878] mb-3">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <span className="font-handwriting text-2xl text-[#853958]">
            Sealed with all my love ♡
          </span>
        </div>
      </motion.div>

      {/* Closing Epilogue Statement */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-center mt-16 max-w-2xl mx-auto flex flex-col items-center"
      >
        <p className="font-serif italic text-2xl sm:text-3xl text-[#FFF8F1] leading-relaxed mb-8">
          "{closingThought}"
        </p>

        {/* Return to Universe Button */}
        <button
          onClick={() => {
            soundManager.playStarChime()
            onReturnToTop()
          }}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#682D45] hover:bg-[#853958] border border-[#D7B878]/60 text-[#FFF8F1] font-sans text-xs uppercase tracking-widest font-semibold shadow-xl shadow-black/50 hover:shadow-[#D7B878]/30 transition-all duration-300 hover:-translate-y-1"
        >
          <Sparkles className="w-4 h-4 text-[#D7B878]" />
          <span>{returnButton}</span>
          <ArrowUp className="w-4 h-4 text-[#D7B878] group-hover:-translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  )
}
