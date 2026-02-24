import type { PricingTier } from "@/types/pricing";

interface PricingCardProps {
  tier: PricingTier;
  name: string;
  description: string;
  features: string[];
  ctaLabel: string;
  popularLabel: string;
  pricePrefix?: string;
}

export function PricingCard({
  tier,
  name,
  description,
  features,
  ctaLabel,
  popularLabel,
  pricePrefix,
}: PricingCardProps) {
  const { featured, price, originalPrice, currency, ctaUrl } = tier;

  return (
    <div
      className={`relative rounded-card p-10 flex flex-col transition-all duration-300 hover:-translate-y-1 ${featured
        ? "border border-accent/30 bg-gradient-to-b from-accent-dim to-bg-card hover:border-accent/50"
        : "border border-border bg-bg-card hover:border-border-hover"
        }`}
    >
      {/* Popular badge */}
      {featured && (
        <span className="absolute -top-px right-8 px-4 py-1.5 bg-accent text-bg text-[0.72rem] font-bold uppercase tracking-[0.08em] rounded-b-lg">
          {popularLabel}
        </span>
      )}

      <p className="text-[0.82rem] uppercase tracking-[0.1em] text-text-dim font-medium mb-4">
        {name}
      </p>

      <p className="font-display text-5xl text-text leading-none mb-1">
        {pricePrefix && <span className="text-xl text-text-dim mr-1.5 font-sans whitespace-pre uppercase tracking-wide">{pricePrefix}</span>}
        <span className="text-2xl text-text-dim">{currency}</span>
        {price}
      </p>

      <div className="h-6 mb-8 flex items-end">
        {originalPrice ? (
          <span className="text-[0.95rem] text-text-dim/60 font-medium line-through decoration-text-dim/50 decoration-2">
            {currency}{originalPrice}
          </span>
        ) : null}
      </div>

      <p className="text-[0.88rem] text-text-dim mb-8 leading-snug">{description}</p>

      {/* Features */}
      <ul className="flex flex-col gap-3.5 mb-9 flex-1">
        {features.map((feature, i) => (
          <li
            key={i}
            className="text-[0.9rem] text-text-dim flex items-start gap-2.5 leading-snug"
          >
            <span className="text-accent font-bold text-[0.8rem] shrink-0 mt-0.5">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full py-3.5 text-center rounded-[var(--radius-pill)] font-semibold text-[0.9rem] no-underline transition-all duration-300 ${featured
          ? "bg-accent text-bg border border-accent hover:opacity-90 hover:-translate-y-px"
          : "bg-transparent text-text border border-border-hover hover:border-accent hover:text-accent"
          }`}
      >
        {ctaLabel}
      </a>
    </div>
  );
}
