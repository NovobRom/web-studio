import { getTranslations } from "next-intl/server";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { BRIEF_URL, EMAIL } from "@/config/constants";

export async function Cta() {
  const t = await getTranslations("Cta");

  const title = t.rich("title", {
    highlight: (chunks) => (
      <em className="italic text-accent">{chunks}</em>
    ),
  });

  return (
    <section className="relative px-5 md:px-10 py-[100px] text-center overflow-hidden">
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
          <MagneticButton strength={15}>
            <Button variant="primary" href={BRIEF_URL} external>
              {t("cta")}
            </Button>
          </MagneticButton>
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
