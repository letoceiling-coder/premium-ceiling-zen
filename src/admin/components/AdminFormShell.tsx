import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminFormShellProps {
  title: string;
  backUrl: string;
  loading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  error?: string | null;
  children: ReactNode;
}

export function AdminFormShell({ title, backUrl, loading, onSubmit, error, children }: AdminFormShellProps) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to={backUrl}><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold font-display">{title}</h1>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <form onSubmit={onSubmit} className="space-y-6 bg-card rounded-xl border border-border p-6">
        {children}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" type="button" asChild>
            <Link to={backUrl}>Отмена</Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
