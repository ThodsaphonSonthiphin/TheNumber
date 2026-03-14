import React from 'react';
import { useNavigate } from 'react-router-dom';
import { numbersData } from '../data/numbers';
import { useAppDispatch } from '../store/hooks';
import { setCurrentIndex } from '../store/flashCardSlice';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleStartFlashCards = () => {
    dispatch(setCurrentIndex(0));
    navigate('/flashcards');
  };

  const handleSelectNumber = (index: number) => {
    dispatch(setCurrentIndex(index));
    navigate('/flashcards');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>🔢</div>
        <h1 style={styles.title}>เรียนรู้ตัวเลข</h1>
        <p style={styles.subtitle}>สำหรับเด็ก 1-10</p>
      </div>

      {/* Flash Card Menu Button */}
      <button onClick={handleStartFlashCards} style={styles.menuButton}>
        <span style={styles.menuIcon}>🃏</span>
        <div style={styles.menuTextContainer}>
          <span style={styles.menuTitle}>Flash Cards</span>
          <span style={styles.menuDesc}>เรียนรู้ตัวเลขทีละตัว</span>
        </div>
        <span style={styles.menuArrow}>▶</span>
      </button>

      {/* Alphabet Menu Button */}
      <button onClick={() => navigate('/alphabet')} style={styles.menuButton}>
        <span style={styles.menuIcon}>🔤</span>
        <div style={styles.menuTextContainer}>
          <span style={styles.menuTitle}>ก-ฮ พยัญชนะ</span>
          <span style={styles.menuDesc}>เรียนรู้พยัญชนะไทย กับเสียงสัตว์</span>
        </div>
        <span style={styles.menuArrow}>▶</span>
      </button>

      {/* Number Grid */}
      <div style={styles.gridContainer}>
        <h2 style={styles.gridTitle}>เลือกตัวเลข</h2>
        <div style={styles.grid}>
          {numbersData.map((num, index) => (
            <button
              key={num.id}
              onClick={() => handleSelectNumber(index)}
              style={{
                ...styles.gridItem,
                backgroundColor: num.color,
              }}
            >
              <span style={styles.gridDigit}>{num.digit}</span>
              <span style={styles.gridEmoji}>{num.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 16px',
    gap: '24px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  logo: {
    fontSize: '64px',
    marginBottom: '8px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 900,
    fontFamily: "'Kanit', sans-serif",
    color: '#333',
    margin: 0,
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 400,
    fontFamily: "'Kanit', sans-serif",
    color: '#888',
    margin: 0,
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff',
    border: '2px solid #eee',
    borderRadius: '20px',
    cursor: 'pointer',
    gap: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  menuIcon: {
    fontSize: '40px',
  },
  menuTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  menuTitle: {
    fontSize: '22px',
    fontWeight: 700,
    fontFamily: "'Kanit', sans-serif",
    color: '#333',
  },
  menuDesc: {
    fontSize: '14px',
    fontFamily: "'Kanit', sans-serif",
    color: '#999',
  },
  menuArrow: {
    fontSize: '20px',
    color: '#ccc',
  },
  gridContainer: {
    width: '100%',
  },
  gridTitle: {
    fontSize: '20px',
    fontWeight: 700,
    fontFamily: "'Kanit', sans-serif",
    color: '#555',
    marginBottom: '12px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '1',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s ease',
    gap: '2px',
    padding: '4px',
  },
  gridDigit: {
    fontSize: '28px',
    fontWeight: 900,
    fontFamily: "'Kanit', sans-serif",
    color: '#fff',
    lineHeight: 1,
  },
  gridEmoji: {
    fontSize: '18px',
  },
};

export default HomePage;
