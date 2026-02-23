import { getTranslations } from "next-intl/server";
import { BRIEF_URL, EMAIL } from "@/config/constants";

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.85rem] text-text-muted">
      <p>{t("copy", { year })}</p>
      <div className="flex items-center gap-6">
        <a
          href={`mailto:${EMAIL}`}
          className="text-text-muted no-underline hover:text-text-dim transition-colors"
        >
          {t("email")}
        </a>
        <a
          href={BRIEF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted no-underline hover:text-text-dim transition-colors"
        >
          {t("brief")}
        </a>
      </div>
    </footer>
  );
}
