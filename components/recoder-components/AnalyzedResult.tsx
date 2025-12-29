import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import { SpeechResult } from '@/types';
import { confidenceColor } from '@/utils';

const AnalyzedResult = ({result}: {result: SpeechResult}) => {
    const {colors} = useTheme();
    return (
        <View
            style={{
            marginVertical: 10,
            width: "100%",
            gap: 5
            }}
        >
            <Text style={{color:colors.text}}>Transcription: {result.transcription}</Text>
            <Text style={{color:colors.text}}>Similarity Score: {Math.round(result.analysis.similarity * 100)}%</Text>
            <Text style={{color:colors.text}}>{result.analysis.feedback}</Text>
            <Text style={{color:colors.text}}>Pronunciation Score: {result.analysis.pronunciation_score}</Text>
            {/* <Text style={{color:colors.text}}>Compression Ratio:{result.sagments[0].compression_ratio}</Text> */}
            {/* <Text style={{color:colors.text}}>Spoken Text: {result.analysis.spoken_text}</Text> */}
            {
                // result.hasOwnProperty( 'words' ) && result?.words?.map( (word: {text: string, confidence: string | number}, idx: number) => (
                    // <Text style={{color:colors.text}}>{word.text} | <Text style={{color: colors.text}}>{word.confidence}</Text></Text>
                    // <Text style={{color:colors.text}}>{word.text} | <Text style={{color: confidenceColor( result.sagments[0].avg_logprob ) || colors.text}}>{word.confidence}</Text></Text>
                // ))
            }
            <Text style={{color:colors.text}}>Issues: {result.analysis?.issues?.join(", ")}</Text>

        </View>
    )
}

export default AnalyzedResult

const styles = StyleSheet.create({})