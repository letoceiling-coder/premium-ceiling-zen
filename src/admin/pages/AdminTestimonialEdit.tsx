import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { testimonialsApi } from "@/api/http";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminTestimonialEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", position: "", text: "", rating: 5, is_active: true });

  useEffect(() => {
    if (!isNew) {
      testimonialsApi.get(Number(id)).then(({ data }) => {
        if (data) setForm({ name: data.name, position: data.position ?? "", text: data.text, rating: data.rating, is_active: data.is_active });
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fn = isNew ? testimonialsApi.create(form) : testimonialsApi.update(Number(id), form);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/testimonials");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новый отзыв" : "Редактировать отзыв"} backUrl="/admin/testimonials" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4">
        <div className="space-y-2"><Label>Имя</Label><Input value={form.name} onChange={e => u("name", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Должность</Label><Input value={form.position} onChange={e => u("position", e.target.value)} /></div>
        <div className="space-y-2"><Label>Текст</Label><Textarea value={form.text} onChange={e => u("text", e.target.value)} rows={4} required /></div>
        <div className="space-y-2"><Label>Рейтинг (1–5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={e => u("rating", Number(e.target.value))} /></div>
        <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={v => u("is_active", v)} /><Label>Активен</Label></div>
      </div>
    </AdminFormShell>
  );
}
