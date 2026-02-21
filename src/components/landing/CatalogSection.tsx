import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";

const ceilingTypes = [
  {
    title: "Матовый",
    features: ["Классический вид", "Не требует подкрашивания", "Не боится затоплений"],
  },
  {
    title: "Глянцевый",
    features: ["Визуально увеличивает высоту", "Подходит для небольших помещений", "Добавляет лоск"],
  },
  {
    title: "Сатиновый",
    features: ["Гладкая фактура", "Лёгкий блеск", "Без отражений"],
  },
  {
    title: "Парящий",
    features: ["Подсветка по периметру", 'Эффект "парит в воздухе"', "Можно менять цвет"],
  },
  {
    title: "Теневой",
    features: ["Теневое примыкание", "Современное решение", "Стильный минимализм"],
  },
  {
    title: "Световые линии",
    features: ["Оригинальное освещение", "Разные цвета", "Можно как основное освещение"],
  },
  {
    title: "Трековые системы",
    features: ["Свободное перемещение светильников", "Современный стиль", "Альтернатива люстрам"],
  },
  {
    title: "Системы карнизов",
    features: ["Накладные и встроенные", "Скрытая подсветка", "Элегантный вид"],
  },
];

const CatalogSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-secondary/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Виды потолков
          </h2>
          <p className="font-body text-lg text-muted-foreground">Премиум каталог решений</p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ceilingTypes.map((item, i) => (
            <div
              key={item.title}
              className="reveal premium-card bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 flex flex-col"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Placeholder image area */}
              <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary flex items-center justify-center">
                <span className="font-display text-2xl text-primary/40">{item.title}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <ul className="space-y-2 mb-6 flex-1">
                  {item.features.map((f) => (
                    <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1 text-xs">●</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full rounded-lg border-primary/20 text-primary font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Подробнее
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
