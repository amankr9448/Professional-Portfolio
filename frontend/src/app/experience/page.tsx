import experience from "@/content/experience.json";
import Reveal from "@/components/Reveal";
import TechPill from "@/components/TechPill";

export default function Experience() {
  return (
    <div>
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">/ production record</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-paper lg:text-5xl">Experience</h1>
        <p className="mt-4 max-w-2xl text-paper/60">Backend systems, data platforms and measurable performance work from enterprise production environments.</p>
      </div>

      <ol className="mt-12 space-y-12">
        {experience.map((role, i) => (
          <Reveal key={role.id} delayMs={i * 80}>
            <li id={role.id} className="relative border-l border-line pl-7 scroll-mt-24">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-steel ring-4 ring-void" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-mono text-xs text-steel">{role.duration}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-slate">{role.location}</p>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-paper">{role.position}</h2>
              <p className="mt-1 font-mono text-sm text-paper/60">{role.company}{role.account ? ` · ${role.account}` : ""}</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-paper/70">{role.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {role.technologies.map((tech) => <TechPill key={tech} name={tech} />)}
              </div>

              <div className="mt-7 grid gap-3">
                {role.impact.map((item, idx) => (
                  <article key={idx} className="rounded-xl border border-line bg-surface p-4 lg:p-5">
                    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.2fr_0.9fr]">
                      <div><p className="section-label">Problem</p><p className="mt-1 text-sm leading-relaxed text-paper/65">{item.problem}</p></div>
                      <div><p className="section-label">Action</p><p className="mt-1 text-sm leading-relaxed text-paper/75">{item.action}</p></div>
                      <div><p className="section-label">Result</p><p className="mt-1 text-sm leading-relaxed text-paper">{item.result}</p></div>
                    </div>
                  </article>
                ))}
              </div>

              {role.projects.length > 0 && (
                <div className="mt-8">
                  <p className="section-label">Selected client systems</p>
                  <div className="mt-3 space-y-4">
                    {role.projects.map((project) => (
                      <article key={project.name} className="rounded-xl border border-line p-4 lg:p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h3 className="font-display text-lg text-paper">{project.name}</h3>
                          <span className="font-mono text-[10px] text-slate">{project.outcome}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">{project.technologies.map((tech) => <TechPill key={tech} name={tech} />)}</div>
                        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-paper/70">
                          {project.bullets.map((bullet) => <li key={bullet} className="border-l border-steel/50 pl-3">{bullet}</li>)}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
