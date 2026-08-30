/**
 * Gemini AI Service
 * Integration with Google Gemini API for Gestory AI Chatbot.
 *
 * SETUP:
 * 1. Get API key from https://aistudio.google.com/apikey
 * 2. Add to .env.local: NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
 */

import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-3.6-flash";

// System prompt untuk Gestory AI — sesuaikan kebutuhan
const SYSTEM_PROMPT = `Kamu adalah Gestory AI, asisten belajar yang ramah dan membantu untuk aplikasi pembelajaran sejarah bernama Gestory.

Karakteristikmu:
- Selalu menjawab dengan bahasa Indonesia yang ramah dan mudah dipahami
- Fokus pada topik sejarah, kuis, dan pembelajaran
- Bisa membantu menjelaskan materi sejarah dengan cara yang menyenangkan
- Jika ditanya di luar konteks sejarah/pembelajaran, tetap bantu dengan sopan
- Gunakan emoji secukupnya untuk membuat percakapan lebih hidup
- Jawaban harus singkat dan padat (maksimal 2-3 paragraf)`;

let genAI: GoogleGenAI | null = null;

function getClient(): GoogleGenAI | null {
  if (!GEMINI_API_KEY) return null;
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  return genAI;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

/**
 * Build full prompt with system instruction + chat history + user message.
 */
function buildPrompt(userMessage: string, history: ChatMessage[]): string {
  let prompt = SYSTEM_PROMPT + "\n\n--- Riwayat Percakapan ---\n";

  for (const msg of history) {
    const label = msg.role === "user" ? "User" : "Gestory AI";
    prompt += `${label}: ${msg.text}\n`;
  }

  prompt += `\n--- Pesan Baru ---\nUser: ${userMessage}\nGestory AI:`;
  return prompt;
}

/**
 * Extract text from Gemini response (handles both .text and candidates fallback).
 */
function extractText(response: unknown): string {
  const res = response as {
    text?: string;
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  // Try .text getter first
  if (res.text) return res.text;

  // Fallback: extract from candidates
  const text = res.candidates?.[0]?.content?.parts?.[0]?.text;
  if (text) return text;

  return "";
}

/**
 * Send a message to Gemini and get a response.
 * Uses models.generateContent with gemini-3.6-flash.
 * Falls back to maintenance message if API key is not configured.
 */
export async function sendChatMessage(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<string> {
  const client = getClient();

  // Fallback: no API key configured
  if (!client) {
    return "Maaf, saat ini Gestory AI belum terhubung dengan layanan AI. Saya sedang dalam tahap pemeliharaan. Silakan coba lagi nanti! 🔧";
  }

  try {
    const prompt = buildPrompt(userMessage, history);

    const response = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const text = extractText(response);
    return text || "Maaf, saya tidak bisa memproses pesan saat ini. 😅";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Terjadi kesalahan saat menghubungi AI. Silakan coba lagi nanti! ⚠️";
  }
}

export const geminiService = {
  sendChatMessage,
};
