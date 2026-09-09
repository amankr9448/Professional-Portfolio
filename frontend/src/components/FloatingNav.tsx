"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import profile from "@/content/profile.json";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-50 flex lg:hidden -translate-x-1/2 items-center gap-1
                 rounded-full border border-line bg-surface/80 px-2 py-2
                 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]
                 max-w-[calc(100vw-2rem)] overflow-x-auto"
      aria-label="Primary"
    >
      <Link
        href="/"
        className="hidden sm:flex shrink-0 items-center justify-center h-9 w-9 rounded-full
                   bg-steel/20 font-mono text-xs text-paper mr-1"
        aria-label={profile.name}
      >
        {profile.name
          .split(" ")
          .map((w) => w[0])
          .join("")}
      </Link>
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-full px-4 py-2 font-mono text-xs transition-colors ${
              active
                ? "bg-paper text-void"
                : "text-paper/70 hover:text-paper hover:bg-surface-hover"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <Link
        href="/contact"
        className="shrink-0 rounded-full bg-ochre px-4 py-2 font-mono text-xs font-medium text-void ml-1
                   hover:brightness-110 transition-[filter]"
      >
        Contact
      </Link>
    </nav>
  );
}
