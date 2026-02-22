"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const BRIEF_URL = "https://brief-wizard.vercel.app/";

export function Nav() {
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("process"), href: "#process" },
    { label: t("portfolio"), href: "#portfolio" },
    { label: t("pricing"), href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b border-border transition-all duration-300 ${
        scrolled
          ? "bg-bg/95 backdrop-blur-2xl"
          : "bg-bg/80 backdrop-blur-xl"
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-[1.3rem] text-text no-underline tracking-[-0.01em]"
      >
        Roman<span className="text-accent">.</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-text-dim no-underline text-[0.88rem] tracking-[0.02em] hover:text-text transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
        <LocaleSwitcher />
        <a
          href={BRIEF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-bg px-5 py-2.5 rounded-[var(--radius-pill)] font-semibold text-[0.85rem] no-underline hover:opacity-90 hover:-translate-y-px transition-all duration-200"
        >
          {t("cta")}
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-[22px] h-[2px] bg-text transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
        />
        <span
          className={`block w-[22px] h-[2px] bg-text transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-[22px] h-[2px] bg-text transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
        />
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg/95 backdrop-blur-2xl border-b border-border flex flex-col py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-10 py-3 text-text-dim no-underline text-[0.95rem] hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="px-10 pt-2 pb-1">
            <LocaleSwitcher />
          </div>
          <div className="px-10 pt-2">
            <a
              href={BRIEF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-bg px-5 py-2.5 rounded-[var(--radius-pill)] font-semibold text-[0.85rem] no-underline"
              onClick={() => setIsOpen(false)}
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
