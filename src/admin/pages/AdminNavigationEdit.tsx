import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { navigationApi } from "@/api/http";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminNavigationEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "", url: "", group: "header" as "header" | "footer" | "mobile", is_active: true, parent_id: "" });

  useEffect(() => {
    if (!isNew) {
      navigationApi.get(Number(id)).then(({ data }) => {
        if (data) setForm({ label: data.label, url: data.url, group: data.group, is_active: data.is_active, parent_id: data.parent_id?.toString() ?? "" });
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, parent_id: form.parent_id ? Number(form.parent_id) : null };
    const fn = isNew ? navigationApi.create(payload) : navigationApi.update(Number(id), payload);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/navigation");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новый пункт" : "Редактировать пункт"} backUrl="/admin/navigation" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4">
        <div className="space-y-2"><Label>Метка</Label><Input value={form.label} onChange={e => u("label", e.target.value)} required /></div>
        <div className="space-y-2"><Label>URL</Label><Input value={form.url} onChange={e => u("url", e.target.value)} required /></div>
        <div className="space-y-2">
          <Label>Группа</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.group} onChange={e => u("group", e.target.value)}>
            <option value="header">Header</option>
            <option value="footer">Footer</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={v => u("is_active", v)} /><Label>Активен</Label></div>
      </div>
    </AdminFormShell>
  );
}
