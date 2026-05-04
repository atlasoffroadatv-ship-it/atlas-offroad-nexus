import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronRight, Shield, Wrench, Award, Truck,
  Phone, Mail, BadgeCheck, Star, Zap, Compass, Users, Gauge, Calendar, ArrowRight, HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Seo, { orgJsonLd } from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import Typewriter from "@/components/Typewriter";
import hero from "@/assets/hero-atv.jpg";

const IMG = {
  sport: "https://cdn-fastly.atv.com/media/2022/10/24/8847148/sport-atv-of-the-year-atv-com-awards.jpg?size=1200x628",
  utility: "https://powersportsbusiness.com/wp-content/uploads/2012/07/912ATV-KYMCO-MXU-700.jpg",
  sxs: "https://can-am.brp.com/content/dam/global/en/can-am-off-road/my26/studio/na/ssv/defender/ORV-SSV-MY26-Defender-Base-HD7-Compass-Green-0006XTE00-Studio-34FR-NA.png",
  youth: "https://cdpcdn.dx1app.com/products-private/prod/9d91fa61-ab9c-4d46-adce-236fc0cb1154/6c6e1d8b-2105-4698-8264-aaee01435c22/00000000-0000-0000-0000-000000000000/4a2617dd-f8d0-45ac-b454-add201107d6d/2000000001.jpg",
  safety: "https://www.yamaha-motor.eu/content/dam/yamaha-motor-europe-migrated/safety/atv-rider-training/atv-riders-safety-awareness-kv.jpg",
  lineup: "https://motorsportsnewswire.com/wp-content/uploads/2025/09/2026-Yamaha-ATV-lineup-678.jpeg",
  action: "https://hhvehicleservices.co.uk/wp-content/uploads/2020/02/2026-Yamaha-YFM700FWAD-X-EU-Moss_Grey___Tactical_Black-Action-007-03.jpeg",
  detail1: "https://cdpcdn.dx1app.com/products-private/prod/b4c552ab-68a4-448e-b7a2-5d67c5e1b912/4c47232e-f696-4cab-b372-86abfea52e53/00000000-0000-0000-0000-000000000000/34e71fad-d7c0-4e4f-907e-b3550030f22b/f9a3ddc6-b4dd-43ae-a3eb-b3c00151b796/6000000006.jpg",
  detail2: "https://cdpcdn.dx1app.com/products-private/prod/aea64e15-6d59-49ae-a6a2-c820ffc90d04/635b0992-9f4d-4cb4-a654-ae1c01512427/00000000-0000-0000-0000-000000000000/34e71fad-d7c0-4e4f-907e-b3550030f22b/a83f09e9-3581-4e58-8941-b38d01712595/6000000001_480px.jpg",
  trail: "https://cdn.dealerspike.com/imglib/v1/640x480/imglib/assets/inventory/31/18/3118C4A5-B11E-4820-8B21-8CC21B2BC54D.jpg",
  hero2: "https://cdn-media.tilabs.io/v1/media/69ebadaa9468fa64150df9c2.jpg",
};
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Seo, { orgJsonLd } from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import hero from "@/assets/hero-atv.jpg";

const features = [
  { I: Shield, t: "Lifetime support", d: "Every Atlas comes with white-glove care." },
  { I: Award, t: "Hand-selected", d: "Only the top tier of each model line." },
  { I: Wrench, t: "Pre-trail tuned", d: "Track-tested before delivery." },
  { I: Truck, t: "USA delivery", d: "Door-to-trail across all 50 states." },
];

export default function Home() {
  const { data: featured = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").eq("is_featured", true).eq("is_available", true).limit(6);
      return data || [];
    },
  });

  return (
    <>
      <Seo
        title="Atlas Offroad ATV — Premium ATVs, Side-by-Sides & Sport Quads USA"
        description="Shop premium ATVs, sport quads, utility ATVs, and side-by-sides from Atlas Offroad. Hand-selected machines, white-glove delivery across the United States, and lifetime support."
        path="/"
        jsonLd={orgJsonLd}
      />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden grain">
        <img
          src={hero}
          alt="Premium ATV at golden hour on a desert trail"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="container relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" /> 2026 Collection · Made in USA
            </div>
            <h1 className="mt-6 font-display text-6xl md:text-8xl tracking-wider leading-[0.95]">
              Conquer<br />
              <span className="text-gradient">
                <Typewriter words={["every horizon.", "every trail.", "every mountain.", "every dune."]} />
              </span>
            </h1>
            <p className="mt-6 text-lg text-foreground/90 max-w-xl">
              Hand-curated ATVs, sport quads, and side-by-sides from the world's most trusted manufacturers — delivered with concierge precision across the United States.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="group inline-flex items-center gap-2 h-14 px-8 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm shadow-glow">
                Explore the fleet <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/financing" className="inline-flex items-center gap-2 h-14 px-8 rounded-full glass font-semibold uppercase tracking-widest text-sm hover:border-gold/40">
                Get pre-qualified
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST */}
      <section className="container py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 hover-lift">
              <f.I className="h-8 w-8 text-gold" />
              <div className="mt-4 font-display text-xl tracking-wider">{f.t}</div>
              <div className="text-sm text-foreground/85 mt-1">{f.d}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Featured</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider mt-2">The flagship lineup</h2>
          </div>
          <Link to="/shop" className="text-sm uppercase tracking-widest text-gold hover:text-ember transition">View all →</Link>
        </div>

        {featured.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-foreground/85">
            Featured ATVs will appear here. Add products from <Link to="/admin" className="text-gold hover:underline">Admin</Link> and mark them as featured.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        )}
      </section>

      {/* 1. CATEGORIES */}
      <section className="container py-20">
        <SectionHeader eyebrow="Browse by category" title="Find your machine" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {[
            { t: "Sport ATVs", d: "Race-bred power", img: IMG.sport },
            { t: "Utility ATVs", d: "Built to work", img: IMG.utility },
            { t: "Side-by-Sides", d: "Family-ready", img: IMG.sxs },
            { t: "Youth", d: "Safer firsts", img: IMG.youth },
          ].map((c) => (
            <Link key={c.t} to="/shop" className="group relative overflow-hidden rounded-2xl aspect-[4/5] hover-lift block">
              <img src={c.img} alt={c.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="font-display text-2xl tracking-wider">{c.t}</div>
                <div className="text-xs text-gold-soft uppercase tracking-widest mt-1">{c.d} →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. WHY ATLAS */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader eyebrow="Why Atlas" title="Built different. Delivered better." align="left" />
            <p className="mt-6 text-foreground/85">
              We're not a volume dealer. We hand-select every machine, pre-tune it on real terrain, and deliver it to your door — anywhere in the United States. From Texas ranches to Colorado peaks, Atlas is the trusted name in premium offroad.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Certified pre-delivery inspection on every ATV",
                "5-year drivetrain warranty included",
                "Free first service at any US partner shop",
                "30-day satisfaction guarantee",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3"><BadgeCheck className="h-5 w-5 text-gold mt-0.5" /> <span className="text-foreground/90">{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "12K+", l: "Riders served" },
              { n: "4.9★", l: "Average rating" },
              { n: "50", l: "US states served" },
              { n: "24h", l: "Avg response" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-8 text-center hover-lift">
                <div className="font-display text-5xl text-gradient">{s.n}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-foreground/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCESS */}
      <section className="container py-20">
        <SectionHeader eyebrow="The Atlas process" title="Concierge from click to trail" />
        <div className="grid md:grid-cols-4 gap-5 mt-12">
          {[
            { I: Compass, t: "1. Browse", d: "Filter by type, brand, and budget." },
            { I: Users, t: "2. Consult", d: "Talk to a US-based ATV specialist." },
            { I: Wrench, t: "3. Pre-tune", d: "Trail-tested before it ships." },
            { I: Truck, t: "4. Delivery", d: "Door-to-trail, fully insured." },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6 hover-lift">
              <div className="h-12 w-12 rounded-full bg-gradient-premium flex items-center justify-center text-primary-foreground"><s.I className="h-5 w-5" /></div>
              <div className="mt-4 font-display text-xl tracking-wider">{s.t}</div>
              <p className="mt-1 text-sm text-foreground/85">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FINANCING TEASER */}
      <section className="container py-20">
        <div className="relative rounded-3xl overflow-hidden glass-strong p-10 md:p-16 grid lg:grid-cols-2 gap-10 items-center grain">
          <div className="absolute inset-0 bg-gradient-premium opacity-10" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Financing</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wider mt-2">From 5.99% APR. Up to 84 months.</h2>
            <p className="mt-4 text-foreground/85">Soft credit pull, decision in 24 hours, available in all 50 US states.</p>
            <Link to="/financing" className="mt-6 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm">
              Get pre-qualified <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative grid grid-cols-3 gap-3">
            {[{ n: "$199", l: "from / month" }, { n: "5.99%", l: "APR from" }, { n: "84 mo", l: "max term" }].map((s) => (
              <div key={s.l} className="rounded-2xl bg-background border border-border p-5 text-center">
                <div className="font-display text-2xl text-gradient">{s.n}</div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/70 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SPECS / SPEC HIGHLIGHTS */}
      <section className="container py-20">
        <SectionHeader eyebrow="Engineered for performance" title="Spec sheet, simplified" />
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {[
            { I: Zap, t: "Up to 110 HP", d: "Liquid-cooled, fuel-injected powerplants tuned for instant throttle response." },
            { I: Gauge, t: "0-60 in 4.3s", d: "Sport-class acceleration with optimized weight distribution." },
            { I: Shield, t: "All-terrain DNA", d: "Long-travel suspension, locking diff, and reinforced chassis." },
          ].map((s) => (
            <div key={s.t} className="glass rounded-2xl p-8 hover-lift">
              <s.I className="h-8 w-8 text-gold" />
              <div className="mt-4 font-display text-2xl tracking-wider">{s.t}</div>
              <p className="mt-2 text-foreground/85">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <Testimonials />

      {/* 7. BLOG */}
      <section className="container py-20">
        <SectionHeader eyebrow="Field notes" title="From the Atlas Journal" cta={<Link to="/blog" className="text-sm uppercase tracking-widest text-gold hover:text-ember">All articles →</Link>} />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { slug: "best-atvs-for-beginners-2026", t: "The 7 Best Beginner ATVs of 2026", img: "https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?auto=format&fit=crop&w=900&q=70", date: "May 1, 2026" },
            { slug: "moab-trail-guide", t: "Moab to Sedona: Ultimate Trail Guide", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70", date: "Apr 22, 2026" },
            { slug: "atv-financing-101", t: "ATV Financing 101 — A Buyer's Playbook", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=70", date: "Feb 26, 2026" },
          ].map((p) => (
            <Link key={p.slug} to="/blog" className="group glass rounded-2xl overflow-hidden hover-lift">
              <div className="aspect-[16/10] overflow-hidden"><img src={p.img} alt={p.t} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" /></div>
              <div className="p-5">
                <div className="text-xs text-foreground/70 inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</div>
                <div className="mt-2 font-display text-xl tracking-wider">{p.t}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. BRANDS */}
      <section className="container py-20">
        <SectionHeader eyebrow="Brands we carry" title="Best-in-class only" />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {["Atlas", "Polaris", "Yamaha", "Honda", "Can-Am", "Kawasaki"].map((b) => (
            <div key={b} className="glass rounded-2xl h-24 flex items-center justify-center font-display text-2xl tracking-widest text-gradient">{b}</div>
          ))}
        </div>
      </section>

      {/* 9. SHOWROOMS */}
      <section className="container py-20">
        <SectionHeader eyebrow="US showrooms" title="Visit us in person" />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { c: "Austin, TX", a: "1200 Trailhead Blvd, Austin, TX 78701", p: "+1 (512) 555-0188" },
            { c: "Denver, CO", a: "455 Summit Ridge, Denver, CO 80202", p: "+1 (303) 555-0142" },
            { c: "Phoenix, AZ", a: "920 Sonoran Way, Phoenix, AZ 85004", p: "+1 (602) 555-0177" },
          ].map((s) => (
            <div key={s.c} className="glass rounded-2xl p-6 hover-lift">
              <div className="font-display text-2xl tracking-wider">{s.c}</div>
              <div className="mt-3 flex items-start gap-2 text-sm text-foreground/85"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> {s.a}</div>
              <div className="mt-2 flex items-start gap-2 text-sm text-foreground/85"><Phone className="h-4 w-4 mt-0.5 text-gold" /> {s.p}</div>
              <Link to="/contact" className="mt-4 inline-block text-xs uppercase tracking-widest text-gold hover:text-ember">Book a visit →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ */}
      <FAQ />

      {/* CTA BAND */}
      <section className="container py-20">
        <div className="relative rounded-3xl overflow-hidden glass-strong p-12 md:p-20 text-center grain">
          <div className="absolute inset-0 bg-gradient-premium opacity-15" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl tracking-wider">Your trail starts here</h2>
            <p className="mt-4 text-foreground/90 max-w-xl mx-auto">
              Talk to an Atlas specialist or browse the full fleet — financing and US-wide delivery available.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link to="/shop" className="h-12 px-8 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm inline-flex items-center">Shop now</Link>
              <Link to="/contact" className="h-12 px-8 rounded-full glass font-semibold uppercase tracking-widest text-sm inline-flex items-center">Get in touch</Link>
            </div>
            <div className="mt-8 inline-flex flex-wrap justify-center gap-6 text-sm text-foreground/85">
              <a href="tel:+15125550188" className="inline-flex items-center gap-2 hover:text-gold"><Phone className="h-4 w-4 text-gold" /> +1 (512) 555-0188</a>
              <a href="mailto:info@atlasoffroadatv.com" className="inline-flex items-center gap-2 hover:text-gold"><Mail className="h-4 w-4 text-gold" /> info@atlasoffroadatv.com</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ eyebrow, title, align = "center", cta }: { eyebrow: string; title: string; align?: "left" | "center"; cta?: React.ReactNode }) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`flex items-end justify-between gap-4 flex-wrap ${align === "center" ? "flex-col" : ""}`}>
      <div className={`max-w-2xl ${alignCls}`}>
        <div className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</div>
        <h2 className="font-display text-4xl md:text-5xl tracking-wider mt-2">{title}</h2>
      </div>
      {cta}
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Marcus T.", state: "Austin, TX", body: "The build quality is unreal. Atlas delivered a machine that handles like a dream on Texas hill country trails." },
  { name: "Sara L.", state: "Denver, CO", body: "From browsing to delivery — pure premium experience. My Atlas Sport-X is the best purchase I've made." },
  { name: "Diego R.", state: "Bozeman, MT", body: "Side-by-side has transformed daily ops on the ranch. Reliable, powerful, and looks incredible." },
];

function Testimonials() {
  return (
    <section className="container py-20">
      <SectionHeader eyebrow="Voices from the trail" title="Trusted by riders nationwide" cta={<Link to="/reviews" className="text-sm uppercase tracking-widest text-gold hover:text-ember">All 30 reviews →</Link>} />
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-8 hover-lift">
            <div className="flex items-center gap-4">
              <img src={`https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${30 + i * 7}.jpg`} alt={t.name} loading="lazy" className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/40" />
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-foreground/70">{t.state}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">{Array.from({ length: 5 }).map((_, k) => (<Star key={k} className="h-4 w-4 fill-gold text-gold" />))}</div>
            <p className="mt-4 text-foreground/85 italic">"{t.body}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Do you deliver across the United States?", a: "Yes — we deliver door-to-trail to all 50 US states with insured, enclosed transport." },
  { q: "Is financing available?", a: "Yes. We offer financing from 5.99% APR with terms up to 84 months. Soft credit check, decision in 24 hours." },
  { q: "Are your ATVs new or pre-owned?", a: "We carry a curated selection of new and certified pre-owned ATVs, side-by-sides, and sport quads." },
  { q: "What's included with my purchase?", a: "Pre-delivery inspection, trail tune, owner orientation call, 5-year drivetrain warranty, and free first service." },
  { q: "Can I trade in my current ATV?", a: "Absolutely. Submit photos via the contact form for a same-day trade-in offer." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container py-20">
      <SectionHeader eyebrow="Frequently asked" title="Everything you wanted to know" />
      <div className="max-w-3xl mx-auto mt-12 space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="glass rounded-2xl">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
              <span className="flex items-center gap-3 font-medium"><HelpCircle className="h-4 w-4 text-gold" /> {f.q}</span>
              <ChevronRight className={`h-4 w-4 text-gold transition ${open === i ? "rotate-90" : ""}`} />
            </button>
            {open === i && <div className="px-5 pb-5 text-foreground/85">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
