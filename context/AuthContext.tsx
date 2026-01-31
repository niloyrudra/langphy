import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
// import api from "@/lib/api";
import { User } from "@/types";
import { bootstrapProfileFromToken } from "@/bootstraps/profile.bootstrap";
import { bootstrapSettingsFromToken } from "@/bootstraps/settings.bootstrap";
import { bootstrapStreaks } from "@/bootstraps/streaks.bootstrap";

type authContextType = {
    user: User | null;
    loading: boolean;
    // setUser: (e: User | null) => void;
    // signIn: ( email: string, password: string ) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<authContextType>(null!);


export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * Restore auth state on app launch
     */
    useEffect(() => {
        const restoreAuth = async () => {

            const token = await SecureStore.getItemAsync("accessToken");

            if(token) {
                try {
                    const decode: any = jwtDecode(token);
                    console.log("decode:", decode);
                    setUser( { id: decode.id, email: decode.email, created_at: decode?.created_at } );
                    // Storing profile locally
                    await bootstrapProfileFromToken({
                        id: decode.id,
                        email: decode.email,
                        created_at: decode?.created_at
                    });
                    await bootstrapSettingsFromToken({
                        user_id: decode.id,
                    });
                    await bootstrapStreaks({
                        user_id: decode.id,
                    });
                }
                catch(err) {
                    await SecureStore.deleteItemAsync("accessToken");
                }
            }

            setLoading(false);
        }
        restoreAuth();
    }, []);


    const signOutHandler = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                // setUser,
                // signIn: signInHandler,
                signOut: signOutHandler
            }}
        >
            {children && children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);