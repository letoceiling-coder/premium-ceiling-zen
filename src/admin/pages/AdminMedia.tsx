import { useState, useCallback } from "react";
import { mediaApi, toAbsoluteUrl } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import type { MediaItem } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Upload, Loader2, Image as ImageIcon } from "lucide-react";

export default function AdminMedia() {
  const crud = useCrudList<MediaItem>({ fetchFn: mediaApi.list, deleteFn: mediaApi.delete });
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      await mediaApi.upload(file);
    }
    setUploading(false);
    crud.refetch();
    e.target.value = "";
  }, [crud]);

  const typeFilter = crud.params.type ?? "";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold font-display">Медиатека</h1>
        <div className="flex items-center gap-3">
          <select
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            value={typeFilter}
            onChange={e => crud.setParams(p => ({ ...p, type: e.target.value, page: "1" }))}
          >
            <option value="">Все типы</option>
            <option value="image">Изображения</option>
            <option value="video">Видео</option>
            <option value="document">Документы</option>
          </select>
          <label className="cursor-pointer">
            <Button asChild disabled={uploading}>
              <span>
                {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Upload className="w-4 h-4 mr-1" />}
                Загрузить
              </span>
            </Button>
            <Input type="file" multiple className="hidden" onChange={handleUpload} accept="image/*,video/*,.pdf,.doc,.docx" />
          </label>
        </div>
      </div>

      {crud.loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : crud.items.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Нет файлов</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {crud.items.map(item => (
            <div key={item.id} className="group relative bg-card border border-border rounded-lg overflow-hidden">
              {item.mime_type.startsWith("image") ? (
                <img src={toAbsoluteUrl(item.url)} alt={item.alt ?? item.filename} className="w-full h-28 object-cover" />
              ) : (
                <div className="w-full h-28 flex items-center justify-center bg-muted text-muted-foreground text-xs">{item.mime_type.split("/")[1]?.toUpperCase()}</div>
              )}
              <div className="p-2">
                <p className="text-xs truncate text-foreground">{item.filename}</p>
                <p className="text-xs text-muted-foreground">{(item.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                onClick={() => { if (confirm("Удалить файл?")) crud.deleteItem(item.id); }}
                className="absolute top-1 right-1 w-7 h-7 rounded bg-destructive/80 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
