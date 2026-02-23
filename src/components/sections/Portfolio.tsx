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
  const resolvedItems: PortfolioItem[] = portfolioItems.map((item) => ({
    ...item,
    titleKey: item.id === "li-zagar-tan"
      ? t("items.lizagar.title")
      : item.id === "sharp-co"
      ? t("items.sharpco.title")
      : t("items.morningcup.title"),
    descriptionKey: item.id === "li-zagar-tan"
      ? t("items.lizagar.description")
      : item.id === "sharp-co"
      ? t("items.sharpco.description")
      : t("items.morningcup.description"),
  }));

  return (
    <section
      id="portfolio"
      className="px-10 py-[100px] bg-bg-card border-t border-b border-border"
    >
      <SectionHeader label={t("label")} title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-[1100px] mx-auto">
        {resolvedItems.map((item, i) => (
          <FadeInWhenVisible key={item.id} delay={i * 0.12}>
            <PortfolioCard
              item={item}
              viewLiveLabel={t("viewLive")}
              comingSoonLabel={t("comingSoon")}
            />
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}
