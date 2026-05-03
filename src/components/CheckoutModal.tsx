import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export type CheckoutItem = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(5).max(300),
  notes: z.string().trim().max(500).optional(),
});

type Props = {
  open: boolean;
  onClose: () => void;
  items: CheckoutItem[];
  onSuccess?: () => void;
};

export default function CheckoutModal({ open, onClose, items, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd) as Record<string, string>;
    if (raw._honey) return;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) return toast.error("Please complete all required fields");
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({ id: i.id, slug: i.slug, name: i.name, price: i.price, qty: i.qty }));
      const { error } = await supabase.from("orders").insert({
        customer_name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: parsed.data.address,
        notes: parsed.data.notes || null,
        items: orderItems,
        total,
      });
      if (error) throw error;

      fetch("https://formsubmit.co/ajax/info@atlasoffroadatv.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Order — Atlas Offroad ATV",
          _captcha: "false",
          _template: "table",
          ...parsed.data,
          total: `$${total.toLocaleString()}`,
          items: orderItems.map((i) => `${i.qty}× ${i.name} ($${i.price})`).join(" | "),
        }),
      }).catch(() => {});

      toast.success("Order received. Our team will reach out shortly.");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Could not place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in-fast">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-gold/20 shadow-glow">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-card">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Secure checkout</div>
            <h2 className="font-display text-3xl tracking-wider mt-1">Complete your order</h2>
          </div>
          <button onClick={onClose} aria-label="close" className="h-10 w-10 rounded-full glass flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-6 p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <input name="_honey" tabIndex={-1} className="hidden" autoComplete="off" />
            {[
              { n: "name", l: "Full name", t: "text", max: 80 },
              { n: "email", l: "Email", t: "email", max: 255 },
              { n: "phone", l: "Phone", t: "tel", max: 30 },
              { n: "address", l: "Delivery address", t: "text", max: 300 },
            ].map((f) => (
              <div key={f.n}>
                <label className="text-xs uppercase tracking-widest text-foreground/70">{f.l}</label>
                <input
                  name={f.n}
                  type={f.t}
                  maxLength={f.max}
                  required
                  className="mt-2 w-full h-12 rounded-md bg-background border border-white/10 px-4 text-sm text-foreground focus:border-gold/60 outline-none"
                />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-widest text-foreground/70">Notes (optional)</label>
              <textarea
                name="notes"
                rows={3}
                maxLength={500}
                placeholder="Color preference, financing interest, delivery instructions…"
                className="mt-2 w-full rounded-md bg-background border border-white/10 px-4 py-3 text-sm text-foreground focus:border-gold/60 outline-none"
              />
            </div>
            <button
              disabled={loading || items.length === 0}
              className="w-full h-12 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> {loading ? "Submitting…" : `Place order · $${total.toLocaleString()}`}
            </button>
            <p className="text-xs text-foreground/60 text-center">
              No payment is taken now. An Atlas specialist will contact you to finalize delivery and payment in the United States.
            </p>
          </form>

          <aside className="rounded-xl bg-background/60 border border-white/10 p-5 h-fit space-y-4">
            <div className="text-xs uppercase tracking-widest text-foreground/70">Your order</div>
            {items.length === 0 && <div className="text-sm text-foreground/60">No items</div>}
            {items.map((i) => (
              <div key={i.id} className="flex gap-3 items-start">
                {i.image && <img src={i.image} alt={i.name} className="h-14 w-16 object-cover rounded-md flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{i.name}</div>
                  <div className="text-xs text-foreground/60">Qty {i.qty}</div>
                </div>
                <div className="text-sm text-gold font-semibold">${(i.price * i.qty).toLocaleString()}</div>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span><span className="text-gradient">${total.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
