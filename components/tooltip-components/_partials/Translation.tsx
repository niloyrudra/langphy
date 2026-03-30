import { ColorValue, FlatList, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import TranslatedWord from './TranslatedWord';

interface TranslationProps {
    translation: string;
    color: ColorValue | string;
}

const Translation = ( {translation, color}: TranslationProps ) => {
    const words = useMemo(() => {
        if (!translation) return ['... ... ...'];

        return translation
            .split(',')
            .map(word => word.trim())
            .filter(Boolean);
    }, [translation]);
    return (
        <FlatList
            data={words}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <TranslatedWord word={item} color={color} />
            )}
            style={styles.translation}
        />
    );
    // return (
    //     <View style={styles.translation}>
    //         {
    //             words.map((word) => (
    //                 <TranslatedWord key={word} word={word} color={color} />
    //             ))
    //         }
    //     </View>
    // );
};

export default Translation;

const styles = StyleSheet.create({
    translation: {
        maxHeight: 120,
    }
});