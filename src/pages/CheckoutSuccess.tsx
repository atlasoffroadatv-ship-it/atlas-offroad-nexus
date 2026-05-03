import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <>
      <Seo title="Order received" description="Thank you for your order." path="/checkout/success" noindex />
      <section className="container py-32 max-w-2xl text-center">
        <CheckCircle2 className="h-16 w-16 text-gold mx-auto" />
        <h1 className="font-display text-5xl md:text-6xl tracking-wider mt-6">Welcome to the trail.</h1>
        <p className="mt-4 text-muted-foreground">
          Your order has been received. An Atlas specialist will reach out within 24 hours to confirm details and arrange delivery.
        </p>
        <Link to="/shop" className="mt-10 inline-block h-12 px-8 rounded-full bg-gradient-premium text-primary-foreground font-semibold uppercase tracking-widest text-sm">
          Keep exploring
        </Link>
      </section>
    </>
  );
}
