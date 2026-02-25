import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import BrandPage from "./pages/BrandPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./admin/AuthContext";

// Admin pages (lazy loaded)
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminPages = lazy(() => import("./admin/pages/AdminPages"));
const AdminPageEdit = lazy(() => import("./admin/pages/AdminPageEdit"));
const AdminSections = lazy(() => import("./admin/pages/AdminSections"));
const AdminSectionEdit = lazy(() => import("./admin/pages/AdminSectionEdit"));
const AdminProducts = lazy(() => import("./admin/pages/AdminProducts"));
const AdminProductEdit = lazy(() => import("./admin/pages/AdminProductEdit"));
const AdminCategories = lazy(() => import("./admin/pages/AdminCategories"));
const AdminCategoryEdit = lazy(() => import("./admin/pages/AdminCategoryEdit"));
const AdminBrands = lazy(() => import("./admin/pages/AdminBrands"));
const AdminBrandEdit = lazy(() => import("./admin/pages/AdminBrandEdit"));
const AdminServices = lazy(() => import("./admin/pages/AdminServices"));
const AdminServiceEdit = lazy(() => import("./admin/pages/AdminServiceEdit"));
const AdminBlog = lazy(() => import("./admin/pages/AdminBlog"));
const AdminBlogEdit = lazy(() => import("./admin/pages/AdminBlogEdit"));
const AdminTestimonials = lazy(() => import("./admin/pages/AdminTestimonials"));
const AdminTestimonialEdit = lazy(() => import("./admin/pages/AdminTestimonialEdit"));
const AdminFaq = lazy(() => import("./admin/pages/AdminFaq"));
const AdminFaqEdit = lazy(() => import("./admin/pages/AdminFaqEdit"));
const AdminMedia = lazy(() => import("./admin/pages/AdminMedia"));
const AdminNavigation = lazy(() => import("./admin/pages/AdminNavigation"));
const AdminNavigationEdit = lazy(() => import("./admin/pages/AdminNavigationEdit"));
const AdminSeo = lazy(() => import("./admin/pages/AdminSeo"));
const AdminSettings = lazy(() => import("./admin/pages/AdminSettings"));
const AdminUsers = lazy(() => import("./admin/pages/AdminUsers"));

const queryClient = new QueryClient();

const AdminFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/brands/:slug" element={<BrandPage />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AuthProvider>
                <Suspense fallback={<AdminFallback />}>
                  <AdminLayout />
                </Suspense>
              </AuthProvider>
            }
          >
            <Route index element={<Suspense fallback={<AdminFallback />}><AdminDashboard /></Suspense>} />
            <Route path="pages" element={<Suspense fallback={<AdminFallback />}><AdminPages /></Suspense>} />
            <Route path="pages/create" element={<Suspense fallback={<AdminFallback />}><AdminPageEdit /></Suspense>} />
            <Route path="pages/:id" element={<Suspense fallback={<AdminFallback />}><AdminPageEdit /></Suspense>} />
            <Route path="sections" element={<Suspense fallback={<AdminFallback />}><AdminSections /></Suspense>} />
            <Route path="sections/create" element={<Suspense fallback={<AdminFallback />}><AdminSectionEdit /></Suspense>} />
            <Route path="sections/:id" element={<Suspense fallback={<AdminFallback />}><AdminSectionEdit /></Suspense>} />
            <Route path="products" element={<Suspense fallback={<AdminFallback />}><AdminProducts /></Suspense>} />
            <Route path="products/create" element={<Suspense fallback={<AdminFallback />}><AdminProductEdit /></Suspense>} />
            <Route path="products/:id" element={<Suspense fallback={<AdminFallback />}><AdminProductEdit /></Suspense>} />
            <Route path="categories" element={<Suspense fallback={<AdminFallback />}><AdminCategories /></Suspense>} />
            <Route path="categories/create" element={<Suspense fallback={<AdminFallback />}><AdminCategoryEdit /></Suspense>} />
            <Route path="categories/:id" element={<Suspense fallback={<AdminFallback />}><AdminCategoryEdit /></Suspense>} />
            <Route path="brands" element={<Suspense fallback={<AdminFallback />}><AdminBrands /></Suspense>} />
            <Route path="brands/create" element={<Suspense fallback={<AdminFallback />}><AdminBrandEdit /></Suspense>} />
            <Route path="brands/:id" element={<Suspense fallback={<AdminFallback />}><AdminBrandEdit /></Suspense>} />
            <Route path="services" element={<Suspense fallback={<AdminFallback />}><AdminServices /></Suspense>} />
            <Route path="services/create" element={<Suspense fallback={<AdminFallback />}><AdminServiceEdit /></Suspense>} />
            <Route path="services/:id" element={<Suspense fallback={<AdminFallback />}><AdminServiceEdit /></Suspense>} />
            <Route path="blog" element={<Suspense fallback={<AdminFallback />}><AdminBlog /></Suspense>} />
            <Route path="blog/create" element={<Suspense fallback={<AdminFallback />}><AdminBlogEdit /></Suspense>} />
            <Route path="blog/:id" element={<Suspense fallback={<AdminFallback />}><AdminBlogEdit /></Suspense>} />
            <Route path="testimonials" element={<Suspense fallback={<AdminFallback />}><AdminTestimonials /></Suspense>} />
            <Route path="testimonials/create" element={<Suspense fallback={<AdminFallback />}><AdminTestimonialEdit /></Suspense>} />
            <Route path="testimonials/:id" element={<Suspense fallback={<AdminFallback />}><AdminTestimonialEdit /></Suspense>} />
            <Route path="faq" element={<Suspense fallback={<AdminFallback />}><AdminFaq /></Suspense>} />
            <Route path="faq/create" element={<Suspense fallback={<AdminFallback />}><AdminFaqEdit /></Suspense>} />
            <Route path="faq/:id" element={<Suspense fallback={<AdminFallback />}><AdminFaqEdit /></Suspense>} />
            <Route path="media" element={<Suspense fallback={<AdminFallback />}><AdminMedia /></Suspense>} />
            <Route path="navigation" element={<Suspense fallback={<AdminFallback />}><AdminNavigation /></Suspense>} />
            <Route path="navigation/create" element={<Suspense fallback={<AdminFallback />}><AdminNavigationEdit /></Suspense>} />
            <Route path="navigation/:id" element={<Suspense fallback={<AdminFallback />}><AdminNavigationEdit /></Suspense>} />
            <Route path="seo" element={<Suspense fallback={<AdminFallback />}><AdminSeo /></Suspense>} />
            <Route path="settings" element={<Suspense fallback={<AdminFallback />}><AdminSettings /></Suspense>} />
            <Route path="users" element={<Suspense fallback={<AdminFallback />}><AdminUsers /></Suspense>} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
