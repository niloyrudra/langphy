import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { runMigrations } from "@/db/migrate";
import { registerBackgroundSync } from "@/sync/backgroundSync";
import { queryClient } from "@/queryClient";
import { registerLocalProjections } from "@/events/localProjections";
// import LoadingScreenComponent from "@/components/LoadingScreenComponent";

SplashScreen.preventAutoHideAsync();

interface Props {
  children: React.ReactNode;
}

/**
 * AppProvider
 * ----------------
 * - AuthProvider remains as the source of truth for the logged-in user
 * - QueryClientProvider manages all React Query hooks
 * - SQLite migrations run once on app boot
 * - Background sync automatically syncs offline changes
 */
export const AppProvider = ({ children }: Props) => {
  const [ ready, setReady ] = React.useState<boolean>(false);

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
        await SplashScreen.hideAsync(); // ⬅️ hide when ready
      }
    };

    bootstrap();
  }, []);

  if (!ready) {
    return null; // Splash screen still visible
  }

  // if (!ready) {
    // return null; // or splash screen
    // return (<LoadingScreenComponent />) // can't use it here as it contains 'useTheme' that can't be used in this context
    // return (<SplashScreen />);
  // }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthProvider>
  );
};
