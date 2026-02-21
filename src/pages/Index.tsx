import { useState } from "react";
import HeaderTopBar from "@/components/landing/HeaderTopBar";
import HeroSection from "@/components/landing/HeroSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import VideoShowcaseSection from "@/components/landing/VideoShowcaseSection";
import CatalogSection from "@/components/landing/CatalogSection";
import ProductsCatalogSection from "@/components/landing/ProductsCatalogSection";
import BrandsSection from "@/components/landing/BrandsSection";
import TransformSection from "@/components/landing/TransformSection";
import GallerySection from "@/components/landing/GallerySection";
import SalesSection from "@/components/landing/SalesSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import ContactsSection from "@/components/landing/ContactsSection";
import Footer from "@/components/landing/Footer";
import RequestForm from "@/components/landing/RequestForm";

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <HeaderTopBar />
      <HeroSection onOpenForm={() => setFormOpen(true)} />
      <WhyUsSection />
      <VideoShowcaseSection onOpenForm={() => setFormOpen(true)} />
      <CatalogSection />
      <ProductsCatalogSection onOpenForm={() => setFormOpen(true)} />
      <BrandsSection />
      <TransformSection onOpenForm={() => setFormOpen(true)} />
      <GallerySection />
      <SalesSection onOpenForm={() => setFormOpen(true)} />
      <ContactsSection />
      <FinalCTASection onOpenForm={() => setFormOpen(true)} />
      <Footer />
      <RequestForm open={formOpen} onOpenChange={setFormOpen} />
    </main>
  );
};

export default Index;
