import Link from "next/link";
import skills from "@/content/skills.json";
import Reveal from "@/components/Reveal";
import TechIcon from "@/components/TechIcon";

const groups = [
  { label: "Languages", categories: ["Language"] },
  { label: "Backend", categories: ["Backend"] },
  { label: "Data & Cloud", categories: ["Data", "Cloud"] },
  { label: "Infrastructure & Distributed", categories: ["Infrastructure", "Distributed"] },
  { label: "Architecture & CS", categories: ["Architecture", "Computer Science"] },
];

export default function Skills() {
  return (
    <div>
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">/ capability index</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-paper lg:text-5xl">Skills</h1>
        <p className="mt-4 max-w-2xl text-paper/60">
          A compact engineering stack, organized around where each capability is used rather than a proficiency score.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {groups.map((group, groupIndex) => {
          const items = skills.filter((skill) => group.categories.includes(skill.category));
          return (
            <Reveal key={group.label} delayMs={groupIndex * 70}>
              <section>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate">0{groupIndex + 1}</span>
                  <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-slate">{group.label}</h2>
                  <div className="h-px flex-1 bg-line" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((skill) => (
                    <article id={skill.id} key={skill.id} className="group rounded-xl border border-line bg-surface p-4 scroll-mt-24 transition-colors hover:border-steel/60">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-void text-steel">
                          <TechIcon name={skill.name} size={18} />
                        </span>
                        <div>
                          <h3 className="font-mono text-sm text-paper">{skill.name}</h3>
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-slate">{skill.category}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        {skill.evidence.map((ev, idx) => (
                          <Link key={idx} href={ev.href} className="evidence-link text-xs leading-relaxed">
                            {ev.label}
                          </Link>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
