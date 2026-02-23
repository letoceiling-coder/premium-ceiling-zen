import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, ShieldCheck, Timer, Palette, Lightbulb, PenTool } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Быстрый монтаж", desc: "Установка за 1 день без пыли и грязи" },
  { icon: ShieldCheck, title: "Пожаробезопасные полотна", desc: "Сертифицированные материалы класса КМ2" },
  { icon: Timer, title: "Более 20 лет службы", desc: "Гарантия качества и долговечности" },
  { icon: Palette, title: "Огромный выбор фактур", desc: "Матовые, глянцевые, сатиновые и другие" },
  { icon: Lightbulb, title: "Современные технологии освещения", desc: "Световые линии, трековые системы, LED" },
  { icon: PenTool, title: "Реализация любых дизайнерских решений", desc: "Индивидуальный подход к каждому проекту" },
];

const WhyUsSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-14 md:py-16 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Почему выбирают нас
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="reveal premium-card bg-card rounded-xl p-8 shadow-sm border border-border/50"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <b.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="font-body text-muted-foreground text-base leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
