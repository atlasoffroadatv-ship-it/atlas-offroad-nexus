import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Shield, Wrench, Award, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Seo, { orgJsonLd } from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import hero from "@/assets/hero-atv.jpg";

const testimonials = [
  { name: "Marcus T.", role: "Trail rider", body: "The build quality is unreal. Atlas delivered a machine that handles like a dream on Moab terrain." },
  { name: "Sara L.", role: "Weekend warrior", body: "From browsing to delivery — pure premium experience. My Atlas Sport-X is the best purchase I've made." },
  { name: "Diego R.", role: "Ranch owner", body: "Side-by-side has transformed daily ops on the property. Reliable, powerful, and looks incredible." },
];

const features = [
  { I: Shield, t: "Lifetime support", d: "Every Atlas comes with white-glove care." },
  { I: Award, t: "Hand-selected", d: "Only the top tier of each model line." },
  { I: Wrench, t: "Pre-trail tuned", d: "Track-tested before delivery." },
  { I: Truck, t: "Nationwide delivery", d: "Door-to-trail, fully insured." },
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
        title="Atlas Offroad ATV — Premium ATVs, Side-by-Sides & Offroad Machines"
        description="Shop premium ATVs, sport quads, utility ATVs, and side-by-sides from Atlas Offroad. Hand-selected machines, white-glove delivery, and lifetime support."
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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" /> 2026 Collection
            </div>
            <h1 className="mt-6 font-display text-6xl md:text-8xl tracking-wider leading-[0.95]">
              Conquer<br />
              <span className="text-gradient">every horizon.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Hand-curated ATVs, sport quads, and side-by-sides from the world's most trusted manufacturers — delivered with concierge precision.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 h-14 px-8 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm shadow-glow"
              >
                Explore the fleet
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full glass font-semibold uppercase tracking-widest text-sm hover:border-gold/40"
              >
                Book a test ride
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST */}
      <section className="container py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <f.I className="h-8 w-8 text-gold" />
              <div className="mt-4 font-display text-xl tracking-wider">{f.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{f.d}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Featured</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider mt-2">The flagship lineup</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex text-sm uppercase tracking-widest text-gold hover:text-ember transition">
            View all →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
            Featured ATVs will appear here. Add products from <Link to="/admin" className="text-gold hover:underline">Admin</Link> and mark them as featured.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        )}
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Voices from the trail</div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider mt-2">Trusted by riders</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8 hover-lift"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${30 + i * 7}.jpg`}
                  alt={t.name}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/40"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <p className="mt-6 text-muted-foreground italic">"{t.body}"</p>
              <div className="mt-4 text-gold">★★★★★</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="container py-20">
        <div className="relative rounded-3xl overflow-hidden glass-strong p-12 md:p-20 text-center grain">
          <div className="absolute inset-0 bg-gradient-premium opacity-10" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl tracking-wider">Your trail starts here</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Talk to an Atlas specialist or browse the full fleet — financing and nationwide delivery available.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link to="/shop" className="h-12 px-8 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm inline-flex items-center">Shop now</Link>
              <Link to="/contact" className="h-12 px-8 rounded-full glass font-semibold uppercase tracking-widest text-sm inline-flex items-center">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
