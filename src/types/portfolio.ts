export type PortfolioStatus = "live" | "coming-soon";

export interface PortfolioItem {
  id: string;
  titleKey?: string;
  descriptionKey?: string;
  taskKey?: string;
  solutionKey?: string;
  resultKey?: string;
  category: string;
  techTags: string[];
  status: PortfolioStatus;
  liveUrl?: string;
  imageUrl?: string;
  placeholderInitials?: string;
  metricsKeys?: {
    perf: string;
    langs: string;
    reviews: string;
  };
}
