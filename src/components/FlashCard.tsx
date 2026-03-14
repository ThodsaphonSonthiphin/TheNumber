import React from 'react';
import { numbersData } from '../data/numbers';
import { useFlashCard } from './useFlashCard';
import CountingAnimation from './CountingAnimation';

const FlashCard: React.FC = () => {
  const {
    currentIndex,
    isRevealed,
    isPlaying,
    numberData,
    handleReveal,
    handleNext,
    handlePrev,
    handleReset,
  } = useFlashCard();

  return (
    <div style={styles.wrapper}>
      {/* Card */}
      <div
        style={{
          ...styles.card,
          background: `linear-gradient(135deg, ${numberData.color}22, ${numberData.color}44)`,
          borderColor: numberData.color,
        }}
      >
        <div style={styles.revealSide}>
          <div style={{ ...styles.digitRevealed, color: numberData.color }}>
            {numberData.digit}
          </div>
          <div style={styles.nameRow}>
            <span style={styles.thaiName}>{numberData.thai}</span>
            <span style={styles.separator}>•</span>
            <span style={styles.englishName}>{numberData.english}</span>
          </div>
          {isRevealed && <CountingAnimation />}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        {!isRevealed ? (
          <button
            onClick={handleReveal}
            disabled={isPlaying}
            style={{
              ...styles.revealButton,
              backgroundColor: numberData.color,
              opacity: isPlaying ? 0.5 : 1,
            }}
          >
            🔊 นับเลข
          </button>
        ) : (
          <button
            onClick={handleReset}
            disabled={isPlaying}
            style={{
              ...styles.resetButton,
              opacity: isPlaying ? 0.5 : 1,
            }}
          >
            🔄 นับใหม่
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
