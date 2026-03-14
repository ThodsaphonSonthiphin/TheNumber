import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCountingAnimation } from './useCountingAnimation';

const CountingAnimation: React.FC = () => {
  const {
    numberData,
    targetNumber,
    displayCount,
    animatingIndex,
    isCounting,
    isRevealed,
  } = useCountingAnimation();

  if (!isRevealed) return null;

  const items = Array.from({ length: targetNumber }, (_, i) => i);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 2, md: 2.5 },
        p: { xs: 1.5, sm: 2, md: 2.5 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 1, sm: 1.5, md: 2 },
          maxWidth: { xs: '220px', sm: '280px', md: '360px' },
        }}
      >
        {items.map((_, i) => {
          const isVisible = i < displayCount;
          const isNew = i === animatingIndex;
          return (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '36px', sm: '48px', md: '60px' },
                height: { xs: '36px', sm: '48px', md: '60px' },
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? isNew
                    ? 'scale(1.4)'
                    : 'scale(1)'
                  : 'scale(0.3)',
                transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              }}
            >
              <Typography sx={{ fontSize: { xs: '28px', sm: '36px', md: '44px' }, lineHeight: 1 }}>
                {numberData.emoji}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: '36px', sm: '48px', md: '60px' },
            fontWeight: 900,
            display: 'inline-block',
            color: numberData.color,
            transform: isCounting ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {displayCount}
        </Typography>
      </Box>
    </Box>
  );
};

export default CountingAnimation;
