import { useAuth } from "../AuthContext";

export default function AdminUsers() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold font-display">Пользователи</h1>
      {user?.role !== "super_admin" ? (
        <p className="text-muted-foreground text-sm">Управление пользователями доступно только для super_admin.</p>
      ) : (
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm">
            Управление пользователями реализуется через Laravel API.
            Добавьте эндпоинты /admin/users в бэкенде для полного CRUD.
          </p>
        </div>
      )}
    </div>
  );
}
