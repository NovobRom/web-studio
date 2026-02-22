import Image from "next/image";
import type { PortfolioItem } from "@/types/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  viewLiveLabel: string;
  comingSoonLabel: string;
}

export function PortfolioCard({
  item,
  viewLiveLabel,
  comingSoonLabel,
}: PortfolioCardProps) {
  const isLive = item.status === "live";

  const CardContent = (
    <div className="group bg-bg border border-border rounded-card overflow-hidden transition-all duration-300 hover:border-border-hover hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-[220px] bg-gradient-to-br from-bg-card-hover to-bg overflow-hidden flex items-center justify-center">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.titleKey}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <span className="font-display text-4xl text-accent opacity-20">
            {item.placeholderInitials}
          </span>
        )}
        {/* Category tag */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-bg/85 backdrop-blur-md rounded-[var(--radius-pill)] text-[0.72rem] font-medium text-accent uppercase tracking-[0.08em] border border-accent/20">
          {item.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-7">
        <h3 className="text-[1.15rem] font-semibold mb-2 tracking-[-0.01em]">
          {item.titleKey}
        </h3>
        <p className="text-[0.88rem] text-text-dim leading-relaxed mb-4">
          {item.descriptionKey}
        </p>

        {/* Tech tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {item.techTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-accent-dim rounded-[var(--radius-pill)] text-[0.75rem] text-accent font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link label */}
        <div className="flex items-center gap-1.5 text-[0.85rem] text-accent font-medium after:content-['→'] after:transition-transform after:duration-200 group-hover:after:translate-x-1">
          {isLive ? viewLiveLabel : comingSoonLabel}
        </div>
      </div>
    </div>
  );

  if (isLive && item.liveUrl) {
    return (
      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="block no-underline text-text">
        {CardContent}
      </a>
    );
  }

  return <div>{CardContent}</div>;
}
