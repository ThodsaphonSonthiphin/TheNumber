import type { ThaiColor } from '../data/colors';

export interface ColorQuestion {
  correctColor: ThaiColor;
  choices: ThaiColor[];
}

export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateQuestion(
  colors: ThaiColor[],
  excludeIds: number[] = [],
): ColorQuestion {
  const available = colors.filter((c) => !excludeIds.includes(c.id));
  const pool = available.length >= 1 ? available : colors;
  const correctColor = pool[Math.floor(Math.random() * pool.length)];

  const distractors = shuffleArray(
    colors.filter((c) => c.id !== correctColor.id),
  ).slice(0, 3);

  const choices = shuffleArray([correctColor, ...distractors]);

  return { correctColor, choices };
}

export function generateRound(
  colors: ThaiColor[],
  count: number,
): ColorQuestion[] {
  const questions: ColorQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const excludeIds =
      questions.length > 0
        ? [questions[questions.length - 1].correctColor.id]
        : [];
    questions.push(generateQuestion(colors, excludeIds));
  }
  return questions;
}
