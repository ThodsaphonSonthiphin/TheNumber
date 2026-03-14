import { describe, it, expect } from 'vitest';
import { colorsData } from '../data/colors';
import { shuffleArray, generateQuestion, generateRound } from './colorGameUtils';

describe('shuffleArray', () => {
  it('should return an array of the same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffleArray(arr);
    expect(result).toHaveLength(arr.length);
  });

  it('should contain the same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffleArray(arr);
    expect(result.sort()).toEqual(arr.sort());
  });

  it('should not mutate the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const copy = [...arr];
    shuffleArray(arr);
    expect(arr).toEqual(copy);
  });
});

describe('generateQuestion', () => {
  it('should return exactly 4 choices', () => {
    const question = generateQuestion(colorsData);
    expect(question.choices).toHaveLength(4);
  });

  it('should include the correct color in choices', () => {
    const question = generateQuestion(colorsData);
    const choiceIds = question.choices.map((c) => c.id);
    expect(choiceIds).toContain(question.correctColor.id);
  });

  it('should have unique choices', () => {
    const question = generateQuestion(colorsData);
    const ids = question.choices.map((c) => c.id);
    expect(new Set(ids).size).toBe(4);
  });

  it('should not pick excluded ids as correct color', () => {
    const excludeIds = [1, 2, 3];
    for (let i = 0; i < 20; i++) {
      const question = generateQuestion(colorsData, excludeIds);
      expect(excludeIds).not.toContain(question.correctColor.id);
    }
  });
});

describe('generateRound', () => {
  it('should return the requested number of questions', () => {
    const questions = generateRound(colorsData, 10);
    expect(questions).toHaveLength(10);
  });

  it('should not have consecutive questions with the same correct color', () => {
    const questions = generateRound(colorsData, 10);
    for (let i = 1; i < questions.length; i++) {
      expect(questions[i].correctColor.id).not.toBe(
        questions[i - 1].correctColor.id,
      );
    }
  });
});
