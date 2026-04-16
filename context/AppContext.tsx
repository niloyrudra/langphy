import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { runMigrations } from "@/db/migrate";
import { registerBackgroundSync } from "@/sync/backgroundSync";
import { queryClient } from "@/queryClient";
import { registerLocalProjections } from "@/events/localProjections";
import { NetworkProvider, useNetwork } from "./NetworkContext";

SplashScreen.preventAutoHideAsync();

interface Props {
    children: React.ReactNode;
}

/**
 * Inner shell — rendered after NetworkProvider has resolved its initial
 * NetInfo.fetch(). This ensures NetworkProvider never returns null while
 * <Toaster /> is already mounted above it in the tree, which was the cause
 * of the "Text strings must be rendered within a <Text>" crash.
 *
 * The pattern:
 *   <Toaster />                   ← always mounted, never unmounts
 *   <AppProvider>
 *     <NetworkProvider>           ← may briefly return null
 *       <AppShell>                ← only renders after network resolved
 *         <AuthProvider>
 *           <QueryClientProvider>
 *             {children}
 *           </QueryClientProvider>
 *         </AuthProvider>
 *       </AppShell>
 *     </NetworkProvider>
 *   </AppProvider>
 *
 * Because <Toaster /> sits OUTSIDE <NetworkProvider>, it is never affected
 * by NetworkProvider's null→children transition and stays attached to its
 * portal throughout. Any toast fired after that transition finds the portal
 * already mounted.
 */
const AppShell = ({ children }: Props) => {
    const { isOnline } = useNetwork(); // just to confirm we're past the null gate
    const [ready, setReady] = React.useState<boolean>(false);
    console.log("isOnline", isOnline)
    React.useEffect(() => {
        const bootstrap = async () => {
            try {
                await runMigrations();
                console.log("Database migrations complete.");
                await registerBackgroundSync();
                console.log("Background sync registered.");
                registerLocalProjections();
            } catch (e) {
                console.error("App bootstrap failed:", e);
            } finally {
                setReady(true);
                await SplashScreen.hideAsync();
            }
        };
        bootstrap();
    }, []);

    if (!ready) return null;

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
    );
};

export const AppProvider = ({ children }: Props) => (
    <NetworkProvider>
        <AppShell>{children}</AppShell>
    </NetworkProvider>
);




// import React from "react";
// import * as SplashScreen from "expo-splash-screen";
// import { AuthProvider } from "./AuthContext";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { runMigrations } from "@/db/migrate";
// import { registerBackgroundSync } from "@/sync/backgroundSync";
// import { queryClient } from "@/queryClient";
// import { registerLocalProjections } from "@/events/localProjections";
// import { NetworkProvider } from "./NetworkContext";

// SplashScreen.preventAutoHideAsync();

// interface Props {
//   children: React.ReactNode;
// }

// /**
//  * AppProvider
//  * ----------------
//  * - AuthProvider remains as the source of truth for the logged-in user
//  * - QueryClientProvider manages all React Query hooks
//  * - SQLite migrations run once on app boot
//  * - Background sync automatically syncs offline changes
//  */
// export const AppProvider = ({ children }: Props) => {
//   const [ ready, setReady ] = React.useState<boolean>(false);

//   React.useEffect(() => {
//     const bootstrap = async () => {
//       try {
//         await runMigrations();
//         console.log("Database migrations complete.");

//         await registerBackgroundSync();
//         console.log("Background sync registered.");

//         registerLocalProjections();
//       } catch (e) {
//         console.error("App bootstrap failed:", e);
//       } finally {
//         setReady(true);
//         await SplashScreen.hideAsync(); // ⬅️ hide when ready
//       }
//     };

//     bootstrap();
//   }, []);

//   if (!ready) {
//     return null; // Splash screen still visible
//   }

//   return (
//     <NetworkProvider>        {/* ← global NetInfo listener, one instance */}
//       <AuthProvider>
//         <QueryClientProvider client={queryClient}>
//           {children}
//         </QueryClientProvider>
//       </AuthProvider>
//     </NetworkProvider>
//   );
// };
