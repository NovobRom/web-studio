import { getTranslations } from "next-intl/server";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";

const stats = [
  { value: "48h", labelKey: "delivery" },
  { value: "100%", labelKey: "mobile" },
  { value: "SEO", labelKey: "seo" },
  { value: "24/7", labelKey: "uptime" },
] as const;

export async function StatsBar() {
  const t = await getTranslations("Stats");

  return (
    <FadeInWhenVisible>
      <div className="px-5 md:px-10 py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto flex justify-center gap-8 sm:gap-12 md:gap-[60px] flex-wrap">
        {stats.map((stat) => (
          <div key={stat.labelKey} className="text-center">
            <span className="font-display text-[2.2rem] text-accent block leading-[1.2]">
              {stat.value}
            </span>
            <span className="text-[0.82rem] text-text-muted uppercase tracking-[0.1em] mt-1 block">
              {t(stat.labelKey)}
            </span>
          </div>
        ))}
        </div>
      </div>
    </FadeInWhenVisible>
  );
}
