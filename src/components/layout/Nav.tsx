"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { BRIEF_URL } from "@/config/constants";

export function Nav() {
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);

      // Focus trap
      if (e.key === "Tab") {
        if (!menuRef.current) return;

        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift+Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const links = [
    { label: t("services"), href: "#services" },
    { label: t("portfolio"), href: "#portfolio" },
    { label: t("pricing"), href: "#pricing" },
    { label: t("faq"), href: "#faq" },
  ];

  return (
    <nav
      ref={menuRef}
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-5 border-b border-border transition-all duration-300 ${scrolled
        ? "bg-bg/95 backdrop-blur-2xl"
        : "bg-bg/80 backdrop-blur-xl"
        }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
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
          aria-expanded={isOpen}
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
      </div>

      <div
        aria-hidden={!isOpen}
        className={`md:hidden absolute top-full left-0 right-0 bg-bg/95 backdrop-blur-2xl border-b border-border flex flex-col py-4 transition-all duration-300 origin-top ${isOpen
          ? "opacity-100 scale-y-100 pointer-events-auto"
          : "opacity-0 scale-y-95 pointer-events-none"
          }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="px-5 py-3 text-text-dim no-underline text-[0.95rem] hover:text-text transition-colors"
          >
            {link.label}
          </a>
        ))}
        <div className="px-5 pt-2 pb-1">
          <LocaleSwitcher />
        </div>
        <div className="px-5 pt-2">
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
    </nav>
  );
}
