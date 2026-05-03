import { Helmet } from "react-helmet-async";

const SITE = "https://atlasoffroadatv.com";
const DEFAULT_OG = `${SITE}/og-image.jpg`;

type Props = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: object | object[];
  noindex?: boolean;
};

export default function Seo({ title, description, path = "", image = DEFAULT_OG, type = "website", jsonLd, noindex }: Props) {
  const url = `${SITE}${path}`;
  const fullTitle = title.includes("Atlas") ? title : `${title} | Atlas Offroad ATV`;
  const lds = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Atlas Offroad ATV" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {lds.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
}

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Atlas Offroad ATV",
  url: SITE,
  logo: `${SITE}/logo.png`,
  email: "info@atlasoffroadatv.com",
  description: "Premium ATV and offroad vehicle dealership. Sport quads, utility ATVs, side-by-sides, and youth models.",
  sameAs: [
    "https://instagram.com/atlasoffroadatv",
    "https://facebook.com/atlasoffroadatv",
    "https://youtube.com/@atlasoffroadatv",
  ],
};
