import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/hooks/useSettings";
import { useUpdateSettings } from "@/hooks/useUpdateSettings";

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
    
    const { user } = useAuth();
    const { data: settings } = useSettings( ( user?.id as string ) );
    const { mutate: updateSettings } = useUpdateSettings( ( user?.id as string ) );

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = settings?.theme ?? 'light';
            if( storedTheme ) setTheme( storedTheme as Theme );
        }
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = (theme === 'light') ? 'dark' : 'light';
        setTheme( prevTheme => prevTheme = newTheme );
        updateSettings({ field: 'toggle_theme', value: newTheme });
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