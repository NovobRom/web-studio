"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only enable on fine-pointer (mouse) devices
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let curX = 0;
        let curY = 0;
        let rafId: number;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            curX = lerp(curX, mouseX, 0.12);
            curY = lerp(curY, mouseY, 0.12);
            cursor.style.transform = `translate(${curX}px, ${curY}px)`;
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX - 12;
            mouseY = e.clientY - 12;
            if (!isVisible) setIsVisible(true);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[data-cursor='pointer']");
            setIsPointer(Boolean(isClickable));
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        document.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseover", onMouseOver, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            aria-hidden="true"
        >
            <motion.div
                animate={{
                    width: isPointer ? 40 : 24,
                    height: isPointer ? 40 : 24,
                    opacity: isVisible ? 1 : 0,
                    borderColor: isPointer
                        ? "var(--color-accent)"
                        : "rgba(212, 168, 67, 0.5)",
                    backgroundColor: isPointer
                        ? "rgba(212, 168, 67, 0.08)"
                        : "transparent",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                    borderRadius: "50%",
                    border: "1.5px solid rgba(212, 168, 67, 0.5)",
                    marginLeft: isPointer ? -8 : 0,
                    marginTop: isPointer ? -8 : 0,
                }}
            />
        </div>
    );
}
