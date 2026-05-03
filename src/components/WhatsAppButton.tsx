import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "15550102024";
  const msg = encodeURIComponent("Hi Atlas Offroad — I'd like to know more about an ATV.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-glow flex items-center justify-center hover:scale-110 transition animate-float"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
