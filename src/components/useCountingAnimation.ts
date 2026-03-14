import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { finishCounting } from '../store/flashCardSlice';
import { numbersData } from '../data/numbers';
import { speakText, thaiCountingWords } from '../utils/speech';

const waitForPaint = (): Promise<void> =>
  new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

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

  // Reset when card changes
  useEffect(() => {
    setDisplayCount(0);
    setAnimatingIndex(null);
  }, [currentIndex]);

  // Single effect: start async counting loop when isCounting becomes true
  useEffect(() => {
    if (!isCounting || !isRevealed) return;

    cancelledRef.current = false;
    setDisplayCount(0);
    setAnimatingIndex(null);

    const run = async () => {
      for (let i = 0; i < targetNumber; i++) {
        if (cancelledRef.current) return;

        // 1. Show emoji
        setDisplayCount(i + 1);
        setAnimatingIndex(i);

        // 2. Wait for browser to actually paint the emoji
        await waitForPaint();
        if (cancelledRef.current) return;

        // 3. Speak the number
        await speakText(thaiCountingWords[i], 'th-TH', 0.9);
        if (cancelledRef.current) return;

        // 4. Brief pause before next
        await wait(200);
      }

      if (!cancelledRef.current) {
        dispatch(finishCounting());
      }
    };

    run();

    return () => {
      cancelledRef.current = true;
    };
  }, [isCounting, isRevealed, targetNumber, dispatch]);

  return {
    numberData,
    targetNumber,
    displayCount,
    animatingIndex,
    isCounting,
    isRevealed,
  };
};
