"use client";

import React, { useState, useRef, useEffect } from "react";
import { RefreshCcw, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ChatWindowMessage } from "../../molecules/ChatMessage";
import { ChatToggleButton } from "../../atoms/Button";
import { ChatInput } from "../../molecules/ChatInput";
import { sendChatMessage, type ChatMessage } from "@/services/geminiService";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  role?: string;
}

export const ChatWidget = () => {
  // ── 1. Hooks ───────────────────────────────────────────
  const { user, loading: authLoading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ── 2. Effects ──────────────────────────────────────────
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Set personalized greeting when user is available
  useEffect(() => {
    if (user && messages.length === 0) {
      const name = user.full_name?.split(" ")[0] || "Kamu";
      setMessages([
        {
          id: "1",
          text: `Halo ${name}! 👋 Saya Gestory AI, asisten belajarmu. Ada yang bisa saya bantu hari ini?`,
          sender: "ai",
        },
      ]);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // ── 3. Handlers ──────────────────────────────────────────
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userName = user?.full_name?.split(" ")[0] || "Kamu";

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      role: userName,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Add to chat history for Gemini context
    const newHistory: ChatMessage[] = [
      ...chatHistory,
      { role: "user", text: input },
    ];

    try {
      const aiReply = await sendChatMessage(input, chatHistory);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiReply,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiResponse]);
      setChatHistory([
        ...newHistory,
        { role: "model", text: aiReply },
      ]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Terjadi kesalahan. Silakan coba lagi! ⚠️",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // ── 4. Conditional Rendering (After all hooks) ───────────
  // ChatWidget only renders inside (app)/layout which has AuthProvider,
  // so useAuth() always returns reliable context (no fallback).
  if (!isMounted) return null;
  if (authLoading) return null;
  if (!user) return null;

  return (
    <div className="fixed bottom-5 right-5 z-100 font-sans">
      {/* ── Chat Window ────────────────────────────────────────── */}
      {isOpen && (
        <div className="absolute bottom-[72px] right-0 w-[340px] md:w-[360px] h-[480px] md:h-[520px] bg-white rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in duration-300">
          {/* Header */}
          <ChatWindowHeader onClose={() => setIsOpen(false)} />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50 space-y-5 scrollbar-hide">
            {messages.map((msg) => (
              <ChatWindowMessage key={msg.id} message={msg} />
            ))}

            {/* Typing Indicator */}
            {isTyping && <ChatTypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <ChatInput
            input={input}
            onInputChange={setInput}
            onSubmit={handleSend}
          />
        </div>
      )}

      {/* ── Toggle Button ─────────────────────────────────────── */}
      <ChatToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// Sub-components
// ════════════════════════════════════════════════════════════════════

interface ChatWindowHeaderProps {
  onClose: () => void;
}

const ChatWindowHeader: React.FC<ChatWindowHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-white border-b border-slate-50 px-5 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <button className="text-slate-300 hover:text-blue-500 transition-colors">
          <RefreshCcw className="w-4 h-4" />
        </button>
        <img src="/assets/logo/logo_gestory.svg" alt="Gestory" className="w-6 h-6 object-contain" />
        <h3 className="font-bold text-slate-800 text-base">Gestory AI</h3>
      </div>
      <button
        onClick={onClose}
        className="text-slate-300 hover:text-red-500 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

const ChatTypingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-2.5">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-slate-100 shadow-sm flex items-center justify-center">
          <img
            src="/assets/logo/logo_gestory.svg"
            alt="Gestory"
            className="w-7 h-7 object-contain"
          />
        </div>
        <div className="bg-white px-3.5 py-2.5 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
          <span className="text-slate-400 text-[10px] font-bold italic">
            Sedang berpikir...
          </span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
    </div>
  );
};
