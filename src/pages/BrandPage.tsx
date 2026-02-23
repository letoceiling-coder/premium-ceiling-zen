import { useParams, Link } from "react-router-dom";
import { getBrandBySlug } from "@/data/brands";
import { getProductsByBrand, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import RequestForm from "@/components/landing/RequestForm";

const BrandPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = getBrandBySlug(slug || "");
  const brandProducts = getProductsByBrand(slug || "");
  const [formOpen, setFormOpen] = useState(false);

  if (!brand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Бренд не найден</h1>
          <Link to="/" className="font-body text-primary hover:underline">
            На главную
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            {brand.name}
          </h1>
          <p className="font-body text-primary-foreground/70">{brand.tagline}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10">
        {/* Description */}
        <div className="max-w-3xl mb-10">
          {brand.description.map((p, i) => (
            <p key={i} className="font-body text-muted-foreground leading-relaxed mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </div>

        {/* Solutions */}
        <div className="mb-10">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Используемые решения
          </h2>
          <div className="flex flex-wrap gap-2">
            {brand.solutions.map((s) => (
              <span
                key={s}
                className="font-body text-sm bg-secondary text-secondary-foreground px-4 py-2 rounded-lg"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mb-10">
          <Button asChild className="rounded-xl font-body">
            <Link to={`/catalog?category=${brand.category}&brand=${brand.slug}&page=1`}>
              Смотреть каталог бренда
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Products */}
        {brandProducts.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Товары бренда
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {brandProducts.map((item) => (
                <BrandProductCard key={item.id} item={item} onOpenForm={() => setFormOpen(true)} />
              ))}
            </div>
          </div>
        )}
      </div>

      <RequestForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
};

function BrandProductCard({ item, onOpenForm }: { item: Product; onOpenForm: () => void }) {
  return (
    <div className="premium-card bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">{item.title}</h3>
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

export default BrandPage;
