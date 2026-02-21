import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";

import matteImg from "@/assets/ceilings/matte.jpg";
import glossyImg from "@/assets/ceilings/glossy.jpg";
import satinImg from "@/assets/ceilings/satin.jpg";
import floatingImg from "@/assets/ceilings/floating.jpg";
import shadowImg from "@/assets/ceilings/shadow.jpg";
import lightLinesImg from "@/assets/ceilings/light-lines.jpg";
import trackImg from "@/assets/ceilings/track.jpg";
import corniceImg from "@/assets/ceilings/cornice.jpg";

const ceilingTypes = [
  {
    title: "Матовый",
    image: matteImg,
    features: ["Классический вид", "Не требует подкрашивания", "Не боится затоплений"],
  },
  {
    title: "Глянцевый",
    image: glossyImg,
    features: ["Визуально увеличивает высоту", "Подходит для небольших помещений", "Добавляет лоск"],
  },
  {
    title: "Сатиновый",
    image: satinImg,
    features: ["Гладкая фактура", "Лёгкий блеск", "Без отражений"],
  },
  {
    title: "Парящий",
    image: floatingImg,
    features: ["Подсветка по периметру", 'Эффект "парит в воздухе"', "Можно менять цвет"],
  },
  {
    title: "Теневой",
    image: shadowImg,
    features: ["Теневое примыкание", "Современное решение", "Стильный минимализм"],
  },
  {
    title: "Световые линии",
    image: lightLinesImg,
    features: ["Оригинальное освещение", "Разные цвета", "Можно как основное освещение"],
  },
  {
    title: "Трековые системы",
    image: trackImg,
    features: ["Свободное перемещение светильников", "Современный стиль", "Альтернатива люстрам"],
  },
  {
    title: "Системы карнизов",
    image: corniceImg,
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
              {/* Photo with overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 font-display text-lg font-semibold text-primary-foreground drop-shadow-md">
                  {item.title}
                </span>
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
