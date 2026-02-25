import { useAuth } from "../AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  const cards = [
    { label: "Pages", icon: "📄", link: "/admin/pages" },
    { label: "Products", icon: "📦", link: "/admin/products" },
    { label: "Categories", icon: "📂", link: "/admin/categories" },
    { label: "Brands", icon: "🏷", link: "/admin/brands" },
    { label: "Blog", icon: "📰", link: "/admin/blog" },
    { label: "Testimonials", icon: "⭐", link: "/admin/testimonials" },
    { label: "FAQ", icon: "❓", link: "/admin/faq" },
    { label: "Media", icon: "🖼", link: "/admin/media" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Добро пожаловать, {user?.name}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <a
            key={c.label}
            href={c.link}
            className="bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">{c.icon}</span>
            <span className="text-sm font-medium">{c.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
