import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlashCardState {
  currentIndex: number;
  isRevealed: boolean;
  isCounting: boolean;
  currentCount: number;
  isPlaying: boolean;
}

const initialState: FlashCardState = {
  currentIndex: 0,
  isRevealed: false,
  isCounting: false,
  currentCount: 0,
  isPlaying: false,
};

const flashCardSlice = createSlice({
  name: 'flashCard',
  initialState,
  reducers: {
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
      state.isRevealed = false;
      state.isCounting = false;
      state.currentCount = 0;
      state.isPlaying = false;
    },
    reveal(state) {
      state.isRevealed = true;
      state.isCounting = true;
      state.currentCount = 0;
      state.isPlaying = true;
    },
    incrementCount(state) {
      state.currentCount += 1;
    },
    finishCounting(state) {
      state.isCounting = false;
    },
    finishPlaying(state) {
      state.isPlaying = false;
    },
    reset(state) {
      state.isRevealed = false;
      state.isCounting = false;
      state.currentCount = 0;
      state.isPlaying = false;
    },
    nextCard(state) {
      state.currentIndex = Math.min(state.currentIndex + 1, 9);
      state.isRevealed = false;
      state.isCounting = false;
      state.currentCount = 0;
      state.isPlaying = false;
    },
    prevCard(state) {
      state.currentIndex = Math.max(state.currentIndex - 1, 0);
      state.isRevealed = false;
      state.isCounting = false;
      state.currentCount = 0;
      state.isPlaying = false;
    },
  },
});

export const {
  setCurrentIndex,
  reveal,
  incrementCount,
  finishCounting,
  finishPlaying,
  reset,
  nextCard,
  prevCard,
} = flashCardSlice.actions;

export default flashCardSlice.reducer;
