import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";

import pk5Img from "@/assets/products/pk5-cornice.jpg";
import pk14Img from "@/assets/products/pk14-cornice.jpg";
import shadowProfileImg from "@/assets/products/shadow-profile.jpg";
import floatingProfileImg from "@/assets/products/floating-profile.jpg";
import lightLinesProfileImg from "@/assets/products/light-lines-profile.jpg";
import nicheImg from "@/assets/products/niche-backlight.jpg";
import ledLinesImg from "@/assets/products/led-lines.jpg";
import ledStripImg from "@/assets/products/led-strip.jpg";
import powerSupplyImg from "@/assets/products/power-supply.jpg";
import trackSystemImg from "@/assets/products/track-system.jpg";
import dimmerImg from "@/assets/products/dimmer-control.jpg";
import matteImg from "@/assets/products/matte-fabric.jpg";
import glossyImg from "@/assets/products/glossy-fabric.jpg";
import satinImg from "@/assets/products/satin-fabric.jpg";
import fireproofImg from "@/assets/products/fireproof-fabric.jpg";

interface ProductsCatalogSectionProps {
  onOpenForm: () => void;
}

interface ProductItem {
  id: string;
  title: string;
  bullets: string[];
  useCase: string;
  imageSrc: string;
}

const categories = [
  { id: "profiles", name: "Профильные системы" },
  { id: "lighting", name: "Световые решения" },
  { id: "fabrics", name: "Полотна" },
];

const itemsByCategory: Record<string, ProductItem[]> = {
  profiles: [
    {
      id: "pk5",
      title: "Карниз ПК-5",
      bullets: [
        "Встроенная система скрытого карниза",
        "Подходит для ниш под шторы",
        "Возможность установки LED-подсветки",
        "Чистое примыкание без видимых креплений",
      ],
      useCase: "Гостиная / Спальня / Панорамные окна",
      imageSrc: pk5Img,
    },
    {
      id: "pk14",
      title: "Карниз ПК-14",
      bullets: [
        "Усиленная профильная система",
        "Подходит для тяжёлых штор",
        "Возможность интеграции подсветки",
        "Надёжная фиксация",
      ],
      useCase: "Большие помещения / Премиальные интерьеры",
      imageSrc: pk14Img,
    },
    {
      id: "shadow",
      title: "Теневой профиль",
      bullets: [
        "Ровный теневой зазор по периметру",
        "Без декоративных вставок",
        "Минималистичный современный стиль",
        "Идеально для дизайнерского интерьера",
      ],
      useCase: "Современный минимализм / Лофт / Хай-тек",
      imageSrc: shadowProfileImg,
    },
    {
      id: "floating",
      title: "Парящий профиль",
      bullets: [
        "LED-подсветка по периметру",
        "Эффект «парящего» потолка",
        "Возможность RGB или тёплого света",
        "Управление с пульта",
      ],
      useCase: "Гостиная / Спальня / Детская",
      imageSrc: floatingProfileImg,
    },
    {
      id: "light-profile",
      title: "Профиль для световых линий",
      bullets: [
        "Встраиваемая система",
        "Разная ширина линий",
        "Равномерное рассеивание света",
        "Используется как основное освещение",
      ],
      useCase: "Кухня / Коридор / Современные квартиры",
      imageSrc: lightLinesProfileImg,
    },
    {
      id: "niche",
      title: "Ниши под скрытую подсветку",
      bullets: [
        "Архитектурное решение",
        "Мягкий рассеянный свет",
        "Создание атмосферы",
        "Совмещение с карнизами",
      ],
      useCase: "Спальня / Зона ТВ / Декоративная отделка",
      imageSrc: nicheImg,
    },
  ],
  lighting: [
    {
      id: "led-lines",
      title: "Световые линии LED",
      bullets: [
        "Встраиваемые световые модули",
        "Равномерное освещение",
        "Тёплый / холодный / нейтральный свет",
        "Можно использовать вместо люстры",
      ],
      useCase: "Кухня / Коридор / Гостиная",
      imageSrc: ledLinesImg,
    },
    {
      id: "led-strip",
      title: "LED-ленты премиум класса",
      bullets: [
        "Высокая плотность диодов",
        "Равномерное свечение",
        "Долгий срок службы",
        "Без мерцания",
      ],
      useCase: "Любые помещения",
      imageSrc: ledStripImg,
    },
    {
      id: "power",
      title: "Блоки питания и драйверы",
      bullets: [
        "Стабильное напряжение",
        "Защита от перегрева",
        "Долговечность",
        "Безопасность",
      ],
      useCase: "Техническое оснащение",
      imageSrc: powerSupplyImg,
    },
    {
      id: "track",
      title: "Магнитные трековые системы",
      bullets: [
        "Свободное перемещение светильников",
        "Современный стиль",
        "Модульная система",
        "Возможность изменения конфигурации",
      ],
      useCase: "Кухня / Гостиная / Студия",
      imageSrc: trackSystemImg,
    },
    {
      id: "dimmer",
      title: "Диммируемые системы управления",
      bullets: [
        "Регулировка яркости",
        "Управление пультом",
        "Совместимость с RGB",
        "Создание сценариев освещения",
      ],
      useCase: "Спальня / Гостиная / Зона отдыха",
      imageSrc: dimmerImg,
    },
  ],
  fabrics: [
    {
      id: "matte",
      title: "Матовые полотна",
      bullets: [
        "Классический внешний вид",
        "Не отражают свет",
        "Лёгкий уход",
        "Подходят для любых помещений",
      ],
      useCase: "Спальня / Детская / Коридор",
      imageSrc: matteImg,
    },
    {
      id: "glossy",
      title: "Глянцевые полотна",
      bullets: [
        "Визуально увеличивают высоту",
        "Отражающий эффект",
        "Подходят для небольших помещений",
        "Современный стиль",
      ],
      useCase: "Ванная / Кухня / Гостиная",
      imageSrc: glossyImg,
    },
    {
      id: "satin",
      title: "Сатиновые полотна",
      bullets: [
        "Лёгкий блеск",
        "Без отражения",
        "Эстетичный внешний вид",
        "Универсальное решение",
      ],
      useCase: "Спальня / Гостиная / Кабинет",
      imageSrc: satinImg,
    },
    {
      id: "fireproof",
      title: "Пожаробезопасные полотна",
      bullets: [
        "Соответствие нормам безопасности",
        "Долговечность",
        "Экологичность",
        "Подходят для жилых помещений",
      ],
      useCase: "Любые жилые помещения",
      imageSrc: fireproofImg,
    },
  ],
};

const ProductsCatalogSection = ({ onOpenForm }: ProductsCatalogSectionProps) => {
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const activeItems = itemsByCategory[activeTab];

  return (
    <section className="py-14 md:py-16 bg-secondary/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Каталог продукции
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Профильные системы, освещение и полотна
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        {/* Tabs — horizontal scroll on mobile */}
        <div className="reveal flex overflow-x-auto no-scrollbar gap-3 mb-8 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`font-body text-sm sm:text-base px-5 py-2.5 rounded-xl border transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Cards with fade animation */}
        <div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up"
        >
          {activeItems.map((item, i) => (
            <div
              key={item.id}
              className="premium-card bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 flex flex-col"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-1.5 mb-3 flex-1">
                  {item.bullets.map((b) => (
                    <li
                      key={b}
                      className="font-body text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-gold mt-1 text-xs">●</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xs text-muted-foreground/70 mb-4">
                  Подходит для:{" "}
                  <span className="text-foreground/70">{item.useCase}</span>
                </p>
                <Button
                  onClick={onOpenForm}
                  variant="outline"
                  className="w-full rounded-lg border-primary/20 text-primary font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Уточнить стоимость
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsCatalogSection;
