import { describe, it, expect, vi, beforeEach } from 'vitest';
import { speakText, thaiCountingWords } from './speech';

describe('speech utils', () => {
  beforeEach(() => {
    // Mock SpeechSynthesis
    const mockSpeak = vi.fn((utterance: SpeechSynthesisUtterance) => {
      // Simulate async speech completion
      setTimeout(() => utterance.onend?.(new Event('end') as SpeechSynthesisEvent), 10);
    });
    Object.defineProperty(globalThis, 'speechSynthesis', {
      value: { speak: mockSpeak, cancel: vi.fn() },
      writable: true,
    });
    Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
      value: class {
        text = '';
        lang = '';
        rate = 1;
        pitch = 1;
        volume = 1;
        onend: ((e: Event) => void) | null = null;
        onerror: ((e: Event) => void) | null = null;
        constructor(text: string) {
          this.text = text;
        }
      },
      writable: true,
    });
  });

  describe('speakText', () => {
    it('should call speechSynthesis.speak', async () => {
      await speakText('test', 'en-US');
      expect(speechSynthesis.speak).toHaveBeenCalledTimes(1);
    });

    it('should set correct language', async () => {
      await speakText('สวัสดี', 'th-TH');
      const utterance = (speechSynthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.lang).toBe('th-TH');
    });

    it('should use custom rate when provided', async () => {
      await speakText('test', 'en-US', 0.5);
      const utterance = (speechSynthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.rate).toBe(0.5);
    });

    it('should resolve when speech ends', async () => {
      const result = speakText('test', 'en-US');
      await expect(result).resolves.toBeUndefined();
    });
  });

  describe('thaiCountingWords', () => {
    it('should have 10 words for numbers 1-10', () => {
      expect(thaiCountingWords).toHaveLength(10);
    });

    it('should start with หนึ่ง and end with สิบ', () => {
      expect(thaiCountingWords[0]).toBe('หนึ่ง');
      expect(thaiCountingWords[9]).toBe('สิบ');
    });
  });
});
