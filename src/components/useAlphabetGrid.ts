import { useState, useCallback } from 'react';
import { alphabetData, ThaiConsonant } from '../data/alphabet';

export const useAlphabetGrid = () => {
  const [selectedConsonant, setSelectedConsonant] = useState<ThaiConsonant | null>(null);

  const handleCardClick = useCallback((consonant: ThaiConsonant) => {
    setSelectedConsonant(consonant);
  }, []);

  const handleCloseModal = useCallback(() => {
    speechSynthesis.cancel();
    setSelectedConsonant(null);
  }, []);

  return {
    alphabetData,
    selectedConsonant,
    handleCardClick,
    handleCloseModal,
  };
};
