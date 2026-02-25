import { categoriesApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { Category } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminCategories() {
  const crud = useCrudList<Category>({ fetchFn: categoriesApi.list, deleteFn: categoriesApi.delete });

  return (
    <AdminCrudTable
      title="Категории"
      createUrl="/admin/categories/create"
      editUrl={(c) => `/admin/categories/${c.id}`}
      columns={[
        { key: "name", label: "Название" },
        { key: "slug", label: "Slug" },
        { key: "order", label: "Порядок" },
        {
          key: "is_active",
          label: "Статус",
          render: (c) => (
            <Badge variant={c.is_active ? "default" : "secondary"}>
              {c.is_active ? "Активна" : "Скрыта"}
            </Badge>
          ),
        },
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
