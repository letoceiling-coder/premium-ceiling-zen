import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Plus, Search, Loader2, Trash2, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface AdminCrudTableProps<T extends { id: number }> {
  title: string;
  createUrl: string;
  editUrl: (item: T) => string;
  columns: Column<T>[];
  items: T[];
  meta: { current_page: number; last_page: number; total: number };
  loading: boolean;
  error: string | null;
  search?: string;
  onSearch?: (q: string) => void;
  onPageChange: (p: number) => void;
  onDelete: (id: number) => void;
  extraActions?: (item: T) => ReactNode;
}

export function AdminCrudTable<T extends { id: number }>({
  title, createUrl, editUrl, columns, items, meta, loading, error,
  search, onSearch, onPageChange, onDelete, extraActions,
}: AdminCrudTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold font-display">{title}</h1>
        <div className="flex items-center gap-3">
          {onSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                className="pl-9 w-56"
                value={search ?? ""}
                onChange={e => onSearch(e.target.value)}
              />
            </div>
          )}
          <Button asChild>
            <Link to={createUrl}><Plus className="w-4 h-4 mr-1" />Создать</Link>
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="rounded-lg border border-border bg-card">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">Нет данных</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(c => <TableHead key={c.key}>{c.label}</TableHead>)}
                <TableHead className="w-24">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  {columns.map(c => (
                    <TableCell key={c.key}>
                      {c.render ? c.render(item) : (item as any)[c.key]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={editUrl(item)}><Pencil className="w-4 h-4" /></Link>
                      </Button>
                      {extraActions?.(item)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm("Удалить?")) onDelete(item.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {meta.last_page > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" disabled={meta.current_page <= 1} onClick={() => onPageChange(meta.current_page - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">{meta.current_page} / {meta.last_page}</span>
          <Button variant="outline" size="icon" disabled={meta.current_page >= meta.last_page} onClick={() => onPageChange(meta.current_page + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
