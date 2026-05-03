import { useState } from "react";
import Seo from "@/components/Seo";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  message: z.string().trim().min(10).max(1000),
});

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    if (data._honey) return;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return toast.error("Please complete all fields correctly");
    }
    setLoading(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@atlasoffroadatv.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          _subject: "New Contact — Atlas Offroad ATV",
          _captcha: "false",
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent. We'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Could not send. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact Atlas Offroad ATV"
        description="Get in touch with Atlas Offroad ATV. Book a test ride, ask about financing, or visit our flagship showroom in Austin, TX."
        path="/contact"
      />

      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Get in touch</div>
          <h1 className="font-display text-6xl md:text-7xl tracking-wider mt-2">Let's talk trails.</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <form onSubmit={onSubmit} className="glass rounded-2xl p-8 space-y-4">
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />
            {[
              { name: "name", label: "Name", type: "text", max: 80 },
              { name: "email", label: "Email", type: "email", max: 255 },
              { name: "phone", label: "Phone", type: "tel", max: 30 },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  maxLength={f.max}
                  required
                  className="mt-2 w-full h-12 rounded-md bg-background border border-border px-4 text-sm focus:border-gold/40 outline-none"
                />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={1000}
                className="mt-2 w-full rounded-md bg-background border border-border px-4 py-3 text-sm focus:border-gold/40 outline-none"
              />
            </div>
            <button
              disabled={loading}
              className="w-full h-12 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> {loading ? "Sending…" : "Send message"}
            </button>
          </form>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 flex gap-4 items-start">
              <Mail className="h-6 w-6 text-gold flex-shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-foreground/70">Email</div>
                <a href="mailto:info@atlasoffroadatv.com" className="text-lg hover:text-gradient">info@atlasoffroadatv.com</a>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 flex gap-4 items-start">
              <Phone className="h-6 w-6 text-gold flex-shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-foreground/70">Phone</div>
                <a href="tel:+15125550188" className="text-lg hover:text-gradient">+1 (512) 555-0188</a>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 flex gap-4 items-start">
              <MapPin className="h-6 w-6 text-gold flex-shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-foreground/70">Flagship showroom</div>
                <div className="text-lg">1200 Trailhead Blvd, Austin, TX 78701</div>
              </div>
            </div>
            <div className="glass rounded-2xl p-2 overflow-hidden">
              <iframe
                title="Atlas Offroad showroom map"
                src="https://www.google.com/maps?q=Austin%2C+TX&output=embed"
                loading="lazy"
                className="w-full h-72 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
