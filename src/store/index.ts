import { configureStore } from '@reduxjs/toolkit';
import flashCardReducer from './flashCardSlice';
import colorGameReducer from './colorGameSlice';
import familyReducer from './familySlice';

export const store = configureStore({
  reducer: {
    flashCard: flashCardReducer,
    colorGame: colorGameReducer,
    family: familyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
