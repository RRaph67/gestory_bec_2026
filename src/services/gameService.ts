/**
 * Game Service
 * Real backend via apiClient.
 */

import { apiClient, IS_MOCK_MODE } from "./api";
import { mockGameQuestions, mockGameQuestionsByCourse } from "./mocks/mockData";
import type { ApiResponse, GameScore, QuizQuestionsResponse } from "@/types";

// Backend has: GET /api/v1/game/questions/:courseId -> returns QuizQuestionsResponse shape
export async function getGameQuestions(courseId?: string): Promise<ApiResponse<QuizQuestionsResponse>> {
  if (IS_MOCK_MODE) {
    const questions = courseId ? (mockGameQuestionsByCourse[courseId] || mockGameQuestions) : mockGameQuestions;
    return Promise.resolve({ success: true, data: { questions, total: questions.length } });
  }
  const url = courseId ? `/api/v1/game/questions/${courseId}` : `/api/v1/game/questions`;
  return apiClient.get<ApiResponse<QuizQuestionsResponse>>(url);
}

export async function submitGameScore(scoreData: {
  playerName: string;
  finalScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
}): Promise<ApiResponse<GameScore>> {
  if (IS_MOCK_MODE) {
    const fake: GameScore = {
      sessionId: "local-" + Date.now(),
      finalScore: scoreData.finalScore,
      questionsAnswered: scoreData.questionsAnswered,
      correctAnswers: scoreData.correctAnswers,
      accuracy: scoreData.accuracy,
      timeSpent: scoreData.timeSpent,
      completedAt: new Date(),
    };
    // persist to localStorage leaderboard and sort by score descending
    try {
      const key = "gestory_leaderboard";
      const existing: Array<{ rank: number; score: number; playerName: string; date: string }> = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({
        rank: 0, // will be reassigned after sort
        score: fake.finalScore,
        playerName: scoreData.playerName,
        date: new Date().toISOString(),
      });
      // Sort by score descending, then by date ascending (earlier = higher)
      existing.sort((a, b) => b.score - a.score || new Date(a.date).getTime() - new Date(b.date).getTime());
      // Re-assign ranks after sorting
      existing.forEach((entry, idx) => { entry.rank = idx + 1; });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {}
    return Promise.resolve({ success: true, data: fake });
  }
  return apiClient.post<ApiResponse<GameScore>>(`/api/v1/game/submit`, scoreData);
}

export async function getGameLeaderboard(
  limit: number = 10
): Promise<ApiResponse<Array<{ rank: number; score: number; playerName: string; date: string }>>> {
  if (IS_MOCK_MODE) {
    try {
      const key = "gestory_leaderboard";
      const raw: Array<{ rank: number; score: number; playerName: string; date: string }> = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(raw) && raw.length > 0) {
        // Ensure sorted by score descending
        const sorted = [...raw].sort((a, b) => b.score - a.score || new Date(a.date).getTime() - new Date(b.date).getTime());
        // Re-assign ranks
        sorted.forEach((entry, idx) => { entry.rank = idx + 1; });
        return Promise.resolve({ success: true, data: sorted.slice(0, limit) });
      }
    } catch {}
    // No real submissions yet — return empty leaderboard
    return Promise.resolve({ success: true, data: [] });
  }
  return apiClient.get<ApiResponse<Array<{ rank: number; score: number; playerName: string; date: string }>>>(`/api/v1/game/leaderboard?limit=${limit}`);
}

export const gameService = {
  getGameQuestions,
  submitGameScore,
  getGameLeaderboard,
};

