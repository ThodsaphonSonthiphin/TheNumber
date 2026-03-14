import React, { useCallback, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { reveal, nextCard, prevCard, reset, finishPlaying } from '../store/flashCardSlice';
import { numbersData } from '../data/numbers';
import CountingAnimation from './CountingAnimation';

const speakText = (text: string, lang: string): Promise<void> => {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    speechSynthesis.speak(utterance);
  });
};

const FlashCard: React.FC = () => {
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

  // Speak after counting finishes
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

  const handleNext = () => {
    if (isPlaying) return;
    dispatch(nextCard());
  };

  const handlePrev = () => {
    if (isPlaying) return;
    dispatch(prevCard());
  };

  const handleReset = () => {
    speechSynthesis.cancel();
    dispatch(reset());
  };

  return (
    <div style={styles.wrapper}>
      {/* Card */}
      <div
        style={{
          ...styles.card,
          background: isRevealed
            ? `linear-gradient(135deg, ${numberData.color}22, ${numberData.color}44)`
            : `linear-gradient(135deg, ${numberData.color}44, ${numberData.color}66)`,
          borderColor: numberData.color,
        }}
      >
        {!isRevealed ? (
          <div style={styles.questionSide}>
            <div style={styles.questionMark}>❓</div>
            <div style={{ ...styles.digitHidden, color: numberData.color }}>
              {numberData.digit}
            </div>
            <p style={styles.hintText}>เลขนี้คือเลขอะไร?</p>
          </div>
        ) : (
          <div style={styles.revealSide}>
            <div style={{ ...styles.digitRevealed, color: numberData.color }}>
              {numberData.digit}
            </div>
            <div style={styles.nameRow}>
              <span style={styles.thaiName}>{numberData.thai}</span>
              <span style={styles.separator}>•</span>
              <span style={styles.englishName}>{numberData.english}</span>
            </div>
            <CountingAnimation />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        {!isRevealed ? (
          <button
            onClick={handleReveal}
            style={{
              ...styles.revealButton,
              backgroundColor: numberData.color,
            }}
          >
            🔔 เฉลย
          </button>
        ) : (
          <button onClick={handleReset} style={styles.resetButton}>
            🔄 ดูใหม่
          </button>
        )}
      </div>

      {/* Navigation */}
      <div style={styles.navigation}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 || isPlaying}
          style={{
            ...styles.navButton,
            opacity: currentIndex === 0 || isPlaying ? 0.3 : 1,
          }}
        >
          ◀️ ก่อนหน้า
        </button>
        <span style={styles.pageIndicator}>
          {currentIndex + 1} / {numbersData.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === 9 || isPlaying}
          style={{
            ...styles.navButton,
            opacity: currentIndex === 9 || isPlaying ? 0.3 : 1,
          }}
        >
          ถัดไป ▶️
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '16px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  card: {
    width: '100%',
    minHeight: '420px',
    borderRadius: '24px',
    border: '3px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transition: 'all 0.4s ease',
    overflow: 'hidden',
  },
  questionSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '32px',
  },
  questionMark: {
    fontSize: '64px',
    animation: 'bounce 1s ease infinite',
  },
  digitHidden: {
    fontSize: '120px',
    fontWeight: 900,
    fontFamily: "'Kanit', sans-serif",
    lineHeight: 1,
    filter: 'blur(20px)',
    userSelect: 'none',
  },
  hintText: {
    fontSize: '20px',
    fontFamily: "'Kanit', sans-serif",
    color: '#666',
    fontWeight: 600,
  },
  revealSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '24px',
    animation: 'fadeInUp 0.5s ease',
  },
  digitRevealed: {
    fontSize: '96px',
    fontWeight: 900,
    fontFamily: "'Kanit', sans-serif",
    lineHeight: 1,
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  thaiName: {
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: "'Kanit', sans-serif",
    color: '#333',
  },
  separator: {
    fontSize: '20px',
    color: '#ccc',
  },
  englishName: {
    fontSize: '24px',
    fontWeight: 600,
    fontFamily: "'Kanit', sans-serif",
    color: '#666',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  revealButton: {
    padding: '16px 48px',
    fontSize: '24px',
    fontWeight: 700,
    fontFamily: "'Kanit', sans-serif",
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease',
  },
  resetButton: {
    padding: '14px 40px',
    fontSize: '20px',
    fontWeight: 600,
    fontFamily: "'Kanit', sans-serif",
    color: '#fff',
    backgroundColor: '#a0a0a0',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '360px',
  },
  navButton: {
    padding: '10px 16px',
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: "'Kanit', sans-serif",
    color: '#555',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  pageIndicator: {
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: "'Kanit', sans-serif",
    color: '#888',
  },
};

export default FlashCard;
