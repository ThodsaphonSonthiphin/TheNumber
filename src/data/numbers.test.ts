import { describe, it, expect } from 'vitest';
import { numbersData } from './numbers';

describe('numbersData', () => {
  it('should have 10 numbers', () => {
    expect(numbersData).toHaveLength(10);
  });

  it('should have digits 1 through 10 in order', () => {
    const digits = numbersData.map((n) => n.digit);
    expect(digits).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('each number should have all required fields', () => {
    numbersData.forEach((n) => {
      expect(n).toHaveProperty('id');
      expect(n).toHaveProperty('digit');
      expect(n).toHaveProperty('thai');
      expect(n).toHaveProperty('english');
      expect(n).toHaveProperty('emoji');
      expect(n).toHaveProperty('color');
      expect(n.thai.length).toBeGreaterThan(0);
      expect(n.english.length).toBeGreaterThan(0);
    });
  });
});
