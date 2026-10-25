import React, { useState, useEffect, useRef } from 'react'
import {
  Volume2,
  Volume1,
  VolumeX,
  Music,
  Pause,
  Play,
  Sparkles,
  Sliders,
  X,
  Heart,
} from 'lucide-react'
import { soundManager } from '../utils/audio'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingControlsProps {
  petalsActive: boolean
  setPetalsActive: (active: boolean | ((prev: boolean) => boolean)) => void
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  petalsActive,
  setPetalsActive,
}) => {
  const [isPlaying, setIsPlaying] = useState(soundManager.isMusicActive())
  const [isMuted, setIsMuted] = useState(soundManager.isMutedActive())
  const [volume, setVolume] = useState(soundManager.getVolume())
  const [showVolumePopup, setShowVolumePopup] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Subscribe to soundManager updates
    const unsubscribe = soundManager.subscribe(() => {
      setIsPlaying(soundManager.isMusicActive())
      setIsMuted(soundManager.isMutedActive())
      setVolume(soundManager.getVolume())
    })
    return () => unsubscribe()
  }, [])

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowVolumePopup(false)
      }
    }
    if (showVolumePopup) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [showVolumePopup])

  const handleToggleMusic = () => {
    const active = soundManager.toggleMusic()
    setIsPlaying(active)
  }

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const muted = soundManager.toggleMute()
    setIsMuted(muted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value)
    soundManager.setVolume(newVol)
    setVolume(newVol)
  }

  const handlePresetVolume = (level: number) => {
    soundManager.setVolume(level)
    setVolume(level)
  }

  const volumePercent = Math.round(volume * 100)

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="w-3.5 h-3.5 text-rose-400" />
    }
    if (volume < 0.5) {
      return <Volume1 className="w-3.5 h-3.5 text-[#D7B878]" />
    }
    return <Volume2 className="w-3.5 h-3.5 text-[#D7B878]" />
  }

  return (
    <div className="fixed top-4 right-3 sm:top-5 sm:right-5 z-50 flex flex-col items-end gap-2 select-none">
      {/* Floating control bar */}
      <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#261927]/90 backdrop-blur-md border border-[#D7B878]/40 shadow-xl shadow-black/50 text-[#FFF8F1]">
        {/* Music Play/Pause */}
        <button
          onClick={handleToggleMusic}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs transition-all duration-300 font-medium cursor-pointer ${
            isPlaying
              ? 'bg-[#682D45] text-[#FFF8F1] shadow-sm shadow-[#D9A0B0]/30'
              : 'hover:bg-white/10 text-[#D9A0B0]'
          }`}
          title={isPlaying ? 'Pause song' : 'Play song'}
          aria-label={isPlaying ? 'Pause song' : 'Play song'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D7B878]" />
              <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-sans">
                Song On
              </span>
              <span className="flex gap-0.5 items-center h-2.5">
                <span className="w-0.5 h-2 bg-[#D7B878] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-0.5 h-3.5 bg-[#D7B878] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-0.5 h-2 bg-[#D7B878] rounded-full animate-bounce" />
              </span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D9A0B0] fill-current" />
              <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-sans">
                Play Song
              </span>
            </>
          )}
        </button>

        {/* Volume Button with Percentage Badge (Mobile & Desktop) */}
        <button
          onClick={() => setShowVolumePopup((prev) => !prev)}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            showVolumePopup
              ? 'bg-[#D7B878]/25 text-[#D7B878]'
              : 'hover:bg-white/10 text-[#D7B878]'
          }`}
          title="Adjust volume on phone or desktop"
          aria-label="Adjust volume"
        >
          {getVolumeIcon()}
          <span className="text-[10px] font-sans font-semibold text-[#D7B878]/90">
            {isMuted ? '0%' : `${volumePercent}%`}
          </span>
        </button>

        {/* Drifting Rose Petals toggle */}
        <button
          onClick={() => setPetalsActive((prev) => !prev)}
          className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            petalsActive ? 'bg-[#D9A0B0]/20 text-[#D9A0B0]' : 'text-gray-400 hover:text-white'
          }`}
          title={petalsActive ? 'Hide drifting rose petals' : 'Show drifting rose petals'}
          aria-label={petalsActive ? 'Hide drifting rose petals' : 'Show drifting rose petals'}
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D9A0B0]" />
        </button>
      </div>

      {/* MOBILE-FRIENDLY POPUP VOLUME SLIDER & PRESETS */}
      <AnimatePresence>
        {showVolumePopup && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-64 sm:w-72 p-4 rounded-2xl glass-panel border border-[#D7B878]/60 shadow-2xl text-[#FFF8F1] z-50 mt-1"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 border-b border-[#D7B878]/20 pb-2">
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-[#D7B878]" />
                <span className="text-xs font-sans uppercase tracking-widest text-[#D7B878] font-bold">
                  Song Volume
                </span>
              </div>
              <button
                onClick={() => setShowVolumePopup(false)}
                className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                aria-label="Close volume popup"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Song title badge */}
            <div className="flex items-center justify-between text-[11px] font-handwriting text-[#D9A0B0] mb-2 px-1">
              <span>Tum Ho Toh Sab Acha Hai ♡</span>
              <span className="font-sans text-[10px] font-bold text-[#D7B878]">
                {isMuted ? 'Muted' : `${volumePercent}%`}
              </span>
            </div>

            {/* Touch-Friendly Range Slider */}
            <div className="flex items-center gap-3 my-2">
              <button
                onClick={handleToggleMute}
                className="p-1.5 rounded-lg hover:bg-white/10 text-[#D7B878] transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {getVolumeIcon()}
              </button>

              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-[#682D45]/60 accent-[#D7B878] focus:outline-none touch-none"
                  style={{
                    background: `linear-gradient(to right, #D7B878 0%, #D9A0B0 ${volumePercent}%, rgba(104, 45, 69, 0.6) ${volumePercent}%, rgba(104, 45, 69, 0.6) 100%)`,
                  }}
                  aria-label="Volume slider"
                />
              </div>
            </div>

            {/* Quick Touch Presets for Mobile Phone */}
            <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2 border-t border-[#D7B878]/20 text-[10px] font-sans">
              <button
                onClick={() => handlePresetVolume(0)}
                className={`py-1 rounded-md text-center border transition-all ${
                  volume === 0 || isMuted
                    ? 'bg-[#682D45] text-[#D7B878] border-[#D7B878]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                Mute
              </button>
              <button
                onClick={() => handlePresetVolume(0.35)}
                className={`py-1 rounded-md text-center border transition-all ${
                  volume >= 0.3 && volume <= 0.4 && !isMuted
                    ? 'bg-[#682D45] text-[#D7B878] border-[#D7B878]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                35%
              </button>
              <button
                onClick={() => handlePresetVolume(0.7)}
                className={`py-1 rounded-md text-center border transition-all ${
                  volume >= 0.65 && volume <= 0.75 && !isMuted
                    ? 'bg-[#682D45] text-[#D7B878] border-[#D7B878]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                70%
              </button>
              <button
                onClick={() => handlePresetVolume(1.0)}
                className={`py-1 rounded-md text-center border transition-all ${
                  volume >= 0.95 && !isMuted
                    ? 'bg-[#682D45] text-[#D7B878] border-[#D7B878]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                100%
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
