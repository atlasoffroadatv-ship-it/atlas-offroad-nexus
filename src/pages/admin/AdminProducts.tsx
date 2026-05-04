import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Plus, Star, Trash2, Upload, X } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type AtvType = Database["public"]["Enums"]["atv_type"];
type Condition = Database["public"]["Enums"]["atv_condition"];
type ListingStatus = Database["public"]["Enums"]["listing_status"];

const TYPES: AtvType[] = ["sport", "utility", "side_by_side", "youth"];
const CONDITIONS: Condition[] = ["new", "used", "certified_pre_owned"];
const STATUSES: ListingStatus[] = ["available", "reserved", "sold"];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminProducts() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const toggle = useMutation({
    mutationFn: async ({ id, key, value }: { id: string; key: "is_featured" | "is_available"; value: boolean }) => {
      const patch = key === "is_featured" ? { is_featured: value } : { is_available: value };
      const { error } = await supabase.from("products").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin-products"] }); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl tracking-wider">Products</h1>
        <button onClick={() => setEditing({ name: "", brand: "", model: "", year: new Date().getFullYear(), type: "sport", condition: "new", listing_status: "available", price: 0, stock: 1, is_available: true, is_featured: false, images: [], specs: {} } as any)} className="h-11 px-5 rounded-full bg-gradient-premium text-primary-foreground text-sm uppercase tracking-widest font-semibold inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add ATV
        </button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : products.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-muted-foreground">No products yet. Add your first ATV.</div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="text-left p-4">Name</th><th className="text-left p-4">Brand</th><th className="text-left p-4">Type</th><th className="text-left p-4">Price</th><th className="p-4">Featured</th><th className="p-4">Available</th><th className="p-4"></th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-muted-foreground">{p.brand}</td>
                  <td className="p-4 text-muted-foreground">{p.type.replace("_", " ")}</td>
                  <td className="p-4">${Number(p.price).toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => toggle.mutate({ id: p.id, key: "is_featured", value: !p.is_featured })}>
                      <Star className={`h-5 w-5 mx-auto ${p.is_featured ? "fill-gold text-gold" : "text-muted-foreground"}`} />
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <input type="checkbox" checked={p.is_available} onChange={(e) => toggle.mutate({ id: p.id, key: "is_available", value: e.target.checked })} className="accent-[hsl(var(--gold))]" />
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => setEditing(p)} className="h-9 w-9 rounded-md glass flex items-center justify-center"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => confirm("Delete this product?") && del.mutate(p.id)} className="h-9 w-9 rounded-md glass flex items-center justify-center hover:border-destructive/50"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && <ProductEditor draft={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); qc.invalidateQueries({ queryKey: ["admin-products"] }); }} />}
    </div>
  );
}

function ProductEditor({ draft, onClose, onSaved }: { draft: Partial<Product>; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Partial<Product>>(draft);
  const [busy, setBusy] = useState(false);
  const [specsText, setSpecsText] = useState(() => Object.entries((draft.specs as any) || {}).map(([k, v]) => `${k}: ${v}`).join("\n"));

  const update = (k: keyof Product, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) { toast.error(error.message); continue; }
      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
      newUrls.push(pub.publicUrl);
    }
    update("images", [...(form.images || []), ...newUrls]);
    setBusy(false);
  };

  const save = async () => {
    if (!form.name || !form.brand) return toast.error("Name and brand are required");
    setBusy(true);
    try {
      const specs = Object.fromEntries(specsText.split("\n").map((l) => l.split(":").map((s) => s.trim())).filter(([k, v]) => k && v));
      const slug = form.slug || slugify(form.name!);
      const payload = {
        name: form.name!,
        slug,
        brand: form.brand!,
        model: form.model || null,
        year: form.year ? Number(form.year) : null,
        type: (form.type || "sport") as AtvType,
        condition: (form.condition || "new") as Condition,
        listing_status: (form.listing_status || "available") as ListingStatus,
        mileage: form.mileage != null && form.mileage !== ("" as any) ? Number(form.mileage) : null,
        engine_size: form.engine_size || null,
        transmission: form.transmission || null,
        color: form.color || null,
        price: Number(form.price) || 0,
        short_description: form.short_description || null,
        description: form.description || null,
        specs,
        images: form.images || [],
        stock: Number(form.stock) || 0,
        is_available: (form.listing_status || "available") === "available",
        is_featured: !!form.is_featured,
      };
      if (form.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
      toast.success("Saved");
      onSaved();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur p-4 flex items-start justify-center overflow-y-auto">
      <div className="bg-card rounded-2xl border border-border w-full max-w-3xl p-8 my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-3xl tracking-wider">{form.id ? "Edit ATV" : "New ATV"}</h2>
          <button onClick={onClose} className="h-9 w-9 rounded-full glass flex items-center justify-center"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { k: "name", l: "Title", t: "text" },
            { k: "brand", l: "Brand", t: "text" },
            { k: "model", l: "Model", t: "text" },
            { k: "year", l: "Year", t: "number" },
            { k: "price", l: "Price (USD)", t: "number" },
            { k: "mileage", l: "Mileage (mi)", t: "number" },
            { k: "engine_size", l: "Engine size", t: "text" },
            { k: "transmission", l: "Transmission", t: "text" },
            { k: "color", l: "Color", t: "text" },
            { k: "stock", l: "Stock", t: "number" },
          ].map(({ k, l, t }) => (
            <div key={k}>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">{l}</label>
              <input type={t} value={(form as any)[k] ?? ""} onChange={(e) => update(k as any, t === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value)} className="mt-1 w-full h-11 rounded-md bg-background border border-border px-3 text-sm" />
            </div>
          ))}
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Type</label>
            <select value={form.type as string} onChange={(e) => update("type", e.target.value)} className="mt-1 w-full h-11 rounded-md bg-background border border-border px-3 text-sm">
              {TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Condition</label>
            <select value={(form.condition as string) || "new"} onChange={(e) => update("condition", e.target.value)} className="mt-1 w-full h-11 rounded-md bg-background border border-border px-3 text-sm">
              {CONDITIONS.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Status</label>
            <select value={(form.listing_status as string) || "available"} onChange={(e) => update("listing_status", e.target.value)} className="mt-1 w-full h-11 rounded-md bg-background border border-border px-3 text-sm">
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Slug (optional)</label>
            <input value={form.slug ?? ""} onChange={(e) => update("slug", e.target.value)} placeholder="auto from name" className="mt-1 w-full h-11 rounded-md bg-background border border-border px-3 text-sm" />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Short description</label>
          <input value={form.short_description ?? ""} onChange={(e) => update("short_description", e.target.value)} maxLength={200} className="mt-1 w-full h-11 rounded-md bg-background border border-border px-3 text-sm" />
        </div>
        <div className="mt-4">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Description</label>
          <textarea value={form.description ?? ""} onChange={(e) => update("description", e.target.value)} rows={4} className="mt-1 w-full rounded-md bg-background border border-border px-3 py-2 text-sm" />
        </div>
        <div className="mt-4">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Specs (one per line, "key: value")</label>
          <textarea value={specsText} onChange={(e) => setSpecsText(e.target.value)} rows={5} placeholder="engine: 850cc V-twin&#10;horsepower: 92 hp&#10;weight: 720 lb" className="mt-1 w-full rounded-md bg-background border border-border px-3 py-2 text-sm font-mono" />
        </div>

        <div className="mt-4">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Images</label>
          <div className="mt-2 grid grid-cols-3 sm:grid-cols-5 gap-2">
            {(form.images || []).map((u, i) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden glass group">
                <img src={u} alt="" className="h-full w-full object-cover" />
                <button onClick={() => update("images", form.images!.filter((_, j) => j !== i))} className="absolute top-1 right-1 h-7 w-7 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <label className="aspect-square rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center text-xs text-muted-foreground cursor-pointer hover:border-gold/40">
              <Upload className="h-5 w-5 mb-1" /> Upload
              <input type="file" accept="image/*" multiple onChange={(e) => upload(e.target.files)} className="hidden" />
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-6">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_available} onChange={(e) => update("is_available", e.target.checked)} className="accent-[hsl(var(--gold))]" /> Available</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_featured} onChange={(e) => update("is_featured", e.target.checked)} className="accent-[hsl(var(--gold))]" /> Featured</label>
        </div>

        <div className="mt-8 flex gap-3 justify-end">
          <button onClick={onClose} className="h-11 px-5 rounded-full glass text-sm">Cancel</button>
          <button onClick={save} disabled={busy} className="h-11 px-6 rounded-full bg-gradient-premium text-primary-foreground text-sm uppercase tracking-widest font-semibold disabled:opacity-60">
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
