import TechIcon from "@/components/TechIcon";

export default function TechPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-void/40 px-2.5 py-1 font-mono text-[10px] text-paper/70">
      <TechIcon name={name} size={13} />
      {name}
    </span>
  );
}
