import type {
  ApiError,
  PaginatedResponse,
  LoginPayload,
  LoginResponse,
  AuthUser,
  Page,
  Section,
  Product,
  Category,
  CategoryTreeNode,
  Brand,
  BlogPost,
  Testimonial,
  FaqItem,
  NavigationItem,
  SiteSettings,
  MediaItem,
  Service,
} from "./types";

// ─── Config ──────────────────────────────────────────────
const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? "/api";

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

// ─── Helpers ─────────────────────────────────────────────
export function toAbsoluteUrl(path?: string | null): string {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http")) return path;
  const base = API_BASE.replace(/\/api\/?$/, "");
  return `${base}/storage/${path.replace(/^\/+/, "")}`;
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ data: T; error: null } | { data: null; error: ApiError }> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        data: null,
        error: {
          message: body.message ?? "Request failed",
          status: res.status,
          errors: body.errors,
        },
      };
    }
    if (res.status === 204) return { data: null as unknown as T, error: null };
    const json = await res.json();
    return { data: json as T, error: null };
  } catch (e: any) {
    return {
      data: null,
      error: { message: e.message ?? "Network error", status: 0 },
    };
  }
}

// ─── Auth ────────────────────────────────────────────────
export const authApi = {
  login: (p: LoginPayload) =>
    request<LoginResponse>("/admin/login", {
      method: "POST",
      body: JSON.stringify(p),
    }),
  me: () => request<AuthUser>("/admin/me"),
  logout: () => request<void>("/admin/logout", { method: "POST" }),
};

// ─── Generic CRUD ────────────────────────────────────────
function crud<T extends { id: number }>(resource: string) {
  return {
    list: (params?: Record<string, string>) => {
      const qs = params ? "?" + new URLSearchParams(params).toString() : "";
      return request<PaginatedResponse<T>>(`/admin/${resource}${qs}`);
    },
    listAll: () => request<T[]>(`/admin/${resource}?all=1`),
    get: (id: number) => request<T>(`/admin/${resource}/${id}`),
    create: (data: Partial<T> | FormData) =>
      request<T>(`/admin/${resource}`, {
        method: "POST",
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    update: (id: number, data: Partial<T> | FormData) => {
      if (data instanceof FormData) {
        data.append("_method", "PUT");
        return request<T>(`/admin/${resource}/${id}`, {
          method: "POST",
          body: data,
        });
      }
      return request<T>(`/admin/${resource}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    delete: (id: number) =>
      request<void>(`/admin/${resource}/${id}`, { method: "DELETE" }),
    reorder: (ids: number[]) =>
      request<void>(`/admin/${resource}/reorder`, {
        method: "POST",
        body: JSON.stringify({ ids }),
      }),
  };
}

// ─── Resource APIs ───────────────────────────────────────
export const pagesApi = crud<Page>("pages");
export const sectionsApi = crud<Section>("sections");
export const productsApi = crud<Product>("products");
export const categoriesApi = {
  ...crud<Category>("categories"),
  tree: () => request<CategoryTreeNode[]>("/admin/categories/tree"),
};
export const brandsApi = {
  ...crud<Brand>("brands"),
  all: () => request<Brand[]>("/admin/brands?all=1"),
};
export const blogApi = crud<BlogPost>("posts");
export const testimonialsApi = crud<Testimonial>("testimonials");
export const faqApi = crud<FaqItem>("faqs");
export const navigationApi = crud<NavigationItem>("navigation");
export const servicesApi = crud<Service>("services");

export const settingsApi = {
  get: () => request<SiteSettings>("/admin/settings"),
  update: (data: Partial<SiteSettings> | FormData) =>
    request<SiteSettings>("/admin/settings", {
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
};

export const mediaApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<PaginatedResponse<MediaItem>>(`/admin/media${qs}`);
  },
  upload: (file: File, alt?: string) => {
    const fd = new FormData();
    fd.append("file", file);
    if (alt) fd.append("alt", alt);
    return request<MediaItem>("/admin/media", { method: "POST", body: fd });
  },
  delete: (id: number) =>
    request<void>(`/admin/media/${id}`, { method: "DELETE" }),
};
