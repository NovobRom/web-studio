import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { BRIEF_URL } from "@/config/constants";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative min-h-screen flex items-center px-5 md:px-10 pt-[140px] pb-20 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-[18px] py-2 rounded-[var(--radius-pill)] text-[0.82rem] text-accent font-medium tracking-[0.03em] mb-8 border border-accent/20 animate-fade-in-up"
          style={{
            background: "var(--color-accent-dim)",
            animationDelay: "0.2s",
          }}
        >
          <span className="text-[0.7rem]">✦</span>
          {t("badge")}
        </div>

        {/* Heading */}
        <h1
          className="font-display text-[clamp(2.8rem,6vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.02em] mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {t.rich("headline", {
            highlight: (chunks) => (
              <em className="italic text-accent">{chunks}</em>
            ),
          })}
        </h1>

        {/* Subtitle */}
        <p
          className="text-[1.15rem] text-text-dim max-w-[520px] mx-auto mb-12 leading-[1.7] font-light animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          {t("sub")}
        </p>

        {/* CTAs */}
        <div
          className="flex gap-4 justify-center flex-wrap animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <Button variant="primary" href={BRIEF_URL} external>
            {t("primaryCta")}
          </Button>
          <Button variant="secondary" href="#portfolio">
            {t("secondaryCta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
