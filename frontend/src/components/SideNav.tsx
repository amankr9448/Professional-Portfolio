import Link from "next/link";
import profile from "@/content/profile.json";

const links = [
  { href: "/", label: "Home", code: "00" },
  { href: "/about", label: "About", code: "01" },
  { href: "/experience", label: "Experience", code: "02" },
  { href: "/projects", label: "Projects", code: "03" },
  { href: "/skills", label: "Skills", code: "04" },
  { href: "/resources", label: "Resources", code: "05" },
  { href: "/resume", label: "Resume", code: "06" },
  { href: "/contact", label: "Contact", code: "07" },
];

export default function SideNav() {
  return (
    <header className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-line px-7 py-10">
      <Link href="/" className="group block">
        <span className="font-display text-xl font-semibold text-paper">{profile.name}</span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-slate">{profile.role}</span>
      </Link>

      <div className="mt-12 border-t border-line pt-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">/ portfolio</p>
        <nav className="mt-4 space-y-1" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="group flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-surface hover:text-paper">
              <span className="font-mono text-[9px] text-slate transition-colors group-hover:text-steel">{link.code}</span>
              <span className="font-mono text-xs text-paper/65 group-hover:text-paper">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
