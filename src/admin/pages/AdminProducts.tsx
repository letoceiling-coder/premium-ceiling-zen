import { productsApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { Product } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { toAbsoluteUrl } from "@/api/http";

export default function AdminProducts() {
  const crud = useCrudList<Product>({ fetchFn: productsApi.list, deleteFn: productsApi.delete });

  return (
    <AdminCrudTable
      title="Товары"
      createUrl="/admin/products/create"
      editUrl={(p) => `/admin/products/${p.id}`}
      columns={[
        {
          key: "image",
          label: "",
          render: (p) => (
            <img src={toAbsoluteUrl(p.images?.[0]?.url)} alt="" className="w-10 h-10 rounded object-cover" />
          ),
        },
        { key: "title", label: "Название" },
        { key: "sku", label: "Артикул" },
        {
          key: "price",
          label: "Цена",
          render: (p) => p.price ? `${p.price} ₽` : "—",
        },
        {
          key: "is_published",
          label: "Статус",
          render: (p) => (
            <Badge variant={p.is_published ? "default" : "secondary"}>
              {p.is_published ? "Опубликовано" : "Черновик"}
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
