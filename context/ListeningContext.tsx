import { SessionProviderProps, SessionResultType } from "@/types";
import React, { useCallback } from "react";
import { useState, useContext, createContext } from "react";

type ListeningContextType = {
    result: SessionResultType | null;
    resultHandler: (e: SessionResultType) => void;
    loading: boolean;
}

const ListeningContext = createContext<ListeningContextType | null>(null)

export const ListeningProvider = ({children}: SessionProviderProps) => {
    const [result, setResult] = useState<SessionResultType | null>(null)
    const [ loading, setLoading ] = useState<boolean>(false)

    const resultHandler = useCallback( async (resultData: SessionResultType) => {
        try {
            setLoading(true)
            setResult(resultData)
            setLoading(false)
        }
        catch(err) {
            console.warn("Listening result error:", err)
            setLoading(false)
        }
    }, [result] );

    return (
        <ListeningContext.Provider
            value={{
                result,
                resultHandler,
                loading
                // similarity: result?.similarity || 0,
                // feedback: result?.feedback || "",
            }}
        >
            {children}
        </ListeningContext.Provider>
    )
}

export const useListening = () => {
    const ctx = useContext( ListeningContext );

    if( !ctx ) throw new Error( "useListening must be used this inside ListeningProvider" );

    return ctx;
}