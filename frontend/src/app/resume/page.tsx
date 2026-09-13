import Link from "next/link";
import profile from "@/content/profile.json";
import experience from "@/content/experience.json";
import skills from "@/content/skills.json";
import Reveal from "@/components/Reveal";
import TechPill from "@/components/TechPill";

export default function Resume() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">/ candidate brief</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-paper lg:text-5xl">Resume</h1>
        </div>
        <a href="/resume.pdf" download className="evidence-link font-mono text-sm">Download PDF</a>
      </div>

      <Reveal className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-2xl border border-line bg-surface p-6 lg:p-7">
          <p className="section-label">Profile</p>
          <p className="mt-3 text-base leading-relaxed text-paper/75">{profile.summary}</p>
        </section>
        <section className="rounded-2xl border border-line bg-surface p-6 lg:p-7">
          <p className="section-label">Education</p>
          <h2 className="mt-3 font-display text-lg text-paper">{profile.education.institution}</h2>
          <p className="mt-1 text-sm text-paper/65">{profile.education.degree}</p>
          <p className="mt-3 font-mono text-xs text-slate">{profile.education.years} · {profile.education.score}</p>
        </section>
      </Reveal>

      <Reveal className="mt-6 rounded-2xl border border-line bg-surface p-6 lg:p-7">
        <p className="section-label">Experience</p>
        <div className="mt-5 space-y-6">
          {experience.map((role) => (
            <div key={role.id} className="border-b border-line pb-5 last:border-0 last:pb-0">
              <div className="flex flex-wrap justify-between gap-2">
                <div><h2 className="font-display text-xl text-paper">{role.position}</h2><p className="mt-1 text-sm text-paper/60">{role.company}{role.account ? ` · ${role.account}` : ""}</p></div>
                <p className="font-mono text-xs text-slate">{role.duration}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">{role.summary}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-6 rounded-2xl border border-line bg-surface p-6 lg:p-7">
        <div className="flex items-center justify-between"><p className="section-label">Technical stack</p><Link href="/skills" className="evidence-link font-mono text-xs">Full capability index</Link></div>
        <div className="mt-5 flex flex-wrap gap-2">{skills.map((skill) => <TechPill key={skill.id} name={skill.name} />)}</div>
      </Reveal>

      <Reveal className="mt-6 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-6"><p className="section-label">Certifications</p><ul className="mt-4 space-y-2 text-sm text-paper/70">{profile.certifications.map((item) => <li key={item} className="border-l border-steel/50 pl-3">{item}</li>)}</ul></section>
        <section className="rounded-2xl border border-line bg-surface p-6"><p className="section-label">Achievements & profiles</p><ul className="mt-4 space-y-2 text-sm text-paper/70"><li className="border-l border-steel/50 pl-3">HackWithInfy 2022 Qualified</li><li className="border-l border-steel/50 pl-3"><a className="evidence-link" href={profile.contact.leetcode} target="_blank" rel="noreferrer">LeetCode</a> · <a className="evidence-link" href={profile.contact.geeksforgeeks} target="_blank" rel="noreferrer">GeeksForGeeks</a></li></ul></section>
      </Reveal>
    </div>
  );
}
