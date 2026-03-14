import React from 'react';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { useAlphabetGrid } from './useAlphabetGrid';
import AlphabetModal from './AlphabetModal';

const AlphabetGrid: React.FC = () => {
  const { alphabetData, selectedConsonant, handleCardClick, handleCloseModal } = useAlphabetGrid();

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1.2,
          p: 2,
        }}
      >
        {alphabetData.map((consonant) => {
          const isActive = selectedConsonant?.id === consonant.id;
          return (
            <Card
              key={consonant.id}
              elevation={isActive ? 8 : 3}
              sx={{
                borderRadius: 3,
                transform: isActive ? 'scale(1.12)' : 'scale(1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                zIndex: isActive ? 2 : 1,
                boxShadow: isActive
                  ? `0 0 16px ${consonant.color}`
                  : undefined,
              }}
            >
              <CardActionArea
                onClick={() => handleCardClick(consonant)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  aspectRatio: '1',
                  backgroundColor: consonant.color,
                  p: 0.5,
                  gap: 0.3,
                }}
              >
                <Typography sx={{ fontSize: 22, lineHeight: 1 }}>
                  {consonant.emoji}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 900,
                    fontFamily: "'Kanit', sans-serif",
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  {consonant.letter}
                </Typography>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
      <AlphabetModal consonant={selectedConsonant} onClose={handleCloseModal} />
    </>
  );
};

export default AlphabetGrid;
