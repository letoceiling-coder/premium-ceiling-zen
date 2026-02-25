import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sectionsApi, pagesApi } from "@/api/http";
import type { Page, SectionType } from "@/api/types";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const sectionTypes: SectionType[] = [
  "hero", "about", "catalog_grid", "cta", "testimonials", "faq",
  "advantages", "brands", "slider", "text_block", "custom",
];

export default function AdminSectionEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [form, setForm] = useState({
    type: "text_block" as SectionType,
    title: "", subtitle: "", description: "",
    page_id: "", order: 0, is_active: true,
    content_json: "{}",
  });

  useEffect(() => {
    pagesApi.listAll().then(({ data }) => { if (data) setPages(data as Page[]); });
    if (!isNew) {
      sectionsApi.get(Number(id)).then(({ data }) => {
        if (data) setForm({
          type: data.type, title: data.title, subtitle: data.subtitle ?? "",
          description: data.description ?? "", page_id: String(data.page_id),
          order: data.order, is_active: data.is_active,
          content_json: JSON.stringify(data.content_json, null, 2),
        });
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let parsed: any;
    try { parsed = JSON.parse(form.content_json); } catch { setError("Невалидный JSON"); setLoading(false); return; }
    const payload = { ...form, page_id: Number(form.page_id), content_json: parsed };
    const fn = isNew ? sectionsApi.create(payload) : sectionsApi.update(Number(id), payload);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/sections");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новая секция" : "Редактировать секцию"} backUrl="/admin/sections" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Тип</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.type} onChange={e => u("type", e.target.value)}>
            {sectionTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Страница</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.page_id} onChange={e => u("page_id", e.target.value)}>
            <option value="">—</option>
            {pages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2"><Label>Заголовок</Label><Input value={form.title} onChange={e => u("title", e.target.value)} required /></div>
      <div className="space-y-2"><Label>Подзаголовок</Label><Input value={form.subtitle} onChange={e => u("subtitle", e.target.value)} /></div>
      <div className="space-y-2"><Label>Описание</Label><Textarea value={form.description} onChange={e => u("description", e.target.value)} rows={3} /></div>
      <div className="space-y-2"><Label>Content JSON</Label><Textarea value={form.content_json} onChange={e => u("content_json", e.target.value)} rows={8} className="font-mono text-xs" /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><Label>Порядок</Label><Input type="number" value={form.order} onChange={e => u("order", Number(e.target.value))} /></div>
        <div className="flex items-center gap-2 pt-7"><Switch checked={form.is_active} onCheckedChange={v => u("is_active", v)} /><Label>Активна</Label></div>
      </div>
    </AdminFormShell>
  );
}
