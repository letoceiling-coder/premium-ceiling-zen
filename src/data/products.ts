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

export interface Product {
  id: string;
  title: string;
  bullets: string[];
  brand: string;
  brandSlug: string;
  category: "profiles" | "lighting" | "control" | "canvas";
  price: string;
  imageSrc: string;
}

export const products: Product[] = [
  // ─── Профильные системы ───
  {
    id: "pk5",
    title: "Карниз ПК-5",
    bullets: ["Встроенная система скрытого карниза", "Возможность интеграции подсветки", "Чистое примыкание без вставок"],
    brand: "KRAAB / LumFer",
    brandSlug: "kraab",
    category: "profiles",
    price: "от 2 500 ₽ / пог.м",
    imageSrc: pk5Img,
  },
  {
    id: "pk14",
    title: "Карниз ПК-14",
    bullets: ["Усиленный профиль", "Подходит для тяжёлых штор", "Возможность LED подсветки"],
    brand: "KRAAB / LumFer",
    brandSlug: "kraab",
    category: "profiles",
    price: "от 3 200 ₽ / пог.м",
    imageSrc: pk14Img,
  },
  {
    id: "shadow-profile",
    title: "Теневой профиль",
    bullets: ["Равномерный теневой зазор", "Минималистичный дизайн", "Без декоративных вставок"],
    brand: "KRAAB SYSTEMS",
    brandSlug: "kraab",
    category: "profiles",
    price: "от 1 800 ₽ / пог.м",
    imageSrc: shadowProfileImg,
  },
  {
    id: "floating-profile",
    title: "Парящий профиль",
    bullets: ["LED подсветка по периметру", 'Эффект "парящего потолка"', "Управление яркостью"],
    brand: "LumFer",
    brandSlug: "lumfer",
    category: "profiles",
    price: "от 2 900 ₽ / пог.м",
    imageSrc: floatingProfileImg,
  },
  {
    id: "light-lines-profile",
    title: "Профиль для световых линий",
    bullets: ["Встраиваемые световые модули", "Равномерное освещение", "Можно как основное освещение"],
    brand: "Flexy",
    brandSlug: "flexy",
    category: "profiles",
    price: "от 3 500 ₽ / пог.м",
    imageSrc: lightLinesProfileImg,
  },
  {
    id: "niche-backlight",
    title: "Ниши под скрытую подсветку",
    bullets: ["Архитектурное решение", "Мягкий рассеянный свет", "Совмещение с карнизами"],
    brand: "Apply",
    brandSlug: "apply",
    category: "profiles",
    price: "от 2 200 ₽ / пог.м",
    imageSrc: nicheImg,
  },

  // ─── Свет / LED ───
  {
    id: "led-strip",
    title: "LED-лента премиум класса",
    bullets: ["Высокая плотность диодов", "Без мерцания", "Долговечность"],
    brand: "Arlight",
    brandSlug: "arlight",
    category: "lighting",
    price: "от 450 ₽ / м",
    imageSrc: ledStripImg,
  },
  {
    id: "led-lines",
    title: "Световые линии LED",
    bullets: ["Встраиваемые модули", "Равномерное освещение", "Замена люстры"],
    brand: "Arlight",
    brandSlug: "arlight",
    category: "lighting",
    price: "от 3 800 ₽ / м",
    imageSrc: ledLinesImg,
  },
  {
    id: "power-supply",
    title: "Блок питания LED",
    bullets: ["Защита от перегрева", "Стабильное напряжение", "Подходит для световых линий"],
    brand: "SWG",
    brandSlug: "swg",
    category: "lighting",
    price: "от 1 200 ₽",
    imageSrc: powerSupplyImg,
  },
  {
    id: "track-system",
    title: "Магнитная трековая система",
    bullets: ["Свободное перемещение светильников", "Современный стиль", "Модульная система"],
    brand: "Gauss",
    brandSlug: "gauss",
    category: "lighting",
    price: "от 6 500 ₽ за комплект",
    imageSrc: trackSystemImg,
  },

  // ─── Управление ───
  {
    id: "dimmer",
    title: "Диммируемая система управления",
    bullets: ["Регулировка яркости", "Управление пультом", "Сценарии освещения"],
    brand: "Arlight",
    brandSlug: "arlight-control",
    category: "control",
    price: "от 2 800 ₽",
    imageSrc: dimmerImg,
  },

  // ─── Полотна ───
  {
    id: "matte-canvas",
    title: "Матовые полотна",
    bullets: ["Классический внешний вид", "Не отражают свет", "Лёгкий уход"],
    brand: "Pongs",
    brandSlug: "",
    category: "canvas",
    price: "от 550 ₽ / м²",
    imageSrc: matteImg,
  },
  {
    id: "glossy-canvas",
    title: "Глянцевые полотна",
    bullets: ["Визуально увеличивают высоту", "Отражающий эффект", "Современный стиль"],
    brand: "Pongs",
    brandSlug: "",
    category: "canvas",
    price: "от 650 ₽ / м²",
    imageSrc: glossyImg,
  },
  {
    id: "satin-canvas",
    title: "Сатиновые полотна",
    bullets: ["Лёгкий блеск", "Без отражения", "Универсальное решение"],
    brand: "Pongs",
    brandSlug: "",
    category: "canvas",
    price: "от 700 ₽ / м²",
    imageSrc: satinImg,
  },
  {
    id: "fireproof-canvas",
    title: "Пожаробезопасные полотна",
    bullets: ["Соответствие нормам безопасности", "Долговечность", "Экологичность"],
    brand: "Pongs",
    brandSlug: "",
    category: "canvas",
    price: "от 850 ₽ / м²",
    imageSrc: fireproofImg,
  },
];

export const productCategories = [
  { id: "profiles", name: "Профильные системы" },
  { id: "lighting", name: "Свет / LED" },
  { id: "control", name: "Управление" },
  { id: "canvas", name: "Полотна" },
] as const;

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brandSlug === brandSlug);
}

export function getUniqueBrands(category?: string): string[] {
  const filtered = category ? products.filter((p) => p.category === category) : products;
  return [...new Set(filtered.map((p) => p.brand))];
}
