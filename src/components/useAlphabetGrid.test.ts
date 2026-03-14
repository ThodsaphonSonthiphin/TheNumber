import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAlphabetGrid } from './useAlphabetGrid';
import type { ThaiConsonant } from '../data/alphabet';

vi.mock('../utils/speech', () => ({
  speakText: vi.fn(() => Promise.resolve()),
}));

const mockConsonant: ThaiConsonant = {
  id: 1,
  letter: 'ก',
  word: 'ไก่',
  emoji: '🐔',
  sound: 'กุ๊กกุ๊กกุ๊ก',
  color: '#FF6B6B',
  image: 'https://example.com/chicken.jpg',
};

describe('useAlphabetGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(globalThis, 'speechSynthesis', {
      value: { speak: vi.fn(), cancel: vi.fn() },
      writable: true,
    });
  });

  it('should return alphabetData', () => {
    const { result } = renderHook(() => useAlphabetGrid());
    expect(result.current.alphabetData).toHaveLength(44);
  });

  it('should have selectedConsonant as null initially', () => {
    const { result } = renderHook(() => useAlphabetGrid());
    expect(result.current.selectedConsonant).toBeNull();
  });

  it('handleCardClick should set selectedConsonant', () => {
    const { result } = renderHook(() => useAlphabetGrid());

    act(() => {
      result.current.handleCardClick(mockConsonant);
    });

    expect(result.current.selectedConsonant).toEqual(mockConsonant);
  });

  it('handleCloseModal should clear selectedConsonant', () => {
    const { result } = renderHook(() => useAlphabetGrid());

    act(() => {
      result.current.handleCardClick(mockConsonant);
    });
    expect(result.current.selectedConsonant).toEqual(mockConsonant);

    act(() => {
      result.current.handleCloseModal();
    });
    expect(result.current.selectedConsonant).toBeNull();
  });

  it('handleCloseModal should cancel speech', () => {
    const { result } = renderHook(() => useAlphabetGrid());

    act(() => {
      result.current.handleCloseModal();
    });

    expect(speechSynthesis.cancel).toHaveBeenCalled();
  });
});
