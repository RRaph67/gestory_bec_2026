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
    {
      id: "bab-3",
      title: "Sejarah Indonesia - Bab 3",
      description: "Momen Krusial: Menjelajahi Kongres Pemuda.",
      image: "/assets/bab3_thumb.png",
      status: "published",
    },
    {
      id: "bab-4",
      title: "Sejarah Indonesia - Bab 4",
      description: "Proyek Akhir: Sintesis Perjalanan Kemerdekaan.",
      image: "/assets/bab4_thumb.png",
      status: "published",
    },
  ],
  total: 4,
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

const bab3Questions: QuizQuestion[] = [
  {
    id: "bab3-q1",
    question: "Kapan Kongres Pemuda II yang menghasilkan Sumpah Pemuda dilaksanakan?",
    options: { A: "28 Oktober 1928", B: "17 Agustus 1928" },
    correctAnswer: "A",
    explanation: "Kongres Pemuda II dilaksanakan pada 27-28 Oktober 1928 di Jakarta."
  },
  {
    id: "bab3-q2",
    question: "Apa isi penting dari Sumpah Pemuda yang dirumuskan dalam Kongres Pemuda II?",
    options: { A: "Satu Nusa, Satu Bangsa, Satu Bahasa", B: "Proklamasi Kemerdekaan Indonesia" },
    correctAnswer: "A",
    explanation: "Sumpah Pemuda berisi tiga ikrar: satu tanah air, satu bangsa, dan satu bahasa persatuan."
  },
  {
    id: "bab3-q3",
    question: "Di mana Kongres Pemuda II dilaksanakan?",
    options: { A: "Gedung Karesidenan Jakarta, Jl. Kramat Raya", B: "Gedung BPUPKI, Jl. Pegangsaan Timur" },
    correctAnswer: "A",
    explanation: "Kongres Pemuda II dilaksanakan di Gedung Karesidenan Jakarta (sekarang Museum Sumpah Pemuda) di Jl. Kramat Raya No. 106."
  },
  {
    id: "bab3-q4",
    question: "Apa makna dari semangat \"Bahasa Persatuan\" dalam Sumpah Pemuda?",
    options: { A: "Bahasa Indonesia sebagai bahasa nasional", B: "Bahasa Belanda sebagai bahasa resmi" },
    correctAnswer: "A",
    explanation: "Sumpah Pemuda menegaskan bahwa bahasa persatuan adalah bahasa Indonesia, bukan bahasa Belanda atau daerah."
  },
  {
    id: "bab3-q5",
    question: "Siapakah yang menjadi ketua sidang final Kongres Pemuda II?",
    options: { A: "Soepomo", B: "R.M. Soerjopranoto" },
    correctAnswer: "B",
    explanation: "R.M. Soerjopranoto memimpin sidang final Kongres Pemuda II yang menghasilkan Sumpah Pemuda."
  },
];

const bab4Questions: QuizQuestion[] = [
  {
    id: "bab4-q1",
    question: "Peristiwa apa yang terjadi pada 28 Oktober 1928?",
    options: { A: "Kongres Pemuda II / Lahirnya Sumpah Pemuda", B: "Proklamasi Kemerdekaan Indonesia" },
    correctAnswer: "A",
    explanation: "28 Oktober 1928 adalah tanggal Kongres Pemuda II yang menghasilkan Sumpah Pemuda, tonggak persatuan bangsa Indonesia."
  },
  {
    id: "bab4-q2",
    question: "Siapa tokoh yang dikenal sebagai Bapak Pendidikan Nasional?",
    options: { A: "Ki Hajar Dewantara", B: "Dewi Sartika" },
    correctAnswer: "A",
    explanation: "Ki Hajar Dewantara dikenal sebagai Bapak Pendidikan Nasional yang mendirikan Taman Siswa."
  },
  {
    id: "bab4-q3",
    question: "Siapa pencipta lagu Indonesia Raya?",
    options: { A: "W.R. Supratman", B: "Ismail Marzuki" },
    correctAnswer: "A",
    explanation: "W.R. Supratman menciptakan lagu Indonesia Raya yang kini menjadi lagu kebangsaan Republik Indonesia."
  },
  {
    id: "bab4-q4",
    question: "Apa makna utama Sumpah Pemuda?",
    options: { A: "Persatuan pemuda dan bangsa Indonesia", B: "Proklamasi kemerdekaan Indonesia" },
    correctAnswer: "A",
    explanation: "Sumpah Pemuda menegaskan semangat persatuan: satu tanah air, satu bangsa, dan satu bahasa persatuan."
  },
  {
    id: "bab4-q5",
    question: "Siapa proklamator Indonesia bersama Mohammad Hatta?",
    options: { A: "Soekarno", B: "Soedirman" },
    correctAnswer: "A",
    explanation: "Soekarno dan Mohammad Hatta adalah dua proklamator kemerdekaan Indonesia yang membacakan naskah proklamasi."
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
  "bab-3": {
    course: {
      id: "bab-3",
      title: "Sejarah Indonesia - Bab 3",
      breadcrumb: "Sejarah / Bab 3",
      description:
        "Momen Krusial: Menjelajahi Kongres Pemuda dan Sumpah Pemuda sebagai tonggak persatuan bangsa.",
      image: "/assets/bab3_thumb.png",
      sections: [
        {
          type: "text",
          title: "Ringkasan Bab 3",
          content:
            "Kongres Pemuda II pada 28 Oktober 1928 menghasilkan Sumpah Pemuda yang menjadi dasar persatuan bangsa Indonesia. Peristiwa ini merupakan momen krusial dalam perjalanan menuju kemerdekaan.",
          url: "/material/Sumpah_Pemuda.pdf",
        },
        {
          type: "video",
          title: "Video Pembelajaran: Kongres Pemuda & Sumpah Pemuda",
          url: "https://youtu.be/5uCRn7N6K1k?si=pMf34qYfBA4JbTTu",
        },
        {
          type: "quiz",
          title: "Pre-test Bab 3",
          content: "Uji pemahaman tentang Kongres Pemuda dan Sumpah Pemuda.",
        },
      ],
      questions: bab3Questions,
    },
  },
  "bab-4": {
    course: {
      id: "bab-4",
      title: "Sejarah Indonesia - Bab 4",
      breadcrumb: "Sejarah / Bab 4",
      description:
        "Final Mission: Selamatkan Sejarah Indonesia — Latihan soal gabungan dari materi Bab 1-3.",
      image: "/assets/bab4_thumb.png",
      sections: [
        {
          type: "video",
          title: "Video Pembelajaran: Sintesis Perjalanan Kemerdekaan",
          url: "https://youtu.be/2UR4ZiLahQg?si=dbscqlN0gCL1ogdq",
        },
        {
          type: "quiz",
          title: "Final Mission — Selamatkan Sejarah Indonesia",
          content: "Uji pemahaman gabungan dari Bab 1, 2, dan 3.",
        },
      ],
      questions: bab4Questions,
    },
  },
};

// Backward-compatible aliases for code that still consumes the default mock course.
export const mockCourseDetail = mockCourseDetails["bab-1"];

export const mockQuizQuestionsByCourse: Record<string, QuizQuestionsResponse> = {
  "bab-1": { questions: bab1Questions, total: bab1Questions.length },
  "bab-2": { questions: bab2Questions, total: bab2Questions.length },
  "bab-3": { questions: bab3Questions, total: bab3Questions.length },
  "bab-4": { questions: bab4Questions, total: bab4Questions.length },
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

const bab3GameQuestions: GameQuestion[] = [
  {
    id: "bab3-gq1",
    question: "Kapan Kongres Pemuda II yang menghasilkan Sumpah Pemuda dilaksanakan?",
    options: { A: "28 Oktober 1928", B: "17 Agustus 1928" },
    correctAnswer: "A",
    explanation: "Kongres Pemuda II dilaksanakan pada 27-28 Oktober 1928 di Jakarta."
  },
  {
    id: "bab3-gq2",
    question: "Apa isi penting dari Sumpah Pemuda yang dirumuskan dalam Kongres Pemuda II?",
    options: { A: "Satu Nusa, Satu Bangsa, Satu Bahasa", B: "Proklamasi Kemerdekaan Indonesia" },
    correctAnswer: "A",
    explanation: "Sumpah Pemuda berisi tiga ikrar: satu tanah air, satu bangsa, dan satu bahasa persatuan."
  },
  {
    id: "bab3-gq3",
    question: "Di mana Kongres Pemuda II dilaksanakan?",
    options: { A: "Gedung Karesidenan Jakarta, Jl. Kramat Raya", B: "Gedung BPUPKI, Jl. Pegangsaan Timur" },
    correctAnswer: "A",
    explanation: "Kongres Pemuda II dilaksanakan di Gedung Karesidenan Jakarta (sekarang Museum Sumpah Pemuda) di Jl. Kramat Raya No. 106."
  },
  {
    id: "bab3-gq4",
    question: "Apa makna dari semangat \"Bahasa Persatuan\" dalam Sumpah Pemuda?",
    options: { A: "Bahasa Indonesia sebagai bahasa nasional", B: "Bahasa Belanda sebagai bahasa resmi" },
    correctAnswer: "A",
    explanation: "Sumpah Pemuda menegaskan bahwa bahasa persatuan adalah bahasa Indonesia, bukan bahasa Belanda atau daerah."
  },
  {
    id: "bab3-gq5",
    question: "Siapakah yang menjadi ketua sidang final Kongres Pemuda II?",
    options: { A: "Soepomo", B: "R.M. Soerjopranoto" },
    correctAnswer: "B",
    explanation: "R.M. Soerjopranoto memimpin sidang final Kongres Pemuda II yang menghasilkan Sumpah Pemuda."
  },
];

const bab4GameQuestions: GameQuestion[] = [
  {
    id: "bab4-gq1",
    question: "Peristiwa apa yang terjadi pada 28 Oktober 1928?",
    options: { A: "Kongres Pemuda II / Lahirnya Sumpah Pemuda", B: "Proklamasi Kemerdekaan Indonesia" },
    correctAnswer: "A",
    explanation: "28 Oktober 1928 adalah tanggal Kongres Pemuda II yang menghasilkan Sumpah Pemuda, tonggak persatuan bangsa Indonesia."
  },
  {
    id: "bab4-gq2",
    question: "Siapa tokoh yang dikenal sebagai Bapak Pendidikan Nasional?",
    options: { A: "Ki Hajar Dewantara", B: "Dewi Sartika" },
    correctAnswer: "A",
    explanation: "Ki Hajar Dewantara dikenal sebagai Bapak Pendidikan Nasional yang mendirikan Taman Siswa."
  },
  {
    id: "bab4-gq3",
    question: "Siapa pencipta lagu Indonesia Raya?",
    options: { A: "W.R. Supratman", B: "Ismail Marzuki" },
    correctAnswer: "A",
    explanation: "W.R. Supratman menciptakan lagu Indonesia Raya yang kini menjadi lagu kebangsaan Republik Indonesia."
  },
  {
    id: "bab4-gq4",
    question: "Apa makna utama Sumpah Pemuda?",
    options: { A: "Persatuan pemuda dan bangsa Indonesia", B: "Proklamasi kemerdekaan Indonesia" },
    correctAnswer: "A",
    explanation: "Sumpah Pemuda menegaskan semangat persatuan: satu tanah air, satu bangsa, dan satu bahasa persatuan."
  },
  {
    id: "bab4-gq5",
    question: "Siapa proklamator Indonesia bersama Mohammad Hatta?",
    options: { A: "Soekarno", B: "Soedirman" },
    correctAnswer: "A",
    explanation: "Soekarno dan Mohammad Hatta adalah dua proklamator kemerdekaan Indonesia yang membacakan naskah proklamasi."
  },
];

export const mockGameQuestionsByCourse: Record<string, GameQuestion[]> = {
  "bab-1": bab1GameQuestions,
  "bab-2": bab2GameQuestions,
  "bab-3": bab3GameQuestions,
  "bab-4": bab4GameQuestions,
};

// Default: shuffle bab-1 questions for backward compatibility
export const mockGameQuestions = [...bab1GameQuestions].sort(
  () => Math.random() - 0.5,
);
