import { ColorValue, StyleSheet, View } from 'react-native'
import React from 'react'
import TranslatedWord from './TranslatedWord';

interface TranslationProps {
    translation: string;
    color: ColorValue | string;
}

const Translation = ( {translation, color}: TranslationProps ) => (
    <View style={styles.translation}>
        {
            translation
                ? translation.split(",").map((word, idx) => (word.trim() !== "") && (<TranslatedWord key={idx.toString()} word={word.trim()} color={color} />))
                : (<TranslatedWord word={'... ... ...'} color={color} />)
        }
    </View>
);

export default Translation;

const styles = StyleSheet.create({
    translation: {
        flexDirection: "column"
    }
});