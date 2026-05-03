import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Seo, { orgJsonLd } from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ChevronRight, Minus, Plus, ShoppingCart, Star, Zap } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";

const REVIEW_TEMPLATES = [
  "Smoothest power delivery I've ridden. The {name} is worth every penny.",
  "The {name} looks incredible and handles even better. Atlas exceeded expectations.",
  "Customer service is top-tier. They helped me dial in the {name} for my terrain.",
  "Delivered to my home in Texas — the {name} was trail-ready out of the crate.",
  "The {name} corners flat and brakes hard. Concierge experience from start to finish.",
];
const REVIEW_NAMES = [
  { name: "Jake M.", state: "Austin, TX", g: "men", n: 12 },
  { name: "Olivia P.", state: "Denver, CO", g: "women", n: 24 },
  { name: "Ravi S.", state: "Phoenix, AZ", g: "men", n: 56 },
  { name: "Hannah V.", state: "Boise, ID", g: "women", n: 41 },
  { name: "Connor P.", state: "Bozeman, MT", g: "men", n: 33 },
];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").eq("slug", slug!).maybeSingle();
      return data;
    },
    enabled: !!slug,
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related", product?.id, product?.type],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").eq("type", product!.type).neq("id", product!.id).limit(3);
      return data || [];
    },
    enabled: !!product,
  });

  if (isLoading) return <div className="container py-32 text-center text-foreground/85">Loading…</div>;
  if (!product) {
    return (
      <div className="container py-32 text-center">
        <h1 className="font-display text-4xl">ATV not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-gold underline">Back to shop</Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ["/placeholder.svg"];
  const specs = (product.specs as Record<string, string>) || {};
  const productReviews = REVIEW_NAMES.map((r, i) => ({
    ...r,
    body: REVIEW_TEMPLATES[i % REVIEW_TEMPLATES.length].split("{name}").join(product.name),
    rating: 5,
  }));

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.short_description,
    image: images,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: Number(product.price),
      priceCurrency: "USD",
      availability: product.is_available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://atlasoffroadatv.com/shop/${product.slug}`,
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: 5, reviewCount: productReviews.length },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://atlasoffroadatv.com/" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://atlasoffroadatv.com/shop" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://atlasoffroadatv.com/shop/${product.slug}` },
    ],
  };

  const checkoutItems = [{
    id: product.id, slug: product.slug, name: product.name, price: Number(product.price), qty, image: images[0],
  }];

  return (
    <>
      <Seo
        title={`${product.name} — ${product.brand} ATV`}
        description={product.short_description || product.description?.slice(0, 155) || `Premium ${product.brand} ${product.name} ATV available at Atlas Offroad.`}
        path={`/shop/${product.slug}`}
        image={images[0]}
        type="product"
        jsonLd={[productLd, breadcrumbLd, orgJsonLd]}
      />

      <section className="container py-12">
        <nav className="text-xs text-foreground/70 flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden glass relative">
              <img src={images[activeImg]} alt={`${product.name} view ${activeImg + 1}`} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {images.map((src, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-lg overflow-hidden border-2 transition ${activeImg === i ? "border-gold" : "border-transparent"}`}>
                    <img src={src} alt={`thumb ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">{product.brand} · {product.type.replace("_", " ")}</div>
            <h1 className="font-display text-5xl md:text-6xl tracking-wider mt-3">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-gold text-gold" />)}</div>
              <span className="text-xs text-foreground/70">({productReviews.length} verified reviews)</span>
            </div>
            <div className="mt-6 text-4xl font-semibold text-gradient">${Number(product.price).toLocaleString()}</div>
            <p className="mt-6 text-foreground/90 leading-relaxed">{product.description || product.short_description}</p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <div className="flex items-center glass rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 flex items-center justify-center" aria-label="decrease"><Minus className="h-4 w-4" /></button>
                <div className="w-10 text-center font-semibold">{qty}</div>
                <button onClick={() => setQty(qty + 1)} className="h-12 w-12 flex items-center justify-center" aria-label="increase"><Plus className="h-4 w-4" /></button>
              </div>
              <button
                disabled={!product.is_available}
                onClick={() => setCheckoutOpen(true)}
                className="flex-1 min-w-[180px] h-12 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2 shadow-glow disabled:opacity-50"
              >
                <Zap className="h-4 w-4" />
                {product.is_available ? "Buy now" : "Sold out"}
              </button>
              <button
                disabled={!product.is_available}
                onClick={() => {
                  add({ id: product.id, slug: product.slug, name: product.name, price: Number(product.price), image: images[0] }, qty);
                  toast.success(`${product.name} added to cart`);
                }}
                className="h-12 px-5 rounded-full glass font-semibold uppercase tracking-widest text-xs inline-flex items-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4" /> Add to cart
              </button>
            </div>

            {Object.keys(specs).length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl tracking-wider mb-4">Specifications</h2>
                <dl className="glass rounded-2xl divide-y divide-white/5">
                  {Object.entries(specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between p-4 text-sm">
                      <dt className="text-foreground/70 capitalize">{k.replace(/_/g, " ")}</dt>
                      <dd className="font-medium">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-24">
          <h2 className="font-display text-4xl tracking-wider mb-2">Rider reviews of the {product.name}</h2>
          <p className="text-foreground/85 mb-8">Verified reviews from owners across the United States.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {productReviews.map((r, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3">
                  <img src={`https://randomuser.me/api/portraits/${r.g}/${r.n}.jpg`} alt={r.name} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/40" />
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-foreground/70">{r.state}</div>
                  </div>
                </div>
                <div className="mt-3 flex">{Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-gold text-gold" />)}</div>
                <p className="mt-3 text-sm text-foreground/85 italic">"{r.body}"</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-4xl tracking-wider mb-8">You may also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
            </div>
          </section>
        )}
      </section>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} items={checkoutItems} />
    </>
  );
}
