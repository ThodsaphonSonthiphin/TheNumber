import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { incrementCount, finishCounting } from '../store/flashCardSlice';
import { numbersData } from '../data/numbers';

const CountingAnimation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentIndex, currentCount, isCounting, isRevealed } = useAppSelector(
    (state) => state.flashCard
  );
  const numberData = numbersData[currentIndex];
  const targetNumber = numberData.digit;
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isCounting || !isRevealed) return;

    if (currentCount < targetNumber) {
      const timer = setTimeout(() => {
        dispatch(incrementCount());
        setAnimatingIndex(currentCount);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        dispatch(finishCounting());
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isCounting, isRevealed, currentCount, targetNumber, dispatch]);

  if (!isRevealed) return null;

  const items = Array.from({ length: targetNumber }, (_, i) => i);

  return (
    <div style={styles.container}>
      <div style={styles.emojiGrid}>
        {items.map((_, i) => {
          const isVisible = i < currentCount;
          const isNew = i === animatingIndex;
          return (
            <div
              key={i}
              style={{
                ...styles.emojiItem,
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? isNew
                    ? 'scale(1.4)'
                    : 'scale(1)'
                  : 'scale(0.3)',
                transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              }}
            >
              <span style={styles.emoji}>{numberData.emoji}</span>
            </div>
          );
        })}
      </div>
      <div style={styles.countDisplay}>
        <span
          style={{
            ...styles.countText,
            color: numberData.color,
            transform: isCounting ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {currentCount}
        </span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
  },
  emojiGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
    maxWidth: '280px',
  },
  emojiItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
  },
  emoji: {
    fontSize: '36px',
  },
  countDisplay: {
    marginTop: '8px',
  },
  countText: {
    fontSize: '48px',
    fontWeight: 900,
    fontFamily: "'Kanit', sans-serif",
    display: 'inline-block',
  },
};

export default CountingAnimation;
