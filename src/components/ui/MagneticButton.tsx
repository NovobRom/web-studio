"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    textStrength?: number;
}

export function MagneticButton({
    children,
    className = "",
    strength = 20,
    textStrength = 10,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const rafRef = useRef<number>(0);
    const pendingRef = useRef<{ x: number; y: number } | null>(null);

    // Throttle via rAF — only compute on animation frames
    const flushPending = useCallback(() => {
        if (!pendingRef.current) return;
        const { x, y } = pendingRef.current;
        pendingRef.current = null;

        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const distX = x - (left + width / 2);
        const distY = y - (top + height / 2);

        setPosition({
            x: (distX / width) * strength,
            y: (distY / height) * strength,
        });
        setTextPosition({
            x: (distX / width) * textStrength,
            y: (distY / height) * textStrength,
        });
    }, [strength, textStrength]);

    useEffect(() => {
        if (!isHovered) {
            setPosition({ x: 0, y: 0 });
            setTextPosition({ x: 0, y: 0 });
            return;
        }

        // Disable magnetic effect on touch/mobile
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const onMouseMove = (e: MouseEvent) => {
            pendingRef.current = { x: e.clientX, y: e.clientY };
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(flushPending);
        };

        // Listen on the element only, not window
        const el = ref.current;
        if (!el) return;
        el.addEventListener("mousemove", onMouseMove, { passive: true });

        return () => {
            el.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, [isHovered, flushPending]);

    return (
        <motion.div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-block ${className}`}
        >
            <motion.div
                animate={{ x: textPosition.x, y: textPosition.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
