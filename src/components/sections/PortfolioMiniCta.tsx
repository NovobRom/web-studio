import { getTranslations } from "next-intl/server";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { BRIEF_URL } from "@/config/constants";

export async function PortfolioMiniCta() {
    const t = await getTranslations("PortfolioMiniCta");

    return (
        <FadeInWhenVisible>
            <div className="px-5 md:px-10 py-16 border-b border-border">
                <div className="max-w-[700px] mx-auto text-center">
                    <p className="text-[0.78rem] uppercase tracking-[0.15em] text-accent font-medium mb-3">
                        {t("label")}
                    </p>
                    <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-normal tracking-[-0.02em] mb-6">
                        {t("title")}
                    </h3>
                    <MagneticButton strength={12}>
                        <Button variant="primary" href={BRIEF_URL} external>
                            {t("cta")}
                        </Button>
                    </MagneticButton>
                </div>
            </div>
        </FadeInWhenVisible>
    );
}
