import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AdminLogin from "./AdminLogin";
import {
  LayoutDashboard,
  FileText,
  Layers,
  Package,
  FolderTree,
  Tag,
  Briefcase,
  Newspaper,
  Star,
  HelpCircle,
  Image,
  Navigation,
  Search,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/pages", icon: FileText, label: "Pages" },
  { to: "/admin/sections", icon: Layers, label: "Sections" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/categories", icon: FolderTree, label: "Categories" },
  { to: "/admin/brands", icon: Tag, label: "Brands" },
  { to: "/admin/services", icon: Briefcase, label: "Services" },
  { to: "/admin/blog", icon: Newspaper, label: "Blog / News" },
  { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { to: "/admin/faq", icon: HelpCircle, label: "FAQ" },
  { to: "/admin/media", icon: Image, label: "Media" },
  { to: "/admin/navigation", icon: Navigation, label: "Navigation" },
  { to: "/admin/seo", icon: Search, label: "SEO" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
  { to: "/admin/users", icon: Users, label: "Users" },
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return <AdminLogin />;

  const isActive = (path: string, end?: boolean) =>
    end ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <Link to="/admin" className="font-display text-lg font-bold text-foreground">
            CMS Panel
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive(item.to, item.end)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.role}</p>
            </div>
            <button
              onClick={() => { logout(); navigate("/admin"); }}
              className="text-muted-foreground hover:text-destructive transition-colors"
              title="Выйти"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center gap-4 px-4 border-b border-border bg-card lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <Link to="/" target="_blank" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Перейти на сайт →
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
