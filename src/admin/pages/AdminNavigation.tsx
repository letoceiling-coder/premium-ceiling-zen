import { navigationApi } from "@/api/http";
import { useCrudList } from "../hooks/useCrudList";
import { AdminCrudTable } from "../components/AdminCrudTable";
import type { NavigationItem } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export default function AdminNavigation() {
  const crud = useCrudList<NavigationItem>({ fetchFn: navigationApi.list, deleteFn: navigationApi.delete });

  return (
    <AdminCrudTable
      title="Навигация"
      createUrl="/admin/navigation/create"
      editUrl={(n) => `/admin/navigation/${n.id}`}
      columns={[
        { key: "label", label: "Метка" },
        { key: "url", label: "URL" },
        { key: "group", label: "Группа", render: (n) => <Badge variant="outline">{n.group}</Badge> },
        { key: "order", label: "Порядок" },
        { key: "is_active", label: "Статус", render: (n) => <Badge variant={n.is_active ? "default" : "secondary"}>{n.is_active ? "Активен" : "Скрыт"}</Badge> },
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
