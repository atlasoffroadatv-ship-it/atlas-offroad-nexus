import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(5).max(300),
  notes: z.string().trim().max(500).optional(),
});

export default function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center">
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <Link to="/shop" className="mt-4 inline-block text-gold underline">Continue shopping</Link>
      </div>
    );
  }

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
        total: total,
      });
      if (error) throw error;

      // Mirror to email via formsubmit (best-effort)
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

      clear();
      toast.success("Order received. Our team will reach out shortly.");
      navigate("/checkout/success");
    } catch (err: any) {
      toast.error(err.message || "Could not place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Checkout" description="Complete your Atlas Offroad ATV purchase inquiry." path="/checkout" noindex />
      <section className="container py-16 max-w-5xl">
        <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-10">Checkout</h1>
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <form onSubmit={onSubmit} className="glass rounded-2xl p-8 space-y-4">
            <input name="_honey" tabIndex={-1} className="hidden" autoComplete="off" />
            {[
              { n: "name", l: "Full name", t: "text", max: 80 },
              { n: "email", l: "Email", t: "email", max: 255 },
              { n: "phone", l: "Phone", t: "tel", max: 30 },
              { n: "address", l: "Delivery address", t: "text", max: 300 },
            ].map((f) => (
              <div key={f.n}>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">{f.l}</label>
                <input name={f.n} type={f.t} maxLength={f.max} required className="mt-2 w-full h-12 rounded-md bg-background border border-border px-4 text-sm focus:border-gold/40 outline-none" />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Notes (optional)</label>
              <textarea name="notes" rows={3} maxLength={500} className="mt-2 w-full rounded-md bg-background border border-border px-4 py-3 text-sm focus:border-gold/40 outline-none" />
            </div>
            <button disabled={loading} className="w-full h-12 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm disabled:opacity-60">
              {loading ? "Submitting…" : "Place order"}
            </button>
          </form>

          <aside className="glass rounded-2xl p-6 h-fit space-y-3">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Order</div>
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="truncate pr-2">{i.qty}× {i.name}</span>
                <span>${(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between text-xl font-semibold">
              <span>Total</span><span className="text-gradient">${total.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
