import { StyleSheet, View } from 'react-native'
import React from 'react'
import NLPAnalyzedPhase from '../nlp-components/NLPAnalyzedPhase';
import SIZES from '@/constants/size';
import SpeakerComponent from '../icons/SpeakerComponent';

interface SpeakerWithQuestionProps {
    phrase: string;
    lang?: "en-US" | "de-DE";
    handleTooltip: (value: any) => void;
    wordRefs: React.MutableRefObject<Map<string, any>>;
    containerRef: React.RefObject<View | null>
}

const SpeakerWithQuestion = ({
    phrase,
    lang="de-DE",
    handleTooltip,
    wordRefs,
    containerRef
}: SpeakerWithQuestionProps) => (
    <View style={[styles.container]}>
        {/* Query Listen with Query Text Section */}
        <SpeakerComponent
            speechContent={phrase}
            speechLang={lang}
        />
                
        {/* Tappable Words with ToolTip */}
        <View style={styles.textContainer}>
            <NLPAnalyzedPhase
                phrase={phrase}
                onHandler={handleTooltip}
                wordRefs={wordRefs}
                containerRef={containerRef}
            />
        </View>
    </View>
);


export default SpeakerWithQuestion;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 0,
        position: 'relative',
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        gap: 20
    },
    textContainer: {
        width: SIZES.screenWidth - 100,
    }
})