import type { CourseListResponse, CourseDetailResponse, QuizQuestion } from "@/types";
import type { QuizQuestionsResponse } from "@/types/quiz";

export const mockCourseList: CourseListResponse = {
  courses: [
    {
      id: "bab-1",
      title: "Sejarah Indonesia - Bab 1",
      description: "Pengantar sejarah proklamasi dan peristiwa penting.",
      image: "/assets/bab1_thumb.png",
      status: "published",
    },
    {
      id: "bab-2",
      title: "Sejarah Indonesia - Bab 2",
      description: "Perkembangan politik pasca-kemerdekaan.",
      image: "/assets/bab2_thumb.png",
      status: "published",
    },
  ],
  total: 2,
};

const bab1Questions: QuizQuestion[] = [
  {
    id: "bab1-q1",
    question: "Kapan proklamasi kemerdekaan Indonesia dikumandangkan?",
    options: { A: "17 Agustus 1945", B: "16 Agustus 1945" },
    correctAnswer: "A",
    explanation: "17 Agustus 1945 adalah tanggal proklamasi.",
  },
  {
    id: "bab1-q2",
    question: "Di mana proklamasi kemerdekaan dibacakan?",
    options: { A: "Jl. Pegangsaan Timur 56", B: "Lapangan IKADA" },
    correctAnswer: "A",
    explanation: "Proklamasi dibacakan di kediaman Soekarno di Jl. Pegangsaan Timur 56.",
  },
  {
    id: "bab1-q3",
    question: "Siapa yang mengetik naskah proklamasi?",
    options: { A: "Sayuti Melik", B: "Ahmad Soebardjo" },
    correctAnswer: "A",
    explanation: "Sayuti Melik mengetik naskah proklamasi setelah dirumuskan bersama.",
  },
  {
    id: "bab1-q4",
    question: "Siapa yang mendampingi Soekarno saat pembacaan proklamasi?",
    options: { A: "Mohammad Hatta", B: "Sutan Sjahrir" },
    correctAnswer: "A",
    explanation: "Mohammad Hatta mendampingi Soekarno saat proklamasi dibacakan.",
  },
  {
    id: "bab1-q5",
    question: "Peristiwa Rengasdengklok bertujuan untuk...",
    options: { A: "Mendesak proklamasi segera dilakukan", B: "Menyusun kabinet pertama" },
    correctAnswer: "A",
    explanation: "Golongan muda membawa Soekarno-Hatta ke Rengasdengklok agar proklamasi segera dilaksanakan.",
  },
];

const bab2Questions: QuizQuestion[] = [
  {
    id: "bab2-q1",
    question: "Apa fokus utama politik Indonesia setelah proklamasi?",
    options: { A: "Mempertahankan kemerdekaan", B: "Membubarkan pemerintahan" },
    correctAnswer: "A",
    explanation: "Setelah proklamasi, bangsa Indonesia berfokus mempertahankan kemerdekaan dan membangun pemerintahan.",
  },
  {
    id: "bab2-q2",
    question: "Badan yang mengesahkan UUD 1945 adalah...",
    options: { A: "PPKI", B: "VOC" },
    correctAnswer: "A",
    explanation: "PPKI mengesahkan UUD 1945 pada 18 Agustus 1945.",
  },
];

export const mockCourseDetails: Record<string, CourseDetailResponse> = {
  "bab-1": {
    course: {
      id: "bab-1",
      title: "Sejarah Indonesia - Bab 1",
      breadcrumb: "Sejarah / Bab 1",
      description: "Ringkasan materi Bab 1 tentang proklamasi.",
      image: "/assets/bab1_thumb.png",
      sections: [
        {
          type: "text",
          title: "Ringkasan Bab 1",
          content:
            "Bangsa Indonesia memproklamasikan kemerdekaan pada 17 Agustus 1945 setelah melalui masa penjajahan, pendudukan Jepang, dan Peristiwa Rengasdengklok.",
          url: "/material/sejarahkemerdekaan.pdf",
        },
        {
          type: "video",
          title: "Video Pembelajaran: Detik-detik Proklamasi",
          url: "https://youtu.be/TTeRijrtDhg?si=zC-k-ia-QHAqKMH_",
        },
        {
          type: "quiz",
          title: "Pre-test Bab 1",
          content: "Uji pemahaman tentang proklamasi.",
        },
      ],
      questions: bab1Questions,
    },
  },
  "bab-2": {
    course: {
      id: "bab-2",
      title: "Sejarah Indonesia - Bab 2",
      breadcrumb: "Sejarah / Bab 2",
      description:
        "Pelajari pembentukan pemerintahan dan perjuangan mempertahankan kemerdekaan Indonesia.",
      image: "/assets/bab2_thumb.png",
      sections: [
        {
          type: "text",
          title: "Ringkasan Bab 2",
          content:
            "Setelah proklamasi, Indonesia membentuk pemerintahan dan melengkapi perangkat negara. Rakyat dan pemimpin juga menghadapi berbagai tantangan untuk mempertahankan kemerdekaan.",
          url: "/material/sejarahkemerdekaan.pdf",
        },
        {
          type: "video",
          title: "Video Pembelajaran: Mempertahankan Kemerdekaan",
          url: "https://youtu.be/TTeRijrtDhg?si=zC-k-ia-QHAqKMH_",
        },
        {
          type: "quiz",
          title: "Pre-test Bab 2",
          content: "Uji pemahaman tentang awal pemerintahan Indonesia.",
        },
      ],
      questions: bab2Questions,
    },
  },
};

// Backward-compatible aliases for code that still consumes the default mock course.
export const mockCourseDetail = mockCourseDetails["bab-1"];

export const mockQuizQuestionsByCourse: Record<string, QuizQuestionsResponse> = {
  "bab-1": { questions: bab1Questions, total: bab1Questions.length },
  "bab-2": { questions: bab2Questions, total: bab2Questions.length },
};

export const mockQuizQuestions = mockQuizQuestionsByCourse["bab-1"];

export const mockGameQuestions = [...mockQuizQuestions.questions].sort(
  () => Math.random() - 0.5,
);
