export interface PricingTier {
  id: string;
  nameKey: string;
  price: number;
  originalPrice?: number;
  pricePrefixKey?: string;
  currency: string;
  descriptionKey: string;
  featureKeys: string[];
  featured: boolean;
  ctaUrl: string;
}
