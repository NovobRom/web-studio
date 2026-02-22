interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="group relative bg-bg-card border border-border rounded-card p-10 text-center transition-all duration-300 hover:border-border-hover hover:-translate-y-1 overflow-hidden">
      {/* Gold top border on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="font-display text-5xl text-accent opacity-30 leading-none mb-5">
        {number}
      </p>
      <h3 className="text-[1.1rem] font-semibold mb-3 tracking-[-0.01em]">
        {title}
      </h3>
      <p className="text-[0.9rem] text-text-dim leading-relaxed">{description}</p>
    </div>
  );
}
