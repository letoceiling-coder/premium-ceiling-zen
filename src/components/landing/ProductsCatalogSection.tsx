import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";

interface ProductsCatalogSectionProps {
  onOpenForm: () => void;
}

const categories = [
  {
    id: "profiles",
    name: "Профильные системы",
    items: [
      {
        title: "Теневой профиль",
        facts: ["Зазор 8–10 мм", "Стильное примыкание без плинтуса", "Совместим с любым полотном"],
        rooms: "гостиная, спальня, коридор",
      },
      {
        title: "Парящий профиль",
        facts: ["LED-подсветка по периметру", "Эффект «парения»", "Регулировка яркости"],
        rooms: "гостиная, кухня, детская",
      },
      {
        title: "Профили под световые линии",
        facts: ["Встраиваются в полотно", "Ширина от 2 до 20 см", "Геометрия любой сложности"],
        rooms: "кухня, гостиная, офис",
      },
      {
        title: "Карнизы ПК-5",
        facts: ["Накладной монтаж", "Скрытая ниша для штор", "Компактный профиль"],
        rooms: "гостиная, спальня",
      },
      {
        title: "Карнизы ПК-14",
        facts: ["Встроенная подсветка", "Широкая ниша", "Премиальный вид"],
        rooms: "гостиная, спальня, кабинет",
      },
    ],
  },
  {
    id: "lighting",
    name: "Световые решения",
    items: [
      {
        title: "Световые линии (LED)",
        facts: ["Мощность до 20 Вт/м", "Тёплый / нейтральный / холодный свет", "Замена основного освещения"],
        rooms: "кухня, коридор, гостиная",
      },
      {
        title: "Ленты и блоки питания",
        facts: ["Класс защиты IP20 / IP65", "Срок службы 50 000 ч", "Диммирование / RGB"],
        rooms: "любые помещения",
      },
      {
        title: "Трековые системы",
        facts: ["Перемещаемые светильники", "Чёрный / белый трек", "Альтернатива люстрам"],
        rooms: "кухня, гостиная, студия",
      },
    ],
  },
  {
    id: "fabrics",
    name: "Полотна",
    items: [
      {
        title: "Матовые полотна",
        facts: ["Классический вид", "Без бликов", "Ширина до 5 м"],
        rooms: "спальня, детская, коридор",
      },
      {
        title: "Глянцевые полотна",
        facts: ["Зеркальный эффект", "Визуально увеличивает пространство", "Палитра 150+ цветов"],
        rooms: "ванная, кухня, гостиная",
      },
      {
        title: "Сатиновые полотна",
        facts: ["Лёгкий перламутровый блеск", "Мягкая текстура", "Универсальный выбор"],
        rooms: "спальня, гостиная, кабинет",
      },
    ],
  },
];

const ProductsCatalogSection = ({ onOpenForm }: ProductsCatalogSectionProps) => {
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-20 md:py-28 bg-secondary/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Каталог продукции
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Профильные системы, освещение и полотна
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        {/* Tabs */}
        <div className="reveal flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`font-body text-sm sm:text-base px-5 py-2.5 rounded-xl border transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.items.map((item, i) => (
            <div
              key={item.title}
              className="reveal premium-card bg-card rounded-xl p-6 shadow-sm border border-border/50 flex flex-col"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">{item.title}</h3>
              <ul className="space-y-2 mb-4 flex-1">
                {item.facts.map((f) => (
                  <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-gold mt-1 text-xs">●</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs text-muted-foreground/70 mb-4">
                Подходит для: <span className="text-foreground/70">{item.rooms}</span>
              </p>
              <Button
                onClick={onOpenForm}
                variant="outline"
                className="w-full rounded-lg border-primary/20 text-primary font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Уточнить стоимость
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsCatalogSection;
