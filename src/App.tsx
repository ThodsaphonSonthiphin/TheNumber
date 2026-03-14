import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomePage from './pages/HomePage';
import FlashCardPage from './pages/FlashCardPage';

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
          overflow: 'hidden',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashCardPage />} />
        </Routes>
        <Typography
          sx={{
            position: 'fixed',
            bottom: '4px',
            right: '8px',
            fontSize: '10px',
            color: '#ccc',
            fontFamily: 'monospace',
          }}
        >
          v{__APP_VERSION__} • {__COMMIT_HASH__}
        </Typography>
      </Box>
    </BrowserRouter>
  );
};

export default App;
