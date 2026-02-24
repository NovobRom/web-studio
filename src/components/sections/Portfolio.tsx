import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { portfolioItems } from "@/data/portfolio";
import type { PortfolioItem } from "@/types/portfolio";

export async function Portfolio() {
  const t = await getTranslations("Portfolio");

  const title = t.rich("title", {
    highlight: (chunks) => (
      <em className="italic text-accent">{chunks}</em>
    ),
  });

  // Resolve translated titles/descriptions into items
  const resolvedItems: PortfolioItem[] = portfolioItems.map((item) => {
    const baseKey = `items.${item.id.replace(/-/g, "")}`;
    return {
      ...item,
      titleKey: t(`${baseKey}.title`),
      // Fallback for older items that only use description
      descriptionKey: t.raw(baseKey).description ? t(`${baseKey}.description`) : undefined,
      taskKey: t.raw(baseKey).task ? t(`${baseKey}.task`) : undefined,
      solutionKey: t.raw(baseKey).solution ? t(`${baseKey}.solution`) : undefined,
      resultKey: t.raw(baseKey).result ? t(`${baseKey}.result`) : undefined,
      metricsKeys: t.raw(baseKey).metrics ? {
        perf: t(`${baseKey}.metrics.perf`),
        langs: t(`${baseKey}.metrics.langs`),
        reviews: t(`${baseKey}.metrics.reviews`),
      } : undefined,
    };
  });

  return (
    <section
      id="portfolio"
      className="px-5 md:px-10 py-[100px] bg-bg-card border-t border-b border-border scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader label={t("label")} title={title} />
        <div className="flex flex-col gap-10 max-w-[1100px] mx-auto">
          {resolvedItems.map((item, i) => (
            <FadeInWhenVisible key={item.id} delay={i * 0.12}>
              <PortfolioCard
                item={item}
                viewLiveLabel={t("viewLive")}
                comingSoonLabel={t("comingSoon")}
                priority={i === 0}
              />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
