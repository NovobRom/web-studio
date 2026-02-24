"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

export function LenisScroll({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isFinePointer, setIsFinePointer] = useState(false);

    useEffect(() => {
        // Enable Lenis only on desktop (mouse) devices — mobile native scroll is faster
        const mql = window.matchMedia("(pointer: fine)");
        setIsFinePointer(mql.matches);
        setIsMounted(true);
    }, []);

    // SSR: render children without Lenis
    if (!isMounted) {
        return <>{children}</>;
    }

    // Mobile / touch: skip Lenis, use native scroll
    if (!isFinePointer) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
