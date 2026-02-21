import { MapPin, Clock, Phone } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-3">
              Натяжные потолки
            </h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              Премиальные натяжные потолки с установкой за 1 день. Гарантия качества и долговечности более 20 лет.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">{CONTACTS.address}</span>
              </li>
              <li>
                <a
                  href={CONTACTS.phoneTel}
                  className="flex items-center gap-2 hover:text-gold transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="font-semibold">{CONTACTS.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">{CONTACTS.schedule}</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
              <li>Матовые потолки</li>
              <li>Глянцевые потолки</li>
              <li>Парящие потолки</li>
              <li>Световые линии</li>
              <li>Трековые системы</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Натяжные потолки. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
