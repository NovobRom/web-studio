import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-[0.78rem] uppercase tracking-[0.15em] text-accent font-medium mb-4">
        404
      </p>
      <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal tracking-[-0.02em] mb-4">
        {t("title")}
      </h1>
      <p className="text-text-dim text-[1.05rem] mb-10 max-w-[400px] leading-relaxed">
        {t("sub")}
      </p>
      <Link
        href="/"
        className="bg-accent text-bg px-7 py-3 rounded-[var(--radius-pill)] font-semibold text-[0.9rem] no-underline hover:opacity-90 transition-opacity"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
