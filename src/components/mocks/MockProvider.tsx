"use client";

import React, { useEffect, useState } from "react";
import { seedMocks } from "@/lib/mockInit";
import { IS_MOCK_MODE } from "@/services/api";

export default function MockProvider({ children }: { children: React.ReactNode }) {
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      seedMocks();
      const frame = requestAnimationFrame(() => setIsMock(true));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  return (
    <>
      {isMock && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-2xl bg-yellow-400 text-black font-bold shadow-lg">
          MOCK MODE (local only)
        </div>
      )}
      {children}
    </>
  );
}
