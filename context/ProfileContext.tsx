import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "@/types";
import { useAuth } from "./AuthContext";

interface Profile extends User {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    profile_image: string | null;
    created_at?: Date
}

type profileContextType = {
    profile: Profile | null;
    loading: boolean;
    refreshProfile: () => Promise<void>;
    updateProfile: ( updates: Partial<Profile> ) => Promise<void>;
    clear: () => void;
    // setProfile: (e: Profile | null) => void;
}

const ProfileContext = createContext<profileContextType>(null!);


export const ProfileProvider = ({children}: {children: React.ReactNode}) => {
    const { user } = useAuth();
    const [ profile, setProfile ] = useState<Profile | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    /**
     * Fetch profile from Profile service
     */
    const refreshProfile = React.useCallback( async () => {
        if( !user ) {
            setProfile(null);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE}/profile/${user.id}`
            );
            if (!res.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data = await res.json();
            const { profile } = data;

            setProfile({
                id: user.id,
                email: user.email,
                username: profile?.username ?? null,
                first_name: profile?.first_name ?? null,
                last_name: profile?.last_name ?? null,
                profile_image: profile?.profile_image ?? null,
                created_at: profile?.created_at ?? null,
            });

        }
        catch(err) {
            console.error("Profile refreshProfile failed:", err);
            setProfile(null);
        }
        finally {
            setLoading(false);
        }

    }, [user]);

    /**
     * Update profile → then refreshProfile read model
     */
    const updateProfile = React.useCallback( async (updates: Partial<Profile>) => {
        if (!user) return;

        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE}/profile/update/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updates),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update profile");
            }
            const data = await res.json();
            console.log("Profile Data:", data.profile)

            await refreshProfile(); // 🔑 always re-sync from backend
        } catch (err) {
            console.error("Profile update failed:", err);
        } finally {
            setLoading(false);
        }
    }, [user, refreshProfile]);

    /**
     * Clear profile on logout
     */
    const clear = () => {
        setProfile(null);
        setLoading(false)
    }

    /**
     * Restore auth state on app launch
     */
    useEffect(() => {
        console.log("User from Profile Context:", user);
        if( user ) refreshProfile()
        else clear()
    }, [ user, refreshProfile ]);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                loading,
                refreshProfile,
                updateProfile,
                clear
            }}
        >
            {children && children}
        </ProfileContext.Provider>
    );

};

export const useProfile = () => useContext(ProfileContext);