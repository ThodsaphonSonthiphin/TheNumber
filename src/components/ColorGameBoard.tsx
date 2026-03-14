import React from 'react';
import { Box, Typography, IconButton, Button, LinearProgress } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useColorGameBoard } from './useColorGameBoard';
import ColorChoice from './ColorChoice';
import ColorGameResult from './ColorGameResult';

const ColorGameBoard: React.FC = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    selectedChoiceId,
    isCorrect,
    isGameOver,
    isPlaying,
    handleSelect,
    handleNext,
    handleReplay,
    handleRestart,
  } = useColorGameBoard();

  if (isGameOver) {
    return (
      <ColorGameResult
        score={score}
        totalQuestions={totalQuestions}
        onRestart={handleRestart}
      />
    );
  }

  if (!currentQuestion) return null;

  const hasAnswered = selectedChoiceId !== null;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 2,
        pb: 4,
      }}
    >
      {/* Progress */}
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Kanit', sans-serif",
              color: '#555',
            }}
          >
            ข้อ {currentQuestionIndex + 1}/{totalQuestions}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Kanit', sans-serif",
              color: '#0ABDE3',
            }}
          >
            ⭐ {score}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#eee',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              backgroundColor: '#0ABDE3',
            },
          }}
        />
      </Box>

      {/* Question */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          py: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "'Kanit', sans-serif",
            color: '#333',
          }}
        >
          สีอะไรเอ่ย?
        </Typography>
        <IconButton
          onClick={handleReplay}
          disabled={isPlaying}
          sx={{
            backgroundColor: '#0ABDE3',
            color: '#fff',
            width: 64,
            height: 64,
            '&:hover': { backgroundColor: '#0097b8' },
            '&:disabled': { backgroundColor: '#b0e0ee', color: '#fff' },
            animation: isPlaying ? 'bounce 0.6s ease infinite' : 'none',
          }}
        >
          <VolumeUpIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>

      {/* Choices - 2x2 grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          width: '100%',
          maxWidth: 320,
        }}
      >
        {currentQuestion.choices.map((color) => (
          <ColorChoice
            key={color.id}
            color={color}
            isSelected={selectedChoiceId === color.id}
            isCorrectChoice={color.id === currentQuestion.correctColor.id}
            isDisabled={hasAnswered}
            showResult={hasAnswered}
            onSelect={handleSelect}
          />
        ))}
      </Box>

      {/* Next button */}
      {hasAnswered && (
        <Button
          onClick={handleNext}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            mt: 2,
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: 18,
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 700,
            textTransform: 'none',
            backgroundColor: isCorrect ? '#2ecc71' : '#f39c12',
            animation: 'bounce 1s ease infinite',
            '&:hover': {
              backgroundColor: isCorrect ? '#27ae60' : '#e67e22',
            },
          }}
        >
          {currentQuestionIndex < totalQuestions - 1 ? 'ต่อไป' : 'ดูผลคะแนน'}
        </Button>
      )}
    </Box>
  );
};

export default ColorGameBoard;
