import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import interiorImg from "@/assets/interior-transform.jpg";

interface TransformSectionProps {
  onOpenForm: () => void;
}

const TransformSection = ({ onOpenForm }: TransformSectionProps) => {
  const ref = useScrollReveal();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${interiorImg})` }}
      />
      <div className="absolute inset-0 bg-foreground/50" />

      <div className="relative z-10 text-center px-6 max-w-3xl reveal">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
          Ваш потолок — главный элемент интерьера
        </h2>
        <p className="font-body text-lg sm:text-xl text-primary-foreground/70 mb-8">
          Сделайте его современным
        </p>
        <Button
          onClick={onOpenForm}
          size="lg"
          className="h-14 px-10 rounded-xl bg-primary-foreground text-primary font-body font-semibold text-lg transition-all duration-400 hover:scale-[1.03] hover:shadow-2xl"
        >
          Получить дизайн-консультацию
        </Button>
      </div>
    </section>
  );
};

export default TransformSection;
