import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { servicesApi } from "@/api/http";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminServiceEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", short_description: "", price: "", is_active: true });

  useEffect(() => {
    if (!isNew) {
      servicesApi.get(Number(id)).then(({ data }) => {
        if (data) setForm({
          title: data.title, slug: data.slug,
          description: data.description ?? "", short_description: data.short_description ?? "",
          price: data.price ?? "", is_active: data.is_active,
        });
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fn = isNew ? servicesApi.create(form) : servicesApi.update(Number(id), form);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/services");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новая услуга" : "Редактировать услугу"} backUrl="/admin/services" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4">
        <div className="space-y-2"><Label>Название</Label><Input value={form.title} onChange={e => u("title", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={e => u("slug", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Краткое описание</Label><Textarea value={form.short_description} onChange={e => u("short_description", e.target.value)} rows={2} /></div>
        <div className="space-y-2"><Label>Описание</Label><Textarea value={form.description} onChange={e => u("description", e.target.value)} rows={5} /></div>
        <div className="space-y-2"><Label>Цена</Label><Input value={form.price} onChange={e => u("price", e.target.value)} /></div>
        <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={v => u("is_active", v)} /><Label>Активна</Label></div>
      </div>
    </AdminFormShell>
  );
}
