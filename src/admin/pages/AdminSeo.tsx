export default function AdminSeo() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold font-display">SEO</h1>
      <p className="text-muted-foreground text-sm">
        SEO-настройки доступны на страницах редактирования: Pages, Products, Categories, Blog.
        Каждый объект содержит поля: meta_title, meta_description, meta_keywords, og_image, canonical_url.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Pages", link: "/admin/pages" },
          { label: "Products", link: "/admin/products" },
          { label: "Categories", link: "/admin/categories" },
          { label: "Blog", link: "/admin/blog" },
        ].map(i => (
          <a key={i.label} href={i.link} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <h3 className="font-display text-lg font-semibold">{i.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">Редактировать SEO →</p>
          </a>
        ))}
      </div>
    </div>
  );
}
