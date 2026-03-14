import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlashCard from '../components/FlashCard';

const FlashCardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          ◀️ กลับ
        </button>
        <h2 style={styles.pageTitle}>Flash Cards</h2>
        <div style={{ width: 70 }} />
      </div>

      <FlashCard />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    minHeight: '100vh',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
  },
  backButton: {
    padding: '8px 12px',
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: "'Kanit', sans-serif",
    color: '#555',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: 700,
    fontFamily: "'Kanit', sans-serif",
    color: '#333',
    margin: 0,
  },
};

export default FlashCardPage;
