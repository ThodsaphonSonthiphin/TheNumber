import React from 'react';
import { Box } from '@mui/material';

interface CelebrationEffectProps {
  isVisible: boolean;
}

const particles = [
  { emoji: '🎆', x: '10%', delay: 0 },
  { emoji: '✨', x: '25%', delay: 0.1 },
  { emoji: '🌟', x: '50%', delay: 0.2 },
  { emoji: '💥', x: '75%', delay: 0.15 },
  { emoji: '🎉', x: '90%', delay: 0.05 },
  { emoji: '⭐', x: '15%', delay: 0.25 },
  { emoji: '🎇', x: '40%', delay: 0.1 },
  { emoji: '✨', x: '60%', delay: 0.3 },
  { emoji: '🌟', x: '85%', delay: 0.2 },
  { emoji: '🎆', x: '35%', delay: 0.15 },
  { emoji: '💫', x: '55%', delay: 0.05 },
  { emoji: '🎉', x: '70%', delay: 0.25 },
];

const confettiColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#DDA0DD', '#87CEEB', '#F0E68C'];

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
      {/* Firework emoji particles */}
      {particles.map((p, i) => (
        <Box
          key={`particle-${i}`}
          sx={{
            position: 'absolute',
            left: p.x,
            top: '60%',
            fontSize: '28px',
            animation: `fireworkShoot 0.8s ease-out ${p.delay}s forwards`,
          }}
        >
          {p.emoji}
        </Box>
      ))}

      {/* Burst effects at top */}
      {particles.slice(0, 6).map((p, i) => (
        <Box
          key={`burst-${i}`}
          sx={{
            position: 'absolute',
            left: p.x,
            top: '20%',
            fontSize: '36px',
            animation: `fireworkBurst 1s ease-out ${0.4 + p.delay}s forwards`,
            opacity: 0,
          }}
        >
          {p.emoji}
        </Box>
      ))}

      {/* Sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={`sparkle-${i}`}
          sx={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 20}%`,
            fontSize: '20px',
            animation: `sparkle 0.6s ease-in-out ${0.2 + i * 0.1}s`,
            opacity: 0,
          }}
        >
          ✨
        </Box>
      ))}

      {/* Confetti pieces */}
      {confettiColors.map((color, i) => (
        <Box
          key={`confetti-${i}`}
          sx={{
            position: 'absolute',
            left: `${5 + i * 12}%`,
            top: '-10px',
            width: '10px',
            height: '10px',
            borderRadius: i % 2 === 0 ? '50%' : '2px',
            backgroundColor: color,
            animation: `confettiFall 1.2s ease-in ${i * 0.08}s forwards`,
          }}
        />
      ))}
    </Box>
  );
};

export default CelebrationEffect;
