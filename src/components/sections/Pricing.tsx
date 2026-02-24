import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";
import { pricingTiers } from "@/data/pricing";

export async function Pricing() {
  const t = await getTranslations("Pricing");

  const title = t.rich("title", {
    highlight: (chunks) => (
      <em className="italic text-accent">{chunks}</em>
    ),
  });

  return (
    <section id="pricing" className="px-5 md:px-10 py-[100px] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader label={t("label")} title={title} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {pricingTiers.map((tier) => {
            const key = tier.id as "landing" | "growth" | "fulllaunch";

            // Map strictly to avoid TS casting errors
            const name = key === "landing" ? t("tiers.landing.name")
              : key === "growth" ? t("tiers.growth.name")
                : t("tiers.fulllaunch.name");

            const description = key === "landing" ? t("tiers.landing.description")
              : key === "growth" ? t("tiers.growth.description")
                : t("tiers.fulllaunch.description");

            const features = tier.featureKeys.map((_, fi) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if (key === "landing") return t(`tiers.landing.features.${fi}` as any);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if (key === "growth") return t(`tiers.growth.features.${fi}` as any);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return t(`tiers.fulllaunch.features.${fi}` as any);
            });

            return (
              <PricingCard
                key={tier.id}
                tier={tier}
                name={name}
                description={description}
                features={features}
                ctaLabel={t("cta")}
                popularLabel={t("popular")}
                pricePrefix={tier.pricePrefixKey ? t("from") : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
