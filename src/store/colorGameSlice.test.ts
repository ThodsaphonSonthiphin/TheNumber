import { describe, it, expect } from 'vitest';
import reducer, {
  startGame,
  selectAnswer,
  nextQuestion,
  setPlaying,
  resetGame,
  ColorGameState,
} from './colorGameSlice';
import type { ColorQuestion } from '../utils/colorGameUtils';
import { colorsData } from '../data/colors';

const makeMockQuestions = (): ColorQuestion[] => [
  { correctColor: colorsData[0], choices: [colorsData[0], colorsData[1], colorsData[2], colorsData[3]] },
  { correctColor: colorsData[4], choices: [colorsData[4], colorsData[5], colorsData[6], colorsData[7]] },
  { correctColor: colorsData[2], choices: [colorsData[2], colorsData[8], colorsData[9], colorsData[1]] },
];

describe('colorGameSlice', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state.questions).toEqual([]);
    expect(state.score).toBe(0);
    expect(state.isGameOver).toBe(false);
  });

  describe('startGame', () => {
    it('should initialize with questions', () => {
      const questions = makeMockQuestions();
      const state = reducer(undefined, startGame(questions));
      expect(state.questions).toHaveLength(3);
      expect(state.totalQuestions).toBe(3);
      expect(state.currentQuestionIndex).toBe(0);
      expect(state.score).toBe(0);
      expect(state.isGameOver).toBe(false);
    });
  });

  describe('selectAnswer', () => {
    it('should increment score for correct answer', () => {
      const questions = makeMockQuestions();
      let state = reducer(undefined, startGame(questions));
      state = reducer(state, selectAnswer(colorsData[0].id));
      expect(state.score).toBe(1);
      expect(state.isCorrect).toBe(true);
      expect(state.selectedChoiceId).toBe(colorsData[0].id);
    });

    it('should not increment score for wrong answer', () => {
      const questions = makeMockQuestions();
      let state = reducer(undefined, startGame(questions));
      state = reducer(state, selectAnswer(colorsData[1].id));
      expect(state.score).toBe(0);
      expect(state.isCorrect).toBe(false);
    });

    it('should be no-op when already answered', () => {
      const questions = makeMockQuestions();
      let state = reducer(undefined, startGame(questions));
      state = reducer(state, selectAnswer(colorsData[1].id));
      state = reducer(state, selectAnswer(colorsData[0].id));
      expect(state.score).toBe(0);
      expect(state.selectedChoiceId).toBe(colorsData[1].id);
    });
  });

  describe('nextQuestion', () => {
    it('should move to next question and reset answer state', () => {
      const questions = makeMockQuestions();
      let state = reducer(undefined, startGame(questions));
      state = reducer(state, selectAnswer(colorsData[0].id));
      state = reducer(state, nextQuestion());
      expect(state.currentQuestionIndex).toBe(1);
      expect(state.selectedChoiceId).toBeNull();
      expect(state.isCorrect).toBeNull();
    });

    it('should set isGameOver on last question', () => {
      const questions = makeMockQuestions();
      let state = reducer(undefined, startGame(questions));
      state = reducer(state, nextQuestion());
      state = reducer(state, nextQuestion());
      state = reducer(state, nextQuestion());
      expect(state.isGameOver).toBe(true);
    });
  });

  describe('setPlaying', () => {
    it('should toggle isPlaying', () => {
      let state = reducer(undefined, setPlaying(true));
      expect(state.isPlaying).toBe(true);
      state = reducer(state, setPlaying(false));
      expect(state.isPlaying).toBe(false);
    });
  });

  describe('resetGame', () => {
    it('should return to initial state', () => {
      const questions = makeMockQuestions();
      let state = reducer(undefined, startGame(questions));
      state = reducer(state, selectAnswer(colorsData[0].id));
      state = reducer(state, resetGame());
      expect(state.questions).toEqual([]);
      expect(state.score).toBe(0);
      expect(state.currentQuestionIndex).toBe(0);
      expect(state.isGameOver).toBe(false);
    });
  });
});
