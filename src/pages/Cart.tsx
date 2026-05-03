import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Seo from "@/components/Seo";
import { Minus, Plus, Trash2 } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";

export default function Cart() {
  const { items, setQty, remove, total, count, clear } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Seo title="Your Cart" description="Review your selected ATVs." path="/cart" noindex />
      <section className="container py-16 max-w-5xl">
        <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-10">Your cart</h1>
        {items.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <p className="text-foreground/85">Your cart is empty.</p>
            <Link to="/shop" className="mt-6 inline-block h-12 px-8 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm">Browse ATVs</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="glass rounded-2xl p-4 flex gap-4 items-center">
                  <img src={it.image} alt={it.name} className="h-24 w-32 object-cover rounded-lg" />
                  <div className="flex-1">
                    <Link to={`/shop/${it.slug}`} className="font-display text-xl tracking-wider hover:text-gradient">{it.name}</Link>
                    <div className="text-gold mt-1">${it.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center glass rounded-full">
                    <button onClick={() => setQty(it.id, it.qty - 1)} className="h-9 w-9 flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm">{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} className="h-9 w-9 flex items-center justify-center"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => remove(it.id)} aria-label="remove" className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-destructive/50 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <aside className="glass rounded-2xl p-6 h-fit lg:sticky lg:top-28">
              <div className="text-xs uppercase tracking-widest text-foreground/70">Order summary</div>
              <div className="mt-4 flex justify-between text-sm"><span className="text-foreground/70">Items</span><span>{count}</span></div>
              <div className="mt-2 flex justify-between text-sm"><span className="text-foreground/70">Subtotal</span><span>${total.toLocaleString()}</span></div>
              <div className="mt-2 flex justify-between text-sm"><span className="text-foreground/70">Delivery</span><span className="text-gold">Quote at checkout</span></div>
              <div className="border-t border-white/5 mt-4 pt-4 flex justify-between text-2xl font-semibold">
                <span>Total</span><span className="text-gradient">${total.toLocaleString()}</span>
              </div>
              <button onClick={() => setOpen(true)} className="mt-6 w-full h-12 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm">
                Checkout
              </button>
            </aside>
          </div>
        )}
      </section>
      <CheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        items={items.map((i) => ({ id: i.id, slug: i.slug, name: i.name, price: i.price, qty: i.qty, image: i.image }))}
        onSuccess={clear}
      />
    </>
  );
}
