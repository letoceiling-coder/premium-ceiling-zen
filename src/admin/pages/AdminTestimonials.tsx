import { testimonialsApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { Testimonial } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminTestimonials() {
  const crud = useCrudList<Testimonial>({ fetchFn: testimonialsApi.list, deleteFn: testimonialsApi.delete });

  return (
    <AdminCrudTable
      title="Отзывы"
      createUrl="/admin/testimonials/create"
      editUrl={(t) => `/admin/testimonials/${t.id}`}
      columns={[
        { key: "name", label: "Имя" },
        { key: "rating", label: "Рейтинг", render: (t) => "★".repeat(t.rating) },
        { key: "text", label: "Текст", render: (t) => <span className="line-clamp-1 max-w-xs">{t.text}</span> },
        { key: "is_active", label: "Статус", render: (t) => <Badge variant={t.is_active ? "default" : "secondary"}>{t.is_active ? "Активен" : "Скрыт"}</Badge> },
      ]}
      items={crud.items}
      meta={crud.meta}
      loading={crud.loading}
      error={crud.error}
      onPageChange={crud.setPage}
      onDelete={(id) => crud.deleteItem(id)}
    />
  );
}
