import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";

type User = {
    id: string;
    email: string;
    username?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    profile_image?: string | null;
    provider?: string;
    created_at?: Date;
    // token?: string;
}

type authContextType = {
    user: User | null;
    loading: boolean;
    setUser: (e: User | null) => void;
    signIn: ( email: string, password: string ) => Promise<void>;
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
                    setUser( { id: decode.id, email: decode.email } );
                }
                catch(err) {
                    await SecureStore.deleteItemAsync("accessToken");
                }
            }

            setLoading(false);
        }
        restoreAuth();
    }, []);

    const signInHandler = async (email: string, password: string) => {
        try {

            const { data } = await api.post( process.env.EXPO_PUBLIC_API_BASE+"/users/signin", {
                email,
                password,
            });
    
            await SecureStore.setItemAsync("accessToken", data.accessToken);
            setUser(data.user);
        }
        catch(err) {
            console.error("SignI Error:", err)
        }
    };

    const signOutHandler = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser,
                signIn: signInHandler,
                signOut: signOutHandler
            }}
        >
            {children && children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);