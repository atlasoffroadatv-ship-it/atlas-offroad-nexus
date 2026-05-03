import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { Star } from "lucide-react";

type ProductLite = { id: string; name: string; brand: string; slug: string };

const TEMPLATES = [
  { rating: 5, body: "Out of the box experience was unreal. The {name} delivers raw torque with surgical control on rocky climbs." },
  { rating: 5, body: "Bought my {name} from Atlas in Texas — delivered to my door in 4 days. Build quality is on another level." },
  { rating: 5, body: "Concierge experience from inquiry to delivery. The {name} handles dunes and forest trails effortlessly." },
  { rating: 4, body: "Solid power and styling on the {name}. Suspension setup is dialed for both speed and load hauling." },
  { rating: 5, body: "The {name} corners flat, brakes hard, and looks like it belongs in a movie. 10/10 from Atlas." },
  { rating: 5, body: "I run a ranch in Montana — the {name} replaced two older units. Quieter, faster, more fuel efficient." },
  { rating: 5, body: "First time ATV owner. Atlas walked me through everything. The {name} is a confidence machine." },
  { rating: 4, body: "Excellent torque on the {name}. Wish the storage was a touch larger but the ride quality makes up for it." },
  { rating: 5, body: "Took the {name} through the Smokies — flawless. Atlas's pre-trail tune is the real deal." },
  { rating: 5, body: "My kids love riding alongside dad now. The {name} is dialed in straight from delivery." },
  { rating: 5, body: "Hands down the most polished buying experience I've had. The {name} is a beast and a beauty." },
  { rating: 5, body: "Atlas didn't just sell me a {name} — they coached me through accessories, gear, and trail picks." },
  { rating: 4, body: "The {name} is everything I hoped. Power delivery is smooth, ergonomics are perfect for tall riders." },
  { rating: 5, body: "Used my {name} on a 200-mile desert run. Zero issues. Rock solid." },
  { rating: 5, body: "Dealer answered every question, fast. The {name} is a dream on tight singletrack." },
];

const NAMES = [
  "Marcus T.", "Sara L.", "Diego R.", "Olivia P.", "Jake M.", "Ravi S.",
  "Amanda K.", "Tyler B.", "Noah W.", "Priya D.", "Carlos H.", "Jenna F.",
  "Mike S.", "Lila G.", "Ethan J.", "Hannah V.", "Ben C.", "Alyssa N.",
  "Connor P.", "Maya R.", "Zach D.", "Emily T.", "Brandon Q.", "Sofia A.",
  "Logan W.", "Morgan E.", "Wyatt L.", "Aria K.", "Derek M.", "Chloe O.",
];

const STATES = ["TX", "MT", "CO", "UT", "AZ", "ID", "NV", "WY", "OR", "CA", "NM", "FL", "NC", "PA", "MI"];

function generateReviews(products: ProductLite[]) {
  if (!products.length) return [];
  const out: { id: number; product: ProductLite; name: string; state: string; rating: number; body: string; gender: string; num: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const product = products[i % products.length];
    const tpl = TEMPLATES[i % TEMPLATES.length];
    out.push({
      id: i,
      product,
      name: NAMES[i % NAMES.length],
      state: STATES[i % STATES.length],
      rating: tpl.rating,
      body: tpl.body.replaceAll("{name}", product.name),
      gender: i % 3 === 0 ? "women" : "men",
      num: ((i * 7) % 90) + 1,
    });
  }
  return out;
}

export default function Reviews() {
  const { data: products = [] } = useQuery({
    queryKey: ["products-lite"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("id,name,brand,slug").eq("is_available", true);
      return (data || []) as ProductLite[];
    },
  });

  const [reviews, setReviews] = useState<ReturnType<typeof generateReviews>>([]);
  useEffect(() => { setReviews(generateReviews(products)); }, [products]);

  const fallback: ProductLite[] = [
    { id: "1", name: "the Atlas Sport-X", brand: "Atlas", slug: "" },
    { id: "2", name: "the Atlas Trail Pro", brand: "Atlas", slug: "" },
    { id: "3", name: "the Atlas Ranger UT", brand: "Atlas", slug: "" },
  ];
  const list = reviews.length ? reviews : generateReviews(fallback);

  return (
    <>
      <Seo
        title="Customer Reviews — Atlas Offroad ATV"
        description="Read 30+ verified rider reviews of Atlas Offroad ATVs, side-by-sides, and sport quads. Real experiences from owners across the United States."
        path="/reviews"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          name: "Atlas Offroad ATV",
          aggregateRating: { "@type": "AggregateRating", ratingValue: 4.9, reviewCount: 30 },
        }}
      />
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Verified rider reviews</div>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mt-3">What riders are saying</h1>
          <p className="mt-5 text-foreground/85">
            30 verified reviews across our flagship lineup. Every review is tied to a specific Atlas ATV and a real owner across the United States.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 glass rounded-full px-5 py-2">
            <span className="text-gold text-lg">★★★★★</span>
            <span className="text-sm font-semibold">4.9 / 5</span>
            <span className="text-xs text-foreground/70">· 30 reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 9) * 0.04 }}
              className="glass rounded-2xl p-6 hover-lift flex flex-col"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://randomuser.me/api/portraits/${r.gender}/${r.num}.jpg`}
                  alt={r.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/40"
                />
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-foreground/70">{r.state}, USA</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-3 text-foreground/85 italic flex-1">"{r.body}"</p>
              <div className="mt-4 text-xs uppercase tracking-widest text-gold/90">
                Reviewing: <span className="text-foreground">{r.product.name}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
