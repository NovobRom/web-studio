import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function Services() {
    const t = await getTranslations("Services");

    const services = [
        {
            id: "conversion",
            title: t("items.conversion.title"),
            description: t("items.conversion.description"),
            icon: "🎯",
        },
        {
            id: "speed",
            title: t("items.speed.title"),
            description: t("items.speed.description"),
            icon: "⚡",
        },
        {
            id: "mobile",
            title: t("items.mobile.title"),
            description: t("items.mobile.description"),
            icon: "📱",
        },
        {
            id: "launch",
            title: t("items.launch.title"),
            description: t("items.launch.description"),
            icon: "🚀",
        },
    ];

    return (
        <section
            id="services"
            className="py-24 px-5 md:px-10 max-w-[1200px] mx-auto relative"
        >
            <SectionHeader
                label={t("label")}
                title={t.rich("title", {
                    highlight: (chunks) => (
                        <em className="italic text-accent">{chunks}</em>
                    ),
                })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="group relative p-8 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden transition-colors hover:border-accent/40"
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
                        </div>

                        <div className="relative z-10">
                            <div className="text-3xl mb-6">{service.icon}</div>
                            <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                            <p className="text-text-dim leading-relaxed font-light">
                                {service.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
