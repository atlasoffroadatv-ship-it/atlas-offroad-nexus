import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Calendar, ArrowRight } from "lucide-react";

const POSTS = [
  { slug: "best-atvs-for-beginners-2026", title: "The 7 Best Beginner ATVs of 2026", excerpt: "From sport quads to entry-level utility, our team ranks the most rider-friendly machines for first-time buyers across the United States.", date: "May 1, 2026", tag: "Buying guide", img: "https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?auto=format&fit=crop&w=1200&q=70" },
  { slug: "moab-trail-guide", title: "Moab to Sedona: The Ultimate ATV Trail Guide", excerpt: "Mile-by-mile breakdown of the most cinematic offroad routes in the American Southwest, plus permits and seasonal tips.", date: "April 22, 2026", tag: "Trail guides", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=70" },
  { slug: "sport-vs-utility-atv", title: "Sport vs Utility ATV — Which One Is Right for You?", excerpt: "We break down powerband, geometry, and use-cases so you pick the right machine the first time.", date: "April 10, 2026", tag: "Education", img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=70" },
  { slug: "winter-atv-maintenance", title: "Winter ATV Maintenance Checklist", excerpt: "Battery, fluids, tire pressure, storage — a 12-point checklist to keep your Atlas trail-ready year round.", date: "March 28, 2026", tag: "Maintenance", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=70" },
  { slug: "side-by-side-family", title: "Why Families Are Choosing Side-by-Sides", excerpt: "Cabin protection, seatbelts, and storage make modern UTVs the family trail vehicle of choice.", date: "March 14, 2026", tag: "Lifestyle", img: "https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=1200&q=70" },
  { slug: "atv-financing-101", title: "ATV Financing 101 — A Buyer's Playbook", excerpt: "Credit tiers, APR ranges, and how to negotiate the lowest monthly payment on your dream ATV.", date: "Feb 26, 2026", tag: "Financing", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70" },
];

export default function Blog() {
  return (
    <>
      <Seo
        title="Atlas Offroad Blog — ATV Guides, Trails & Reviews"
        description="Expert ATV buying guides, trail reviews, financing tips, and maintenance how-tos from the Atlas Offroad team."
        path="/blog"
      />
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Field notes</div>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mt-3">The Atlas Journal</h1>
          <p className="mt-5 text-foreground/85">
            Trail intel, buying guides, and maintenance know-how from the Atlas Offroad crew.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <article key={p.slug} className="glass rounded-2xl overflow-hidden hover-lift flex flex-col">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-foreground/70">
                  <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold uppercase tracking-widest">{p.tag}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl tracking-wider">{p.title}</h2>
                <p className="mt-2 text-sm text-foreground/85 flex-1">{p.excerpt}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-gold hover:text-ember text-sm font-semibold">
                  Read more <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
