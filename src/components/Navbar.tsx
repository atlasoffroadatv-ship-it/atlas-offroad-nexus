import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogIn, Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/reviews", label: "Reviews" },
  { to: "/financing", label: "Financing" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header className={cn("fixed top-0 inset-x-0 z-50 nav-solid")}>
      <nav className="container flex items-center justify-between h-20 gap-4">
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <img src={logo} alt="Atlas Offroad ATV logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-xl tracking-widest text-gradient">ATLAS</div>
            <div className="text-[10px] tracking-[0.3em] text-foreground/60 -mt-1">OFFROAD ATV</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm tracking-wide uppercase transition-colors relative font-medium",
                  "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-gradient-premium after:transition-all",
                  isActive ? "text-foreground after:w-full" : "text-foreground/70 hover:text-foreground after:w-0 hover:after:w-full"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/auth"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full border border-gold/40 text-foreground hover:bg-gold/10 text-xs uppercase tracking-widest font-semibold transition"
          >
            <LogIn className="h-3.5 w-3.5" /> Login
          </Link>
          <Link
            to="/cart"
            className="relative h-10 w-10 rounded-full glass flex items-center justify-center hover:border-gold/40 transition"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-ember text-[10px] font-bold flex items-center justify-center text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden h-10 w-10 rounded-full glass flex items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 nav-solid animate-fade-in-fast">
          <div className="container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn("text-lg uppercase tracking-wide", isActive ? "text-gradient" : "text-foreground/80")
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/admin/auth" className="text-lg uppercase tracking-wide text-gold inline-flex items-center gap-2">
              <LogIn className="h-4 w-4" /> Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
