import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FloatingAskMe() {
  return (
    <Link
      href="/ask-me"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full
                 border border-ochre/70 bg-ochre text-void shadow-[0_8px_28px_-8px_rgba(215,166,58,0.7)]
                 transition hover:scale-105 hover:brightness-110"
      aria-label="Ask Me"
      title="Ask Me"
    >
      <MessageCircle size={22} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}
