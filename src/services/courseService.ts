/**
 * Course Service
 * Handle semua API calls untuk course-related endpoints
 */

import { apiClient, IS_MOCK_MODE } from "./api";
import { mockCourseList, mockCourseDetails, mockCourseDetail } from "./mocks/mockData";
import type {
  CourseDetail,
  CourseDetailResponse,
  CourseListResponse,
  MaterialSection,
  QuizQuestion,
  ApiResponse,
} from "@/types";

/**
 * GET /api/v1/courses
 * Fetch list semua courses untuk dashboard
 */
export async function getCourses(): Promise<ApiResponse<CourseListResponse>> {
  if (IS_MOCK_MODE) {
    return Promise.resolve({ success: true, data: mockCourseList });
  }
  return apiClient.get<ApiResponse<CourseListResponse>>("/api/v1/courses");
}

/**
 * GET /api/v1/courses/:slug
 * Fetch detail course by slug dengan materials dan questions
 */
export async function getCourseById(courseIdOrSlug: string): Promise<ApiResponse<CourseDetailResponse>> {
  if (IS_MOCK_MODE) {
    return Promise.resolve({
      success: true,
      data: mockCourseDetails[courseIdOrSlug] || mockCourseDetail,
    });
  }
  return apiClient.get<ApiResponse<CourseDetailResponse>>(`/api/v1/courses/${courseIdOrSlug}`);
}

/**
 * GET /api/v1/courses/:slug/materials
 */
export async function getCourseMaterials(courseIdOrSlug: string): Promise<ApiResponse<MaterialSection[]>> {
  if (IS_MOCK_MODE) {
    const course = mockCourseDetails[courseIdOrSlug]?.course || mockCourseDetail.course;
    return Promise.resolve({ success: true, data: course.sections });
  }
  return apiClient.get<ApiResponse<MaterialSection[]>>(`/api/v1/courses/${courseIdOrSlug}/materials`);
}

/**
 * GET /api/v1/courses/:slug/questions
 */
export async function getCourseQuestions(courseIdOrSlug: string): Promise<ApiResponse<QuizQuestion[]>> {
  if (IS_MOCK_MODE) {
    const course = mockCourseDetails[courseIdOrSlug]?.course || mockCourseDetail.course;
    return Promise.resolve({ success: true, data: course.questions });
  }
  return apiClient.get<ApiResponse<QuizQuestion[]>>(`/api/v1/courses/${courseIdOrSlug}/questions`);
}

/**
 * POST /api/v1/courses
 * Create new course (admin only) - placeholder
 */
export async function createCourse(courseData: Partial<CourseDetail>): Promise<ApiResponse<CourseDetail>> {
  return apiClient.post<ApiResponse<CourseDetail>>("/api/v1/courses", courseData);
}

export const courseService = {
  getCourses,
  getCourseById,
  getCourseMaterials,
  getCourseQuestions,
  createCourse,
};

