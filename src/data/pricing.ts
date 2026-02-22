import type { PricingTier } from "@/types/pricing";

const BRIEF_URL = "https://brief-wizard.vercel.app/";

export const pricingTiers: PricingTier[] = [
  {
    id: "landing",
    nameKey: "Pricing.tiers.landing.name",
    price: 350,
    currency: "€",
    descriptionKey: "Pricing.tiers.landing.description",
    featureKeys: [
      "Pricing.tiers.landing.features.0",
      "Pricing.tiers.landing.features.1",
      "Pricing.tiers.landing.features.2",
      "Pricing.tiers.landing.features.3",
    ],
    featured: false,
    ctaUrl: BRIEF_URL,
  },
  {
    id: "automation",
    nameKey: "Pricing.tiers.automation.name",
    price: 600,
    currency: "€",
    descriptionKey: "Pricing.tiers.automation.description",
    featureKeys: [
      "Pricing.tiers.automation.features.0",
      "Pricing.tiers.automation.features.1",
      "Pricing.tiers.automation.features.2",
      "Pricing.tiers.automation.features.3",
    ],
    featured: true,
    ctaUrl: BRIEF_URL,
  },
  {
    id: "fulllaunch",
    nameKey: "Pricing.tiers.fulllaunch.name",
    price: 900,
    currency: "€",
    descriptionKey: "Pricing.tiers.fulllaunch.description",
    featureKeys: [
      "Pricing.tiers.fulllaunch.features.0",
      "Pricing.tiers.fulllaunch.features.1",
      "Pricing.tiers.fulllaunch.features.2",
      "Pricing.tiers.fulllaunch.features.3",
    ],
    featured: false,
    ctaUrl: BRIEF_URL,
  },
];
