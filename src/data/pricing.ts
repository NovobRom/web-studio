import type { PricingTier } from "@/types/pricing";
import { BRIEF_URL } from "@/config/constants";

export const pricingTiers: PricingTier[] = [
  {
    id: "landing",
    nameKey: "Pricing.tiers.landing.name",
    price: 350,
    pricePrefixKey: "from",
    currency: "€",
    descriptionKey: "Pricing.tiers.landing.description",
    featureKeys: [
      "Pricing.tiers.landing.features.0",
      "Pricing.tiers.landing.features.1",
      "Pricing.tiers.landing.features.2",
      "Pricing.tiers.landing.features.3",
      "Pricing.tiers.landing.features.4",
    ],
    featured: false,
    ctaUrl: BRIEF_URL,
  },
  {
    id: "growth",
    nameKey: "Pricing.tiers.growth.name",
    price: 600,
    originalPrice: 850,
    currency: "€",
    descriptionKey: "Pricing.tiers.growth.description",
    featureKeys: [
      "Pricing.tiers.growth.features.0",
      "Pricing.tiers.growth.features.1",
      "Pricing.tiers.growth.features.2",
      "Pricing.tiers.growth.features.3",
      "Pricing.tiers.growth.features.4",
    ],
    featured: true,
    ctaUrl: BRIEF_URL,
  },
  {
    id: "fulllaunch",
    nameKey: "Pricing.tiers.fulllaunch.name",
    price: 900,
    originalPrice: 1250,
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
