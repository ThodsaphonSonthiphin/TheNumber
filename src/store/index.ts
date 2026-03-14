import { configureStore } from '@reduxjs/toolkit';
import flashCardReducer from './flashCardSlice';
import colorGameReducer from './colorGameSlice';

export const store = configureStore({
  reducer: {
    flashCard: flashCardReducer,
    colorGame: colorGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
