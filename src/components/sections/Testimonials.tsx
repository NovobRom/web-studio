import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";

export async function Testimonials() {
    const t = await getTranslations("Testimonials");

    const title = t.rich("title", {
        highlight: (chunks) => <em className="italic text-accent">{chunks}</em>,
    });

    const testimonials = [
        {
            id: "client1",
            name: t("items.client1.name"),
            role: t("items.client1.role"),
            text: t("items.client1.text"),
        },
        {
            id: "client2",
            name: t("items.client2.name"),
            role: t("items.client2.role"),
            text: t("items.client2.text"),
        },
    ];

    return (
        <section id="testimonials" className="py-24 px-5 md:px-10 max-w-[1200px] mx-auto">
            <SectionHeader label={t("label")} title={title} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {testimonials.map((testimonial, i) => (
                    <FadeInWhenVisible key={testimonial.id} delay={i * 0.15}>
                        <div className="p-8 md:p-10 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] h-full flex flex-col justify-between">
                            <div>
                                <div className="text-accent mb-6 text-4xl leading-none font-display">
                                    &quot;
                                </div>
                                <p className="text-[1.1rem] leading-relaxed text-text mb-8 font-light italic">
                                    {testimonial.text}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-bg-card-hover border border-border flex items-center justify-center text-accent text-lg font-display">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-[0.95rem]">{testimonial.name}</div>
                                    <div className="text-text-dim text-[0.8rem]">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                ))}
            </div>
        </section>
    );
}
