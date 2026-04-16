// NetworkListener.tsx
import { useEffect, useRef } from "react";
import { useNetwork } from "@/context/NetworkContext";
import { toastError, toastSuccess } from "@/services/toast.service";

export default function NetworkListener() {
    const { isOnline } = useNetwork();
    const prev = useRef<boolean | null>(null);

    useEffect(() => {
        if (prev.current === null) {
            prev.current = isOnline;
            return;
        }

        if (!isOnline) {
            toastError("You're offline. Some features won't be available.");
        } else if (prev.current === false && isOnline) {
            toastSuccess("Back online! Your progress will sync shortly.");
        }

        prev.current = isOnline;
    }, [isOnline]);

    return null;
}