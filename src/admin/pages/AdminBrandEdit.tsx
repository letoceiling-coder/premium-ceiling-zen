import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { brandsApi } from "@/api/http";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminBrandEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", website: "", is_active: true });

  useEffect(() => {
    if (!isNew) {
      brandsApi.get(Number(id)).then(({ data }) => {
        if (data) setForm({ name: data.name, slug: data.slug, description: data.description ?? "", website: data.website ?? "", is_active: data.is_active });
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fn = isNew ? brandsApi.create(form) : brandsApi.update(Number(id), form);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/brands");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новый бренд" : "Редактировать бренд"} backUrl="/admin/brands" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4">
        <div className="space-y-2"><Label>Название</Label><Input value={form.name} onChange={e => u("name", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={e => u("slug", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Сайт</Label><Input value={form.website} onChange={e => u("website", e.target.value)} /></div>
        <div className="space-y-2"><Label>Описание</Label><Textarea value={form.description} onChange={e => u("description", e.target.value)} rows={4} /></div>
        <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={v => u("is_active", v)} /><Label>Активен</Label></div>
      </div>
    </AdminFormShell>
  );
}
