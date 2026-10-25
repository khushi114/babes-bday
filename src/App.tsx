import React, { useState, useRef } from 'react'
import { StarfieldCanvas } from './components/StarfieldCanvas'
import { RosePetalsCanvas } from './components/RosePetalsCanvas'
import { FloatingControls } from './components/FloatingControls'
import { SectionOneInvitation } from './components/SectionOneInvitation'
import { SectionTwoBirthday } from './components/SectionTwoBirthday'
import { SectionThreeStoryTimeline } from './components/SectionThreeStoryTimeline'
import { SectionFourCards } from './components/SectionFourCards'
import { SectionFiveEnvelopes } from './components/SectionFiveEnvelopes'
import { SectionSevenSecretSurprise } from './components/SectionSevenSecretSurprise'
import { SectionEightBirthdayWish } from './components/SectionEightBirthdayWish'
import { SectionGiftBoutique } from './components/SectionGiftBoutique'
import { SectionNineLastLoveLetter } from './components/SectionNineLastLoveLetter'
import { contentConfig } from './contentConfig'
import { Heart } from 'lucide-react'

export const App: React.FC = () => {
  const [petalsActive, setPetalsActive] = useState(true)
  const birthdaySectionRef = useRef<HTMLDivElement | null>(null)
  const storySectionRef = useRef<HTMLDivElement | null>(null)

  const handleEnterUniverse = () => {
    birthdaySectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToStory = () => {
    storySectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleReturnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen text-[#FFF8F1] overflow-x-hidden selection:bg-[#D9A0B0]/40 selection:text-[#FFF8F1]">
      {/* Subtle film grain texture overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Atmospheric Starfield Background */}
      <StarfieldCanvas />

      {/* Floating Rose Petals (Toggleable) */}
      <RosePetalsCanvas active={petalsActive} />

      {/* Floating Audio & Visual Controls */}
      <FloatingControls
        petalsActive={petalsActive}
        setPetalsActive={setPetalsActive}
      />

      {/* SECTION 1: A Secret Invitation */}
      <SectionOneInvitation onEnter={handleEnterUniverse} />

      {/* SECTION 2: Happy Birthday, Parthiv! */}
      <div ref={birthdaySectionRef}>
        <SectionTwoBirthday onScrollToStory={handleScrollToStory} />
      </div>

      {/* SECTION 3: Our Story, Written in the Stars */}
      <div ref={storySectionRef}>
        <SectionThreeStoryTimeline />
      </div>

      {/* SECTION 4: Things I Love About Our Little World */}
      <SectionFourCards />

      {/* SECTION 5: Open These Whenever You Want */}
      <SectionFiveEnvelopes />

      {/* SECTION 6: A Secret Surprise for My Babesssss (Star Trail & Constellation) */}
      <SectionSevenSecretSurprise />

      {/* SECTION 7: Make a Birthday Wish */}
      <SectionEightBirthdayWish />

      {/* SECTION 8: BABESSSS, PICK YOUR GIFTS! 🎁 (Virtual Romantic Boutique) */}
      <SectionGiftBoutique />

      {/* SECTION 9: The Last Little Love Letter */}
      <SectionNineLastLoveLetter onReturnToTop={handleReturnToTop} />

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center border-t border-[#D7B878]/20 bg-[#1e1320]/80 backdrop-blur-md">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#D9A0B0]">
            <span>{contentConfig.personName}</span>
            <span>•</span>
            <span>{contentConfig.nicknameToHim}</span>
          </div>

          <p className="font-handwriting text-2xl text-[#FFF8F1] flex items-center justify-center gap-2">
            <span>Made with all my heart for you</span>
            <Heart className="w-4 h-4 text-[#D9A0B0] fill-current" />
          </p>

          <p className="font-serif italic text-xs text-[#D7B878]/80">
            "{contentConfig.coreQuote}"
          </p>

          <span className="text-[11px] font-sans text-gray-400 mt-2">
            Forever — {contentConfig.senderNickname} ♡
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
