
import Image from "next/image";
import type { PortfolioItem } from "@/types/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  viewLiveLabel: string;
  comingSoonLabel: string;
  priority?: boolean;
}

export function PortfolioCard({
  item,
  viewLiveLabel,
  comingSoonLabel,
  priority = false,
}: PortfolioCardProps) {
  const isLive = item.status === "live";

  const CardContent = (
    <div className="group relative flex flex-col md:flex-row bg-bg border border-border rounded-card overflow-hidden transition-all duration-300 hover:border-border-hover hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] cursor-pointer">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(212,168,67,0.08),transparent_70%)]" />
      {/* Thumbnail */}
      <div className="relative md:w-1/2 min-h-[300px] bg-gradient-to-br from-bg-card-hover to-bg overflow-hidden flex items-center justify-center shrink-0">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.titleKey || ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
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
      <div className="p-7 md:w-1/2 md:p-10 flex flex-col justify-center">
        <h3 className="text-[1.15rem] font-semibold mb-3 tracking-[-0.01em]">
          {item.titleKey}
        </h3>

        {item.descriptionKey && (
          <p className="text-[0.88rem] text-text-dim leading-relaxed mb-5">
            {item.descriptionKey}
          </p>
        )}

        {item.taskKey && (
          <div className="flex flex-col gap-3 mb-6">
            <div className="text-[0.85rem] text-text-dim leading-relaxed whitespace-pre-line">
              {item.taskKey}
            </div>
            <div className="text-[0.85rem] text-text-dim leading-relaxed whitespace-pre-line">
              {item.solutionKey}
            </div>
            <div className="text-[0.85rem] leading-relaxed whitespace-pre-line font-medium text-text">
              {item.resultKey}
            </div>
          </div>
        )}

        {/* Metrics */}
        {item.metricsKeys && (
          <div className="flex flex-col sm:flex-row gap-5 mb-7 py-5 border-y border-border-hover w-full justify-between pr-4">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-display text-text">98+</span>
              <span className="text-[0.65rem] text-accent uppercase tracking-wider font-semibold">{item.metricsKeys.perf}</span>
            </div>
            <div className="hidden sm:block w-px bg-border-hover" />
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-display text-text">3</span>
              <span className="text-[0.65rem] text-accent uppercase tracking-wider font-semibold">{item.metricsKeys.langs}</span>
            </div>
            <div className="hidden sm:block w-px bg-border-hover" />
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-display text-text">4.9★</span>
              <span className="text-[0.65rem] text-accent uppercase tracking-wider font-semibold">{item.metricsKeys.reviews}</span>
            </div>
          </div>
        )}

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
