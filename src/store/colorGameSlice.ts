import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ColorQuestion } from '../utils/colorGameUtils';

export interface ColorGameState {
  questions: ColorQuestion[];
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  selectedChoiceId: number | null;
  isCorrect: boolean | null;
  isGameOver: boolean;
  isPlaying: boolean;
}

const initialState: ColorGameState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  totalQuestions: 10,
  selectedChoiceId: null,
  isCorrect: null,
  isGameOver: false,
  isPlaying: false,
};

const colorGameSlice = createSlice({
  name: 'colorGame',
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<ColorQuestion[]>) {
      state.questions = action.payload;
      state.totalQuestions = action.payload.length;
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.selectedChoiceId = null;
      state.isCorrect = null;
      state.isGameOver = false;
      state.isPlaying = false;
    },
    selectAnswer(state, action: PayloadAction<number>) {
      if (state.selectedChoiceId !== null) return;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (!currentQuestion) return;
      state.selectedChoiceId = action.payload;
      const correct = action.payload === currentQuestion.correctColor.id;
      state.isCorrect = correct;
      if (correct) {
        state.score += 1;
      }
    },
    nextQuestion(state) {
      if (state.currentQuestionIndex >= state.totalQuestions - 1) {
        state.isGameOver = true;
      } else {
        state.currentQuestionIndex += 1;
        state.selectedChoiceId = null;
        state.isCorrect = null;
      }
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    resetGame(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { startGame, selectAnswer, nextQuestion, setPlaying, resetGame } =
  colorGameSlice.actions;
export default colorGameSlice.reducer;
