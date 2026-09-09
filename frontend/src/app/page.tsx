import Link from "next/link";
import profile from "@/content/profile.json";
import skills from "@/content/skills.json";
import projects from "@/content/projects.json";
import Reveal from "@/components/Reveal";
import ProfilePhoto from "@/components/ProfilePhoto";
import SocialRow from "@/components/SocialRow";
import TechPill from "@/components/TechPill";

const featuredProjects = projects.slice(0, 5);
const coreSkills = skills.filter((skill) => ["python", "django", "postgresql", "redis", "aws", "docker"].includes(skill.id));

export default function Home() {
  return (
    <div>
      <section className="relative -mt-16 overflow-hidden pt-16 lg:-mt-24 lg:pt-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 hero-glow" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">Backend / Systems Engineer</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.02] text-paper lg:text-7xl">{profile.name}</h1>
            <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-slate">{profile.positioning}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/65">{profile.summary}</p>
            <div className="mt-7"><SocialRow /></div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/resume" className="rounded-lg bg-paper px-5 py-3 font-mono text-sm font-medium text-void transition hover:brightness-90">View resume</Link>
              <Link href="/projects" className="rounded-lg border border-line bg-surface/60 px-5 py-3 font-mono text-sm text-paper/80 transition hover:border-steel hover:text-paper">Explore engineering work</Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 -z-10 border border-line/70" />
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
                <ProfilePhoto className="h-full w-full" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg border border-line bg-void px-3 py-2 font-mono text-[10px] text-slate">BENGALURU / INDIA</div>
              <div className="absolute -right-4 -top-4 rounded-lg border border-line bg-void px-3 py-2 font-mono text-[10px] text-steel">OPEN TO 50LPA+ ROLES</div>
            </div>
          </div>
        </div>
      </section>

      <Reveal className="mt-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {profile.metrics.map((metric) => (
            <div key={metric.label} className="bg-surface px-4 py-5">
              <p className="font-display text-2xl text-paper">{metric.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-slate">{metric.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <div className="flex items-center gap-3"><span className="section-label">01</span><h2 className="section-label">Core stack</h2><div className="h-px flex-1 bg-line" /></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coreSkills.map((skill) => (
            <Link key={skill.id} href={`/skills#${skill.id}`} className="lift rounded-xl border border-line bg-surface p-4">
              <TechPill name={skill.name} />
              <p className="mt-3 text-xs leading-relaxed text-paper/55">{skill.evidence[0].label}</p>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <div className="flex items-center gap-3"><span className="section-label">02</span><h2 className="section-label">Currently building</h2><div className="h-px flex-1 bg-line" /></div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {profile.currentlyBuilding.map((item, i) => <div key={item} className="border-l-2 border-ochre bg-surface px-4 py-4 text-sm leading-relaxed text-paper/75"><span className="font-mono text-[10px] text-slate">0{i + 1}</span><p className="mt-2">{item}</p></div>)}
        </div>
      </Reveal>

      <section className="mt-20">
        <div className="flex items-center gap-3"><span className="section-label">03</span><h2 className="section-label">Selected engineering work</h2><div className="h-px flex-1 bg-line" /></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delayMs={i * 60}>
              <Link href={`/projects#${project.id}`} className="lift group block h-full rounded-2xl border border-line bg-surface p-5 lg:p-6">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-wide text-slate">CASE {String(i + 1).padStart(2, "0")}</span><span className="font-mono text-[10px] text-steel">{project.status}</span></div>
                <h3 className="mt-5 font-display text-xl text-paper">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{project.oneLiner}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.technologies.slice(0, 4).map((tech) => <TechPill key={tech} name={tech} />)}</div>
                <span className="mt-6 inline-flex font-mono text-xs text-steel opacity-80 group-hover:text-paper">Open case file →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
