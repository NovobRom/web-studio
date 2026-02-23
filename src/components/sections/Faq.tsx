"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";

export function Faq() {
    const t = useTranslations("Faq");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const title = t.rich("title", {
        highlight: (chunks) => <em className="italic text-accent">{chunks}</em>,
    });

    const faqs = [
        { id: "q1", question: t("items.q1.question"), answer: t("items.q1.answer") },
        { id: "q2", question: t("items.q2.question"), answer: t("items.q2.answer") },
        { id: "q3", question: t("items.q3.question"), answer: t("items.q3.answer") },
        { id: "q4", question: t("items.q4.question"), answer: t("items.q4.answer") },
    ];

    return (
        <section id="faq" className="py-24 px-5 md:px-10 max-w-[800px] mx-auto">
            <div className="text-center w-full">
                <SectionHeader label={t("label")} title={title} />
            </div>

            <div className="mt-12 flex flex-col gap-4">
                {faqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                        <FadeInWhenVisible key={faq.id} delay={i * 0.1}>
                            <div
                                className={`border rounded-[var(--radius-lg)] overflow-hidden transition-colors duration-300 ${isOpen
                                    ? "bg-bg-card border-accent/20"
                                    : "bg-surface border-border hover:border-border-hover cursor-pointer"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-medium text-[1.05rem] pr-6">{faq.question}</span>
                                    <div
                                        className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-transform duration-300"
                                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-0 text-text-dim text-[0.95rem] leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </FadeInWhenVisible>
                    );
                })}
            </div>
        </section>
    );
}
