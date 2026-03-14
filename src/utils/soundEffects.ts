let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

/**
 * Play a "ting" chime sound using Web Audio API oscillators.
 * No audio files needed - generates a bright bell-like tone programmatically.
 */
export function playTingSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Two-note chime: ting-ting!
    const notes = [
      { freq: 1200, time: 0, duration: 0.15 },
      { freq: 1500, time: 0.15, duration: 0.2 },
    ];

    notes.forEach(({ freq, time, duration }) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, now + time);

      // Add slight frequency sweep for sparkle effect
      oscillator.frequency.exponentialRampToValueAtTime(
        freq * 1.02,
        now + time + duration * 0.5,
      );

      gainNode.gain.setValueAtTime(0, now + time);
      gainNode.gain.linearRampToValueAtTime(0.3, now + time + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + time + duration);

      // Add harmonic overtone for bell-like quality
      const harmonic = ctx.createOscillator();
      const harmonicGain = ctx.createGain();
      harmonic.type = 'sine';
      harmonic.frequency.setValueAtTime(freq * 2.5, now + time);
      harmonicGain.gain.setValueAtTime(0, now + time);
      harmonicGain.gain.linearRampToValueAtTime(0.08, now + time + 0.01);
      harmonicGain.gain.exponentialRampToValueAtTime(
        0.001,
        now + time + duration * 0.7,
      );

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      harmonic.connect(harmonicGain);
      harmonicGain.connect(ctx.destination);

      oscillator.start(now + time);
      oscillator.stop(now + time + duration);
      harmonic.start(now + time);
      harmonic.stop(now + time + duration);
    });
  } catch {
    // Silently fail if Web Audio API is not available
  }
}

/**
 * Play a celebration sound sequence: ting-ting + ascending chime
 */
export function playCelebrationSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Ascending celebration chimes
    const chimes = [
      { freq: 800, time: 0, duration: 0.12 },
      { freq: 1000, time: 0.1, duration: 0.12 },
      { freq: 1200, time: 0.2, duration: 0.12 },
      { freq: 1600, time: 0.3, duration: 0.25 },
      { freq: 2000, time: 0.35, duration: 0.3 },
    ];

    chimes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0, now + time);
      gain.gain.linearRampToValueAtTime(0.2, now + time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + duration);

      // Harmonic for richness
      const harm = ctx.createOscillator();
      const harmGain = ctx.createGain();
      harm.type = 'triangle';
      harm.frequency.setValueAtTime(freq * 1.5, now + time);
      harmGain.gain.setValueAtTime(0, now + time);
      harmGain.gain.linearRampToValueAtTime(0.06, now + time + 0.01);
      harmGain.gain.exponentialRampToValueAtTime(
        0.001,
        now + time + duration * 0.6,
      );

      osc.connect(gain);
      gain.connect(ctx.destination);
      harm.connect(harmGain);
      harmGain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration);
      harm.start(now + time);
      harm.stop(now + time + duration);
    });
  } catch {
    // Silently fail if Web Audio API is not available
  }
}
