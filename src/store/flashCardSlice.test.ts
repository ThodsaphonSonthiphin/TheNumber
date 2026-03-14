import { describe, it, expect } from 'vitest';
import reducer, {
  reveal,
  finishCounting,
  finishPlaying,
  reset,
  nextCard,
  prevCard,
  setCurrentIndex,
} from './flashCardSlice';

const initialState = {
  currentIndex: 0,
  isRevealed: false,
  isCounting: false,
  isPlaying: false,
};

describe('flashCardSlice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('reveal', () => {
    it('should set isRevealed, isCounting, isPlaying to true', () => {
      const state = reducer(initialState, reveal());
      expect(state.isRevealed).toBe(true);
      expect(state.isCounting).toBe(true);
      expect(state.isPlaying).toBe(true);
    });
  });

  describe('finishCounting', () => {
    it('should set isCounting to false', () => {
      const revealed = reducer(initialState, reveal());
      const state = reducer(revealed, finishCounting());
      expect(state.isCounting).toBe(false);
      expect(state.isPlaying).toBe(true);
      expect(state.isRevealed).toBe(true);
    });
  });

  describe('finishPlaying', () => {
    it('should set isPlaying to false', () => {
      const revealed = reducer(initialState, reveal());
      const counted = reducer(revealed, finishCounting());
      const state = reducer(counted, finishPlaying());
      expect(state.isPlaying).toBe(false);
      expect(state.isRevealed).toBe(true);
    });
  });

  describe('reset', () => {
    it('should reset all flags but keep currentIndex', () => {
      const revealed = reducer({ ...initialState, currentIndex: 3 }, reveal());
      const state = reducer(revealed, reset());
      expect(state.isRevealed).toBe(false);
      expect(state.isCounting).toBe(false);
      expect(state.isPlaying).toBe(false);
      expect(state.currentIndex).toBe(3);
    });
  });

  describe('nextCard', () => {
    it('should increment currentIndex and reset flags', () => {
      const revealed = reducer(initialState, reveal());
      const state = reducer(revealed, nextCard());
      expect(state.currentIndex).toBe(1);
      expect(state.isRevealed).toBe(false);
      expect(state.isCounting).toBe(false);
      expect(state.isPlaying).toBe(false);
    });

    it('should not exceed index 9', () => {
      const state = reducer({ ...initialState, currentIndex: 9 }, nextCard());
      expect(state.currentIndex).toBe(9);
    });
  });

  describe('prevCard', () => {
    it('should decrement currentIndex and reset flags', () => {
      const state = reducer({ ...initialState, currentIndex: 3 }, prevCard());
      expect(state.currentIndex).toBe(2);
    });

    it('should not go below index 0', () => {
      const state = reducer(initialState, prevCard());
      expect(state.currentIndex).toBe(0);
    });
  });

  describe('setCurrentIndex', () => {
    it('should set index and reset all flags', () => {
      const revealed = reducer(initialState, reveal());
      const state = reducer(revealed, setCurrentIndex(5));
      expect(state.currentIndex).toBe(5);
      expect(state.isRevealed).toBe(false);
      expect(state.isCounting).toBe(false);
      expect(state.isPlaying).toBe(false);
    });
  });
});
