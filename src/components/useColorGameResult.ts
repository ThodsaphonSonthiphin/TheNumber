import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { speakText } from '../utils/speech';

export function getStarRating(score: number, total: number): number {
  const ratio = score / total;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}

interface UseColorGameResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const useColorGameResult = ({
  score,
  totalQuestions,
  onRestart,
}: UseColorGameResultProps) => {
  const navigate = useNavigate();
  const hasSpokeRef = useRef(false);
  const stars = getStarRating(score, totalQuestions);

  useEffect(() => {
    if (hasSpokeRef.current) return;
    hasSpokeRef.current = true;
    speakText(`เก่งมาก ได้ ${score} คะแนน`, 'th-TH', 0.8);
  }, [score]);

  const handlePlayAgain = useCallback(() => {
    hasSpokeRef.current = false;
    onRestart();
  }, [onRestart]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return {
    stars,
    handlePlayAgain,
    handleGoHome,
  };
};
