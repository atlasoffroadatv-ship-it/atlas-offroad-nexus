import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import { CheckCircle2, CreditCard, Percent, ShieldCheck, Calculator } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  amount: z.string().trim().min(1).max(20),
  credit: z.string().trim().min(1).max(40),
});

export default function Financing() {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(15000);
  const [term, setTerm] = useState(48);
  const [apr, setApr] = useState(7.99);
  const [down, setDown] = useState(2000);

  const principal = Math.max(0, price - down);
  const r = apr / 100 / 12;
  const monthly = r === 0 ? principal / term : (principal * r) / (1 - Math.pow(1 + r, -term));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (data._honey) return;
    const parsed = schema.safeParse(data);
    if (!parsed.success) return toast.error("Please fill out all required fields.");
    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/info@atlasoffroadatv.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Financing Application — Atlas Offroad ATV",
          _captcha: "false",
          _template: "table",
          ...parsed.data,
        }),
      });
      toast.success("Application received. A finance specialist will reach out within 24 hours.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="ATV Financing — Low APR Loans Across the USA | Atlas Offroad"
        description="Flexible ATV financing across the United States. Rates from 5.99% APR, terms up to 84 months, and same-day pre-approval. Apply online with Atlas Offroad."
        path="/financing"
      />

      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Financing</div>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mt-3">Ride now, pay smart.</h1>
          <p className="mt-5 text-foreground/85">
            Pre-qualified buyers get rates from 5.99% APR with terms up to 84 months. Available in all 50 US states.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { I: Percent, t: "From 5.99% APR", d: "Competitive rates for qualified buyers." },
            { I: ShieldCheck, t: "Soft credit check", d: "See your offer with no impact to your score." },
            { I: CreditCard, t: "Up to 84 months", d: "Lower your monthly payment with longer terms." },
          ].map((f, i) => (
            <div key={i} className="glass rounded-2xl p-8 hover-lift">
              <f.I className="h-8 w-8 text-gold" />
              <div className="mt-4 font-display text-2xl tracking-wider">{f.t}</div>
              <p className="mt-2 text-foreground/85">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-6 w-6 text-gold" />
              <h2 className="font-display text-3xl tracking-wider">Payment calculator</h2>
            </div>
            <div className="space-y-5">
              <Slider label="ATV price" value={price} min={1000} max={60000} step={500} onChange={setPrice} fmt={(v) => `$${v.toLocaleString()}`} />
              <Slider label="Down payment" value={down} min={0} max={20000} step={250} onChange={setDown} fmt={(v) => `$${v.toLocaleString()}`} />
              <Slider label="APR" value={apr} min={3} max={18} step={0.25} onChange={setApr} fmt={(v) => `${v.toFixed(2)}%`} />
              <Slider label="Term (months)" value={term} min={12} max={84} step={6} onChange={setTerm} fmt={(v) => `${v} mo`} />
            </div>
            <div className="mt-8 rounded-xl bg-gradient-premium p-6 text-primary-foreground text-center">
              <div className="text-xs uppercase tracking-widest opacity-80">Estimated monthly payment</div>
              <div className="font-display text-5xl mt-1">${monthly.toFixed(0)}<span className="text-xl">/mo</span></div>
              <div className="mt-1 text-xs opacity-80">Total financed: ${principal.toLocaleString()}</div>
            </div>
            <p className="mt-4 text-xs text-foreground/70 text-center">
              Estimates only. Final terms depend on credit profile and lender.
            </p>
          </div>

          {/* Application */}
          <form onSubmit={onSubmit} className="glass rounded-2xl p-8 space-y-4">
            <h2 className="font-display text-3xl tracking-wider mb-2">Get pre-qualified</h2>
            <input name="_honey" tabIndex={-1} className="hidden" autoComplete="off" />
            {[
              { n: "name", l: "Full name", t: "text", max: 80 },
              { n: "email", l: "Email", t: "email", max: 255 },
              { n: "phone", l: "Phone", t: "tel", max: 30 },
              { n: "amount", l: "Amount needed (USD)", t: "text", max: 20 },
            ].map((f) => (
              <div key={f.n}>
                <label className="text-xs uppercase tracking-widest text-foreground/70">{f.l}</label>
                <input name={f.n} type={f.t} maxLength={f.max} required className="mt-2 w-full h-12 rounded-md bg-background border border-border px-4 text-sm text-foreground focus:border-gold/60 outline-none" />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-widest text-foreground/70">Estimated credit</label>
              <select name="credit" required className="mt-2 w-full h-12 rounded-md bg-background border border-border px-4 text-sm text-foreground focus:border-gold/60 outline-none">
                <option value="excellent">Excellent (720+)</option>
                <option value="good">Good (660-719)</option>
                <option value="fair">Fair (600-659)</option>
                <option value="rebuilding">Rebuilding (&lt; 600)</option>
              </select>
            </div>
            <button disabled={loading} className="w-full h-12 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm disabled:opacity-60">
              {loading ? "Submitting…" : "Apply now"}
            </button>
            <ul className="mt-4 space-y-2 text-sm text-foreground/85">
              {["Soft credit check, no score impact", "Decision in 24 hours", "All 50 US states eligible"].map((t) => (
                <li key={t} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-gold mt-0.5" /> {t}</li>
              ))}
            </ul>
          </form>
        </div>

        <div className="mt-16 text-center">
          <Link to="/shop" className="h-12 px-8 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm inline-flex items-center">
            Browse ATVs
          </Link>
        </div>
      </section>
    </>
  );
}

function Slider({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string }) {
  return (
    <div>
      <div className="flex justify-between text-xs uppercase tracking-widest text-foreground/70 mb-2">
        <span>{label}</span>
        <span className="text-gold font-semibold">{fmt(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[hsl(var(--gold))]" />
    </div>
  );
}
