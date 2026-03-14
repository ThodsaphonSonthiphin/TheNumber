import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlashCardPage from './pages/FlashCardPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={styles.appShell}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashCardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const styles: Record<string, React.CSSProperties> = {
  appShell: {
    width: '100%',
    maxWidth: '430px',
    minHeight: '100vh',
    margin: '0 auto',
    backgroundColor: '#FAFAFA',
    boxShadow: '0 0 40px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
};

export default App;
