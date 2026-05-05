export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  img: string;
  readTime: string;
  author: string;
  content: string[]; // array of HTML/markdown-lite paragraphs (we render as paragraphs/headings)
}

const IMG = {
  sport: "https://cdn-fastly.atv.com/media/2022/10/24/8847148/sport-atv-of-the-year-atv-com-awards.jpg?size=1200x628",
  utility: "https://powersportsbusiness.com/wp-content/uploads/2012/07/912ATV-KYMCO-MXU-700.jpg",
  sxs: "https://can-am.brp.com/content/dam/global/en/can-am-off-road/my26/studio/na/ssv/defender/ORV-SSV-MY26-Defender-Base-HD7-Compass-Green-0006XTE00-Studio-34FR-NA.png",
  youth: "https://cdpcdn.dx1app.com/products-private/prod/9d91fa61-ab9c-4d46-adce-236fc0cb1154/6c6e1d8b-2105-4698-8264-aaee01435c22/00000000-0000-0000-0000-000000000000/4a2617dd-f8d0-45ac-b454-add201107d6d/2000000001.jpg",
  safety: "https://www.yamaha-motor.eu/content/dam/yamaha-motor-europe-migrated/safety/atv-rider-training/atv-riders-safety-awareness-kv.jpg",
  lineup: "https://motorsportsnewswire.com/wp-content/uploads/2025/09/2026-Yamaha-ATV-lineup-678.jpeg",
  action: "https://hhvehicleservices.co.uk/wp-content/uploads/2020/02/2026-Yamaha-YFM700FWAD-X-EU-Moss_Grey___Tactical_Black-Action-007-03.jpeg",
  trail: "https://cdn.dealerspike.com/imglib/v1/640x480/imglib/assets/inventory/31/18/3118C4A5-B11E-4820-8B21-8CC21B2BC54D.jpg",
};

export const POSTS: BlogPost[] = [
  {
    slug: "best-atvs-for-beginners-2026",
    title: "The 7 Best Beginner ATVs of 2026",
    excerpt: "From sport quads to entry-level utility, our team ranks the most rider-friendly machines for first-time buyers across the United States.",
    date: "May 1, 2026",
    tag: "Buying guide",
    img: IMG.lineup,
    readTime: "8 min read",
    author: "Atlas Editorial",
    content: [
      "## Why beginner-friendly matters",
      "Choosing your first ATV can shape your relationship with the sport for years. The right machine builds confidence; the wrong one builds bad habits — or worse, ends a hobby before it starts. We tested 23 machines across desert, forest, and farm terrain to find the seven that strike the perfect balance of power, predictability, and price.",
      "## The shortlist",
      "1. **Yamaha Kodiak 450** — bulletproof reliability with a smooth Ultramatic CVT.\n2. **Honda Rancher 420** — the textbook beginner ATV: predictable, light, indestructible.\n3. **Polaris Sportsman 450 H.O.** — independent rear suspension at an entry price.\n4. **Can-Am Outlander 450** — the sportiest of the beginner class with class-leading power.\n5. **Suzuki KingQuad 400** — smooth, mid-sized, and famously low-maintenance.\n6. **Kawasaki Brute Force 300** — narrow chassis perfect for smaller riders.\n7. **CFMOTO CForce 400** — value pick with surprising fit and finish.",
      "## What to actually look for",
      "Power isn't everything. For your first 500 miles, look for predictable throttle response, a low-and-wide stance, and visible service points. Anything over 500cc as a first machine is asking to be over your head.",
      "## Our pick",
      "If we had to choose one: the Yamaha Kodiak 450. It is the ATV equivalent of a Toyota Camry — never the most exciting machine in the room, but the one still running ten years from now.",
    ],
  },
  {
    slug: "moab-trail-guide",
    title: "Moab to Sedona: The Ultimate ATV Trail Guide",
    excerpt: "Mile-by-mile breakdown of the most cinematic offroad routes in the American Southwest, plus permits and seasonal tips.",
    date: "April 22, 2026",
    tag: "Trail guides",
    img: "https://cardosystems.com/cdn/shop/articles/ATV-vs-Quad-vs-4-Wheeler.jpg",
    readTime: "12 min read",
    author: "Trail Crew",
    content: [
      "## The corridor that changed offroading",
      "Stretching 380 miles between two of the most iconic offroad towns in America, the Moab-to-Sedona corridor offers the most concentrated stretch of legendary trails on the continent. Plan a week. You'll wish you booked two.",
      "## Section 1 — Moab, Utah",
      "Start with **Hells Revenge** for slickrock confidence-building. Graduate to **Poison Spider Mesa** for vertical edges, then close the Moab leg with **Top of the World** — a 9,000-ft summit you can drive to.",
      "## Section 2 — Monument Valley crossing",
      "Permits required through the Navajo Nation. The 17-mile loop is paid by the day and worth every dollar. Sunrise runs only — afternoon winds are brutal.",
      "## Section 3 — Sedona red rock",
      "**Broken Arrow** is the postcard. **Soldier Pass** is the technical test. **Schnebly Hill Road** is the easy cruiser. Run all three in one day if you must, but you'll regret rushing it.",
      "## When to go",
      "Mid-March through mid-May, then again late September through early November. Summer is survivable but punishing; winter trails ice over without warning.",
      "## Permits & paperwork",
      "Carry registration, proof of insurance, and a printed BLM map. Cell signal disappears for 40+ mile stretches.",
    ],
  },
  {
    slug: "sport-vs-utility-atv",
    title: "Sport vs Utility ATV — Which One Is Right for You?",
    excerpt: "We break down powerband, geometry, and use-cases so you pick the right machine the first time.",
    date: "April 10, 2026",
    tag: "Education",
    img: IMG.sport,
    readTime: "6 min read",
    author: "Atlas Editorial",
    content: [
      "## Two philosophies, one chassis layout",
      "Sport and utility ATVs share a four-wheeled silhouette and almost nothing else. Sport quads are scalpels: light, narrow, peaky, and built to be thrown around. Utility ATVs are mules: long, wide, torquey, and built to haul.",
      "## Powerband",
      "Sport ATVs make peak power up high, often above 8,000 RPM. Utility machines deliver torque from idle, frequently through a CVT or belt-driven transmission. If you've ridden a 2-stroke dirt bike, sport quad behavior will feel familiar. If you've driven a tractor, utility behavior will.",
      "## Geometry",
      "Sport: short wheelbase, low seat, manual clutch, no rack. Utility: long wheelbase, high seat, automatic, racks front and rear, towing point.",
      "## Pick sport if you…",
      "race, dune, jump, or want a weekend toy you can flat-track in your backyard.",
      "## Pick utility if you…",
      "haul firewood, plow snow, run trap lines, hunt, or take passengers.",
      "## The third option",
      "Side-by-sides increasingly absorb the utility market — they offer cabin protection, seatbelts, and a true second seat. If you have any doubt, drive a side-by-side before you decide.",
    ],
  },
  {
    slug: "winter-atv-maintenance",
    title: "Winter ATV Maintenance Checklist",
    excerpt: "Battery, fluids, tire pressure, storage — a 12-point checklist to keep your Atlas trail-ready year round.",
    date: "March 28, 2026",
    tag: "Maintenance",
    img: IMG.action,
    readTime: "5 min read",
    author: "Service Team",
    content: [
      "## Why winter prep matters",
      "More ATVs die in storage than on the trail. A 12-point off-season check now will save you a $400 service bill in April.",
      "## The checklist",
      "1. **Stabilize fuel** — add a fuel stabilizer and run the engine for 5 minutes.\n2. **Fog the cylinder** — pull the spark plug, spray fogging oil, crank twice, reinstall.\n3. **Battery on a tender** — a smart trickle charger, not a 'maintainer' from 1995.\n4. **Tire pressure** — drop to 5 PSI to prevent flat-spotting.\n5. **Lube cables** — throttle, brake, and shifter cables.\n6. **Grease zerks** — every fitting, every season.\n7. **Coolant test** — must protect to at least -30°F.\n8. **Air filter** — pull, inspect, replace if borderline.\n9. **Differential fluid** — check level and color.\n10. **Brake fluid** — flush every two years; check yearly.\n11. **Cover, don't tarp** — a breathable cover prevents condensation rust.\n12. **Elevate** — get the tires off cold concrete with 2x10s.",
      "## Spring wake-up",
      "Pull the cover, charge the battery overnight, check tire pressure, change the oil if you didn't in fall, and ride within the first 50 miles to seat everything before a full trail day.",
    ],
  },
  {
    slug: "side-by-side-family",
    title: "Why Families Are Choosing Side-by-Sides",
    excerpt: "Cabin protection, seatbelts, and storage make modern UTVs the family trail vehicle of choice.",
    date: "March 14, 2026",
    tag: "Lifestyle",
    img: IMG.sxs,
    readTime: "7 min read",
    author: "Atlas Editorial",
    content: [
      "## The family-vehicle shift",
      "Five years ago, families bought two ATVs. Today they buy one side-by-side. The numbers don't lie: side-by-side sales have outpaced traditional ATVs every year since 2021.",
      "## What changed",
      "Modern UTVs aren't the agricultural workhorses of the 90s. They have automotive-grade roll cages, seatbelts, doors, and cabin sound systems. Some have heat. Some have AC. Several have suspensions that out-perform sport ATVs.",
      "## Real safety",
      "ATV training organizations now openly recommend side-by-sides for families with children under 16. The cabin protection is genuinely transformative for risk profile.",
      "## Storage and utility",
      "A modern side-by-side can carry four people, a cooler, fishing gear, and a tent — and still tow a small trailer. ATVs can do none of that.",
      "## The catch",
      "Side-by-sides are wider. Some single-track ATV trails are simply off-limits. Check your local trail system before buying.",
    ],
  },
  {
    slug: "atv-financing-101",
    title: "ATV Financing 101 — A Buyer's Playbook",
    excerpt: "Credit tiers, APR ranges, and how to negotiate the lowest monthly payment on your dream ATV.",
    date: "Feb 26, 2026",
    tag: "Financing",
    img: IMG.utility,
    readTime: "9 min read",
    author: "Atlas Finance",
    content: [
      "## Know your tier before you shop",
      "Lenders bucket ATV loans into tiers: A+ (760+), A (720-759), B (680-719), C (640-679), D (below 640). Each tier shifts your APR by 1.5-3 points. Pull your score before you walk into any dealership.",
      "## Typical APR ranges (2026)",
      "- A+ tier: 5.99% – 7.49%\n- A tier: 7.49% – 9.99%\n- B tier: 9.99% – 13.99%\n- C tier: 13.99% – 18.99%\n- D tier: 18.99%+ (consider improving credit before buying)",
      "## Term length traps",
      "84-month ATV loans look attractive but you'll be upside-down within 18 months. We recommend 36-60 month terms unless you have a clear plan to pay off early.",
      "## Down payment math",
      "20% down is the sweet spot. Less than 10% almost always puts you underwater. More than 30% provides diminishing returns vs putting that capital to work elsewhere.",
      "## Negotiate the rate, not the price",
      "Most dealers mark up the lender's offered rate by 1-2 points as 'dealer reserve'. Always ask: 'Is this the buy rate or the sell rate?' Then ask them to match the buy rate.",
      "## Pre-qualified vs pre-approved",
      "Pre-qualified is a soft pull and means almost nothing. Pre-approved is a hard pull with a specific lender and a specific amount. Get pre-approved before you negotiate.",
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
