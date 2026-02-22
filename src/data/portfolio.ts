import type { PortfolioItem } from "@/types/portfolio";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "li-zagar-tan",
    titleKey: "Portfolio.items.lizagar.title",
    descriptionKey: "Portfolio.items.lizagar.description",
    category: "Beauty",
    techTags: ["Next.js", "3 Languages", "Booking"],
    status: "live",
    liveUrl: "https://li-zagar-tan.vercel.app/",
    imageUrl: "/images/li-zagar-tan.jpg",
  },
  {
    id: "sharp-co",
    titleKey: "Portfolio.items.sharpco.title",
    descriptionKey: "Portfolio.items.sharpco.description",
    category: "Barbershop",
    techTags: ["Landing Page", "Online Booking", "Mobile-First"],
    status: "coming-soon",
    placeholderInitials: "S&C",
  },
  {
    id: "morning-cup",
    titleKey: "Portfolio.items.morningcup.title",
    descriptionKey: "Portfolio.items.morningcup.description",
    category: "HoReCa",
    techTags: ["Restaurant", "Digital Menu", "Reservations"],
    status: "coming-soon",
    placeholderInitials: "MC",
  },
];
