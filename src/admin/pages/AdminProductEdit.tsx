import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productsApi, brandsApi, categoriesApi, toAbsoluteUrl } from "@/api/http";
import type { Brand, Category } from "@/api/types";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminProductEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    title: "", slug: "", description: "", short_description: "",
    price: "", old_price: "", sku: "",
    category_id: "", brand_id: "",
    is_published: false, is_featured: false,
    meta_title: "", meta_description: "",
  });

  useEffect(() => {
    brandsApi.all().then(({ data }) => { if (data) setBrands(data as Brand[]); });
    categoriesApi.listAll().then(({ data }) => { if (data) setCategories(data as Category[]); });
    if (!isNew) {
      productsApi.get(Number(id)).then(({ data }) => {
        if (data) {
          setForm({
            title: data.title, slug: data.slug,
            description: data.description ?? "", short_description: data.short_description ?? "",
            price: data.price?.toString() ?? "", old_price: data.old_price?.toString() ?? "",
            sku: data.sku ?? "",
            category_id: data.category_id?.toString() ?? "",
            brand_id: data.brand_id?.toString() ?? "",
            is_published: data.is_published, is_featured: data.is_featured,
            meta_title: data.meta_title ?? "", meta_description: data.meta_description ?? "",
          });
        }
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = {
      ...form,
      price: form.price ? Number(form.price) : undefined,
      old_price: form.old_price ? Number(form.old_price) : undefined,
      category_id: form.category_id ? Number(form.category_id) : undefined,
      brand_id: form.brand_id ? Number(form.brand_id) : undefined,
    };
    const fn = isNew ? productsApi.create(payload) : productsApi.update(Number(id), payload);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/products");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новый товар" : "Редактировать товар"} backUrl="/admin/products" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Название</Label>
          <Input value={form.title} onChange={e => u("title", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={e => u("slug", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Цена</Label>
          <Input type="number" value={form.price} onChange={e => u("price", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Старая цена</Label>
          <Input type="number" value={form.old_price} onChange={e => u("old_price", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Артикул</Label>
          <Input value={form.sku} onChange={e => u("sku", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Категория</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.category_id} onChange={e => u("category_id", e.target.value)}>
            <option value="">—</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Бренд</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.brand_id} onChange={e => u("brand_id", e.target.value)}>
            <option value="">—</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Краткое описание</Label>
        <Textarea value={form.short_description} onChange={e => u("short_description", e.target.value)} rows={2} />
      </div>
      <div className="space-y-2">
        <Label>Описание</Label>
        <Textarea value={form.description} onChange={e => u("description", e.target.value)} rows={5} />
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Switch checked={form.is_published} onCheckedChange={v => u("is_published", v)} />
          <Label>Опубликовано</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.is_featured} onCheckedChange={v => u("is_featured", v)} />
          <Label>Избранное</Label>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input value={form.meta_title} onChange={e => u("meta_title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Input value={form.meta_description} onChange={e => u("meta_description", e.target.value)} />
        </div>
      </div>
    </AdminFormShell>
  );
}
