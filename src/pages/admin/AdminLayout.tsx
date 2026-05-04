import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Package, ShoppingBag, LogOut, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  if (loading) return <div className="container py-32 text-center text-muted-foreground">Loading…</div>;
  if (!user) { nav("/admin/auth", { replace: true }); return null; }
  if (!isAdmin) {
    return (
      <div className="container py-32 max-w-lg text-center">
        <h1 className="font-display text-4xl">Access denied</h1>
        <p className="mt-3 text-muted-foreground">Your account ({user.email}) does not have admin privileges.</p>
        <button onClick={() => supabase.auth.signOut().then(() => nav("/admin/auth"))} className="mt-6 h-11 px-6 rounded-full glass">Sign out</button>
      </div>
    );
  }

  const links = [
    { to: "/admin", end: true, label: "Dashboard", I: LayoutDashboard },
    { to: "/admin/products", label: "Products", I: Package },
    { to: "/admin/orders", label: "Orders", I: ShoppingBag },
  ];

  const Sidebar = (
    <>
      <Link to="/" className="flex items-center gap-3 mb-10" onClick={() => setOpen(false)}>
        <img src={logo} alt="" className="h-10 w-10" />
        <div>
          <div className="font-display text-xl tracking-widest text-gradient">ATLAS</div>
          <div className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-1">ADMIN</div>
        </div>
      </Link>
      <nav className="space-y-1">
        {links.map(({ to, end, label, I }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)} className={({ isActive }) =>
            cn("flex items-center gap-3 px-3 h-11 rounded-md text-sm transition", isActive ? "bg-gradient-premium text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted")
          }>
            <I className="h-4 w-4" /> {label}
          </NavLink>
        ))}
      </nav>
      <button onClick={() => supabase.auth.signOut().then(() => nav("/admin/auth"))} className="mt-8 flex items-center gap-3 px-3 h-11 rounded-md text-sm text-muted-foreground hover:text-foreground w-full">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      {/* Mobile top bar */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="" className="h-8 w-8" />
          <span className="font-display tracking-widest text-gradient">ATLAS ADMIN</span>
        </Link>
        <button onClick={() => setOpen((o) => !o)} className="h-10 w-10 rounded-full glass flex items-center justify-center" aria-label="Menu">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <aside className="absolute left-0 top-0 h-full w-72 bg-card border-r border-border p-6 animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
            {Sidebar}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block border-r border-border bg-card p-6 lg:sticky lg:top-0 lg:h-screen">
        {Sidebar}
      </aside>

      <div className="p-4 md:p-8 overflow-x-auto"><Outlet /></div>
    </div>
  );
}
