import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAlphabetModal } from './useAlphabetModal';
import type { ThaiConsonant } from '../data/alphabet';

vi.mock('../utils/speech', () => ({
  speakText: vi.fn(() => Promise.resolve()),
}));

import { speakText } from '../utils/speech';

const mockConsonant: ThaiConsonant = {
  id: 1,
  letter: 'ก',
  word: 'ไก่',
  emoji: '🐔',
  sound: 'กุ๊กกุ๊กกุ๊ก',
  color: '#FF6B6B',
  image: 'https://example.com/chicken.jpg',
};

const mockConsonantNoSound: ThaiConsonant = {
  id: 2,
  letter: 'ข',
  word: 'ไข่',
  emoji: '🥚',
  sound: '',
  color: '#FF9F43',
  image: 'https://example.com/egg.jpg',
};

describe('useAlphabetModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(globalThis, 'speechSynthesis', {
      value: { speak: vi.fn(), cancel: vi.fn() },
      writable: true,
    });
  });

  it('should return isOpen false when consonant is null', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() =>
      useAlphabetModal({ consonant: null, onClose })
    );
    expect(result.current.isOpen).toBe(false);
  });

  it('should return isOpen true when consonant is provided', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() =>
      useAlphabetModal({ consonant: mockConsonant, onClose })
    );
    expect(result.current.isOpen).toBe(true);
  });

  it('should speak letter and word when consonant is set', async () => {
    const onClose = vi.fn();
    renderHook(() =>
      useAlphabetModal({ consonant: mockConsonant, onClose })
    );

    // speakText should be called with the letter + word
    expect(speakText).toHaveBeenCalledWith('ก ไก่', 'th-TH', 0.7);
  });

  it('should speak animal sound after letter for consonant with sound', async () => {
    const onClose = vi.fn();
    renderHook(() =>
      useAlphabetModal({ consonant: mockConsonant, onClose })
    );

    // Wait for async operations
    await vi.waitFor(() => {
      expect(speakText).toHaveBeenCalledWith('กุ๊กกุ๊กกุ๊ก', 'th-TH', 0.9);
    });
  });

  it('should not speak animal sound for consonant without sound', async () => {
    const onClose = vi.fn();
    renderHook(() =>
      useAlphabetModal({ consonant: mockConsonantNoSound, onClose })
    );

    await vi.waitFor(() => {
      expect(speakText).toHaveBeenCalledTimes(1);
      expect(speakText).toHaveBeenCalledWith('ข ไข่', 'th-TH', 0.7);
    });
  });

  it('should NOT auto-close after speech finishes', async () => {
    const onClose = vi.fn();
    const { result } = renderHook(() =>
      useAlphabetModal({ consonant: mockConsonantNoSound, onClose })
    );

    // Wait for speech to finish
    await vi.waitFor(() => {
      expect(result.current.isSpeaking).toBe(false);
    });

    // Modal should remain open, onClose should NOT be called
    expect(onClose).not.toHaveBeenCalled();
    expect(result.current.isOpen).toBe(true);
  });

  it('handleClose should cancel speech and call onClose', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() =>
      useAlphabetModal({ consonant: mockConsonant, onClose })
    );

    act(() => {
      result.current.handleClose();
    });

    expect(speechSynthesis.cancel).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('handleReplay should speak again', async () => {
    const onClose = vi.fn();
    // Use consonant without sound to avoid setTimeout delays
    const { result } = renderHook(() =>
      useAlphabetModal({ consonant: mockConsonantNoSound, onClose })
    );

    // Wait for initial speech to finish
    await vi.waitFor(() => {
      expect(result.current.isSpeaking).toBe(false);
    });

    vi.clearAllMocks();

    await act(async () => {
      await result.current.handleReplay();
    });

    expect(speakText).toHaveBeenCalledWith('ข ไข่', 'th-TH', 0.7);
  });
});
