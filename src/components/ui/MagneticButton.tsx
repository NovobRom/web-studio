"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How far the button moves (in pixels)
    textStrength?: number; // How far the text moves (in pixels)
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

    useEffect(() => {
        const handleMousePosition = (e: MouseEvent) => {
            if (!ref.current || !isHovered) return;

            const { clientX, clientY } = e;
            const { height, width, left, top } = ref.current.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;

            setPosition({
                x: (distanceX / width) * strength,
                y: (distanceY / height) * strength,
            });

            setTextPosition({
                x: (distanceX / width) * textStrength,
                y: (distanceY / height) * textStrength,
            });
        };

        if (isHovered) {
            window.addEventListener("mousemove", handleMousePosition);
        } else {
            setPosition({ x: 0, y: 0 });
            setTextPosition({ x: 0, y: 0 });
        }

        return () => {
            window.removeEventListener("mousemove", handleMousePosition);
        };
    }, [isHovered, strength, textStrength]);

    return (
        <motion.div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{ x: position.x, y: position.y }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            className={`relative inline-block ${className}`}
        >
            <motion.div
                animate={{ x: textPosition.x, y: textPosition.y }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
