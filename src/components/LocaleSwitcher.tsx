"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  ru: "Русский",
  lt: "Lietuvių",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    const scrollY = window.scrollY;
    router.replace(pathname, { locale: nextLocale, scroll: false });
    // Restore scroll position after the route transition renders
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: "instant" });
    });
  };

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          aria-label={LOCALE_LABELS[loc] ?? loc}
          className={`px-2.5 py-1 rounded text-[0.78rem] font-medium uppercase tracking-[0.05em] border transition-all duration-200 cursor-pointer ${loc === locale
              ? "border-accent text-accent bg-accent-dim"
              : "border-transparent text-text-muted hover:text-text-dim hover:border-border-hover bg-transparent"
            }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
