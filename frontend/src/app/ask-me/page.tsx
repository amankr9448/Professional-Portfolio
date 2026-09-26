import AskMe from "@/components/AskMe";

export default function AskMePage() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">/ portfolio assistant</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-paper lg:text-5xl">Ask Me</h1>
      <p className="mt-4 max-w-2xl text-paper/60">
        Curious about my backend experience, projects, or technical stack? Ask away.
      </p>
      <div className="mt-10">
        <AskMe />
      </div>
    </div>
  );
}
