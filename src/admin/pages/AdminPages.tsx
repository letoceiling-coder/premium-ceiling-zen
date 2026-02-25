import { pagesApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { Page } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminPages() {
  const crud = useCrudList<Page>({ fetchFn: pagesApi.list, deleteFn: pagesApi.delete });

  return (
    <AdminCrudTable
      title="Страницы"
      createUrl="/admin/pages/create"
      editUrl={(p) => `/admin/pages/${p.id}`}
      columns={[
        { key: "title", label: "Заголовок" },
        { key: "slug", label: "Slug" },
        {
          key: "is_published",
          label: "Статус",
          render: (p) => (
            <Badge variant={p.is_published ? "default" : "secondary"}>
              {p.is_published ? "Опубликовано" : "Черновик"}
            </Badge>
          ),
        },
        { key: "order", label: "Порядок" },
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
