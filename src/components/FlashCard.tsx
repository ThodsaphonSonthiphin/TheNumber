import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 2, sm: 2.5, md: 3 },
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 2, sm: 2, md: 3 },
        width: '100%',
        maxWidth: { xs: '100%', sm: '400px', md: '560px', lg: '640px' },
        mx: 'auto',
      }}
    >
      {/* Card */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: '320px', sm: '420px', md: '500px' },
          borderRadius: { xs: '18px', sm: '24px', md: '28px' },
          border: '3px solid',
          borderColor: numberData.color,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'all 0.4s ease',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${numberData.color}22, ${numberData.color}44)`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            p: { xs: 2, sm: 3, md: 4 },
            animation: 'fadeInUp 0.5s ease',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '72px', sm: '96px', md: '120px' },
              fontWeight: 900,
              lineHeight: 1,
              color: numberData.color,
            }}
          >
            {numberData.digit}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
            <Typography
              sx={{
                fontSize: { xs: '22px', sm: '28px', md: '34px' },
                fontWeight: 700,
                color: '#333',
              }}
            >
              {numberData.thai}
            </Typography>
            <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, color: '#ccc' }}>
              •
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '20px', sm: '24px', md: '28px' },
                fontWeight: 600,
                color: '#666',
              }}
            >
              {numberData.english}
            </Typography>
          </Box>
          {isRevealed && <CountingAnimation />}
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {!isRevealed ? (
          <Button
            onClick={handleReveal}
            disabled={isPlaying}
            sx={{
              px: { xs: 4, sm: 6, md: 7 },
              py: { xs: 1.5, sm: 2, md: 2.5 },
              fontSize: { xs: '18px', sm: '24px', md: '28px' },
              fontWeight: 700,
              color: '#fff',
              backgroundColor: numberData.color,
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease',
              textTransform: 'none',
              opacity: isPlaying ? 0.5 : 1,
              '&:hover': {
                backgroundColor: numberData.color,
                opacity: 0.9,
              },
              '&:disabled': {
                backgroundColor: numberData.color,
                color: '#fff',
                opacity: 0.5,
              },
            }}
          >
            🔊 นับเลข
          </Button>
        ) : (
          <Button
            onClick={handleReset}
            disabled={isPlaying}
            sx={{
              px: { xs: 3.5, sm: 5, md: 6 },
              py: { xs: 1.5, sm: 1.75, md: 2.5 },
              fontSize: { xs: '16px', sm: '20px', md: '24px' },
              fontWeight: 600,
              color: '#fff',
              backgroundColor: '#a0a0a0',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              textTransform: 'none',
              opacity: isPlaying ? 0.5 : 1,
              '&:hover': {
                backgroundColor: '#909090',
              },
              '&:disabled': {
                backgroundColor: '#a0a0a0',
                color: '#fff',
                opacity: 0.5,
              },
            }}
          >
            🔄 นับใหม่
          </Button>
        )}
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: { xs: '100%', sm: '360px', md: '480px' },
        }}
      >
        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0 || isPlaying}
          sx={{
            px: { xs: 1.5, sm: 2, md: 2.5 },
            py: { xs: 1, sm: 1.25 },
            fontSize: { xs: '14px', sm: '16px', md: '18px' },
            fontWeight: 600,
            color: '#555',
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textTransform: 'none',
            minWidth: 0,
            opacity: currentIndex === 0 || isPlaying ? 0.3 : 1,
            '&:hover': {
              backgroundColor: '#e5e5e5',
            },
            '&:disabled': {
              color: '#555',
              opacity: 0.3,
            },
          }}
        >
          ◀️ ก่อนหน้า
        </Button>
        <Typography
          sx={{
            fontSize: { xs: '14px', sm: '16px', md: '18px' },
            fontWeight: 600,
            color: '#888',
          }}
        >
          {currentIndex + 1} / {numbersData.length}
        </Typography>
        <Button
          onClick={handleNext}
          disabled={currentIndex === 9 || isPlaying}
          sx={{
            px: { xs: 1.5, sm: 2, md: 2.5 },
            py: { xs: 1, sm: 1.25 },
            fontSize: { xs: '14px', sm: '16px', md: '18px' },
            fontWeight: 600,
            color: '#555',
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textTransform: 'none',
            minWidth: 0,
            opacity: currentIndex === 9 || isPlaying ? 0.3 : 1,
            '&:hover': {
              backgroundColor: '#e5e5e5',
            },
            '&:disabled': {
              color: '#555',
              opacity: 0.3,
            },
          }}
        >
          ถัดไป ▶️
        </Button>
      </Box>
    </Box>
  );
};

export default FlashCard;
