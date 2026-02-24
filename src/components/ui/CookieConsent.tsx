"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type ConsentValue = "accepted" | "declined" | null;

const STORAGE_KEY = "cookie-consent";

export function CookieConsent() {
    const t = useTranslations("CookieConsent");
    const [consent, setConsent] = useState<ConsentValue | "loading">("loading");

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
        setConsent(stored);
    }, []);

    const handleAccept = () => {
        localStorage.setItem(STORAGE_KEY, "accepted");
        setConsent("accepted");
    };

    const handleDecline = () => {
        localStorage.setItem(STORAGE_KEY, "declined");
        setConsent("declined");
    };

    // Don't render on SSR or after user responded
    if (consent !== null) return null;

    return (
        <div
            role="dialog"
            aria-label="Cookie consent"
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-2.5rem)] max-w-[560px] px-5 py-4 rounded-[var(--radius-card)] bg-bg-card border border-border backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row items-center gap-3 sm:gap-5"
        >
            <p className="text-[0.85rem] text-text-dim text-center sm:text-left leading-snug flex-1">
                {t("text")}
            </p>
            <div className="flex gap-2 shrink-0">
                <button
                    onClick={handleDecline}
                    className="px-4 py-2 text-[0.8rem] font-medium rounded-[var(--radius-pill)] border border-border text-text-muted hover:text-text-dim hover:border-border-hover transition-colors"
                >
                    {t("decline")}
                </button>
                <button
                    onClick={handleAccept}
                    className="px-4 py-2 text-[0.8rem] font-semibold rounded-[var(--radius-pill)] bg-accent text-bg hover:opacity-90 transition-opacity"
                >
                    {t("accept")}
                </button>
            </div>
        </div>
    );
}
