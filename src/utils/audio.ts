// Romantic Music Player with Web Audio API & Mobile-Friendly Volume Control

class SoundManager {
  private ctx: AudioContext | null = null
  private gainNode: GainNode | null = null
  private sfxGainNode: GainNode | null = null
  private audioSourceNode: MediaElementAudioSourceNode | null = null
  private customAudio: HTMLAudioElement | null = null
  private volume: number = 0.75 // Default 75% volume
  private isMuted: boolean = false
  private isPlayingMusic: boolean = false
  private listeners: Array<() => void> = []

  constructor() {
    // Lazy init audio element
    if (typeof window !== 'undefined') {
      this.initAudioElement()
    }
  }

  private initAudioElement() {
    if (!this.customAudio) {
      try {
        this.customAudio = new Audio('/song.mp3')
        this.customAudio.loop = true
        this.customAudio.preload = 'auto'
        this.customAudio.volume = this.volume

        this.customAudio.addEventListener('play', () => {
          this.isPlayingMusic = true
          this.notifyListeners()
        })

        this.customAudio.addEventListener('pause', () => {
          this.isPlayingMusic = false
          this.notifyListeners()
        })

        this.customAudio.addEventListener('ended', () => {
          this.isPlayingMusic = false
          this.notifyListeners()
        })
      } catch (err) {
        console.warn('Could not initialize background audio element:', err)
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        
        // Music Gain Node (enables reliable volume scaling on mobile phones)
        this.gainNode = this.ctx.createGain()
        this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime)
        this.gainNode.connect(this.ctx.destination)

        // SFX Gain Node (for bells and chimes)
        this.sfxGainNode = this.ctx.createGain()
        this.sfxGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime)
        this.sfxGainNode.connect(this.ctx.destination)

        // Connect media element to Web Audio GainNode if available
        if (this.customAudio && !this.audioSourceNode) {
          try {
            this.audioSourceNode = this.ctx.createMediaElementSource(this.customAudio)
            this.audioSourceNode.connect(this.gainNode)
          } catch (e) {
            // If already connected or not supported, customAudio.volume will handle it
            console.log('MediaElementSource fallback active')
          }
        }
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l())
  }

  public async startMusic() {
    this.initContext()
    this.initAudioElement()

    if (this.customAudio) {
      try {
        this.applyVolume()
        const playPromise = this.customAudio.play()
        if (playPromise !== undefined) {
          await playPromise
        }
        this.isPlayingMusic = true
      } catch (err) {
        console.log('Autoplay prevented or waiting for user interaction:', err)
      }
    }
    this.notifyListeners()
  }

  public pauseMusic() {
    if (this.customAudio) {
      this.customAudio.pause()
    }
    this.isPlayingMusic = false
    this.notifyListeners()
  }

  public toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.pauseMusic()
      return false
    } else {
      this.startMusic()
      return true
    }
  }

  public setVolume(level: number) {
    const clamped = Math.max(0, Math.min(1, level))
    this.volume = clamped
    if (this.volume > 0 && this.isMuted) {
      this.isMuted = false
    } else if (this.volume === 0) {
      this.isMuted = true
    }
    this.applyVolume()
    this.notifyListeners()
  }

  public getVolume(): number {
    return this.isMuted ? 0 : this.volume
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    this.applyVolume()
    this.notifyListeners()
    return this.isMuted
  }

  private applyVolume() {
    const targetVolume = this.isMuted ? 0 : this.volume

    // Update HTMLAudioElement volume
    if (this.customAudio) {
      this.customAudio.volume = targetVolume
    }

    // Update Web Audio API GainNode for mobile devices
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(targetVolume, this.ctx.currentTime)
    }
  }

  public isMusicActive(): boolean {
    return this.isPlayingMusic
  }

  public isMutedActive(): boolean {
    return this.isMuted
  }

  // Play a dreamy bell/chime note for interactions
  private playBellNote(freq: number, startTime: number, duration: number = 3.0, velocity: number = 0.2) {
    if (!this.ctx || this.isMuted) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, startTime)

    gain.gain.setValueAtTime(0.0001, startTime)
    gain.gain.exponentialRampToValueAtTime(velocity, startTime + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

    osc.connect(gain)
    if (this.sfxGainNode) {
      gain.connect(this.sfxGainNode)
    } else {
      gain.connect(this.ctx.destination)
    }

    osc.start(startTime)
    osc.stop(startTime + duration + 0.1)
  }

  // Sound effects
  public playStarChime() {
    this.initContext()
    if (!this.ctx || this.isMuted) return
    const now = this.ctx.currentTime
    const notes = [587.33, 880, 1174.66]
    notes.forEach((freq, i) => {
      this.playBellNote(freq, now + i * 0.09, 1.8, 0.1)
    })
  }

  public playEnvelopeOpen() {
    this.initContext()
    if (!this.ctx || this.isMuted) return
    const now = this.ctx.currentTime
    const notes = [392, 493.88, 587.33, 783.99]
    notes.forEach((freq, i) => {
      this.playBellNote(freq, now + i * 0.08, 2.2, 0.12)
    })
  }

  public playWishSent() {
    this.initContext()
    if (!this.ctx || this.isMuted) return
    const now = this.ctx.currentTime
    const notes = [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5]
    notes.forEach((freq, i) => {
      this.playBellNote(freq, now + i * 0.07, 2.5, 0.12)
    })
  }

  public playSecretFound() {
    this.initContext()
    if (!this.ctx || this.isMuted) return
    const now = this.ctx.currentTime
    const notes = [440, 554.37, 659.25, 880, 1108.73]
    notes.forEach((freq, i) => {
      this.playBellNote(freq, now + i * 0.1, 2.8, 0.14)
    })
  }
}

export const soundManager = new SoundManager()
