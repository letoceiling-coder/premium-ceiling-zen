import { faqApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { FaqItem } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminFaq() {
  const crud = useCrudList<FaqItem>({ fetchFn: faqApi.list, deleteFn: faqApi.delete });

  return (
    <AdminCrudTable
      title="FAQ"
      createUrl="/admin/faq/create"
      editUrl={(f) => `/admin/faq/${f.id}`}
      columns={[
        { key: "question", label: "Вопрос", render: (f) => <span className="line-clamp-1 max-w-sm">{f.question}</span> },
        { key: "order", label: "Порядок" },
        { key: "is_active", label: "Статус", render: (f) => <Badge variant={f.is_active ? "default" : "secondary"}>{f.is_active ? "Активен" : "Скрыт"}</Badge> },
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
