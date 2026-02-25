import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const pageSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  slug: z.string().min(1, "Обязательное поле"),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  is_published: z.boolean(),
  template_type: z.string().default("default"),
});

export const sectionSchema = z.object({
  type: z.string().min(1),
  title: z.string().min(1, "Обязательное поле"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  is_active: z.boolean(),
  order: z.number(),
});

export const productSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  slug: z.string().min(1, "Обязательное поле"),
  description: z.string().optional(),
  short_description: z.string().optional(),
  price: z.number().optional(),
  old_price: z.number().optional(),
  sku: z.string().optional(),
  category_id: z.number().optional(),
  brand_id: z.number().optional(),
  is_published: z.boolean(),
  is_featured: z.boolean(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  slug: z.string().min(1, "Обязательное поле"),
  parent_id: z.number().nullable().optional(),
  description: z.string().optional(),
  is_active: z.boolean(),
});

export const brandSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  slug: z.string().min(1, "Обязательное поле"),
  description: z.string().optional(),
  website: z.string().optional(),
  is_active: z.boolean(),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  slug: z.string().min(1, "Обязательное поле"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  is_published: z.boolean(),
  published_at: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  position: z.string().optional(),
  text: z.string().min(1, "Обязательное поле"),
  rating: z.number().min(1).max(5),
  is_active: z.boolean(),
});

export const faqSchema = z.object({
  question: z.string().min(1, "Обязательное поле"),
  answer: z.string().min(1, "Обязательное поле"),
  is_active: z.boolean(),
});

export const navigationItemSchema = z.object({
  label: z.string().min(1, "Обязательное поле"),
  url: z.string().min(1, "Обязательное поле"),
  parent_id: z.number().nullable().optional(),
  group: z.enum(["header", "footer", "mobile"]),
  is_active: z.boolean(),
});

export const settingsSchema = z.object({
  site_name: z.string().min(1),
  contacts: z.object({
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }),
  footer_text: z.string().optional(),
  head_scripts: z.string().optional(),
  body_scripts: z.string().optional(),
  analytics_id: z.string().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  slug: z.string().min(1, "Обязательное поле"),
  description: z.string().optional(),
  short_description: z.string().optional(),
  price: z.string().optional(),
  is_active: z.boolean(),
});
