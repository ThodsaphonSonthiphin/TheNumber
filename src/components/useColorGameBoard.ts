import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  startGame,
  selectAnswer,
  nextQuestion,
  setPlaying,
} from '../store/colorGameSlice';
import { colorsData } from '../data/colors';
import { generateRound } from '../utils/colorGameUtils';
import { speakText } from '../utils/speech';
import { useCelebrationEffect } from './useCelebrationEffect';

export const useColorGameBoard = () => {
  const dispatch = useAppDispatch();
  const {
    questions,
    currentQuestionIndex,
    score,
    totalQuestions,
    selectedChoiceId,
    isCorrect,
    isGameOver,
    isPlaying,
  } = useAppSelector((state) => state.colorGame);

  const abortRef = useRef(false);
  const { isVisible: showCelebration, trigger: triggerCelebration } =
    useCelebrationEffect();

  const speakQuestion = useCallback(
    async (nameEn: string) => {
      abortRef.current = false;
      dispatch(setPlaying(true));
      await speakText(`What color is this? ${nameEn}`, 'en-US', 0.7);
      if (!abortRef.current) {
        dispatch(setPlaying(false));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const round = generateRound(colorsData, 10);
    dispatch(startGame(round));
  }, [dispatch]);

  useEffect(() => {
    if (questions.length === 0 || isGameOver) return;
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;
    speakQuestion(currentQuestion.correctColor.nameEn);

    return () => {
      abortRef.current = true;
      speechSynthesis.cancel();
    };
  }, [currentQuestionIndex, questions.length, isGameOver, speakQuestion]);

  const handleSelect = useCallback(
    async (colorId: number) => {
      if (selectedChoiceId !== null || isPlaying) return;
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;

      dispatch(selectAnswer(colorId));

      const selectedColor = currentQuestion.choices.find(
        (c) => c.id === colorId,
      );
      if (selectedColor) {
        await speakText(selectedColor.nameEn, 'en-US', 0.8);
      }

      if (colorId === currentQuestion.correctColor.id) {
        triggerCelebration();
        await speakText('Correct! Great job!', 'en-US', 0.9);
      } else {
        await speakText('Try again!', 'en-US', 0.9);
      }
    },
    [
      selectedChoiceId,
      isPlaying,
      questions,
      currentQuestionIndex,
      dispatch,
      triggerCelebration,
    ],
  );

  const handleNext = useCallback(() => {
    dispatch(nextQuestion());
  }, [dispatch]);

  const handleReplay = useCallback(() => {
    if (isPlaying || questions.length === 0) return;
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;
    speakQuestion(currentQuestion.correctColor.nameEn);
  }, [isPlaying, questions, currentQuestionIndex, speakQuestion]);

  const handleRestart = useCallback(() => {
    abortRef.current = true;
    speechSynthesis.cancel();
    const round = generateRound(colorsData, 10);
    dispatch(startGame(round));
  }, [dispatch]);

  const currentQuestion = questions[currentQuestionIndex] ?? null;

  return {
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
  };
};
