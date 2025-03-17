import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";

// import AsyncStorage, {useAsyncStorage, AsyncStorageStatic} from '@react-native-async-storage/async-storage'
// import { AsyncStorageHook } from "@react-native-async-storage/async-storage/lib/typescript/types";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { darkColors, lightColors } from "@/constants/colors";

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

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem( 'theme' );
            // const storedTheme: AsyncStorageHook = await useAsyncStorage('theme');
            // if( storedTheme ) setTheme( storedTheme as unknown as Theme );
            if( storedTheme ) setTheme( storedTheme as Theme );
        }
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = (theme === 'light') ? 'dark' : 'light';
        setTheme( prevTheme => prevTheme = newTheme );

        await AsyncStorage.setItem( 'theme', newTheme );
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