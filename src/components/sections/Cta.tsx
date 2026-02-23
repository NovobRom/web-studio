import { getTranslations } from "next-intl/server";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { BRIEF_URL, EMAIL } from "@/config/constants";

export async function Cta() {
  const t = await getTranslations("Cta");

  const title = t.rich("title", {
    highlight: (chunks) => (
      <em className="italic text-accent">{chunks}</em>
    ),
  });

  return (
    <section className="relative px-10 py-[100px] text-center overflow-hidden">
      {/* Bottom glow */}
      <div
        className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 70%)",
        }}
      />

      <FadeInWhenVisible className="relative z-10 max-w-[600px] mx-auto">
        <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-normal mb-4 tracking-[-0.02em]">
          {title}
        </h2>
        <p className="text-text-dim text-[1.05rem] mb-10 leading-relaxed">
          {t("sub")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={BRIEF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-9 py-4 bg-accent text-bg rounded-[var(--radius-pill)] font-semibold text-[0.95rem] no-underline hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_0_0_rgba(212,168,67,0)] hover:shadow-[0_8px_30px_rgba(212,168,67,0.25)]"
          >
            {t("cta")}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[0.88rem] text-text-muted no-underline hover:text-text-dim transition-colors"
          >
            {t("email")}
          </a>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}
