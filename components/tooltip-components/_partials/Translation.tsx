import { ColorValue, View } from 'react-native'
import React from 'react'
import TranslatedWord from './TranslatedWord';

const Translation = ({translation, color}: {translation: string, color: ColorValue | string}) => (
    <View style={{flexDirection: "column"}}>
        {
            translation
                ? translation.split(",").map((word, idx) => (word.trim() !== "") && (<TranslatedWord key={idx.toString()} word={word.trim()} color={color} />))
                : (<TranslatedWord word={'... ... ...'} color={color} />)
        }
    </View>
);

export default Translation;