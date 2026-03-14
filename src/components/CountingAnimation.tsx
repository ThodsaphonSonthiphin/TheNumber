import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { incrementCount, finishCounting } from '../store/flashCardSlice';
import { numbersData } from '../data/numbers';

const thaiCountingWords = [
  'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า',
  'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ',
];

const speakText = (text: string, lang: string, rate = 0.8): Promise<void> => {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    speechSynthesis.speak(utterance);
  });
};

const CountingAnimation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentIndex, currentCount, isCounting, isRevealed } = useAppSelector(
    (state) => state.flashCard
  );
  const numberData = numbersData[currentIndex];
  const targetNumber = numberData.digit;
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const isSpeaking = useRef(false);

  const speakAndCount = useCallback(async () => {
    if (isSpeaking.current) return;
    isSpeaking.current = true;

    // Show emoji first
    dispatch(incrementCount());
    setAnimatingIndex(currentCount);

    // Then speak the number
    const word = thaiCountingWords[currentCount];
    if (word) {
      await speakText(word, 'th-TH', 0.9);
    }

    isSpeaking.current = false;
  }, [currentCount, dispatch]);

  useEffect(() => {
    if (!isCounting || !isRevealed) return;

    if (currentCount < targetNumber) {
      const timer = setTimeout(() => {
        speakAndCount();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        dispatch(finishCounting());
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isCounting, isRevealed, currentCount, targetNumber, dispatch, speakAndCount]);

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
