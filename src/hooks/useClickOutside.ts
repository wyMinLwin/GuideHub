import { useCallback, useEffect, useRef } from "react";

export const useClickOutside = (fn: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClick = useCallback((event: MouseEvent | TouchEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            fn();
        }
    },[fn]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [fn,handleClick]);

    return ref;
};