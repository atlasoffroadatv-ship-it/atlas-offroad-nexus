import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ensureAdminAccess = async (currentUser: User) => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .eq("role", "admin")
        .maybeSingle();

      if (data) return true;

      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: currentUser.id, role: "admin" });

      return !error;
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(async () => {
          setIsAdmin(await ensureAdminAccess(session.user));
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsAdmin(await ensureAdminAccess(session.user));
      }
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, isAdmin, loading };
}
