import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();

  if (loading) return <div className="container py-32 text-center text-muted-foreground">Loading…</div>;
  if (!user) { nav("/admin/auth", { replace: true }); return null; }
  if (!isAdmin) {
    return (
      <div className="container py-32 max-w-lg text-center">
        <h1 className="font-display text-4xl">Access denied</h1>
        <p className="mt-3 text-muted-foreground">Your account ({user.email}) does not have admin privileges.</p>
        <button onClick={() => supabase.auth.signOut().then(() => nav("/admin/auth"))} className="mt-6 h-11 px-6 rounded-full glass">Sign out</button>
        <p className="mt-6 text-xs text-muted-foreground">
          To grant admin: in your backend, insert a row into <code className="text-gold">user_roles</code> with your user id and role <code className="text-gold">admin</code>.
        </p>
      </div>
    );
  }

  const links = [
    { to: "/admin", end: true, label: "Dashboard", I: LayoutDashboard },
    { to: "/admin/products", label: "Products", I: Package },
    { to: "/admin/orders", label: "Orders", I: ShoppingBag },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-white/5 bg-card/40 p-6 lg:sticky lg:top-0 lg:h-screen">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <img src={logo} alt="" className="h-10 w-10" />
          <div>
            <div className="font-display text-xl tracking-widest text-gradient">ATLAS</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-1">ADMIN</div>
          </div>
        </Link>
        <nav className="space-y-1">
          {links.map(({ to, end, label, I }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) =>
              cn("flex items-center gap-3 px-3 h-11 rounded-md text-sm transition", isActive ? "bg-gradient-premium text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5")
            }>
              <I className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => nav("/admin/auth"))} className="mt-8 flex items-center gap-3 px-3 h-11 rounded-md text-sm text-muted-foreground hover:text-foreground w-full">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>
      <div className="p-8"><Outlet /></div>
    </div>
  );
}
