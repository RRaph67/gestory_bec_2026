"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/services/supabaseClient";

export interface AuthUser {
  id: string;
  email?: string | null;
  full_name?: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<unknown>;
  signUp: (fullName: string, email: string, password: string) => Promise<unknown>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;

    // Mock mode: use localStorage-stored guest user
    if (IS_MOCK) {
      try {
        const raw = localStorage.getItem("gestory_user");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.id === "local-guest" || parsed.email === "guest@local") {
            localStorage.removeItem("gestory_user");
          } else {
            setUser(parsed);
          }
        }
      } catch {}
      setLoading(false);

      return () => {
        mounted = false;
      };
    }

    const sb = supabase;
    if (!sb) {
      setLoading(false);
      return () => { mounted = false; };
    }

    (async () => {
      try {
        const { data } = await sb.auth.getSession();
        const session = data.session;
        if (session && mounted) {
          const u = session.user;
          setUser({ id: u.id, email: u.email, full_name: u.user_metadata?.full_name });
          try {
            localStorage.setItem("authToken", session.access_token);
          } catch {}
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      if (session && session.access_token) {
        const u = session.user;
        setUser({ id: u.id, email: u.email, full_name: u.user_metadata?.full_name });
        try {
          localStorage.setItem("authToken", session.access_token);
        } catch {}
      } else {
        setUser(null);
        try {
          localStorage.removeItem("authToken");
        } catch {}
      }
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;
    if (IS_MOCK) {
      const id = "local-" + Date.now();
      const userObj = { id, email, full_name: email.split("@")[0] };
      try {
        localStorage.setItem("gestory_user", JSON.stringify(userObj));
      } catch {}
      setUser(userObj);
      return { data: { user: userObj } } as { data: { user: AuthUser } };
    }

    const sb = supabase;
    if (!sb) throw new Error("Supabase client is not initialized");
    const res = await sb.auth.signInWithPassword({ email, password });
    if (res.error) throw res.error;
    return res;
  }, []);

  const signUp = useCallback(async (fullName: string, email: string, password: string) => {
    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;
    if (IS_MOCK) {
      const id = "local-" + Date.now();
      const userObj = { id, email, full_name: fullName };
      try {
        localStorage.setItem("gestory_user", JSON.stringify(userObj));
      } catch {}
      setUser(userObj);
      return { data: { user: userObj } } as { data: { user: AuthUser } };
    }

    const sb = supabase;
    if (!sb) throw new Error("Supabase client is not initialized");
    const res = await sb.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (res.error) throw res.error;
    return res;
  }, []);

  const signOut = useCallback(async () => {
    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;
    if (IS_MOCK) {
      try {
        localStorage.removeItem("gestory_user");
      } catch {}
      setUser(null);
      return;
    }

    const sb = supabase;
    if (!sb) throw new Error("Supabase client is not initialized");
    await sb.auth.signOut();
    try {
      localStorage.removeItem("authToken");
    } catch {}
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut }), [user, loading, signIn, signUp, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx) return ctx;

  // Fallback for components used outside AuthProvider (shouldn't happen but safe)
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;
    if (IS_MOCK) {
      try {
        const raw = localStorage.getItem("gestory_user");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.id !== "local-guest" && parsed.email !== "guest@local") {
            setUser(parsed);
          }
        }
      } catch {}
      setLoading(false);
      return;
    }

    const sb = supabase;
    if (!sb) { setLoading(false); return; }

    (async () => {
      try {
        const { data } = await sb.auth.getSession();
        const session = data.session;
        if (session) {
          const u = session.user;
          setUser({ id: u.id, email: u.email, full_name: u.user_metadata?.full_name });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;
    if (IS_MOCK) {
      const id = "local-" + Date.now();
      const userObj = { id, email, full_name: email.split("@")[0] };
      try { localStorage.setItem("gestory_user", JSON.stringify(userObj)); } catch {}
      setUser(userObj);
      return { data: { user: userObj } } as { data: { user: AuthUser } };
    }
    const sb = supabase;
    if (!sb) throw new Error("Supabase client is not initialized");
    const res = await sb.auth.signInWithPassword({ email, password });
    if (res.error) throw res.error;
    return res;
  };

  const signUp = async (fullName: string, email: string, password: string) => {
    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;
    if (IS_MOCK) {
      const id = "local-" + Date.now();
      const userObj = { id, email, full_name: fullName };
      try { localStorage.setItem("gestory_user", JSON.stringify(userObj)); } catch {}
      setUser(userObj);
      return { data: { user: userObj } } as { data: { user: AuthUser } };
    }
    const sb = supabase;
    if (!sb) throw new Error("Supabase client is not initialized");
    const res = await sb.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
    if (res.error) throw res.error;
    return res;
  };

  const signOut = async () => {
    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;
    if (IS_MOCK) {
      try { localStorage.removeItem("gestory_user"); } catch {}
      setUser(null);
      return;
    }
    const sb = supabase;
    if (!sb) throw new Error("Supabase client is not initialized");
    await sb.auth.signOut();
    try { localStorage.removeItem("authToken"); } catch {}
    setUser(null);
  };

  return { user, loading, signIn, signUp, signOut };
}
