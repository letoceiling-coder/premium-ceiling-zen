import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Gift, Calculator, HeadphonesIcon } from "lucide-react";

interface SalesSectionProps {
  onOpenForm: () => void;
}

const SalesSection = ({ onOpenForm }: SalesSectionProps) => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Не откладывайте обновление интерьера
          </h2>
          <p className="font-body text-lg sm:text-xl text-primary-foreground/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            Натяжной потолок устанавливается быстро,
            служит более 20 лет
            и полностью меняет восприятие пространства.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Gift, text: "Бесплатная консультация" },
            { icon: Calculator, text: "Бесплатный расчёт" },
            { icon: HeadphonesIcon, text: "Помощь в подборе решения" },
          ].map((item, i) => (
            <div
              key={item.text}
              className="reveal glass rounded-xl p-6 flex flex-col items-center gap-3"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <item.icon className="w-10 h-10 text-gold" />
              <span className="font-body text-base font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="reveal">
          <Button
            onClick={onOpenForm}
            size="lg"
            className="h-14 px-10 rounded-xl bg-primary-foreground text-primary font-body font-semibold text-lg transition-all duration-400 hover:scale-[1.03] hover:shadow-2xl"
          >
            Оставить заявку сейчас
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SalesSection;
