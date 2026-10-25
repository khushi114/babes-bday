import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gift,
  Heart,
  Sparkles,
  Star,
  Moon,
  X,
  RotateCcw,
  Check,
  Flame,
  Send,
  HelpCircle,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { contentConfig } from '../contentConfig'
import { soundManager } from '../utils/audio'

export const SectionGiftBoutique: React.FC = () => {
  const {
    sectionTag,
    heading,
    supportingText,
    progressTitle,
    completedCelebration,
    completedButtonText,
    finalRevealButton,
    finalRevealTitle,
    finalRevealLetter,
    gifts,
  } = contentConfig.giftBoutique

  // Set of opened gift IDs
  const [openedGiftIds, setOpenedGiftIds] = useState<string[]>([])
  // Currently opened modal gift
  const [activeGiftId, setActiveGiftId] = useState<string | null>(null)
  // State for the cute final letter reveal
  const [showFinalLetter, setShowFinalLetter] = useState(false)
  // State for interactive candle in Gift 5
  const [candleWishTriggered, setCandleWishTriggered] = useState(false)
  // State for hug bounce replay in Gift 3
  const [hugBounceKey, setHugBounceKey] = useState(0)

  const activeGift = gifts.find((g) => g.id === activeGiftId)
  const isAllOpened = gifts.every((g) => openedGiftIds.includes(g.id))

  const handleOpenGift = (giftId: string) => {
    // Sound & open
    soundManager.playEnvelopeOpen()
    setActiveGiftId(giftId)

    // Mark as opened if not already
    if (!openedGiftIds.includes(giftId)) {
      const updated = [...openedGiftIds, giftId]
      setOpenedGiftIds(updated)

      // If this completes all 6 gifts!
      if (updated.length === gifts.length) {
        setTimeout(() => {
          confetti({
            particleCount: 65,
            spread: 85,
            origin: { y: 0.6 },
            colors: ['#D7B878', '#D9A0B0', '#F8E3E9', '#FFF8F1'],
          })
          soundManager.playSecretFound()
        }, 500)
      }
    }
  }

  const handleCloseActiveGift = () => {
    soundManager.playStarChime()
    setActiveGiftId(null)
    setCandleWishTriggered(false)
  }

  const handleSendAnotherHug = () => {
    soundManager.playStarChime()
    setHugBounceKey((prev) => prev + 1)
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#D9A0B0', '#F8E3E9', '#682D45'],
    })
  }

  const handleTriggerWishCandle = () => {
    soundManager.playWishSent()
    setCandleWishTriggered(true)
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#D7B878', '#FFF8F1', '#D9A0B0'],
    })
  }

  const handleOpenFinalReveal = () => {
    soundManager.playSecretFound()
    setShowFinalLetter(true)
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D7B878', '#D9A0B0', '#FFF8F1', '#682D45'],
    })
  }

  // Render gift box illustration
  const renderGiftIllustration = (iconType: string, isOpened: boolean) => {
    switch (iconType) {
      case 'letter':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#D9A0B0]/20 rounded-2xl blur-md" />
            <div className="relative w-16 h-12 rounded-lg bg-gradient-to-br from-[#F8E3E9] to-[#D9A0B0] border border-[#FFF8F1]/80 shadow-md flex items-center justify-center">
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-[#D9A0B0]/50 rounded-t-lg origin-top" />
              <div className="w-5 h-5 rounded-full bg-[#682D45] text-[#F8E3E9] flex items-center justify-center shadow-sm z-10">
                <Heart className="w-3 h-3 fill-current" />
              </div>
            </div>
          </div>
        )

      case 'universe':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#D7B878]/20 rounded-full blur-lg" />
            {/* Glass dome */}
            <div className="relative w-14 h-16 rounded-t-full bg-gradient-to-b from-white/30 to-[#682D45]/40 border border-[#D7B878]/60 shadow-lg flex flex-col items-center justify-center overflow-hidden">
              <Moon className="w-5 h-5 text-[#D7B878] fill-[#D7B878]/60 mb-1" />
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7B878] animate-pulse [animation-delay:0.3s]" />
              </div>
            </div>
            {/* Dome base */}
            <div className="absolute bottom-1 w-16 h-2 rounded-full bg-[#D7B878] shadow" />
          </div>
        )

      case 'hug':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#D9A0B0]/20 rounded-full blur-md" />
            {/* Teddy bear */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-[#b88267] to-[#8c5942] border border-[#d4a890] flex items-center justify-center shadow-md">
              {/* Ears */}
              <div className="absolute -top-1.5 -left-1 w-4 h-4 rounded-full bg-[#8c5942] border border-[#d4a890]" />
              <div className="absolute -top-1.5 -right-1 w-4 h-4 rounded-full bg-[#8c5942] border border-[#d4a890]" />
              {/* Heart in hands */}
              <div className="w-6 h-6 rounded-full bg-[#682D45] text-rose-300 flex items-center justify-center shadow-inner z-10">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>
        )

      case 'firsts':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#D9A0B0]/20 rounded-full blur-lg" />
            {/* Two gently floating glowing lights */}
            <div className="relative flex items-center justify-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#D7B878] to-[#FFF8F1] shadow-[0_0_12px_rgba(215,184,120,0.9)] animate-pulse" />
              <Heart className="w-3.5 h-3.5 text-[#D9A0B0] fill-[#D9A0B0] animate-bounce [animation-duration:2s]" />
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#D9A0B0] to-[#FFF8F1] shadow-[0_0_12px_rgba(217,160,176,0.9)] animate-pulse [animation-delay:0.5s]" />
            </div>
          </div>
        )

      case 'wish':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#D7B878]/25 rounded-full blur-lg" />
            {/* Moon & candle */}
            <div className="relative flex items-center justify-center">
              <Moon className="w-10 h-10 text-[#D7B878] fill-[#D7B878]/30" />
              <div className="absolute -bottom-1 -right-1 flex flex-col items-center">
                <Flame className="w-3.5 h-3.5 text-[#FFD275] fill-[#FFD275] animate-pulse" />
                <div className="w-2.5 h-4 bg-[#FFF8F1] rounded-t-sm" />
              </div>
            </div>
          </div>
        )

      case 'mystery':
      default:
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#682D45]/40 rounded-2xl blur-md" />
            {/* Burgundy Gift Box */}
            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#853958] to-[#4d1d32] border border-[#D7B878] shadow-lg flex items-center justify-center">
              {/* Golden Ribbon */}
              <div className="absolute inset-x-0 h-2 bg-[#D7B878] top-1/2 -translate-y-1/2 opacity-90 shadow-sm" />
              <div className="absolute inset-y-0 w-2 bg-[#D7B878] left-1/2 -translate-x-1/2 opacity-90 shadow-sm" />
              {/* Question mark tag */}
              <div className="w-6 h-6 rounded-full bg-[#261927] border border-[#D7B878] text-[#D7B878] flex items-center justify-center text-xs font-serif font-bold z-10 shadow">
                <HelpCircle className="w-3.5 h-3.5 text-[#D7B878]" />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <section id="gift-boutique" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-gradient-to-tr from-[#682D45]/30 via-[#D9A0B0]/15 to-[#D7B878]/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#682D45]/40 border border-[#D7B878]/40 text-[#D7B878] text-xs uppercase tracking-widest mb-3 shadow-sm"
        >
          <Gift className="w-3.5 h-3.5 text-[#D7B878]" />
          <span>{sectionTag}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl font-light text-[#FFF8F1] tracking-tight mb-4"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#D9A0B0] max-w-xl mx-auto leading-relaxed"
        >
          "{supportingText}"
        </motion.p>
      </div>

      {/* Gift Collection Progress Tracker Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto mb-14 p-5 sm:p-6 rounded-3xl glass-panel border border-[#D7B878]/40 text-center shadow-xl flex flex-col items-center"
      >
        <span className="text-[11px] font-sans uppercase tracking-widest text-[#D7B878] font-semibold mb-2">
          {progressTitle}
        </span>

        {/* 6 Mini Gift Box Icons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
          {gifts.map((gift, idx) => {
            const isOpened = openedGiftIds.includes(gift.id)
            return (
              <div
                key={gift.id}
                className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                  isOpened
                    ? 'bg-[#682D45] border-[#D7B878] text-[#D7B878] shadow-[0_0_12px_rgba(215,184,120,0.5)] scale-105'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
                title={gift.label}
              >
                {isOpened ? (
                  <Check className="w-4 h-4 text-[#D7B878]" />
                ) : (
                  <Gift className="w-4 h-4 opacity-40" />
                )}
                <span className="absolute -bottom-1 -right-1 text-[9px] font-sans text-[#FFF8F1]/70">
                  {idx + 1}
                </span>
              </div>
            )
          })}
        </div>

        {/* Progress Text */}
        <p className="font-handwriting text-xl text-[#FFF8F1] mt-2">
          {openedGiftIds.length} of {gifts.length} little surprises discovered ♡
        </p>

        {/* Celebration State when all 6 opened */}
        <AnimatePresence>
          {isAllOpened && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 pt-4 border-t border-[#D7B878]/30 flex flex-col items-center gap-3 w-full"
            >
              <p className="font-serif italic text-base text-[#D7B878]">
                {completedCelebration}
              </p>

              {/* Special Button: One last thing from your happiness ♡ */}
              <button
                onClick={handleOpenFinalReveal}
                className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#D7B878] via-[#F8E3E9] to-[#D7B878] text-[#261927] font-sans text-xs uppercase tracking-widest font-bold shadow-lg shadow-[#D7B878]/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#682D45]" />
                <span>{finalRevealButton}</span>
                <Heart className="w-3.5 h-3.5 text-[#682D45] fill-current" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 6 Interactive Gift Boutique Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {gifts.map((gift, idx) => {
          const isOpened = openedGiftIds.includes(gift.id)

          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleOpenGift(gift.id)}
              className="relative cursor-pointer group select-none"
            >
              {/* Boutique ribbon tag on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#D7B878]/30 backdrop-blur-sm border-l border-r border-[#FFF8F1]/40 rounded-sm rotate-1 z-20 shadow-sm" />

              <div
                className={`relative h-full p-7 rounded-3xl transition-all duration-500 overflow-hidden glass-panel border flex flex-col items-center text-center justify-between ${
                  isOpened
                    ? 'border-[#D7B878]/80 bg-[#351e36]/70 shadow-lg shadow-[#D7B878]/15'
                    : 'border-[#D7B878]/30 hover:border-[#D7B878]/60 hover:shadow-xl'
                }`}
              >
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D9A0B0]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Gift Visual */}
                <div className="mb-4 group-hover:scale-110 transition-transform duration-500">
                  {renderGiftIllustration(gift.iconType, isOpened)}
                </div>

                {/* Content */}
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#D9A0B0] font-semibold block mb-1">
                    {gift.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#FFF8F1] mb-2 group-hover:text-[#F8E3E9] transition-colors">
                    {gift.label}
                  </h3>
                </div>

                {/* Button / Open Status Badge */}
                <div className="mt-5 pt-3 border-t border-[#D7B878]/20 w-full flex items-center justify-between text-xs">
                  <span className="font-handwriting text-base text-[#D7B878]">
                    {isOpened ? 'Opened with love ♡' : 'Tap to open surprise'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-sans tracking-wider font-semibold ${
                      isOpened
                        ? 'bg-[#682D45] text-[#D7B878] border border-[#D7B878]/40'
                        : 'bg-white/10 text-[#FFF8F1] group-hover:bg-[#682D45]'
                    }`}
                  >
                    {isOpened ? 'Discovered' : 'Open 🎁'}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* INDIVIDUAL GIFT MODAL POPUP */}
      <AnimatePresence>
        {activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden"
            onClick={handleCloseActiveGift}
          >
            <motion.div
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFF8F1] text-[#261927] rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-[#D7B878] overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(#D9A0B0 0.5px, transparent 0.5px)',
                backgroundSize: '22px 22px',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseActiveGift}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#261927]/10 hover:bg-[#261927]/20 text-[#261927] transition-colors"
                aria-label="Close surprise"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gift Visual & Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="mb-2">
                  {renderGiftIllustration(activeGift.iconType, true)}
                </div>
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#853958] font-bold">
                  {activeGift.subtitle}
                </span>
                <h3 className="font-handwriting text-3xl sm:text-4xl text-[#682D45] mt-1">
                  {activeGift.label}
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D7B878] to-transparent mt-2" />
              </div>

              {/* SPECIAL INTERACTIVE BEHAVIORS INSIDE MODAL */}

              {/* Gift 3: Virtual Hug bouncing button */}
              {activeGift.iconType === 'hug' && (
                <div className="flex justify-center mb-4">
                  <motion.div
                    key={hugBounceKey}
                    animate={{ scale: [1, 1.25, 0.95, 1.15, 1], rotate: [0, -3, 3, -1, 0] }}
                    transition={{ duration: 0.8 }}
                    className="p-3 rounded-full bg-[#F8E3E9] text-[#682D45] border border-[#D9A0B0] flex items-center justify-center shadow-inner"
                  >
                    <Heart className="w-6 h-6 fill-current text-rose-500 animate-pulse" />
                  </motion.div>
                </div>
              )}

              {/* Gift 5: Interactive candle wish */}
              {activeGift.iconType === 'wish' && (
                <div className="flex flex-col items-center mb-4">
                  <button
                    onClick={handleTriggerWishCandle}
                    className="p-3 rounded-full bg-[#F8E3E9] hover:bg-[#F8E3E9]/80 border border-[#D7B878] text-[#D7B878] flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold cursor-pointer shadow-md transition-all hover:scale-105"
                  >
                    <Flame className="w-4 h-4 text-[#FFD275] fill-current animate-pulse" />
                    <span>{candleWishTriggered ? '✨ Wish Sent to the Stars' : 'Tap candle to light a wish'}</span>
                  </button>
                </div>
              )}

              {/* Gift Message Text */}
              <div className="font-serif text-base sm:text-lg leading-relaxed text-[#261927] space-y-3 whitespace-pre-line text-center my-4">
                "{activeGift.message}"
              </div>

              {/* Modal Footer Controls */}
              <div className="mt-8 pt-5 border-t border-[#D7B878]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                {activeGift.iconType === 'hug' ? (
                  <button
                    onClick={handleSendAnotherHug}
                    className="px-5 py-2 rounded-full text-xs font-sans uppercase tracking-widest font-semibold bg-[#F8E3E9] hover:bg-[#ebd0d7] text-[#682D45] border border-[#D9A0B0] transition-colors"
                  >
                    Send me another hug! 🧸
                  </button>
                ) : (
                  <span className="font-handwriting text-xl text-[#853958]">
                    Wrapped with love ♡
                  </span>
                )}

                <button
                  onClick={handleCloseActiveGift}
                  className="px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest font-semibold bg-[#682D45] hover:bg-[#853958] text-[#FFF8F1] transition-colors shadow-md"
                >
                  {activeGift.buttonText || 'Keep this surprise ♡'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUTE FINAL SURPRISE LETTER MODAL */}
      <AnimatePresence>
        {showFinalLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg overflow-hidden"
            onClick={() => setShowFinalLetter(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full max-h-[85vh] overflow-y-auto bg-[#FFF8F1] text-[#261927] rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-[#D7B878]"
              style={{
                backgroundImage: 'radial-gradient(#D9A0B0 0.5px, transparent 0.5px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowFinalLetter(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#261927]/10 hover:bg-[#261927]/20 text-[#261927] transition-colors"
                aria-label="Close final reveal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-[#D7B878]/40 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#853958] font-bold">
                    One Last Gift
                  </span>
                  <h3 className="font-handwriting text-3xl sm:text-4xl text-[#682D45] mt-1">
                    {finalRevealTitle}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#682D45] text-[#D7B878] flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              {/* Letter Paragraphs */}
              <div className="font-serif text-lg sm:text-xl leading-relaxed text-[#261927] space-y-4 whitespace-pre-line">
                {finalRevealLetter}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-5 border-t border-[#D7B878]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-handwriting text-2xl text-[#853958]">
                  Forever your happiness ❤️
                </span>
                <button
                  onClick={() => setShowFinalLetter(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest font-semibold bg-[#682D45] hover:bg-[#853958] text-[#FFF8F1] transition-colors shadow-md"
                >
                  Close & Cherish ♡
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
