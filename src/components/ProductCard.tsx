import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const img = p.images?.[0] || "/placeholder.svg";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to={`/shop/${p.slug}`}
        className="group block rounded-2xl glass overflow-hidden hover-lift relative"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={img}
            alt={`${p.name} ATV`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" />
          {p.is_featured && (
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-gradient-premium text-primary-foreground font-bold">
              Featured
            </span>
          )}
          {!p.is_available && (
            <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-black/70 border border-white/10">
              Sold out
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.brand} · {p.type.replace("_", " ")}</div>
          <h3 className="font-display text-xl tracking-wider mt-1 group-hover:text-gradient transition">{p.name}</h3>
          <div className="flex items-end justify-between mt-3">
            <div className="text-2xl font-semibold">${Number(p.price).toLocaleString()}</div>
            <span className="text-xs text-gold uppercase tracking-widest">View →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
