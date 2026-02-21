import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import { SpeechResultType, WordConfidence } from '@/types';
import { confidenceColor } from '@/utils';
import LangphyText from '../text-components/LangphyText';

const AnalyzedResult = ({result}: {result: SpeechResultType}) => {
    const {colors} = useTheme();
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.cardBackgroundColor,
                    borderTopColor: colors.cardBorderColor,
                    borderLeftColor: colors.cardBorderColor,
                    borderRightColor: colors.cardBorderColor
                }
            ]}
        >
            <LangphyText style={{color:colors.text}}>Transcription: {result.transcription}</LangphyText>
            <LangphyText style={{color:colors.text}}>Similarity Score: {Math.round(result.analysis.similarity * 100)}%</LangphyText>
            <LangphyText style={{color:colors.text}}>{result.analysis.feedback}</LangphyText>
            <LangphyText style={{color:colors.text}}>Pronunciation Score: {result.analysis.pronunciation_score}</LangphyText>
            {/* <Text style={{color:colors.text}}>Compression Ratio:{result.sagments[0].compression_ratio}</Text> */}
            {/* <Text style={{color:colors.text}}>Spoken Text: {result.analysis.spoken_text}</Text> */}
            {
                result.words?.map( (word: WordConfidence, idx: number) => (
                    <LangphyText style={{color:colors.text}}>{word.text} | <LangphyText style={{color: confidenceColor( result.sagments[0].avg_logprob ) || colors.text}}>{word.confidence.label}</LangphyText></LangphyText>
                ))
            }
            <LangphyText style={{color:colors.text}}>Issues: {result.analysis?.issues?.join(", ")}</LangphyText>

        </View>
    )
}

export default AnalyzedResult

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: "100%",
        gap: 5,
        padding: 10,
        borderStartStartRadius: 20,
        borderEndStartRadius: 20,
        borderTopWidth: 6,
        borderLeftWidth: 1,
        borderRightWidth: 1
    }
})