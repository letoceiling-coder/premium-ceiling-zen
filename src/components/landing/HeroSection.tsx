import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onOpenForm: () => void;
}

const HeroSection = ({ onOpenForm }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/40 to-foreground/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up">
          Натяжные потолки
          <br />
          <span className="text-gold">премиального уровня</span>
        </h1>
        <p className="font-body text-lg sm:text-xl md:text-2xl text-primary-foreground/80 mb-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          Быстро. Безопасно. На 20+ лет.
        </p>
        <p className="font-body text-base sm:text-lg text-primary-foreground/60 mb-8 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          Самый быстрый и эстетичный способ отделки потолка
          <br className="hidden sm:block" />
          <span className="mx-2">Экологично</span>•<span className="mx-2">Пожаробезопасно</span>•<span className="mx-2">Современно</span>
        </p>

        {/* Trust triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          {[
            "Срок службы более 20 лет",
            "Не боится затоплений",
            "Монтаж за 1 день",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-primary-foreground/90">
              <Check className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="font-body text-sm sm:text-base">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <Button
            onClick={onOpenForm}
            size="lg"
            className="w-full sm:w-auto h-14 px-10 rounded-xl bg-primary-foreground text-primary font-body font-semibold text-lg transition-all duration-400 hover:scale-[1.03] hover:shadow-2xl"
          >
            Рассчитать стоимость
          </Button>
          <Button
            onClick={onOpenForm}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-14 px-10 rounded-xl border-primary-foreground/30 text-primary-foreground font-body font-semibold text-lg backdrop-blur-sm bg-primary-foreground/5 transition-all duration-400 hover:scale-[1.03] hover:bg-primary-foreground/15"
          >
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
