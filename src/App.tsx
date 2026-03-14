import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlashCardPage from './pages/FlashCardPage';
import AlphabetPage from './pages/AlphabetPage';

declare const __APP_VERSION__: string;
declare const __COMMIT_HASH__: string;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={styles.appShell}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashCardPage />} />
          <Route path="/alphabet" element={<AlphabetPage />} />
        </Routes>
        <div style={styles.versionInfo}>
          v{__APP_VERSION__} • {__COMMIT_HASH__}
        </div>
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
    overflow: 'auto',
  },
  versionInfo: {
    position: 'fixed',
    bottom: '4px',
    right: '8px',
    fontSize: '10px',
    color: '#ccc',
    fontFamily: 'monospace',
  },
};

export default App;
