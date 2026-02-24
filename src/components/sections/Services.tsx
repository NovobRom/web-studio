import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Inline SVG icons — replacing emoji for a professional look
// These match the same icons as Lucide: Target, Zap, Smartphone, Rocket
function IconTarget() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

function IconZap() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    );
}

function IconSmartphone() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}

function IconRocket() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    );
}

export async function Services() {
    const t = await getTranslations("Services");

    const services = [
        {
            id: "conversion",
            title: t("items.conversion.title"),
            description: t("items.conversion.description"),
            icon: <IconTarget />,
        },
        {
            id: "speed",
            title: t("items.speed.title"),
            description: t("items.speed.description"),
            icon: <IconZap />,
        },
        {
            id: "mobile",
            title: t("items.mobile.title"),
            description: t("items.mobile.description"),
            icon: <IconSmartphone />,
        },
        {
            id: "launch",
            title: t("items.launch.title"),
            description: t("items.launch.description"),
            icon: <IconRocket />,
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
                            <div className="text-accent mb-6 w-12 h-12 flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent-dim)] border border-accent/20">
                                {service.icon}
                            </div>
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
