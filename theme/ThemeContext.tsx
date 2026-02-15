import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "@/constants/colors";
import { useSettings } from "@/hooks/useSettings";
import { useUpdateSettings } from "@/hooks/useUpdateSettings";
import { useAuth } from "@/context/AuthContext";

type Theme = 'light' | 'dark' | null;

interface ThemeContextProps {
    theme: Theme,
    colors: typeof lightColors
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ( { children }: { children: ReactNode  } ) => {
    const systemColorScheme = useColorScheme();
    const [ theme, setTheme ] = useState<Theme>( systemColorScheme === 'dark' ? 'dark' : 'light' );
    const {user} = useAuth();
    const { data: settings, isLoading } = useSettings( user?.id as string );
    const { mutate: updateSettings } = useUpdateSettings( user?.id as string );

    useEffect(() => {
        if( !isLoading ) {
            const resolvedTheme = settings?.theme ?? (systemColorScheme === 'dark' ? 'dark' : 'light');
            setTheme( resolvedTheme as Theme );
        }
    }, [settings?.theme, isLoading, systemColorScheme]);
    
    const toggleTheme = async () => {
        if(!theme) return;
        const newTheme = (theme === 'light') ? 'dark' : 'light';
        setTheme( prevTheme => prevTheme = newTheme );
        updateSettings({ field: 'theme', value: newTheme });
    }

    if (!theme) {
        return null; // ⛔ block render until theme resolved
    }

    const colors = theme === 'light' ? lightColors : darkColors;

    return (
        <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

const useTheme = (): ThemeContextProps => {
    const context = useContext( ThemeContext );

    if( !context ) throw new Error( 'useTheme must be used within a ThemeProvider' );

    return context;
}

export {ThemeProvider, useTheme};