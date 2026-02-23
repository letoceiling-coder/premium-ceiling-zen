import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { products, productCategories, type Product } from "@/data/products";
import { brands } from "@/data/brands";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import RequestForm from "@/components/landing/RequestForm";

const ITEMS_PER_PAGE = 9;

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formOpen, setFormOpen] = useState(false);

  const activeCategory = searchParams.get("category") || "profiles";
  const activeBrands = searchParams.get("brand")?.split(",").filter(Boolean) || [];
  const searchQuery = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    });
    setSearchParams(next, { replace: true });
  };

  const setCategory = (cat: string) => updateParams({ category: cat, page: "1", brand: null });
  const setPage = (p: number) => updateParams({ page: String(p) });

  const toggleBrand = (slug: string) => {
    const next = activeBrands.includes(slug)
      ? activeBrands.filter((b) => b !== slug)
      : [...activeBrands, slug];
    updateParams({ brand: next.length ? next.join(",") : null, page: "1" });
  };

  const setSearch = (q: string) => updateParams({ q: q || null, page: "1" });

  // Filter products
  const filtered = useMemo(() => {
    let items = products.filter((p) => p.category === activeCategory);
    if (activeBrands.length > 0) {
      items = items.filter((p) => activeBrands.includes(p.brandSlug));
    }
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.bullets.some((b) => b.toLowerCase().includes(lower))
      );
    }
    return items;
  }, [activeCategory, activeBrands, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  // Unique brands for filter
  const categoryBrands = useMemo(() => {
    const slugs = [...new Set(products.filter((p) => p.category === activeCategory).map((p) => p.brandSlug).filter(Boolean))];
    return slugs.map((s) => {
      const b = brands.find((br) => br.slug === s);
      return { slug: s, name: b?.name || s };
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            Каталог продукции
          </h1>
          <p className="font-body text-primary-foreground/70 mt-2">
            Профильные системы, освещение, управление и полотна
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10">
        {/* Category tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-6 pb-2">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`font-body text-sm sm:text-base px-5 py-2.5 rounded-xl border transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-56 flex-shrink-0 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-lg font-body"
              />
            </div>

            {/* Brand filter */}
            {categoryBrands.length > 0 && (
              <div>
                <h4 className="font-display text-sm font-semibold text-foreground mb-3">Бренд</h4>
                <div className="space-y-2">
                  {categoryBrands.map((b) => (
                    <label
                      key={b.slug}
                      className="flex items-center gap-2 cursor-pointer font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Checkbox
                        checked={activeBrands.includes(b.slug)}
                        onCheckedChange={() => toggleBrand(b.slug)}
                      />
                      {b.name}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {pageItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-body text-muted-foreground text-lg">Ничего не найдено</p>
                <p className="font-body text-sm text-muted-foreground/60 mt-1">
                  Попробуйте изменить фильтры
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-up">
                {pageItems.map((item) => (
                  <ProductCard key={item.id} item={item} onOpenForm={() => setFormOpen(true)} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  disabled={safePage <= 1}
                  onClick={() => setPage(safePage - 1)}
                  className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg font-body text-sm transition-all duration-300 ${
                      p === safePage
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={safePage >= totalPages}
                  onClick={() => setPage(safePage + 1)}
                  className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <RequestForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
};

function ProductCard({ item, onOpenForm }: { item: Product; onOpenForm: () => void }) {
  return (
    <div className="premium-card bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">{item.title}</h3>
        <p className="font-body text-xs text-muted-foreground/60 mb-3">{item.brand}</p>
        <ul className="space-y-1.5 mb-3 flex-1">
          {item.bullets.map((b) => (
            <li key={b} className="font-body text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-gold mt-1 text-xs">●</span>
              {b}
            </li>
          ))}
        </ul>
        <p className="font-display text-lg font-bold text-foreground mb-4">{item.price}</p>
        <Button
          onClick={onOpenForm}
          variant="outline"
          className="w-full rounded-lg border-primary/20 text-primary font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Уточнить стоимость
        </Button>
      </div>
    </div>
  );
}

export default Catalog;
