import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import CatalogSection from "@/components/landing/CatalogSection";
import TransformSection from "@/components/landing/TransformSection";
import GallerySection from "@/components/landing/GallerySection";
import SalesSection from "@/components/landing/SalesSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import RequestForm from "@/components/landing/RequestForm";

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <HeroSection onOpenForm={() => setFormOpen(true)} />
      <WhyUsSection />
      <CatalogSection />
      <TransformSection onOpenForm={() => setFormOpen(true)} />
      <GallerySection />
      <SalesSection onOpenForm={() => setFormOpen(true)} />
      <FinalCTASection onOpenForm={() => setFormOpen(true)} />
      <RequestForm open={formOpen} onOpenChange={setFormOpen} />
    </main>
  );
};

export default Index;
