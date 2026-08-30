import type { CourseListResponse, CourseDetailResponse, QuizQuestion } from "@/types";
import type { QuizQuestionsResponse, GameQuestion } from "@/types/quiz";

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
    question: "Siapakah presiden pertama Republik Indonesia?",
    options: { A: "Soekarno", B: "Ahmad Yani" },
    correctAnswer: "A",
    explanation: "Soekarno diangkat menjadi presiden pertama RI berdasarkan UUD 1945 pasal yang mengatur kepala negara."
  },
  {
    id: "bab2-q2",
    question: "Kapan Konferensi Meja Bundar (KMB) dilaksanakan yang mengakhiri kedaulatan Belanda?",
    options: { A: "Tahun 1949", B: "Tahun 1946" },
    correctAnswer: "A",
    explanation: "KMB dilaksanakan pada tahun 1949 di Den Haag dan secara resmi mengakui kedaulatan Indonesia."
  },
  {
    id: "bab2-q3",
    question: "Siapakah yang menjadi perdana menteri pertama Indonesia?",
    options: { A: "Sutan Sjahrir", B: "Amir Sjarifuddin" },
    correctAnswer: "A",
    explanation: "Sutan Sjahrir diangkat sebagai perdana menteri pertama Indonesia pada November 1945."
  },
  {
    id: "bab2-q4",
    question: "Peristiwa 10 November di Surabaya kini diperingati sebagai hari apa?",
    options: { A: "Hari Pahlawan", B: "Hari Kemerdekaan" },
    correctAnswer: "A",
    explanation: "Pertempuran hebat di Surabaya pada 10 November 1945 kini diperingati sebagai Hari Pahlawan setiap tahun."
  },
  {
    id: "bab2-q5",
    question: "Apa nama badan legislatif sementara yang dibentuk setelah proklamasi untuk menjalankan tugas DPR?",
    options: { A: "KNIP", B: "BPUPKI" },
    correctAnswer: "A",
    explanation: "KNIP (Komite Nasional Indonesia Pusat) dibentuk sebagai badan legislatif sementara sebelum DPR terbentuk."
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

// ── Game questions per course (soal kuis interaktif gestur) ──────
const bab1GameQuestions: GameQuestion[] = [
  {
    id: "bab1-gq1",
    question: "Kapan proklamasi kemerdekaan Indonesia dikumandangkan?",
    options: { A: "17 Agustus 1945", B: "16 Agustus 1945" },
    correctAnswer: "A",
    explanation: "17 Agustus 1945 adalah tanggal proklamasi kemerdekaan Indonesia."
  },
  {
    id: "bab1-gq2",
    question: "Di mana proklamasi kemerdekaan dibacakan?",
    options: { A: "Jl. Pegangsaan Timur 56", B: "Lapangan IKADA" },
    correctAnswer: "A",
    explanation: "Proklamasi dibacakan di kediaman Soekarno di Jl. Pegangsaan Timur 56, Jakarta."
  },
  {
    id: "bab1-gq3",
    question: "Siapa yang mengetik naskah proklamasi?",
    options: { A: "Sayuti Melik", B: "Ahmad Soebardjo" },
    correctAnswer: "A",
    explanation: "Sayuti Melik mengetik naskah proklamasi setelah dirumuskan bersama."
  },
  {
    id: "bab1-gq4",
    question: "Siapa yang mendampingi Soekarno saat proklamasi?",
    options: { A: "Mohammad Hatta", B: "Sutan Sjahrir" },
    correctAnswer: "A",
    explanation: "Mohammad Hatta mendampingi Soekarno saat pembacaan proklamasi."
  },
  {
    id: "bab1-gq5",
    question: "Peristiwa Rengasdengklok bertujuan untuk...",
    options: { A: "Mendesak proklamasi segera dilakukan", B: "Menyusun kabinet pertama" },
    correctAnswer: "A",
    explanation: "Golongan muda membawa Soekarno-Hatta ke Rengasdengklok agar proklamasi segera dilaksanakan."
  },
];

const bab2GameQuestions: GameQuestion[] = [
  {
    id: "bab2-gq1",
    question: "Siapakah wakil presiden pertama Republik Indonesia?",
    options: { A: "Mohammad Hatta", B: "Sutan Sjahrir" },
    correctAnswer: "A",
    explanation: "Mohammad Hatta diangkat menjadi wakil presiden pertama RI mendampingi Soekarno."
  },
  {
    id: "bab2-gq2",
    question: "Apa nama perjanjian linggarjati yang ditandatangani antara RI dan Belanda?",
    options: { A: "Pengakuan de facto wilayah RI", B: "Pengakuan kedaulatan penuh Belanda" },
    correctAnswer: "A",
    explanation: "Perjanjian Linggarjati (1946) mengakui secara de facto wilayah Republik Indonesia di Jawa, Sumatra, dan Madura."
  },
  {
    id: "bab2-gq3",
    question: "Siapakah tokoh yang memimpin pertempuran melawan Belanda di Surabaya?",
    options: { A: "Bung Tomo", B: "Sudirman" },
    correctAnswer: "A",
    explanation: "Bung Tomo dikenal sebagai pemimpin semangat perjuangan rakyat Surabaya dalam pertempuran 10 November."
  },
  {
    id: "bab2-gq4",
    question: "Apa nama panglima besar pertama militer Indonesia setelah kemerdekaan?",
    options: { A: "Jenderal Soedirman", B: "Jenderal Gatot Subroto" },
    correctAnswer: "A",
    explanation: "Jenderal Soedirman diangkat menjadi panglima besar TNI dan memimpin perang gerilya melawan Belanda."
  },
  {
    id: "bab2-gq5",
    question: "Kapan Belanda mengakui kedaulatan Indonesia secara penuh setelah KMB?",
    options: { A: "27 Desember 1949", B: "17 Agustus 1949" },
    correctAnswer: "A",
    explanation: "Pada 27 Desember 1949, secara resmi Belanda menyerahkan kedaulatan penuh kepada Indonesia setelah KMB."
  },
];

export const mockGameQuestionsByCourse: Record<string, GameQuestion[]> = {
  "bab-1": bab1GameQuestions,
  "bab-2": bab2GameQuestions,
};

// Default: shuffle bab-1 questions for backward compatibility
export const mockGameQuestions = [...bab1GameQuestions].sort(
  () => Math.random() - 0.5,
);
