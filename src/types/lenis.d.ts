/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "lenis/react" {
    import { ReactNode } from "react";

    interface ReactLenisProps {
        children?: ReactNode;
        root?: boolean;
        options?: any;
        className?: string;
    }

    export const ReactLenis: React.FC<ReactLenisProps>;
    export function useLenis(callback?: (lenis: any) => void, deps?: any[]): any;
}
