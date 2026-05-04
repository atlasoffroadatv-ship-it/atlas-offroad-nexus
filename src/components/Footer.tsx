import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import logo from "@/assets/logo.png";

const emailSchema = z.string().trim().email().max(255);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) return toast.error("Please enter a valid email");
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: parsed.data });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) return toast.error("Could not subscribe");
    toast.success("You're on the list. Welcome to the trail.");
    setEmail("");
  };

  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="container py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Atlas Offroad ATV" width={40} height={40} className="h-10 w-10" loading="lazy" />
            <div>
              <div className="font-display text-2xl tracking-widest text-gradient">ATLAS</div>
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-1">OFFROAD ATV</div>
            </div>
          </Link>
          <p className="mt-6 max-w-md text-muted-foreground">
            Premium ATVs, side-by-sides, and offroad machines built for those who refuse to follow the road.
          </p>
          <form onSubmit={subscribe} className="mt-8 flex max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Get trail-worthy updates"
              className="flex-1 h-12 rounded-md glass px-4 text-sm focus:border-gold/40 outline-none"
              maxLength={255}
              required
            />
            <button
              disabled={loading}
              className="h-12 px-6 rounded-md bg-gradient-premium text-primary-foreground font-semibold text-sm uppercase tracking-wider disabled:opacity-60"
            >
              Join
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-display text-lg tracking-wider mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link to="/shop" className="hover:text-foreground">Shop ATVs</Link></li>
            <li><Link to="/reviews" className="hover:text-foreground">Reviews</Link></li>
            <li><Link to="/financing" className="hover:text-foreground">Financing</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold" /> info@atlasoffroadatv.com</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold" /> +1 (512) 555-0188</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> United States — nationwide delivery</li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[{ I: Instagram, h: "https://instagram.com" }, { I: Facebook, h: "https://facebook.com" }, { I: Youtube, h: "https://youtube.com" }].map(({ I, h }, i) => (
              <a key={i} href={h} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full glass flex items-center justify-center hover:border-gold/40 transition" aria-label="social">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Atlas Offroad ATV. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-foreground">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
