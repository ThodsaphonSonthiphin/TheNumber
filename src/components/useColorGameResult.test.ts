import { describe, it, expect } from 'vitest';
import { getStarRating } from './useColorGameResult';

describe('getStarRating', () => {
  it('should return 3 stars for 80% or above', () => {
    expect(getStarRating(8, 10)).toBe(3);
    expect(getStarRating(9, 10)).toBe(3);
    expect(getStarRating(10, 10)).toBe(3);
  });

  it('should return 2 stars for 50%-79%', () => {
    expect(getStarRating(5, 10)).toBe(2);
    expect(getStarRating(7, 10)).toBe(2);
  });

  it('should return 1 star for below 50%', () => {
    expect(getStarRating(0, 10)).toBe(1);
    expect(getStarRating(4, 10)).toBe(1);
  });
});
