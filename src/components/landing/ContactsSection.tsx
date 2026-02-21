import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";

const ContactsSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-secondary/50" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Контакты
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="reveal bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">Адрес</h3>
                  <p className="font-body text-muted-foreground">{CONTACTS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">Телефон</h3>
                  <a
                    href={CONTACTS.phoneTel}
                    className="font-body text-lg text-foreground font-semibold hover:text-primary transition-colors duration-300"
                  >
                    {CONTACTS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">График работы</h3>
                  <p className="font-body text-muted-foreground">{CONTACTS.schedule}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-lg transition-all duration-400 hover:scale-[1.03] hover:shadow-lg"
              >
                <a href={CONTACTS.phoneTel}>
                  <Phone className="w-5 h-5 mr-2" />
                  Позвонить
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full h-14 rounded-xl border-primary/20 text-primary font-body font-semibold text-lg transition-all duration-400 hover:scale-[1.03] hover:bg-primary hover:text-primary-foreground"
              >
                <a href={CONTACTS.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-5 h-5 mr-2" />
                  Построить маршрут
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
