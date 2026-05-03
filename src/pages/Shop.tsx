import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { Database } from "@/integrations/supabase/types";

type AtvType = Database["public"]["Enums"]["atv_type"];

const TYPES: { value: AtvType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sport", label: "Sport" },
  { value: "utility", label: "Utility" },
  { value: "side_by_side", label: "Side-by-Side" },
  { value: "youth", label: "Youth" },
];

export default function Shop() {
  const [type, setType] = useState<AtvType | "all">("all");
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [sort, setSort] = useState<"newest" | "price_asc" | "price_desc">("newest");
  const [search, setSearch] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);
  const [brand, setBrand] = useState<string>("all");

  const filtered = useMemo(() => {
    let r = products.filter((p) =>
      (type === "all" || p.type === type) &&
      (brand === "all" || p.brand === brand) &&
      Number(p.price) <= maxPrice &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === "price_asc") r = [...r].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "price_desc") r = [...r].sort((a, b) => Number(b.price) - Number(a.price));
    return r;
  }, [products, type, brand, maxPrice, sort, search]);

  return (
    <>
      <Seo
        title="Shop Premium ATVs & Side-by-Sides"
        description="Browse the Atlas Offroad collection of sport, utility, side-by-side, and youth ATVs. Filter by type, brand, and price."
        path="/shop"
      />

      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">The fleet</div>
          <h1 className="font-display text-6xl md:text-7xl tracking-wider mt-2">Find your machine</h1>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="glass rounded-2xl p-6 h-fit lg:sticky lg:top-28">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full h-11 rounded-md bg-background/40 border border-white/5 px-4 text-sm outline-none focus:border-gold/40 mb-6"
            />
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Type</div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${
                      type === t.value ? "bg-gradient-premium text-primary-foreground border-transparent" : "border-white/10 text-muted-foreground hover:border-gold/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            {brands.length > 0 && (
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Brand</div>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-10 rounded-md bg-background/40 border border-white/5 px-3 text-sm">
                  <option value="all">All brands</option>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            )}
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex justify-between">
                <span>Max price</span><span className="text-gold">${maxPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={1000} max={100000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[hsl(var(--gold))]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Sort</div>
              <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="w-full h-10 rounded-md bg-background/40 border border-white/5 px-3 text-sm">
                <option value="newest">Newest</option>
                <option value="price_asc">Price: low to high</option>
                <option value="price_desc">Price: high to low</option>
              </select>
            </div>
          </aside>

          <div>
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl glass animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="glass rounded-2xl p-16 text-center text-muted-foreground">
                No machines match your filters.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
