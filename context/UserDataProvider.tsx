import React from "react";
import { AuthProvider } from "./AuthContext";
import { ProfileProvider } from "./ProfileContext";
import { StreaksProvider } from "./StreaksContext";

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <StreaksProvider>
          {/* <ProgressProvider> */}
            {children}
          {/* </ProgressProvider> */}
        </StreaksProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};
