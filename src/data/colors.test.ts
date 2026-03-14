import { describe, it, expect } from 'vitest';
import { colorsData } from './colors';

describe('colorsData', () => {
  it('should have 10 colors', () => {
    expect(colorsData).toHaveLength(10);
  });

  it('should have unique ids', () => {
    const ids = colorsData.map((c) => c.id);
    expect(new Set(ids).size).toBe(colorsData.length);
  });

  it('every color should have required fields', () => {
    colorsData.forEach((color) => {
      expect(color.id).toBeGreaterThan(0);
      expect(color.nameTh).toBeTruthy();
      expect(color.nameEn).toBeTruthy();
      expect(color.hex).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(color.emoji).toBeTruthy();
    });
  });

  it('should start with เหลือง and end with ขาว', () => {
    expect(colorsData[0].nameTh).toBe('เหลือง');
    expect(colorsData[colorsData.length - 1].nameTh).toBe('ขาว');
  });
});
