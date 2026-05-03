import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, ShoppingBag, DollarSign, Star } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [p, o, f] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("total"),
        supabase.from("products").select("id", { count: "exact", head: true }).eq("is_featured", true),
      ]);
      const total = (o.data || []).reduce((s, r: any) => s + Number(r.total), 0);
      return { products: p.count || 0, orders: (o.data || []).length, revenue: total, featured: f.count || 0 };
    },
  });

  const cards = [
    { I: Package, label: "Products", value: stats?.products ?? "—" },
    { I: ShoppingBag, label: "Orders", value: stats?.orders ?? "—" },
    { I: DollarSign, label: "Order value", value: stats ? `$${stats.revenue.toLocaleString()}` : "—" },
    { I: Star, label: "Featured", value: stats?.featured ?? "—" },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wider mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="glass rounded-2xl p-6">
            <c.I className="h-6 w-6 text-gold" />
            <div className="mt-4 text-3xl font-semibold">{c.value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 glass rounded-2xl p-6 text-sm text-muted-foreground">
        <p>Welcome to the Atlas admin panel. Manage your ATV catalog from <strong>Products</strong> and review purchase inquiries in <strong>Orders</strong>.</p>
      </div>
    </div>
  );
}
