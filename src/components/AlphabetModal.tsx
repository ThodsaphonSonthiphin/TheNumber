import React from 'react';
import { Dialog, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import type { ThaiConsonant } from '../data/alphabet';
import { useAlphabetModal } from './useAlphabetModal';

interface AlphabetModalProps {
  consonant: ThaiConsonant | null;
  onClose: () => void;
}

const AlphabetModal: React.FC<AlphabetModalProps> = ({ consonant, onClose }) => {
  const { isOpen, isSpeaking, handleClose, handleReplay } = useAlphabetModal({ consonant, onClose });

  if (!consonant) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          animation: 'pop 0.3s ease',
        },
      }}
    >
      <IconButton
        data-testid="close-button"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Image area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          minHeight: 220,
          p: 2,
        }}
      >
        <Box
          component="img"
          src={consonant.image}
          alt={consonant.word}
          sx={{
            maxHeight: 200,
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: 3,
          }}
        />
      </Box>

      {/* Letter + word area */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 80,
            fontWeight: 900,
            fontFamily: "'Kanit', sans-serif",
            color: consonant.color,
            lineHeight: 1,
          }}
        >
          {consonant.letter}
        </Typography>
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 600,
            fontFamily: "'Kanit', sans-serif",
            color: '#555',
          }}
        >
          {consonant.word}
        </Typography>
        <IconButton
          onClick={handleReplay}
          disabled={isSpeaking}
          sx={{
            color: consonant.color,
            mt: 1,
          }}
        >
          <VolumeUpIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default AlphabetModal;
