import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import { useColorGameResult } from './useColorGameResult';

interface ColorGameResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const messages = [
  'Keep trying!',
  'Good job!',
  'Excellent!',
];

const ColorGameResult: React.FC<ColorGameResultProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const { stars, handlePlayAgain, handleGoHome } = useColorGameResult({
    score,
    totalQuestions,
    onRestart,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        p: 4,
        minHeight: '60vh',
      }}
    >
      <Typography
        sx={{
          fontSize: 60,
          animation: 'celebrate 0.6s ease',
        }}
      >
        {'⭐'.repeat(stars)}
      </Typography>

      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 900,
          fontFamily: "'Kanit', sans-serif",
          color: '#333',
        }}
      >
        {messages[stars - 1]}
      </Typography>

      <Typography
        sx={{
          fontSize: 48,
          fontWeight: 900,
          fontFamily: "'Fredoka', sans-serif",
          color: stars === 3 ? '#2ecc71' : stars === 2 ? '#f39c12' : '#e74c3c',
          animation: 'pop 0.4s ease',
        }}
      >
        {score}/{totalQuestions}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          onClick={handlePlayAgain}
          variant="contained"
          startIcon={<ReplayIcon />}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.5,
            fontSize: 18,
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 700,
            textTransform: 'none',
            backgroundColor: '#0ABDE3',
          }}
        >
          Play Again
        </Button>
        <Button
          onClick={handleGoHome}
          variant="outlined"
          startIcon={<HomeIcon />}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.5,
            fontSize: 18,
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 700,
            textTransform: 'none',
            color: '#555',
            borderColor: '#ccc',
          }}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
};

export default ColorGameResult;
