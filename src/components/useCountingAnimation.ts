import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { finishCounting } from '../store/flashCardSlice';
import { numbersData } from '../data/numbers';
import { speakText, thaiCountingWords } from '../utils/speech';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const useCountingAnimation = () => {
  const dispatch = useAppDispatch();
  const { currentIndex, isCounting, isRevealed } = useAppSelector(
    (state) => state.flashCard
  );
  const numberData = numbersData[currentIndex];
  const targetNumber = numberData.digit;

  const [displayCount, setDisplayCount] = useState(0);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const cancelledRef = useRef(false);

  // Reset local state when card changes or counting restarts
  useEffect(() => {
    setDisplayCount(0);
    setAnimatingIndex(null);
    cancelledRef.current = false;
  }, [currentIndex, isCounting]);

  // Single async loop: show emoji → speak → next
  const runCounting = useCallback(async () => {
    cancelledRef.current = false;

    for (let i = 0; i < targetNumber; i++) {
      if (cancelledRef.current) return;

      // Show emoji
      setDisplayCount(i + 1);
      setAnimatingIndex(i);

      // Wait for animation to render
      await wait(150);
      if (cancelledRef.current) return;

      // Speak the number
      await speakText(thaiCountingWords[i], 'th-TH', 0.9);
      if (cancelledRef.current) return;

      // Brief pause between counts
      await wait(200);
    }

    if (!cancelledRef.current) {
      dispatch(finishCounting());
    }
  }, [targetNumber, dispatch]);

  // Start counting loop when isCounting becomes true
  useEffect(() => {
    if (isCounting && isRevealed) {
      runCounting();
    }
    return () => {
      cancelledRef.current = true;
    };
  }, [isCounting, isRevealed, runCounting]);

  return {
    numberData,
    targetNumber,
    displayCount,
    animatingIndex,
    isCounting,
    isRevealed,
  };
};
