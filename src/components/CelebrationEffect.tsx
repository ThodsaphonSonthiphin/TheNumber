import React from 'react';
import { Box } from '@mui/material';

interface CelebrationEffectProps {
  isVisible: boolean;
}

const emojis = ['🎆', '🎇', '🎉', '✨', '🌟', '⭐', '💫', '🎊'];

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <Box
      data-testid="celebration-effect"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Floating emoji sparkles overlay - complements canvas-confetti */}
      {emojis.map((emoji, i) => (
        <Box
          key={`sparkle-${i}`}
          sx={{
            position: 'absolute',
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 3) * 25}%`,
            fontSize: '28px',
            animation: `fireworkBurst 1.2s ease-out ${i * 0.12}s forwards`,
            opacity: 0,
          }}
        >
          {emoji}
        </Box>
      ))}
    </Box>
  );
};

export default CelebrationEffect;
