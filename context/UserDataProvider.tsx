import React from "react";
import { AuthProvider } from "./AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { runMigrations } from "@/db/migrate";
import { registerBackgroundSync } from "@/sync/backgroundSync";

const queryClient = new QueryClient();
interface Props {
  children: React.ReactNode;
}

/**
 * UserDataProvider
 * ----------------
 * Wrap your app with this instead of the old nested providers.
 * - AuthProvider remains as the source of truth for the logged-in user
 * - QueryClientProvider manages all React Query hooks
 * - SQLite migrations run once on app boot
 * - Background sync automatically syncs offline changes
 */
export const UserDataProvider = ({ children }: Props) => {
  const [ ready, setReady ] = React.useState<boolean>(false);

  React.useEffect(() => {
    const bootstrap = async () => {
      // Run DB migrations
      await runMigrations();
      console.log("Database migrations complete.");

      // Register background sync for offline-safe sync
      await registerBackgroundSync();
      console.log("Background sync registered.");

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

// import { ProfileProvider } from "./ProfileContext";
// import { StreaksProvider } from "./StreaksContext";
// import { ProgressProvider } from "./ProgressContext";
// export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <AuthProvider>
//       <ProfileProvider>
//         <StreaksProvider>
//           <ProgressProvider>
//             {children}
//           </ProgressProvider>
//         </StreaksProvider>
//       </ProfileProvider>
//     </AuthProvider>
//   );
// };
