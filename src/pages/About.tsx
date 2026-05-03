import Seo from "@/components/Seo";
import { motion } from "framer-motion";
import about from "@/assets/about-hero.jpg";

export default function About() {
  return (
    <>
      <Seo
        title="About Atlas Offroad ATV — Our Story"
        description="Atlas Offroad ATV was founded by riders, for riders. America's premium ATV dealership delivering offroad machines with concierge service in all 50 states."
        path="/about"
      />

      <section className="relative h-[60vh] flex items-end overflow-hidden grain">
        <img src={about} alt="ATVs racing on a forest trail" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        <div className="container relative pb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Our story</div>
          <h1 className="font-display text-6xl md:text-8xl tracking-wider mt-2">Born of the trail.</h1>
        </div>
      </section>

      <section className="container py-20 grid md:grid-cols-2 gap-16 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl tracking-wider text-gradient">Mission</h2>
          <p className="mt-4 text-foreground/90 leading-relaxed">
            Atlas Offroad ATV exists for the riders who refuse to follow the road. We curate only the machines we'd ride ourselves — then deliver them across the United States with the kind of obsessive care most dealerships forgot. Every quad, every side-by-side, every detail.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <h2 className="font-display text-3xl tracking-wider text-gradient">Vision</h2>
          <p className="mt-4 text-foreground/90 leading-relaxed">
            To redefine what premium offroad ownership feels like in America — from the moment you browse to the moment you carve a new trail. We're building the most trusted name in US ATV sales, one rider at a time.
          </p>
        </motion.div>
      </section>

      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "12,000+", l: "Riders served" },
            { n: "98%", l: "Satisfaction rate" },
            { n: "50 states", l: "US delivery network" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-10 text-center hover-lift">
              <div className="font-display text-5xl text-gradient">{s.n}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-foreground/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
