"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

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
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const textX = useMotionValue(0);
    const textY = useMotionValue(0);
    const textSpringX = useSpring(textX, springConfig);
    const textSpringY = useSpring(textY, springConfig);

    useEffect(() => {
        if (!isHovered) {
            x.set(0);
            y.set(0);
            textX.set(0);
            textY.set(0);
            return;
        }

        // Disable magnetic effect on touch/mobile
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const el = ref.current;
        if (!el) return;

        const onMouseMove = (e: MouseEvent) => {
            const { height, width, left, top } = el.getBoundingClientRect();
            const distX = e.clientX - (left + width / 2);
            const distY = e.clientY - (top + height / 2);

            x.set((distX / width) * strength);
            y.set((distY / height) * strength);
            textX.set((distX / width) * textStrength);
            textY.set((distY / height) * textStrength);
        };

        el.addEventListener("mousemove", onMouseMove, { passive: true });

        return () => {
            el.removeEventListener("mousemove", onMouseMove);
        };
    }, [isHovered, strength, textStrength, x, y, textX, textY]);

    return (
        <motion.div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ x: springX, y: springY }}
            className={`relative inline-block ${className}`}
        >
            <motion.div style={{ x: textSpringX, y: textSpringY }}>
                {children}
            </motion.div>
        </motion.div>
    );
}
