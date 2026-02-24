"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";

interface Stat {
  value: string;
  numericValue: number | null;
  suffix: string;
  labelKey: "clients" | "rating" | "mobile" | "speed";
}

const stats: Stat[] = [
  { value: "5+", numericValue: 5, suffix: "+", labelKey: "clients" },
  { value: "4.9★", numericValue: 4.9, suffix: "★", labelKey: "rating" },
  { value: "100%", numericValue: 100, suffix: "%", labelKey: "mobile" },
  { value: "98+", numericValue: 98, suffix: "+", labelKey: "speed" },
];

function AnimatedNumber({
  target,
  suffix,
  isFloat = false,
}: {
  target: number;
  suffix: string;
  isFloat?: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const duration = 1200;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  const formatted = isFloat
    ? display.toFixed(1)
    : Math.round(display).toString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

function StatItem({ stat, label }: { stat: Stat; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isFloat = stat.numericValue !== null && !Number.isInteger(stat.numericValue);

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-[2.2rem] text-accent block leading-[1.2]">
        {inView && stat.numericValue !== null ? (
          <AnimatedNumber
            target={stat.numericValue}
            suffix={stat.suffix}
            isFloat={isFloat}
          />
        ) : (
          stat.value
        )}
      </span>
      <span className="text-[0.82rem] text-text-muted uppercase tracking-[0.1em] mt-1 block">
        {label}
      </span>
    </div>
  );
}

export function StatsBar() {
  const t = useTranslations("Stats");

  return (
    <FadeInWhenVisible>
      <div className="px-5 md:px-10 py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto flex justify-center gap-8 sm:gap-12 md:gap-[60px] flex-wrap">
          {stats.map((stat) => (
            <StatItem key={stat.labelKey} stat={stat} label={t(stat.labelKey)} />
          ))}
        </div>
      </div>
    </FadeInWhenVisible>
  );
}
