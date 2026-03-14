import { describe, it, expect } from 'vitest';
import { alphabetData } from './alphabet';

describe('alphabetData', () => {
  it('should have 44 Thai consonants', () => {
    expect(alphabetData).toHaveLength(44);
  });

  it('should start with ก and end with ฮ', () => {
    expect(alphabetData[0].letter).toBe('ก');
    expect(alphabetData[43].letter).toBe('ฮ');
  });

  it('every consonant should have required fields', () => {
    alphabetData.forEach((consonant) => {
      expect(consonant.id).toBeGreaterThan(0);
      expect(consonant.letter).toBeTruthy();
      expect(consonant.word).toBeTruthy();
      expect(consonant.emoji).toBeTruthy();
      expect(typeof consonant.sound).toBe('string');
      expect(consonant.color).toMatch(/^#/);
      expect(consonant.image).toBeTruthy();
    });
  });

  it('should have unique ids', () => {
    const ids = alphabetData.map((c) => c.id);
    expect(new Set(ids).size).toBe(44);
  });
});
