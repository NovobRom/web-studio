import { FadeInWhenVisible } from "./FadeInWhenVisible";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  className?: string;
}

export function SectionHeader({ label, title, className = "" }: SectionHeaderProps) {
  return (
    <FadeInWhenVisible className={`text-center mb-16 ${className}`}>
      <p className="text-[0.78rem] uppercase tracking-[0.15em] text-accent font-medium mb-4">
        {label}
      </p>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] leading-[1.15]">
        {title}
      </h2>
    </FadeInWhenVisible>
  );
}
