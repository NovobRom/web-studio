import Link from "next/link";
import { BASE_URL } from "@/config/constants";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);

    return {
        title: "Privacy Policy — Roman Novobranets",
        description: "Privacy policy for roman-novobranets.vercel.app",
        metadataBase: new URL(BASE_URL),
        robots: { index: false },
    };
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("Privacy");

    return (
        <main className="max-w-[720px] mx-auto px-5 md:px-10 py-32 prose prose-invert">
            <h1 className="font-display text-[2.5rem] font-normal mb-8 tracking-[-0.02em]">
                {t("title")}
            </h1>

            <p className="text-text-dim mb-6">
                <strong>{t("updated")}</strong>
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">1. Data Controller</h2>
                <p className="text-text-dim leading-relaxed">
                    Roman Novobranets, Vilnius, Lithuania.{" "}
                    <a href="mailto:romannovobranets@gmail.com" className="text-accent">
                        romannovobranets@gmail.com
                    </a>
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">2. Data We Collect</h2>
                <p className="text-text-dim leading-relaxed">
                    We use the following third-party analytics tools that may collect
                    anonymised usage data (pages visited, device type, country):
                </p>
                <ul className="text-text-dim mt-3 space-y-1 list-disc list-inside">
                    <li>
                        <strong>Google Analytics 4</strong> — to understand how visitors
                        use the website.
                    </li>
                    <li>
                        <strong>Meta Pixel</strong> — to measure the effectiveness of
                        advertising campaigns.
                    </li>
                </ul>
                <p className="text-text-dim mt-3 leading-relaxed">
                    No personally identifiable information is collected without your
                    explicit consent.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">3. Cookies</h2>
                <p className="text-text-dim leading-relaxed">
                    Analytics cookies may be set by Google and Meta. You can opt out via
                    your browser settings or{" "}
                    <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent"
                    >
                        Google Analytics Opt-out
                    </a>
                    .
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">4. Your Rights (GDPR)</h2>
                <p className="text-text-dim leading-relaxed">
                    Under GDPR you have the right to access, rectify, and erase your
                    data. To exercise these rights, contact us at{" "}
                    <a href="mailto:romannovobranets@gmail.com" className="text-accent">
                        romannovobranets@gmail.com
                    </a>
                    .
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">5. Third-Party Links</h2>
                <p className="text-text-dim leading-relaxed">
                    This site links to external services (Treatwell, brief-wizard.vercel.app).
                    We are not responsible for their privacy practices.
                </p>
            </section>

            <Link
                href={`/${locale}`}
                className="inline-block mt-8 text-accent no-underline hover:opacity-80 transition-opacity"
            >
                {t("back")}
            </Link>
        </main>
    );
}
