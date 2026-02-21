import { MapPin, Clock, Phone } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";

const HeaderTopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-xs sm:text-sm font-body">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-5">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="text-primary-foreground/80">{CONTACTS.address}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="text-primary-foreground/80">{CONTACTS.schedule}</span>
          </span>
        </div>
        <a
          href={CONTACTS.phoneTel}
          className="flex items-center gap-1.5 font-semibold tracking-wide hover:text-gold transition-colors duration-300"
        >
          <Phone className="w-3.5 h-3.5" />
          {CONTACTS.phone}
        </a>
      </div>
    </div>
  );
};

export default HeaderTopBar;
