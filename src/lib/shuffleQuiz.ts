/**
 * Shuffle quiz question options so the correct answer
 * is not always the first option (A).
 *
 * The `options` field is a Record<string, string> like { A: "...", B: "..." }.
 * After shuffling, the keys remain A, B but the values are randomized,
 * and `correctAnswer` is updated to point to the new key holding the correct value.
 */

import type { QuizQuestion } from "@/types/course";
import type { GameQuestion } from "@/types/quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function shuffleQuizQuestion(question: QuizQuestion): QuizQuestion {
  const entries = Object.entries(question.options); // e.g. [["A", "val"], ["B", "val"]]
  const shuffled = shuffle(entries);

  const newOptions: Record<string, string> = {};
  const keys = ["A", "B", "C", "D"]; // support up to 4 options
  let newCorrectAnswer = question.correctAnswer;

  shuffled.forEach(([oldKey, value], idx) => {
    const newKey = keys[idx];
    newOptions[newKey] = value;
    if (oldKey === question.correctAnswer) {
      newCorrectAnswer = newKey;
    }
  });

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

export function shuffleGameQuestion(question: GameQuestion): GameQuestion {
  const entries = Object.entries(question.options);
  const shuffled = shuffle(entries);

  const newOptions: Record<string, string> = {};
  const keys = ["A", "B", "C", "D"];
  let newCorrectAnswer = question.correctAnswer;

  shuffled.forEach(([oldKey, value], idx) => {
    const newKey = keys[idx];
    newOptions[newKey] = value;
    if (oldKey === question.correctAnswer) {
      newCorrectAnswer = newKey;
    }
  });

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

export function shuffleQuizQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map(shuffleQuizQuestion);
}

export function shuffleGameQuestions(questions: GameQuestion[]): GameQuestion[] {
  return questions.map(shuffleGameQuestion);
}
