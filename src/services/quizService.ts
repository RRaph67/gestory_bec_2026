/**
 * Quiz Service
 * Real backend via apiClient.
 */

import { apiClient, IS_MOCK_MODE } from "./api";
import { mockQuizQuestions, mockQuizQuestionsByCourse } from "./mocks/mockData";
import type {
  ApiResponse,
  QuizQuestionsResponse,
  QuizQuestion,
  QuizSubmission,
  QuizSession,
} from "@/types";

/**
 * GET /api/v1/quiz/:slug/questions
 */
export async function getQuizQuestions(courseId: string): Promise<ApiResponse<QuizQuestionsResponse>> {
  if (IS_MOCK_MODE) {
    return Promise.resolve({
      success: true,
      data: mockQuizQuestionsByCourse[courseId] || mockQuizQuestions,
    });
  }
  return apiClient.get<ApiResponse<QuizQuestionsResponse>>(`/api/v1/quiz/${courseId}/questions`);
}

/**
 * POST /api/v1/quiz/submit
 */
export async function submitQuiz(submissionData: {
  courseId: string;
  answers: { questionId: string; selectedAnswer: string }[];
}): Promise<
  ApiResponse<{
    score: number;
    total: number;
    percentage: number;
    results: Array<{ questionId: string; isCorrect: boolean }>;
  }>
> {
  if (IS_MOCK_MODE) {
    // simple scoring based on mockQuizQuestions
    const total = mockQuizQuestions.questions.length;
    let score = 0;
    const results = submissionData.answers.map((a) => {
      const q = mockQuizQuestions.questions.find((mq) => mq.id === a.questionId);
      const isCorrect = q ? q.correctAnswer === a.selectedAnswer : false;
      if (isCorrect) score += 100;
      return { questionId: a.questionId, isCorrect };
    });
    const percentage = total > 0 ? (score / (total * 100)) * 100 : 0;
    return Promise.resolve({ success: true, data: { score, total, percentage, results } });
  }
  return apiClient.post<ApiResponse<{
    score: number;
    total: number;
    percentage: number;
    results: Array<{ questionId: string; isCorrect: boolean }>;
  }>>(`/api/v1/quiz/submit`, submissionData);
}

export const quizService = {
  getQuizQuestions,
  submitQuiz,
};

