import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const GallerySection = () => {
  const ref = useScrollReveal();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section className="py-14 md:py-16 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Галерея работ
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="masonry">
          {images.map((img, i) => (
            <div
              key={i}
              className="reveal cursor-pointer overflow-hidden rounded-xl group"
              style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={() => setLightboxImg(img)}
            >
              <img
                src={img}
                alt={`Натяжной потолок ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightboxImg} onOpenChange={() => setLightboxImg(null)}>
        <DialogContent className="max-w-4xl p-2 bg-foreground/95 border-none rounded-xl">
          {lightboxImg && (
            <img
              src={lightboxImg}
              alt="Просмотр работы"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
