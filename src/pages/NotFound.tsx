import Seo from "@/components/Seo";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="404" path="/404" noindex />
      <div className="container py-32 text-center">
        <div className="font-display text-[10rem] leading-none text-gradient">404</div>
        <h1 className="font-display text-4xl tracking-wider mt-4">Off the trail.</h1>
        <p className="mt-3 text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="mt-8 inline-block h-12 px-8 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm">Back to base</Link>
      </div>
    </>
  );
}
