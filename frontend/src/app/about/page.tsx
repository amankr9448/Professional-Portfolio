import profile from "@/content/profile.json";
import Reveal from "@/components/Reveal";

const steps = ["Problem", "Constraints", "Alternatives", "Trade-offs", "Decision", "Implementation", "Measurement", "Learning"];

export default function About() {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">/ engineering philosophy</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-paper lg:text-5xl">About</h1>
      <Reveal>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/70">{profile.summary}</p>
      </Reveal>

      <Reveal className="mt-14">
        <div className="flex items-center gap-3"><span className="section-label">01</span><h2 className="section-label">How I think</h2><div className="h-px flex-1 bg-line" /></div>
        <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-sm text-paper/60">
          {steps.map((step, i) => <span key={step} className="flex items-center gap-2"><span className="rounded-md border border-line bg-surface px-3 py-1.5">{step}</span>{i < steps.length - 1 && <span className="text-slate">→</span>}</span>)}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-line bg-surface p-5"><p className="section-label">Performance</p><p className="mt-2 text-sm leading-relaxed text-paper/70">I look for measurable system behavior: query latency, database load, request volume and cost. At Genpact, SQL/indexing work reduced query execution time by 60%, while Redis caching reduced database read load by 40%.</p></article>
          <article className="rounded-xl border border-line bg-surface p-5"><p className="section-label">Scale</p><p className="mt-2 text-sm leading-relaxed text-paper/70">I prefer separating concerns when workloads demand it: durable storage, secure structured queries and search can use different infrastructure while a stable API keeps clients insulated from those choices.</p></article>
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <div className="flex items-center gap-3"><span className="section-label">02</span><h2 className="section-label">Current focus</h2><div className="h-px flex-1 bg-line" /></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {profile.currentlyBuilding.map((item) => <div key={item} className="border-l-2 border-ochre bg-surface px-4 py-4 text-sm leading-relaxed text-paper/70">{item}</div>)}
        </div>
      </Reveal>
    </div>
  );
}
