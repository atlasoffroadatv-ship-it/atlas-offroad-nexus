# Atlas Offroad ATV — Build Plan

## Note on framework
Lovable runs React + Vite. TanStack Router works here, but TanStack Start (the SSR variant) and Next.js are not supported in this environment. We'll ship a fast SPA with strong, crawlable SEO: per-route meta tags via `react-helmet-async`, JSON-LD structured data, sitemap.xml, robots.txt, semantic HTML, OG/Twitter cards, and optimized Core Web Vitals. Modern Google indexes this well.

If true SSR becomes a hard requirement later, the codebase will be portable to Next.js.

## Design system
- Dark luxury theme: near-black base (#0A0A0B), charcoal surfaces, brushed metal textures
- Accents: gold (#D4A24A) + ember orange (#E8631A) gradient
- Typography: Display serif/condensed sans for headlines (e.g. Inter Tight + Bebas-style), Inter for body
- Glassmorphism cards, soft shadows, subtle grain texture overlay
- Framer Motion for entrance, parallax, hover depth, 3D tilt on product cards
- Sticky transparent nav that solidifies on scroll
- Mobile-first, fully responsive

## Pages & routes

1. **Home** `/` — Full-bleed hero (looping ATV video bg + gradient overlay), animated headline, dual CTAs (Shop / Book a Test Ride), featured ATVs carousel (from DB), brand trust strip, "Why Atlas" feature grid with icons, testimonials carousel (randomuser.me avatars), newsletter band, footer.
2. **Shop** `/shop` — Filter sidebar (price range, type: Sport/Utility/Youth/Side-by-Side, brand, availability), sort, responsive grid, infinite scroll, skeleton loaders.
3. **Product detail** `/shop/:slug` — Image gallery with thumbnails + zoom, specs table, price, qty + Add to Cart, share, related ATVs, reviews list (avatars from randomuser.me), JSON-LD Product schema with aggregateRating.
4. **About** `/about` — Brand story, mission/vision, team, parallax imagery, SEO copy.
5. **Contact** `/contact` — Validated form (zod) posting to formsubmit.co/info@atlasoffroadatv.com, honeypot spam protection, Google Maps embed, contact info cards, WhatsApp CTA.
6. **Cart** `/cart` — Line items, qty controls, remove, subtotal, persisted in localStorage + synced to DB when logged in.
7. **Checkout** `/checkout` — Customer info form, order summary, submit creates `orders` row in DB AND emails via formsubmit.co. Confirmation page `/checkout/success`.
8. **Admin** `/admin` — Email/password auth (Lovable Cloud). Dashboard (counts: products, orders, revenue), Products CRUD with image upload to Cloud Storage, availability toggle, featured toggle, Orders list with status updates, settings.
9. **404** styled to brand.

## Backend (Lovable Cloud)
Tables:
- `products` (id, slug, name, brand, type, price, description, specs jsonb, images text[], stock, is_available, is_featured, created_at)
- `reviews` (id, product_id, author_name, avatar_url, rating, body, created_at)
- `orders` (id, customer_name, email, phone, address, items jsonb, total, status, created_at)
- `user_roles` (id, user_id, role) — `admin` enum + `has_role()` security definer function
- `newsletter_subscribers` (email, created_at)

Storage bucket: `product-images` (public read, admin-only write).

RLS:
- Products/reviews: public read; admin write
- Orders: public insert; admin read/update
- user_roles: admin read/write only

## SEO infrastructure
- `react-helmet-async` per page: title, description, canonical, OG, Twitter card
- JSON-LD: Organization (root), Product (PDP), Review/AggregateRating, BreadcrumbList, LocalBusiness
- `public/robots.txt` allowing all + sitemap reference
- Build-time `sitemap.xml` generator script that includes static routes + DB product slugs (run on deploy; also a runtime edge function fallback `/sitemap.xml`)
- Semantic HTML, alt text everywhere, descriptive link text
- Lazy-loaded images (`loading="lazy"` + responsive srcset), code-split routes, font preconnect

## Extras
- Floating WhatsApp button (configurable phone)
- Newsletter signup → DB + formsubmit.co
- Social links in footer (IG, FB, YouTube, TikTok placeholders)
- Smooth-scroll anchors

## Security
- Roles in `user_roles` table with `has_role()` definer function (never on profiles)
- Zod validation on every form, length caps, email/phone regex
- Form honeypot + formsubmit `_captcha` enabled
- Admin routes guarded client + RLS server-side

## Tech
React + Vite, TanStack Router (or React Router — will use React Router since it's already wired), TanStack Query, Tailwind, shadcn/ui, Framer Motion, react-helmet-async, zod, Lovable Cloud (Supabase).

## Build order
1. Design tokens, fonts, layout shell, nav, footer, SEO helper
2. Lovable Cloud schema + RLS + storage + admin auth + roles
3. Home page
4. Shop + Product detail + cart (localStorage)
5. Checkout (DB + formsubmit) + success
6. About + Contact
7. Admin: auth, products CRUD, orders, featured toggle
8. SEO: JSON-LD, sitemap, robots, OG images
9. Polish: animations, WhatsApp, newsletter, QA pass

Catalog starts empty — you'll add ATVs from `/admin` after first admin signup.