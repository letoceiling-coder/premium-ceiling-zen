import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faqApi } from "@/api/http";
import { AdminFormShell } from "../components/AdminFormShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminFaqEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", is_active: true });

  useEffect(() => {
    if (!isNew) {
      faqApi.get(Number(id)).then(({ data }) => {
        if (data) setForm({ question: data.question, answer: data.answer, is_active: data.is_active });
      });
    }
  }, [id, isNew]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fn = isNew ? faqApi.create(form) : faqApi.update(Number(id), form);
    const { error: err } = await fn;
    if (err) { setError(err.message); setLoading(false); return; }
    navigate("/admin/faq");
  };

  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminFormShell title={isNew ? "Новый FAQ" : "Редактировать FAQ"} backUrl="/admin/faq" loading={loading} onSubmit={onSubmit} error={error}>
      <div className="grid gap-4">
        <div className="space-y-2"><Label>Вопрос</Label><Input value={form.question} onChange={e => u("question", e.target.value)} required /></div>
        <div className="space-y-2"><Label>Ответ</Label><Textarea value={form.answer} onChange={e => u("answer", e.target.value)} rows={5} required /></div>
        <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={v => u("is_active", v)} /><Label>Активен</Label></div>
      </div>
    </AdminFormShell>
  );
}
