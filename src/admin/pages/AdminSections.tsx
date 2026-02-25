import { sectionsApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { Section } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminSections() {
  const crud = useCrudList<Section>({ fetchFn: sectionsApi.list, deleteFn: sectionsApi.delete });

  return (
    <AdminCrudTable
      title="Секции"
      createUrl="/admin/sections/create"
      editUrl={(s) => `/admin/sections/${s.id}`}
      columns={[
        { key: "title", label: "Заголовок" },
        { key: "type", label: "Тип", render: (s) => <Badge variant="outline">{s.type}</Badge> },
        { key: "page_id", label: "Страница" },
        { key: "order", label: "Порядок" },
        { key: "is_active", label: "Статус", render: (s) => <Badge variant={s.is_active ? "default" : "secondary"}>{s.is_active ? "Активна" : "Скрыта"}</Badge> },
      ]}
      items={crud.items}
      meta={crud.meta}
      loading={crud.loading}
      error={crud.error}
      search={crud.params.search}
      onSearch={crud.setSearch}
      onPageChange={crud.setPage}
      onDelete={(id) => crud.deleteItem(id)}
    />
  );
}
