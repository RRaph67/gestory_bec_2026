"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthModal } from "../AuthModal/AuthModal";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ProtectedLink({ href, children, className, id }: ProtectedLinkProps) {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (user) {
    return (
      <Link href={href} id={id} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <button type="button" id={id} onClick={() => setModalOpen(true)} className={className}>
        {children}
      </button>
      <AuthModal open={modalOpen} defaultMode="signin" onClose={() => setModalOpen(false)} />
    </>
  );
}
