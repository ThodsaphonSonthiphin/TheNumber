import { useState, useCallback, useEffect, useRef } from 'react';
import { speakText } from '../utils/speech';
import type { ThaiConsonant } from '../data/alphabet';

interface UseAlphabetModalProps {
  consonant: ThaiConsonant | null;
  onClose: () => void;
}

export const useAlphabetModal = ({ consonant, onClose }: UseAlphabetModalProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const abortRef = useRef(false);

  const speakConsonant = useCallback(async (c: ThaiConsonant) => {
    setIsSpeaking(true);
    await speakText(`${c.letter} ${c.word}`, 'th-TH', 0.7);

    if (c.sound && !abortRef.current) {
      await new Promise(r => setTimeout(r, 400));
      if (!abortRef.current) {
        await speakText(c.sound, 'th-TH', 0.9);
      }
    }

    if (!abortRef.current) {
      setIsSpeaking(false);
    }
  }, []);

  useEffect(() => {
    if (!consonant) return;

    abortRef.current = false;
    speakConsonant(consonant);

    return () => {
      abortRef.current = true;
      speechSynthesis.cancel();
    };
  }, [consonant, speakConsonant]);

  const handleClose = useCallback(() => {
    abortRef.current = true;
    speechSynthesis.cancel();
    setIsSpeaking(false);
    onClose();
  }, [onClose]);

  const handleReplay = useCallback(async () => {
    if (!consonant || isSpeaking) return;
    abortRef.current = false;
    await speakConsonant(consonant);
  }, [consonant, isSpeaking, speakConsonant]);

  return {
    isOpen: consonant !== null,
    isSpeaking,
    handleClose,
    handleReplay,
  };
};
