import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { POSTS } from "@/data/blogPosts";

export default function Blog() {
  return (
    <>
      <Seo
        title="Atlas Offroad Blog — ATV Guides, Trails & Reviews"
        description="Expert ATV buying guides, trail reviews, financing tips, and maintenance how-tos from the Atlas Offroad team."
        path="/blog"
      />
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Field notes</div>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mt-3">The Atlas Journal</h1>
          <p className="mt-5 text-foreground/85">
            Trail intel, buying guides, and maintenance know-how from the Atlas Offroad crew.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group glass rounded-2xl overflow-hidden hover-lift flex flex-col"
            >
              <Link to={`/blog/${p.slug}`} className="aspect-[16/10] overflow-hidden block">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-foreground/70 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold uppercase tracking-widest">{p.tag}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl tracking-wider">{p.title}</h2>
                <p className="mt-2 text-sm text-foreground/85 flex-1">{p.excerpt}</p>
                <Link to={`/blog/${p.slug}`} className="mt-4 inline-flex items-center gap-1 text-gold hover:text-ember text-sm font-semibold story-link">
                  Read article <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
