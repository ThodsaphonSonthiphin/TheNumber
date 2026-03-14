import { useState, useCallback, useRef } from 'react';

export const useCelebrationEffect = (duration = 1500) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(true);
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      timerRef.current = null;
    }, duration);
  }, [duration]);

  return { isVisible, trigger };
};
