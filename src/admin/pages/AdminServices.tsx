import { servicesApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { Service } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminServices() {
  const crud = useCrudList<Service>({ fetchFn: servicesApi.list, deleteFn: servicesApi.delete });

  return (
    <AdminCrudTable
      title="Услуги"
      createUrl="/admin/services/create"
      editUrl={(s) => `/admin/services/${s.id}`}
      columns={[
        { key: "title", label: "Название" },
        { key: "slug", label: "Slug" },
        { key: "price", label: "Цена", render: (s) => s.price ?? "—" },
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
