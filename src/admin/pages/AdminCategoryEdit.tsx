import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoriesApi } from "@/api/http";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Category } from "@/api/types";

export default function AdminCategoryEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allCats, setAllCats] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", slug: "", parent_id: "", description: "", is_active: true });

  useEffect(() => {
    categoriesApi.listAll().then(({ data }) => { if (data) setAllCats(data as Category[]); });
    if (!isNew) {
      categoriesApi.get(Number(id)).then(({ data }) => {
        if (data) setForm({ name: data.name, slug: data.slug, parent_id: data.parent_id?.toString() ?? "", description: data.description ?? "", is_active: data.is_active });
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, parent_id: form.parent_id ? Number(form.parent_id) : null };
    const fn = isNew ? categoriesApi.create(payload) : categoriesApi.update(Number(id), payload);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/categories");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новая категория" : "Редактировать категорию"} backUrl="/admin/categories" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4">
        <div className="space-y-2"><Label>Название</Label><Input value={form.name} onChange={e => u("name", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={e => u("slug", e.target.value)} required /></div>
        <div className="space-y-2">
          <Label>Родительская категория</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.parent_id} onChange={e => u("parent_id", e.target.value)}>
            <option value="">— Нет —</option>
            {allCats.filter(c => c.id !== Number(id)).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="space-y-2"><Label>Описание</Label><Textarea value={form.description} onChange={e => u("description", e.target.value)} rows={3} /></div>
        <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={v => u("is_active", v)} /><Label>Активна</Label></div>
      </div>
    </AdminFormShell>
  );
}
