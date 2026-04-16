/**
 * NetworkContext
 *
 * Single global NetInfo listener for the entire app.
 *
 * FIX: Previous version had two issues on Android:
 * 1. isInternetReachable is null (not false) until Android determines
 *    reachability — `!!null` is false, so the first NetInfo event always
 *    triggered the offline branch even when online, calling toastError()
 *    before <Toasts /> was mounted in the tree, causing the
 *    "Text strings must be rendered within a <Text>" crash.
 * 2. Initial state was hardcoded to true, causing a flicker if the device
 *    is actually offline on launch.
 *
 * Fix: use NetInfo.fetch() to seed the initial state synchronously before
 * the first render, and treat isInternetReachable === null as "assume online"
 * (null means Android hasn't checked yet, not that it's offline).
 */

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { toastError, toastSuccess } from "@/services/toast.service";

type NetworkContextType = {
    isOnline: boolean;
    wasOffline: boolean;
};

const NetworkContext = createContext<NetworkContextType>({
    isOnline: true,
    wasOffline: false,
});

/** 
 * null means Android hasn't determined reachability yet — treat as online.
 * false means explicitly unreachable.
 */
function resolveOnline(state: NetInfoState): boolean {
    if (!state.isConnected) return false;
    // isInternetReachable is null on Android until checked — assume online
    if (state.isInternetReachable === false) return false;
    return true;
}

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
    // Start as null — "not yet known"
    const [isOnline,   setIsOnline  ] = useState<boolean | null>(null);
    const [wasOffline, setWasOffline] = useState<boolean>(false);
    
    // const uiReady = useRef<boolean>(false);
    const initialized  = useRef<boolean>(false);
    const prevOnline   = useRef<boolean | null>(null);

    // useEffect(() => {uiReady.current = true}, []);

    useEffect(() => {
        // mark UI ready AFTER first paint
        // const id = requestAnimationFrame(() => {
        //     uiReady.current = true;
        // });

        // Seed initial state before subscribing so first render is accurate
        NetInfo.fetch().then((state) => {
            const online = resolveOnline(state);
            setIsOnline(online);
            prevOnline.current  = online;
            initialized.current = true;
        });

        const unsubscribe = NetInfo.addEventListener((state) => {
            if (!initialized.current) return; // wait for fetch() to complete first

            const online = resolveOnline(state);

            if (prevOnline.current === online) return; // no real change
            prevOnline.current = online;

            if (!online) {
                setIsOnline(false);
                setWasOffline(true);
                // toastError("You're offline. Some features won't be available.");
                // if (uiReady.current) {
                //     toastError("You're offline. Some features won't be available.");
                // }
            } else {
                setIsOnline(true);
                // if (uiReady.current) {
                //     toastSuccess("Back online! Your progress will sync shortly.");
                // }
            }
        });

        return unsubscribe;
        // return () => {
        //     cancelAnimationFrame(id);
        //     unsubscribe();
        // };
    }, []);

    // Render nothing until we know the real network state.
    // This is typically <1 frame — prevents any child from reading
    // isOnline=true before we've actually confirmed it.
    if (isOnline === null) return null;

    return (
        <NetworkContext.Provider value={{ isOnline, wasOffline }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => useContext(NetworkContext);