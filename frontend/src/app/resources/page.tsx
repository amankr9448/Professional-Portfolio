import resources from "@/content/resources.json";
import Reveal from "@/components/Reveal";

export default function Resources() {
  return (
    <div>
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">/ reading shelf</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-paper lg:text-5xl">Resources</h1>
        <p className="mt-4 max-w-2xl text-paper/60">
          A living collection of my writing, coding profiles, favourite blogs, useful posts and books that shape how I build software.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {resources.map((resource, index) => (
          <Reveal key={resource.title} delayMs={index * 55}>
            <a
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="lift group block h-full rounded-2xl border border-line bg-surface p-5 lg:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate">{resource.type}</span>
                <span className="font-mono text-xs text-steel transition-transform group-hover:translate-x-1">↗</span>
              </div>
              <h2 className="mt-5 font-display text-xl text-paper">{resource.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">{resource.description}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
