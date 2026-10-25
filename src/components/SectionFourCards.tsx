import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Feather,
  Sparkles,
  Compass,
  Heart,
  HeartHandshake,
  Stars,
  Bookmark,
} from 'lucide-react'
import { contentConfig } from '../contentConfig'
import { soundManager } from '../utils/audio'

export const SectionFourCards: React.FC = () => {
  const { heading, subheading, cards } = contentConfig.sectionFour
  const [activeCardId, setActiveCardId] = useState<number | null>(null)

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Feather':
        return <Feather className="w-5 h-5" />
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />
      case 'Compass':
        return <Compass className="w-5 h-5" />
      case 'Heart':
        return <Heart className="w-5 h-5 fill-current" />
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />
      case 'Stars':
        return <Stars className="w-5 h-5" />
      default:
        return <Sparkles className="w-5 h-5" />
    }
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#682D45]/30 border border-[#D7B878]/30 text-[#D7B878] text-xs uppercase tracking-widest mb-3"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Pages From My Diary</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl font-light text-[#FFF8F1] tracking-tight mb-3"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-handwriting text-2xl text-[#D9A0B0]"
        >
          {subheading}
        </motion.p>
      </div>

      {/* Diary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {cards.map((card, idx) => {
          const isSelected = activeCardId === card.id

          // Special Full Featured Card for "Two Firsts, A Thousand Feelings ♡"
          if (card.isSpecialFirsts) {
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative md:col-span-2 lg:col-span-3 cursor-default"
              >
                {/* Washi tape header */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#D7B878]/40 backdrop-blur-sm border-l-2 border-r-2 border-[#FFF8F1]/60 -rotate-1 z-20 shadow-sm" />

                <div
                  className="relative p-7 sm:p-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D7B878]/70 text-[#261927]"
                  style={{
                    background: 'linear-gradient(135deg, #FFFDF9 0%, #F8E3E9 50%, #FFF8F1 100%)',
                    backgroundImage: 'radial-gradient(#D9A0B0 0.5px, transparent 0.5px)',
                    backgroundSize: '22px 22px',
                  }}
                >
                  {/* Subtle Floating Star Accents in background */}
                  <div className="absolute top-4 right-6 text-[#D7B878]/40 animate-pulse">
                    <Stars className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-4 left-6 text-[#D9A0B0]/40">
                    <Sparkles className="w-5 h-5" />
                  </div>

                  {/* Two Delicate Glowing Lights Gently Coming Together */}
                  <div className="relative w-full py-4 flex items-center justify-center">
                    <div className="relative w-40 h-16 flex items-center justify-center">
                      {/* Ambient blur glow between them */}
                      <div className="absolute inset-0 bg-[#D9A0B0]/20 rounded-full blur-xl animate-pulse" />

                      {/* Light 1: Golden Light (Parthiv) */}
                      <motion.div
                        animate={{
                          x: [-24, 0, -24],
                          scale: [0.9, 1.15, 0.9],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative z-10 flex items-center justify-center"
                      >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D7B878] to-[#FFF8F1] shadow-[0_0_20px_rgba(215,184,120,0.8)] border border-[#FFF8F1]/80 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-[#682D45]" />
                        </div>
                      </motion.div>

                      {/* Gentle Center Meeting Sparkle */}
                      <motion.div
                        animate={{
                          scale: [0.6, 1.3, 0.6],
                          opacity: [0.2, 0.9, 0.2],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="mx-1 z-20"
                      >
                        <Heart className="w-4 h-4 text-[#853958] fill-[#853958]" />
                      </motion.div>

                      {/* Light 2: Rose Light (Your Happiness) */}
                      <motion.div
                        animate={{
                          x: [24, 0, 24],
                          scale: [0.9, 1.15, 0.9],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative z-10 flex items-center justify-center"
                      >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D9A0B0] to-[#FFF8F1] shadow-[0_0_20px_rgba(217,160,176,0.8)] border border-[#FFF8F1]/80 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-[#682D45]" />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Elegant Handwritten Heading */}
                  <div className="text-center mb-6">
                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#853958] font-bold block mb-1">
                      A Chapter of Precious Firsts
                    </span>
                    <h3 className="font-handwriting text-3xl sm:text-4xl text-[#682D45] tracking-wide">
                      {card.firstsTitle || 'Two Firsts, A Thousand Feelings ♡'}
                    </h3>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D7B878] to-transparent mx-auto mt-2" />
                  </div>

                  {/* Tender, Respectful First Hug and First Kiss Passage */}
                  <div className="max-w-2xl mx-auto space-y-4 font-serif text-base sm:text-lg text-[#261927] leading-relaxed text-center sm:text-left">
                    {card.firstsParagraphs ? (
                      card.firstsParagraphs.map((para, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="whitespace-pre-line leading-relaxed">{card.text}</p>
                    )}
                  </div>

                  {/* Bottom intimate signature */}
                  <div className="mt-6 pt-4 border-t border-[#D7B878]/30 flex items-center justify-between text-xs text-[#853958]">
                    <span className="font-handwriting text-xl text-[#682D45]">
                      kept safe in my heart forever
                    </span>
                    <span className="font-sans text-[11px] tracking-wider uppercase font-medium">
                      — your happiness ♡
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          }

          // Regular concise cards
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              whileHover={{ y: -5, rotate: idx % 2 === 0 ? 0.6 : -0.6 }}
              onClick={() => {
                soundManager.playStarChime()
                setActiveCardId(isSelected ? null : card.id)
              }}
              className="relative cursor-pointer group"
            >
              {/* Diary Washi Tape Element at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#D7B878]/30 backdrop-blur-sm border-l border-r border-[#FFF8F1]/40 rotate-1 z-20 shadow-sm" />

              <div
                className={`relative h-full p-6 sm:p-7 rounded-3xl transition-all duration-300 overflow-hidden glass-panel border flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#D7B878] shadow-2xl shadow-[#D7B878]/20 bg-[#351e36]/80'
                    : 'border-[#D7B878]/30 hover:border-[#D7B878]/60'
                }`}
              >
                {/* Background ambient gradient */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[#D9A0B0]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Card Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-2xl bg-[#682D45]/40 text-[#D7B878] border border-[#D7B878]/30 group-hover:scale-110 transition-transform duration-300">
                      {getIcon(card.iconName)}
                    </div>
                    <span className="font-handwriting text-lg text-[#D7B878]/60">
                      No. 0{card.id}
                    </span>
                  </div>

                  {/* Subtitle tag */}
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#D9A0B0] font-medium block mb-1">
                    {card.tagline}
                  </span>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FFF8F1] mb-3 group-hover:text-[#F8E3E9] transition-colors">
                    {card.title}
                  </h3>

                  {/* Shortened concise body text */}
                  <p className="font-serif italic text-base sm:text-lg text-[#FFF8F1]/90 leading-relaxed">
                    "{card.text}"
                  </p>
                </div>

                {/* Interactive bottom hint */}
                <div className="mt-5 pt-3 border-t border-[#D7B878]/15 flex items-center justify-between text-xs text-[#D7B878]/70">
                  <span className="font-handwriting text-sm">written with love ♡</span>
                  <span className="text-[10px] tracking-wider uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    {isSelected ? 'Cherished' : 'Tap to cherish'}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
