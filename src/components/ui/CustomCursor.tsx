"use client";

import { useEffect, useRef, useState } from "react";

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
        let isAnimating = false;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            curX = lerp(curX, mouseX, 0.25);
            curY = lerp(curY, mouseY, 0.25);
            cursor.style.transform = `translate(${curX}px, ${curY}px)`;

            // Stop the loop when cursor has caught up to the mouse
            if (Math.abs(curX - mouseX) > 0.5 || Math.abs(curY - mouseY) > 0.5) {
                rafId = requestAnimationFrame(animate);
            } else {
                isAnimating = false;
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX - 10;
            mouseY = e.clientY - 10;
            if (!isVisible) setIsVisible(true);

            // Only start rAF loop if not already running
            if (!isAnimating) {
                isAnimating = true;
                rafId = requestAnimationFrame(animate);
            }
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
            <div
                style={{
                    width: isPointer ? 32 : 20,
                    height: isPointer ? 32 : 20,
                    opacity: isVisible ? 1 : 0,
                    borderRadius: "50%",
                    border: `1.5px solid ${isPointer ? "var(--color-accent)" : "rgba(212, 168, 67, 0.5)"}`,
                    backgroundColor: isPointer ? "rgba(212, 168, 67, 0.08)" : "transparent",
                    marginLeft: isPointer ? -6 : 0,
                    marginTop: isPointer ? -6 : 0,
                    transition: "width 0.18s ease-out, height 0.18s ease-out, opacity 0.15s ease-out, border-color 0.18s ease-out, background-color 0.18s ease-out, margin 0.18s ease-out",
                }}
            />
        </div>
    );
}
