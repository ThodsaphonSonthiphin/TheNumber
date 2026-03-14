import { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playCelebrationSound } from '../utils/soundEffects';

function fireNewYearFireworks(): void {
  const duration = 2500;
  const end = Date.now() + duration;

  const colors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#A8E6CF', '#DDA0DD', '#87CEEB', '#FF8B94', '#FFD700'];

  // Continuous random firework bursts
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    // Random firework burst from left or right side
    confetti({
      particleCount: 80,
      angle: 60 + Math.random() * 60,
      spread: 60 + Math.random() * 40,
      origin: { x: Math.random(), y: 0.5 + Math.random() * 0.3 },
      colors,
      startVelocity: 35 + Math.random() * 20,
      gravity: 0.8,
      scalar: 1.1,
      drift: (Math.random() - 0.5) * 0.5,
      ticks: 80,
      shapes: ['circle', 'square'],
    });
  }, 200);

  // Big initial burst from center
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { x: 0.5, y: 0.6 },
    colors,
    startVelocity: 45,
    gravity: 0.7,
    scalar: 1.2,
    ticks: 100,
  });

  // Star-shaped bursts from sides
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
      startVelocity: 40,
      shapes: ['circle'],
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
      startVelocity: 40,
      shapes: ['circle'],
    });
  }, 400);

  // Sparkle shower from top
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { x: 0.5, y: 0 },
      colors: ['#FFD700', '#FFF8DC', '#FFFACD'],
      startVelocity: 20,
      gravity: 0.4,
      scalar: 0.8,
      ticks: 120,
    });
  }, 800);
}

export const useCelebrationEffect = (duration = 2500) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(true);

    // Play sound and fire canvas-confetti fireworks
    playCelebrationSound();
    fireNewYearFireworks();

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      timerRef.current = null;
    }, duration);
  }, [duration]);

  return { isVisible, trigger };
};
