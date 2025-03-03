
// Simple audio tone generator
export class ToneGenerator {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentFrequency: number = 432;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser policies
  }

  private initAudio() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create gain node for volume control
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0.5; // Default volume at 50%
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  public play(frequency: number = this.currentFrequency) {
    this.initAudio();
    
    if (this.isPlaying) {
      this.stop();
    }

    if (!this.audioContext || !this.gainNode) return;

    // Create and configure oscillator
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sine'; // Pure sine wave for clean frequency
    this.oscillator.frequency.value = frequency;
    this.currentFrequency = frequency;
    
    // Add slight attack and release to avoid clicks
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.05);
    
    // Connect and start
    this.oscillator.connect(this.gainNode);
    this.oscillator.start();
    this.isPlaying = true;

    console.log(`Playing ${frequency} Hz`);
  }

  public stop() {
    if (!this.isPlaying || !this.oscillator || !this.audioContext || !this.gainNode) return;
    
    // Gentle fade out to avoid clicks
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioContext.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.05);
    
    // Schedule actual stop after fade out
    setTimeout(() => {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
      this.isPlaying = false;
    }, 50);

    console.log(`Stopped playing ${this.currentFrequency} Hz`);
  }

  public setVolume(volume: number) {
    if (!this.gainNode) return;
    // Ensure volume is between 0 and 1
    const safeVolume = Math.max(0, Math.min(1, volume));
    this.gainNode.gain.setValueAtTime(safeVolume, (this.audioContext?.currentTime || 0));
  }

  public setFrequency(frequency: number) {
    this.currentFrequency = frequency;
    if (this.oscillator && this.isPlaying) {
      // Smooth transition to new frequency
      this.oscillator.frequency.setValueAtTime(this.oscillator.frequency.value, (this.audioContext?.currentTime || 0));
      this.oscillator.frequency.linearRampToValueAtTime(frequency, (this.audioContext?.currentTime || 0) + 0.05);
    }
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentFrequency(): number {
    return this.currentFrequency;
  }
}

// Singleton instance
let toneGeneratorInstance: ToneGenerator | null = null;

export function getToneGenerator(): ToneGenerator {
  if (!toneGeneratorInstance) {
    toneGeneratorInstance = new ToneGenerator();
  }
  return toneGeneratorInstance;
}
