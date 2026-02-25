import { brandsApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { Brand } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminBrands() {
  const crud = useCrudList<Brand>({ fetchFn: brandsApi.list, deleteFn: brandsApi.delete });

  return (
    <AdminCrudTable
      title="Бренды"
      createUrl="/admin/brands/create"
      editUrl={(b) => `/admin/brands/${b.id}`}
      columns={[
        { key: "name", label: "Название" },
        { key: "slug", label: "Slug" },
        { key: "website", label: "Сайт", render: (b) => b.website ? <a href={b.website} target="_blank" className="text-primary underline text-xs">{b.website}</a> : "—" },
        { key: "is_active", label: "Статус", render: (b) => <Badge variant={b.is_active ? "default" : "secondary"}>{b.is_active ? "Активен" : "Скрыт"}</Badge> },
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
