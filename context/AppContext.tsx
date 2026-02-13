import React from "react";
import { AuthProvider } from "./AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { runMigrations } from "@/db/migrate";
import { registerBackgroundSync } from "@/sync/backgroundSync";
import { queryClient } from "@/queryClient";
import { registerLocalProjections } from "@/events/localProjections";

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
      // Run DB migrations
      await runMigrations();
      console.log("Database migrations complete.");

      // Register background sync for offline-safe sync
      await registerBackgroundSync();
      console.log("Background sync registered.");

      registerLocalProjections();

      // Mark provider as ready
      setReady(true);
    }

    bootstrap();
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthProvider>
  );
};
