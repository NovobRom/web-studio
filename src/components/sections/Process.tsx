import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepCard } from "@/components/ui/StepCard";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { processSteps } from "@/data/process";

export async function Process() {
  const t = await getTranslations("Process");

  const title = t.rich("title", {
    highlight: (chunks) => (
      <em className="italic text-accent">{chunks}</em>
    ),
  });

  return (
    <section id="process" className="px-5 md:px-10 py-[100px] scroll-mt-20">
      <SectionHeader label={t("label")} title={title} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
        {processSteps.map((step, i) => (
          <FadeInWhenVisible key={step.number} delay={i * 0.12}>
            <StepCard
              number={step.number}
              title={t(`steps.${i}.title` as Parameters<typeof t>[0])}
              description={t(`steps.${i}.description` as Parameters<typeof t>[0])}
            />
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}
