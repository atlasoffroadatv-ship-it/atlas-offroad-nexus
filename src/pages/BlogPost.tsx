import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { getPost, POSTS } from "@/data/blogPosts";

function renderLine(line: string, key: number) {
  if (line.startsWith("## ")) {
    return (
      <h2 key={key} className="font-display text-3xl md:text-4xl tracking-wider mt-10 mb-4 text-foreground">
        {line.slice(3)}
      </h2>
    );
  }
  // crude inline bold parsing **text**
  const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
    seg.startsWith("**") ? <strong key={i} className="text-foreground font-semibold">{seg.slice(2, -2)}</strong> : <span key={i}>{seg}</span>
  );
  // numbered or bulleted lists rendered with line breaks
  if (/^\d+\.\s/.test(line) || line.includes("\n")) {
    return (
      <div key={key} className="text-foreground/85 leading-relaxed whitespace-pre-line my-4">
        {parts}
      </div>
    );
  }
  return (
    <p key={key} className="text-foreground/85 leading-relaxed my-4 text-lg">
      {parts}
    </p>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${post.title} — Atlas Offroad Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.img}
      />

      <article className="container py-16 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gold hover:text-ember mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to journal
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-3 py-1 rounded-full bg-gold/15 text-gold uppercase tracking-widest text-xs">{post.tag}</span>
          <h1 className="font-display text-4xl md:text-6xl tracking-wider mt-4 leading-tight text-foreground">{post.title}</h1>
          <div className="mt-5 flex items-center gap-5 text-sm text-foreground/70 flex-wrap">
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4 text-gold" /> {post.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-gold" /> {post.readTime}</span>
            <span className="inline-flex items-center gap-1"><User className="h-4 w-4 text-gold" /> {post.author}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 rounded-2xl overflow-hidden shadow-card"
        >
          <img src={post.img} alt={post.title} className="w-full h-72 md:h-[420px] object-cover" />
        </motion.div>

        <div className="mt-10">
          {post.content.map((line, i) => renderLine(line, i))}
        </div>

        <div className="mt-16 glass rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl tracking-wider">Ready to ride?</h3>
          <p className="mt-2 text-foreground/85">Browse the Atlas fleet — concierge delivery across the United States.</p>
          <Link to="/shop" className="mt-5 inline-flex h-12 px-7 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm items-center">
            Shop ATVs
          </Link>
        </div>
      </article>

      <section className="container py-16 border-t border-border">
        <h3 className="font-display text-3xl tracking-wider mb-8">More from the journal</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group glass rounded-2xl overflow-hidden hover-lift">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-xs text-foreground/70">{p.date}</div>
                <div className="mt-1 font-display text-lg tracking-wider">{p.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
