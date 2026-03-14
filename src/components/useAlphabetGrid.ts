import { useState, useCallback, useRef } from 'react';
import { speakText } from '../utils/speech';
import { alphabetData, ThaiConsonant } from '../data/alphabet';

export const useAlphabetGrid = () => {
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const abortRef = useRef(false);

  const handleLetterPress = useCallback(async (consonant: ThaiConsonant) => {
    speechSynthesis.cancel();
    abortRef.current = true;

    // Small delay to let cancel take effect
    await new Promise(r => setTimeout(r, 50));

    abortRef.current = false;
    setSpeakingId(consonant.id);

    // Speak letter + word (e.g., "ก ไก่")
    await speakText(`${consonant.letter} ${consonant.word}`, 'th-TH', 0.7);

    // If animal sound exists, speak it
    if (consonant.sound && !abortRef.current) {
      await new Promise(r => setTimeout(r, 400));
      if (!abortRef.current) {
        await speakText(consonant.sound, 'th-TH', 0.9);
      }
    }

    if (!abortRef.current) {
      setSpeakingId(null);
    }
  }, []);

  return {
    alphabetData,
    speakingId,
    handleLetterPress,
  };
};
