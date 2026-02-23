import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { brands, brandCategories, getBrandsByCategory } from "@/data/brands";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BrandsSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-14 md:py-16 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Бренды и системы, с которыми мы работаем
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Используем и подбираем из популярных систем
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        {brandCategories.map((cat, catIdx) => {
          const catBrands = getBrandsByCategory(cat.id);
          return (
            <div key={cat.id} className="reveal mb-12 last:mb-0" style={{ transitionDelay: `${catIdx * 0.1}s` }}>
              <h3 className="font-display text-xl font-semibold text-foreground mb-5 text-center sm:text-left">
                {cat.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {catBrands.map((brand, i) => (
                  <div
                    key={brand.id}
                    className="premium-card bg-card border border-border/50 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-primary/30 transition-all duration-400"
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    <div>
                      <h4 className="font-display text-lg font-bold text-foreground mb-1">
                        {brand.name}
                      </h4>
                      <p className="font-body text-xs text-muted-foreground mb-3">
                        {brand.tagline}
                      </p>
                      <p className="font-body text-sm text-muted-foreground/80 leading-relaxed line-clamp-3">
                        {brand.description[0]}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-lg border-primary/20 text-primary font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Link to={`/catalog?category=${cat.id}&brand=${brand.slug}&page=1`}>
                          Смотреть продукцию
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandsSection;
