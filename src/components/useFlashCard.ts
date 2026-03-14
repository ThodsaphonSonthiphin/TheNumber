import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { reveal, nextCard, prevCard, reset, finishPlaying } from '../store/flashCardSlice';
import { numbersData } from '../data/numbers';
import { speakText } from '../utils/speech';

export const useFlashCard = () => {
  const dispatch = useAppDispatch();
  const { currentIndex, isRevealed, isPlaying, isCounting } = useAppSelector(
    (state) => state.flashCard
  );
  const numberData = numbersData[currentIndex];
  const hasSpoken = useRef(false);

  const handleReveal = useCallback(() => {
    if (isPlaying) return;
    dispatch(reveal());
    hasSpoken.current = false;
  }, [dispatch, isPlaying]);

  // Speak Thai + English after counting finishes
  useEffect(() => {
    if (isRevealed && !isCounting && isPlaying && !hasSpoken.current) {
      hasSpoken.current = true;
      const speak = async () => {
        await speakText(numberData.thai, 'th-TH');
        await new Promise((r) => setTimeout(r, 500));
        await speakText(numberData.english, 'en-US');
        dispatch(finishPlaying());
      };
      speak();
    }
  }, [isRevealed, isCounting, isPlaying, numberData, dispatch]);

  const handleNext = useCallback(() => {
    if (isPlaying) return;
    dispatch(nextCard());
  }, [dispatch, isPlaying]);

  const handlePrev = useCallback(() => {
    if (isPlaying) return;
    dispatch(prevCard());
  }, [dispatch, isPlaying]);

  const handleReset = useCallback(() => {
    speechSynthesis.cancel();
    dispatch(reset());
  }, [dispatch]);

  return {
    currentIndex,
    isRevealed,
    isPlaying,
    numberData,
    handleReveal,
    handleNext,
    handlePrev,
    handleReset,
  };
};
