import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogApi } from "@/api/http";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminBlogEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "", is_published: false,
    published_at: "", meta_title: "", meta_description: "",
  });

  useEffect(() => {
    if (!isNew) {
      blogApi.get(Number(id)).then(({ data }) => {
        if (data) setForm({
          title: data.title, slug: data.slug, content: data.content ?? "",
          excerpt: data.excerpt ?? "", is_published: data.is_published,
          published_at: data.published_at ?? "", meta_title: data.meta_title ?? "",
          meta_description: data.meta_description ?? "",
        });
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fn = isNew ? blogApi.create(form) : blogApi.update(Number(id), form);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/blog");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новая статья" : "Редактировать статью"} backUrl="/admin/blog" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4">
        <div className="space-y-2"><Label>Заголовок</Label><Input value={form.title} onChange={e => u("title", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={e => u("slug", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={e => u("excerpt", e.target.value)} rows={2} /></div>
        <div className="space-y-2"><Label>Контент</Label><Textarea value={form.content} onChange={e => u("content", e.target.value)} rows={10} /></div>
        <div className="space-y-2"><Label>Дата публикации</Label><Input type="date" value={form.published_at} onChange={e => u("published_at", e.target.value)} /></div>
        <div className="flex items-center gap-2"><Switch checked={form.is_published} onCheckedChange={v => u("is_published", v)} /><Label>Опубликовано</Label></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2"><Label>Meta Title</Label><Input value={form.meta_title} onChange={e => u("meta_title", e.target.value)} /></div>
          <div className="space-y-2"><Label>Meta Description</Label><Input value={form.meta_description} onChange={e => u("meta_description", e.target.value)} /></div>
        </div>
      </div>
    </AdminFormShell>
  );
}
