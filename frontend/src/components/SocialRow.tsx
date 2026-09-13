import { Mail } from "lucide-react";
import profile from "@/content/profile.json";

const isRealLink = (v: string) => v && !v.startsWith("TODO");

// lucide-react dropped brand/logo marks (Github, Linkedin) -- these are
// small inline SVGs instead, sized to match lucide's 16px/1.75 stroke look.
function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.3-.52-1.5.11-3.13 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.63.24 2.83.12 3.13.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function SocialRow() {
  const links = [
    {
      href: profile.contact.email ? `mailto:${profile.contact.email}` : "",
      raw: profile.contact.email,
      icon: <Mail size={16} strokeWidth={1.75} />,
      label: "Email",
    },
    { href: profile.contact.github, raw: profile.contact.github, icon: <GithubMark />, label: "GitHub" },
    { href: profile.contact.linkedin, raw: profile.contact.linkedin, icon: <LinkedinMark />, label: "LinkedIn" },
    { href: profile.contact.leetcode, raw: profile.contact.leetcode, icon: <span className="font-mono text-[10px] font-semibold">LC</span>, label: "LeetCode" },
    { href: profile.contact.geeksforgeeks, raw: profile.contact.geeksforgeeks, icon: <span className="font-mono text-[10px] font-semibold">GFG</span>, label: "GeeksForGeeks" },
  ].filter((l) => isRealLink(l.raw));

  if (links.length === 0) return null;

  return (
    <div className="flex gap-3">
      {links.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-paper/70 transition-colors hover:border-steel hover:text-paper"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
