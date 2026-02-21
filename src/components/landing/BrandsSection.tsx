import { useScrollReveal } from "@/hooks/useScrollReveal";

const profileBrands = ["KRAAB SYSTEMS", "LumFer", "Flexy", "Apply", "EuroKRAAB"];
const lightBrands = ["Arlight", "SWG", "Gauss", "Jazzway", "Feron", "Maytoni"];

const BrandChip = ({ name }: { name: string }) => (
  <div className="premium-card bg-card border border-border/50 rounded-xl px-6 py-4 flex items-center justify-center shadow-sm hover:border-primary/30 transition-all duration-400">
    <span className="font-body text-sm sm:text-base font-semibold text-muted-foreground tracking-wider uppercase hover:text-foreground transition-colors duration-400 select-none">
      {name}
    </span>
  </div>
);

const BrandsSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Бренды и системы
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Используем и подбираем из популярных систем
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        {/* Profile systems */}
        <div className="reveal mb-10">
          <h3 className="font-display text-xl font-semibold text-foreground mb-5 text-center sm:text-left">
            Профильные системы
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {profileBrands.map((b, i) => (
              <div key={b} style={{ transitionDelay: `${i * 0.06}s` }} className="reveal">
                <BrandChip name={b} />
              </div>
            ))}
          </div>
        </div>

        {/* Lighting */}
        <div className="reveal">
          <h3 className="font-display text-xl font-semibold text-foreground mb-5 text-center sm:text-left">
            Свет / LED / управление
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {lightBrands.map((b, i) => (
              <div key={b} style={{ transitionDelay: `${i * 0.06}s` }} className="reveal">
                <BrandChip name={b} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
