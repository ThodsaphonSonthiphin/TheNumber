import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import type { ThaiColor } from '../data/colors';

interface ColorChoiceProps {
  color: ThaiColor;
  isSelected: boolean;
  isCorrectChoice: boolean;
  isDisabled: boolean;
  showResult: boolean;
  onSelect: (colorId: number) => void;
}

const ColorChoice: React.FC<ColorChoiceProps> = ({
  color,
  isSelected,
  isCorrectChoice,
  isDisabled,
  showResult,
  onSelect,
}) => {
  const isWhite = color.hex.toLowerCase() === '#dfe6e9';

  let borderColor = isWhite ? '#ccc' : 'transparent';
  let animationStyle = {};

  if (showResult) {
    if (isCorrectChoice) {
      borderColor = '#2ecc71';
      animationStyle = { animation: 'pop 0.3s ease' };
    } else if (isSelected && !isCorrectChoice) {
      borderColor = '#e74c3c';
      animationStyle = { animation: 'shake 0.4s ease' };
    }
  }

  return (
    <Button
      data-testid={`color-choice-${color.id}`}
      onClick={() => onSelect(color.id)}
      disabled={isDisabled}
      sx={{
        width: '100%',
        aspectRatio: '1',
        minWidth: 0,
        borderRadius: 4,
        backgroundColor: color.hex,
        border: `4px solid ${borderColor}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        ...animationStyle,
        '&:hover': {
          backgroundColor: color.hex,
          opacity: 0.9,
        },
        '&:disabled': {
          backgroundColor: color.hex,
          opacity: showResult && !isCorrectChoice && !isSelected ? 0.4 : 1,
        },
      }}
    >
      <Typography sx={{ fontSize: 32, lineHeight: 1 }}>
        {color.emoji}
      </Typography>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "'Kanit', sans-serif",
          color: isWhite || color.hex.toLowerCase() === '#feca57' ? '#555' : '#fff',
          textShadow:
            isWhite || color.hex.toLowerCase() === '#feca57'
              ? 'none'
              : '0 1px 3px rgba(0,0,0,0.3)',
          lineHeight: 1,
        }}
      >
        {color.nameEn}
      </Typography>
      {showResult && isCorrectChoice && (
        <Box
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            fontSize: 20,
          }}
        >
          ✓
        </Box>
      )}
    </Button>
  );
};

export default ColorChoice;
