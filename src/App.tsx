import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomePage from './pages/HomePage';
import FlashCardPage from './pages/FlashCardPage';
import AlphabetPage from './pages/AlphabetPage';
import ColorGamePage from './pages/ColorGamePage';
import FamilyPage from './pages/FamilyPage';
import FamilyDetailPage from './pages/FamilyDetailPage';
import NavBar from './components/NavBar';

declare const __APP_VERSION__: string;
declare const __COMMIT_HASH__: string;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '430px', md: '600px', lg: '700px' },
          minHeight: '100vh',
          mx: 'auto',
          backgroundColor: '#FAFAFA',
          boxShadow: '0 0 40px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'auto',
          pb: '80px',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashCardPage />} />
          <Route path="/alphabet" element={<AlphabetPage />} />
          <Route path="/color-game" element={<ColorGamePage />} />
          <Route path="/family" element={<FamilyPage />} />
          <Route path="/family/:id" element={<FamilyDetailPage />} />
        </Routes>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '10px',
            color: '#ccc',
            fontFamily: 'monospace',
            py: 1,
          }}
        >
          v{__APP_VERSION__} • {__COMMIT_HASH__}
        </Typography>
      </Box>
      <NavBar />
    </BrowserRouter>
  );
};

export default App;
