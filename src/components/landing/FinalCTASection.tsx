import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FinalCTASectionProps {
  onOpenForm: () => void;
}

const FinalCTASection = ({ onOpenForm }: FinalCTASectionProps) => {
  const ref = useScrollReveal();

  return (
    <section
      className="py-14 md:py-16 bg-gradient-to-br from-accent to-primary text-accent-foreground"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto px-6 text-center reveal">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Получите расчёт стоимости уже сегодня
        </h2>
        <p className="font-body text-lg sm:text-xl text-accent-foreground/70 mb-10">
          Ответим в течение 15 минут
        </p>
        <Button
          onClick={onOpenForm}
          size="lg"
          className="h-14 px-10 rounded-xl bg-primary-foreground text-primary font-body font-semibold text-lg transition-all duration-400 hover:scale-[1.03] hover:shadow-2xl"
        >
          Получить расчёт
        </Button>
      </div>
    </section>
  );
};

export default FinalCTASection;
