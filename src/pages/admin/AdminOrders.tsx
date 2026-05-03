import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Status = Database["public"]["Enums"]["order_status"];
const STATUSES: Status[] = ["pending", "contacted", "completed", "cancelled"];

export default function AdminOrders() {
  const qc = useQueryClient();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wider mb-8">Orders</h1>
      {isLoading ? <div className="text-muted-foreground">Loading…</div> : orders.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-muted-foreground">No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-display text-xl tracking-wider">{o.customer_name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{new Date(o.created_at).toLocaleString()}</div>
                  <div className="text-sm mt-2">{o.email} · {o.phone}</div>
                  <div className="text-sm text-muted-foreground">{o.address}</div>
                  {o.notes && <div className="text-sm mt-2 italic">"{o.notes}"</div>}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-gradient">${Number(o.total).toLocaleString()}</div>
                  <select value={o.status} onChange={(e) => update.mutate({ id: o.id, status: e.target.value as Status })} className="mt-2 h-9 rounded-md bg-background/40 border border-white/10 px-3 text-xs">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 border-t border-white/5 pt-4 text-sm">
                {(o.items as any[]).map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{it.qty}× {it.name}</span>
                    <span className="text-muted-foreground">${(it.price * it.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
