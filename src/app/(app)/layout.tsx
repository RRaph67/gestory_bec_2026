import React from "react";
import { Header } from "@/components/organisms/Header";
import MockProvider from "@/components/mocks/MockProvider";
import { AuthProvider } from "@/hooks/useAuth";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MockProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 pt-20">{children}</div>
        </div>
      </AuthProvider>
    </MockProvider>
  );
}
