export interface PricingTier {
  id: string;
  nameKey: string;
  price: number;
  currency: string;
  descriptionKey: string;
  featureKeys: string[];
  featured: boolean;
  ctaUrl: string;
}
