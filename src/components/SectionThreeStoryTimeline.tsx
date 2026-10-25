import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Compass, Sun, Heart } from 'lucide-react'
import { contentConfig } from '../contentConfig'

export const SectionThreeStoryTimeline: React.FC = () => {
  const { timelineHeading, timelineSubheading, chapters, timelineFooter } = contentConfig.sectionThree

  return (
    <section id="story-section" className="relative min-h-screen py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#682D45]/30 border border-[#D7B878]/30 text-[#D7B878] text-xs uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl font-light text-[#FFF8F1] tracking-tight mb-4"
        >
          {timelineHeading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-handwriting text-2xl text-[#D9A0B0]"
        >
          {timelineSubheading}
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central Connecting Golden Line (Hidden on mobile, centered on md+) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D7B878]/60 to-transparent" />
        {/* Mobile Left Golden Line */}
        <div className="md:hidden absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#D7B878]/60 to-transparent" />

        {/* Chapters */}
        <div className="space-y-16 md:space-y-24">
          {chapters.map((ch, idx) => {
            const isEven = idx % 2 === 0

            return (
              <motion.div
                key={ch.tag}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#261927] border-2 border-[#D7B878] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(215,184,120,0.5)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D9A0B0] animate-pulse" />
                </div>

                {/* Content Card (Half Width) */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="relative p-6 sm:p-8 rounded-3xl glass-panel border border-[#D7B878]/30 hover:border-[#D7B878]/60 transition-all duration-500 group shadow-xl">
                    {/* Chapter Tag & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-sans text-[11px] uppercase tracking-widest text-[#D7B878] font-semibold">
                        {ch.tag}
                      </span>
                      {ch.dateTag && (
                        <span className="text-xs font-handwriting text-[#D9A0B0] bg-[#682D45]/40 px-2.5 py-0.5 rounded-full border border-[#D9A0B0]/20">
                          {ch.dateTag}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FFF8F1] mb-4 group-hover:text-[#F8E3E9] transition-colors">
                      {ch.title}
                    </h3>

                    {/* Story Paragraphs */}
                    <div className="space-y-3 text-[#FFF8F1]/85 font-sans font-light text-sm sm:text-base leading-relaxed">
                      {ch.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Pull Quote */}
                    <div className="mt-5 pt-4 border-t border-[#D7B878]/20 flex items-center gap-2 text-xs font-serif italic text-[#D7B878]">
                      <span>“{ch.quote}”</span>
                    </div>
                  </div>
                </div>

                {/* Visual Art Artwork for this Chapter */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 flex justify-center">
                  <div className="relative w-full max-w-sm h-64 rounded-2xl overflow-hidden glass-panel border border-[#D7B878]/30 flex items-center justify-center p-6 text-center shadow-lg">
                    {/* Chapter 1 Visual: Vintage film frame + Constellations */}
                    {ch.theme === 'almost' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#682D45]/30 via-transparent to-[#D7B878]/10" />
                        <svg className="w-full h-full text-[#D7B878]/40" viewBox="0 0 200 150">
                          {/* Vintage Film Frame Spockets */}
                          <rect x="5" y="5" width="190" height="140" rx="6" stroke="#D7B878" strokeWidth="1" strokeDasharray="6 4" fill="none" opacity="0.3" />
                          {/* Orbiting Path Lines */}
                          <ellipse cx="70" cy="75" rx="55" ry="35" stroke="#D9A0B0" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.5" />
                          <ellipse cx="130" cy="75" rx="55" ry="35" stroke="#D7B878" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.5" />
                          {/* Two Paths Brushing */}
                          <circle cx="95" cy="65" r="4" fill="#FFF8F1" className="animate-pulse" />
                          <circle cx="105" cy="85" r="4" fill="#D7B878" className="animate-pulse" />
                          <line x1="95" y1="65" x2="105" y2="85" stroke="#D7B878" strokeWidth="1" strokeDasharray="2 2" />
                        </svg>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <p className="font-handwriting text-lg text-[#D9A0B0]">
                            Crossed paths, waiting for our time
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Chapter 2 Visual: Golden Sunset, Amber glow, Festive Twilight */}
                    {ch.theme === 'ganpati' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                        {/* Sunset Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#682D45] via-[#a34b68]/40 to-[#d7b878]/30" />
                        {/* Sun setting over water ripples */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-t from-[#FFD275] to-[#FFF8F1] shadow-[0_0_35px_rgba(255,210,117,0.7)] flex items-center justify-center mb-3">
                            <Sun className="w-8 h-8 text-[#682D45]/70" />
                          </div>
                          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D7B878] to-transparent rounded-full mb-1 opacity-70" />
                          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FFD275] to-transparent rounded-full opacity-50" />
                          <p className="font-handwriting text-lg text-[#FFF8F1] mt-3">
                            Ganpati Visarjan — The Day Everything Changed
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Chapter 3 Visual: Twin Lights Connecting in Night Sky */}
                    {ch.theme === 'twoweeks' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D9A0B0]/20 via-transparent to-transparent" />
                        <div className="relative flex items-center justify-center gap-6">
                          {/* Star 1 */}
                          <motion.div
                            animate={{ scale: [1, 1.2, 1], y: [0, -4, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#D7B878]/30 border border-[#D7B878] flex items-center justify-center shadow-[0_0_20px_rgba(215,184,120,0.6)]">
                              <Sparkles className="w-5 h-5 text-[#D7B878]" />
                            </div>
                            <span className="font-handwriting text-xs text-[#FFF8F1] mt-1">Parthiv</span>
                          </motion.div>

                          {/* Connecting Heart Pulse */}
                          <motion.div
                            animate={{ scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center text-[#D9A0B0]"
                          >
                            <span className="w-8 h-px bg-gradient-to-r from-[#D7B878] to-[#D9A0B0]" />
                            <Heart className="w-4 h-4 mx-1 fill-[#D9A0B0]" />
                            <span className="w-8 h-px bg-gradient-to-r from-[#D9A0B0] to-[#D7B878]" />
                          </motion.div>

                          {/* Star 2 */}
                          <motion.div
                            animate={{ scale: [1, 1.2, 1], y: [0, 4, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#D9A0B0]/30 border border-[#D9A0B0] flex items-center justify-center shadow-[0_0_20px_rgba(217,160,176,0.6)]">
                              <Sparkles className="w-5 h-5 text-[#D9A0B0]" />
                            </div>
                            <span className="font-handwriting text-xs text-[#FFF8F1] mt-1">Happiness</span>
                          </motion.div>
                        </div>
                        <p className="font-handwriting text-base text-[#D7B878] mt-6">
                          "Two weeks, but feels like years..."
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* End of Timeline Footer Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-20 text-center max-w-2xl mx-auto p-8 rounded-3xl glass-panel border border-[#D7B878]/40 shadow-2xl"
        >
          <div className="flex justify-center mb-3">
            <Compass className="w-6 h-6 text-[#D7B878] animate-spin [animation-duration:20s]" />
          </div>
          <p className="font-serif italic text-xl sm:text-2xl text-[#FFF8F1] leading-relaxed">
            "{timelineFooter}"
          </p>
        </motion.div>
      </div>
    </section>
  )
}
