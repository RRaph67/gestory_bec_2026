import React from "react";
import { Header } from "@/components/organisms/Header";
import MockProvider from "@/components/mocks/MockProvider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MockProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 pt-20">{children}</div>
      </div>
    </MockProvider>
  );
}
