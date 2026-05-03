import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled || open ? "glass-strong border-b border-white/5" : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Atlas Offroad ATV logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-xl tracking-widest text-gradient">ATLAS</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-1">OFFROAD ATV</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm tracking-wide uppercase transition-colors relative",
                  "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-gradient-premium after:transition-all",
                  isActive ? "text-foreground after:w-full" : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
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
            className="md:hidden h-10 w-10 rounded-full glass flex items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/5 animate-fade-in-fast">
          <div className="container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn("text-lg uppercase tracking-wide", isActive ? "text-gradient" : "text-muted-foreground")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
