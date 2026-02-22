export type PortfolioStatus = "live" | "coming-soon";

export interface PortfolioItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: string;
  techTags: string[];
  status: PortfolioStatus;
  liveUrl?: string;
  imageUrl?: string;
  placeholderInitials?: string;
}
