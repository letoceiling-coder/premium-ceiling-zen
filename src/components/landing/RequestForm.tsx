import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

interface RequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RequestForm = ({ open, onOpenChange }: RequestFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
      setComment("");
      onOpenChange(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl border-border/50 shadow-2xl bg-card p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">
            Оставить заявку
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            Заполните форму и мы свяжемся с вами в ближайшее время
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <CheckCircle className="w-16 h-16 text-primary" />
            <p className="text-xl font-display text-foreground text-center">
              Спасибо! Мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
            <Input
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 rounded-lg border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:border-primary text-base"
            />
            <Input
              placeholder="Телефон"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="h-12 rounded-lg border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:border-primary text-base"
            />
            <Textarea
              placeholder="Комментарий (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-lg border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:border-primary text-base min-h-[100px]"
            />
            <Button
              type="submit"
              size="lg"
              className="h-14 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-lg tracking-wide hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
            >
              Отправить заявку
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestForm;
