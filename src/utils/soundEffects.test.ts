import { describe, it, expect, vi, beforeEach } from 'vitest';

const createMockAudioContext = () => ({
  currentTime: 0,
  destination: {},
  createOscillator: vi.fn(() => ({
    type: 'sine',
    frequency: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  })),
  createGain: vi.fn(() => ({
    gain: {
      setValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(),
  })),
});

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe('playTingSound', () => {
  it('should create oscillators for the ting sound', async () => {
    const mockCtx = createMockAudioContext();
    vi.stubGlobal('AudioContext', function () {
      return mockCtx;
    });

    const { playTingSound } = await import('./soundEffects');
    playTingSound();

    // 2 notes × 2 oscillators each (main + harmonic) = 4 oscillators
    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(4);
    expect(mockCtx.createGain).toHaveBeenCalledTimes(4);
  });

  it('should not throw when AudioContext is unavailable', async () => {
    vi.stubGlobal('AudioContext', undefined);

    const { playTingSound } = await import('./soundEffects');
    expect(() => playTingSound()).not.toThrow();
  });
});

describe('playCelebrationSound', () => {
  it('should create oscillators for celebration chimes', async () => {
    const mockCtx = createMockAudioContext();
    vi.stubGlobal('AudioContext', function () {
      return mockCtx;
    });

    const { playCelebrationSound } = await import('./soundEffects');
    playCelebrationSound();

    // 5 chimes × 2 oscillators each (main + harmonic) = 10 oscillators
    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(10);
    expect(mockCtx.createGain).toHaveBeenCalledTimes(10);
  });

  it('should not throw when AudioContext is unavailable', async () => {
    vi.stubGlobal('AudioContext', undefined);

    const { playCelebrationSound } = await import('./soundEffects');
    expect(() => playCelebrationSound()).not.toThrow();
  });
});
