"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";

export interface AuthUser {
  id: string;
  email?: string | null;
  full_name?: string | null;
}

export function useAuth() {
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
    if (!sb) return;

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

  const signIn = async (email: string, password: string) => {
    const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !supabase;
    if (IS_MOCK) {
      // simple local auth: set guest user
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
  };

  const signUp = async (fullName: string, email: string, password: string) => {
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
  };

  const signOut = async () => {
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
  };

  return { user, loading, signIn, signUp, signOut };
}
