import { useState, useEffect } from "react";
import { settingsApi } from "@/api/http";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { SiteSettings } from "@/api/types";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<SiteSettings>({
    site_name: "",
    contacts: { address: "", phone: "", email: "" },
    socials: [],
    footer_text: "",
    head_scripts: "",
    body_scripts: "",
    analytics_id: "",
  });

  useEffect(() => {
    settingsApi.get().then(({ data }) => {
      if (data) setForm(data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    const { error: err } = await settingsApi.update(form);
    if (err) setError(err.message);
    else setSuccess(true);
    setSaving(false);
  };

  const u = (k: keyof SiteSettings, v: any) => setForm(p => ({ ...p, [k]: v }));
  const uc = (k: string, v: string) => setForm(p => ({ ...p, contacts: { ...p.contacts, [k]: v } }));

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold font-display">Настройки сайта</h1>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-primary">Сохранено</p>}

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div className="space-y-2"><Label>Название сайта</Label><Input value={form.site_name} onChange={e => u("site_name", e.target.value)} /></div>

        <h3 className="font-display text-lg font-semibold pt-4 border-t border-border">Контакты</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2"><Label>Адрес</Label><Input value={form.contacts.address} onChange={e => uc("address", e.target.value)} /></div>
          <div className="space-y-2"><Label>Телефон</Label><Input value={form.contacts.phone} onChange={e => uc("phone", e.target.value)} /></div>
          <div className="space-y-2"><Label>Email</Label><Input value={form.contacts.email} onChange={e => uc("email", e.target.value)} /></div>
        </div>

        <h3 className="font-display text-lg font-semibold pt-4 border-t border-border">Footer</h3>
        <div className="space-y-2"><Label>Текст футера</Label><Textarea value={form.footer_text ?? ""} onChange={e => u("footer_text", e.target.value)} rows={3} /></div>

        <h3 className="font-display text-lg font-semibold pt-4 border-t border-border">Скрипты / Аналитика</h3>
        <div className="space-y-2"><Label>Analytics ID</Label><Input value={form.analytics_id ?? ""} onChange={e => u("analytics_id", e.target.value)} /></div>
        <div className="space-y-2"><Label>Head scripts</Label><Textarea value={form.head_scripts ?? ""} onChange={e => u("head_scripts", e.target.value)} rows={3} /></div>
        <div className="space-y-2"><Label>Body scripts</Label><Textarea value={form.body_scripts ?? ""} onChange={e => u("body_scripts", e.target.value)} rows={3} /></div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button onClick={save} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
