import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pagesApi } from "@/api/http";
import type { Page, Section } from "@/api/types";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminPageEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_published: false,
    template_type: "default",
  });

  useEffect(() => {
    if (!isNew) {
      pagesApi.get(Number(id)).then(({ data }) => {
        if (data) {
          setForm({
            title: data.title,
            slug: data.slug,
            meta_title: data.meta_title ?? "",
            meta_description: data.meta_description ?? "",
            meta_keywords: data.meta_keywords ?? "",
            is_published: data.is_published,
            template_type: data.template_type,
          });
        }
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fn = isNew ? pagesApi.create(form) : pagesApi.update(Number(id), form);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/pages");
  };

  const update = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новая страница" : "Редактировать страницу"} backUrl="/admin/pages" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label>Заголовок</Label>
          <Input value={form.title} onChange={e => update("title", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={e => update("slug", e.target.value)} required />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.is_published} onCheckedChange={v => update("is_published", v)} />
          <Label>Опубликовано</Label>
        </div>
        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input value={form.meta_title} onChange={e => update("meta_title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Textarea value={form.meta_description} onChange={e => update("meta_description", e.target.value)} rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Meta Keywords</Label>
          <Input value={form.meta_keywords} onChange={e => update("meta_keywords", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Template</Label>
          <Input value={form.template_type} onChange={e => update("template_type", e.target.value)} />
        </div>
      </div>
    </AdminFormShell>
  );
}
