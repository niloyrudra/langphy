import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";
import { bootstrap } from "@/bootstraps/bootstrap";
import { authSnapshot } from "@/snapshots/authSnapshot";

type authContextType = {
    user: User | null;
    loading: boolean;
    setUser: (e: User | null) => void;
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
                    
                    setUser( { id: decode.id, email: decode.email, created_at: decode.created_at } );
                    console.log("setUser is set.")
                    authSnapshot.set(
                        decode.id,
                        token
                    );
                    console.log("authSnapshot is set.")
                    
                    // Bootstrap user data
                    await bootstrap( decode );
                    console.log("bootstrap is set.")
                }
                catch(err) {
                    console.error("restoreAuth error:", err);
                    await SecureStore.deleteItemAsync("accessToken");
                }
            }
            else {
                authSnapshot.clear();
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
                setUser,
                // signIn: signInHandler,
                signOut: signOutHandler
            }}
        >
            {children && children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);