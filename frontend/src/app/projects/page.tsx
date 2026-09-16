import Link from "next/link";
import projects from "@/content/projects.json";
import Reveal from "@/components/Reveal";
import TechPill from "@/components/TechPill";

export default function Projects() {
  return (
    <div>
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">/ engineering case files</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-paper lg:text-5xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-paper/60">
          Production work first, then personal systems. Each entry focuses on the problem, architecture, trade-offs and measurable outcome.
        </p>
      </div>

      <div className="mt-10 space-y-7">
        {projects.map((project, i) => (
          <Reveal key={project.id} delayMs={i * 55}>
            <article id={project.id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="border-b border-line px-5 py-4 lg:px-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">CASE {String(i + 1).padStart(2, "0")}</p>
                    <h2 className="mt-2 font-display text-2xl text-paper lg:text-3xl">{project.title}</h2>
                  </div>
                  <span className="rounded-md border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-slate">{project.status}</span>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-paper/70">{project.oneLiner}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => <TechPill key={tech} name={tech} />)}
                </div>
                {project.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
                    {project.metrics.map((metric) => (
                      <div key={metric} className="bg-void px-3 py-2.5 font-mono text-[10px] text-paper/70">{metric}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-6 px-5 py-6 lg:grid-cols-2 lg:px-7">
                <div>
                  <h3 className="section-label">Problem</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{project.problem}</p>
                </div>
                <div>
                  <h3 className="section-label">Solution</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{project.solution}</p>
                </div>
              </div>

              <div className="mx-5 border-t border-line lg:mx-7" />
              <div className="grid gap-6 px-5 py-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-7">
                <div>
                  <h3 className="section-label">Architecture</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{project.architecture}</p>
                  {project.id === "ge-data-archival" && (
                    <div className="mt-5 space-y-4">
                      <div className="rounded-xl border border-line bg-void p-4">
                        <p className="section-label">Controlled export flow</p>
                        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] text-paper/75">
                          {["User", "Django API", "Authorization", "AWS Lambda", "Protected Storage", "Decryption", "Django Streaming", "User"].map((step, index) => (
                            <span key={`${step}-${index}`} className="flex items-center gap-2">
                              <span className="rounded-md border border-steel/40 bg-surface px-2 py-1">{step}</span>
                              {index < 7 && <span className="text-ochre">→</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-line bg-void p-4">
                        <p className="section-label">Protected-data query flow</p>
                        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] text-paper/75">
                          {["User", "Django API", "Authorization / RLS", "Athena", "Trigram Filtering", "Results"].map((step, index) => (
                            <span key={step} className="flex items-center gap-2">
                              <span className="rounded-md border border-steel/40 bg-surface px-2 py-1">{step}</span>
                              {index < 5 && <span className="text-ochre">→</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {"security" in project && (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="section-label">Security</h3>
                        <p className="mt-2 text-sm leading-relaxed text-paper/70">{project.security}</p>
                      </div>
                      <div>
                        <h3 className="section-label">Data & search strategy</h3>
                        <p className="mt-2 text-sm leading-relaxed text-paper/70">{project.dataStrategy}</p>
                      </div>
                    </div>
                  )}
                  {project.decisions.length > 0 && (
                    <div className="mt-5 rounded-xl border border-line bg-void p-4">
                      <h3 className="section-label">Trade-offs</h3>
                      <div className="mt-3 space-y-4">
                        {project.decisions.map((decision, idx) => (
                          <div key={idx}>
                            <p className="font-mono text-xs text-paper/90">{decision.question}</p>
                            <p className="mt-1 text-sm leading-relaxed text-paper/60">{decision.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="section-label">Outcome</h3>
                  {"scale" in project && <><h3 className="mt-2 section-label">Scale</h3><p className="mt-2 text-sm leading-relaxed text-paper/70">{project.scale}</p></>}
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{project.lessons}</p>
                </div>
              </div>

              {project.id === "this-portfolio" && (
                <div className="border-t border-line bg-void/40 px-5 py-4 lg:px-7">
                  <Link href="/experience" className="evidence-link font-mono text-xs">View production experience behind the stack</Link>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
