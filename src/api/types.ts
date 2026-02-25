// ─── Base ────────────────────────────────────────────────
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// ─── Auth ────────────────────────────────────────────────
export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: "super_admin" | "editor";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

// ─── Media ───────────────────────────────────────────────
export interface MediaItem {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  alt?: string;
  created_at: string;
}

// ─── Page / Section ──────────────────────────────────────
export type SectionType =
  | "hero"
  | "about"
  | "catalog_grid"
  | "cta"
  | "testimonials"
  | "faq"
  | "advantages"
  | "brands"
  | "slider"
  | "text_block"
  | "custom";

export interface Section {
  id: number;
  page_id: number;
  type: SectionType;
  title: string;
  subtitle?: string;
  description?: string;
  content_json: Record<string, unknown>;
  media: MediaItem[];
  order: number;
  is_active: boolean;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  is_published: boolean;
  order: number;
  template_type: string;
  sections: Section[];
}

// ─── Product ─────────────────────────────────────────────
export interface Product {
  id: number;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  price?: number;
  old_price?: number;
  sku?: string;
  category_id?: number;
  brand_id?: number;
  images: MediaItem[];
  attributes: { key: string; value: string }[];
  is_published: boolean;
  is_featured: boolean;
  order: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_image?: string;
  canonical_url?: string;
}

// ─── Category ────────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  image?: string;
  description?: string;
  order: number;
  is_active: boolean;
  children?: Category[];
}

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
}

// ─── Brand ───────────────────────────────────────────────
export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  website?: string;
  is_active: boolean;
}

// ─── Blog ────────────────────────────────────────────────
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  cover_image?: string;
  gallery: MediaItem[];
  is_published: boolean;
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

// ─── Testimonial ─────────────────────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  position?: string;
  avatar?: string;
  text: string;
  rating: number;
  order: number;
  is_active: boolean;
}

// ─── FAQ ─────────────────────────────────────────────────
export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
}

// ─── Navigation ──────────────────────────────────────────
export interface NavigationItem {
  id: number;
  label: string;
  url: string;
  parent_id?: number | null;
  order: number;
  is_active: boolean;
  group: "header" | "footer" | "mobile";
  children?: NavigationItem[];
}

// ─── Settings ────────────────────────────────────────────
export interface SiteSettings {
  logo?: string;
  favicon?: string;
  site_name: string;
  contacts: {
    address: string;
    phone: string;
    email: string;
  };
  socials: { platform: string; url: string }[];
  footer_text?: string;
  head_scripts?: string;
  body_scripts?: string;
  analytics_id?: string;
}

// ─── Service ─────────────────────────────────────────────
export interface Service {
  id: number;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  icon?: string;
  image?: string;
  price?: string;
  order: number;
  is_active: boolean;
}
