import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import videoPoster from "@/assets/video-poster.jpg";

interface VideoShowcaseSectionProps {
  onOpenForm: () => void;
}

const features = [
  "Световые линии",
  "Парящие потолки",
  "Теневой профиль",
  "Карнизы ПК-5 / ПК-14",
];

const VideoShowcaseSection = ({ onOpenForm }: VideoShowcaseSectionProps) => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Современные решения
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Натяжные потолки нового поколения
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/30">
            <video
              className="w-full aspect-video object-cover"
              poster={videoPoster}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/video/ceiling.mp4" type="video/mp4" />
            </video>
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4">
              <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                <Play className="w-4 h-4 text-primary-foreground" />
                <span className="font-body text-xs text-primary-foreground/80">Автовоспроизведение</span>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              Световые линии, парящие потолки, теневой профиль
            </h3>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                  <span className="font-body text-lg text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={onOpenForm}
              size="lg"
              className="w-full sm:w-auto h-14 px-10 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-lg transition-all duration-400 hover:scale-[1.03] hover:shadow-xl mt-2"
            >
              Хочу такой потолок
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
