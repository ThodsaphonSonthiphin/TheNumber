import React from 'react';
import { Box, Typography, IconButton, Button, LinearProgress } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useColorGameBoard } from './useColorGameBoard';
import ColorChoice from './ColorChoice';
import ColorGameResult from './ColorGameResult';
import CelebrationEffect from './CelebrationEffect';

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
    showCelebration,
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
      {/* Celebration Effect */}
      <CelebrationEffect isVisible={showCelebration} />

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
            Q {currentQuestionIndex + 1}/{totalQuestions}
          </Typography>

          {/* Animated Score Display */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              position: 'relative',
            }}
          >
            <Typography
              sx={{
                fontSize: hasAnswered && isCorrect ? 28 : 20,
                transition: 'font-size 0.3s ease',
                animation: showCelebration ? 'starBurst 0.8s ease' : 'none',
                filter: showCelebration ? 'brightness(1.3)' : 'none',
              }}
            >
              🏆
            </Typography>
            <Typography
              key={`score-${score}`}
              sx={{
                fontSize: 20,
                fontWeight: 900,
                fontFamily: "'Fredoka', sans-serif",
                color: showCelebration ? '#FFD700' : '#0ABDE3',
                animation: showCelebration ? 'scorePopUp 0.6s ease' : 'none',
                textShadow: showCelebration ? '0 0 10px rgba(255, 215, 0, 0.6)' : 'none',
                transition: 'color 0.3s ease, text-shadow 0.3s ease',
              }}
            >
              {score}
            </Typography>
          </Box>
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
          What color is this?
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
          {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'See Results'}
        </Button>
      )}
    </Box>
  );
};

export default ColorGameBoard;
