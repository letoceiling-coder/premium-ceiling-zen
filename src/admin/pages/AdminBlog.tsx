import { blogApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { BlogPost } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminBlog() {
  const crud = useCrudList<BlogPost>({ fetchFn: blogApi.list, deleteFn: blogApi.delete });

  return (
    <AdminCrudTable
      title="Блог / Новости"
      createUrl="/admin/blog/create"
      editUrl={(p) => `/admin/blog/${p.id}`}
      columns={[
        { key: "title", label: "Заголовок" },
        { key: "slug", label: "Slug" },
        { key: "published_at", label: "Дата", render: (p) => p.published_at ? new Date(p.published_at).toLocaleDateString("ru") : "—" },
        { key: "is_published", label: "Статус", render: (p) => <Badge variant={p.is_published ? "default" : "secondary"}>{p.is_published ? "Опубликовано" : "Черновик"}</Badge> },
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
