import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Seo from "@/components/Seo";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

export default function AdminAuth() {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user && isAdmin) {
    nav("/admin", { replace: true });
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in");
      nav("/admin");
    } catch (err: any) {
      toast.error(err.message || "Could not sign in");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Seo title="Admin Login" description="Atlas Offroad admin login" path="/admin/auth" noindex />
      <section className="min-h-[80vh] flex items-center justify-center container">
        <form onSubmit={submit} className="glass rounded-2xl p-8 w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="" className="h-10 w-10" />
            <div>
              <div className="font-display text-2xl tracking-widest text-gradient">ATLAS</div>
              <div className="text-[10px] tracking-[0.3em] text-foreground/70 -mt-1">ADMIN LOGIN</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-foreground/70">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required maxLength={255} className="mt-2 w-full h-12 rounded-md bg-background border border-border px-4 text-sm text-foreground focus:border-gold/60 outline-none" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-foreground/70">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} className="mt-2 w-full h-12 rounded-md bg-background border border-border px-4 text-sm text-foreground focus:border-gold/60 outline-none" />
            </div>
            <button disabled={busy} className="w-full h-12 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm disabled:opacity-60">
              {busy ? "…" : "Sign in"}
            </button>
            <p className="text-xs text-foreground/70 text-center">
              Accounts are created by Atlas administrators only. To add a new admin, create the account from your Lovable Cloud users panel — they will receive admin privileges automatically.
            </p>
            {user && !isAdmin && (
              <div className="text-xs text-ember text-center">
                Signed in as {user.email}, but no admin role assigned yet.
              </div>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
