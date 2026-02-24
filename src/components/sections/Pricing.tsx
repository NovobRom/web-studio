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
            const features = tier.featureKeys.map((_, fi) =>
              t(`tiers.${key}.features.${fi}` as Parameters<typeof t>[0])
            );

            return (
              <PricingCard
                key={tier.id}
                tier={tier}
                name={t(`tiers.${key}.name` as Parameters<typeof t>[0])}
                description={t(`tiers.${key}.description` as Parameters<typeof t>[0])}
                features={features}
                ctaLabel={t("cta")}
                popularLabel={t("popular")}
                pricePrefix={tier.pricePrefixKey ? t(tier.pricePrefixKey as Parameters<typeof t>[0]) : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
