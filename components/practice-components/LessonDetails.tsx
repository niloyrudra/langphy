import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LessonDetailsItem from './LessonDetailsItem';
import STYLES from '@/constants/styles';
import LangphyText from '../text-components/LangphyText';

type LessonExample = {
    example: string;
    translation: string;
}

type PracticeLessonDetailsProps = {
    usage_context: string | null;
    german_level: string | null;
    region: string | null;
    formality: string | null;
    discussion: string | null;
    grammar_note: string | null;
    examples: LessonExample[] | null;
}

const PracticeLessonDetails: React.FC<PracticeLessonDetailsProps> = ({
    usage_context,
    german_level,
    region,
    formality,
    discussion,
    grammar_note,
    examples
}) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.listeningInfoBgColor}]}>

            <LessonDetailsItem label={'Context'} content={usage_context ?? ""} />
            <LessonDetailsItem label={'Info'} content={discussion ?? ""} />
            <LessonDetailsItem label={'Notes'} content={grammar_note ?? ""} />
            {
                formality && (<LessonDetailsItem label={'Formality'} content={formality} />)
            }
            <LessonDetailsItem label={'Regions'} content={region ?? ""} />
            <LessonDetailsItem label={'Level'} content={german_level ?? "A1"} />

            {
                examples && examples?.length > 0 && examples?.every((item) => item.example !== "") && (
                <View style={styles.exampleContainer}>
                    <LangphyText style={[styles.subText]}>Examples:</LangphyText>
                    {
                        examples.map( (item, idx) => (
                            <View
                                key={idx.toString()}
                                style={[styles.content, {backgroundColor: colors.LessonSourceCardBackgroundColor}]}
                            >
                                <LangphyText weight="black" style={[styles.subText, STYLES.wordWrapStyle, { fontSize: 14, fontWeight: "900", color: colors.textSubColor }]}>
                                    {item.example}
                                </LangphyText>
                                <LangphyText weight="black" style={[styles.subText, STYLES.wordWrapStyle, { fontSize: 13, fontWeight: "900", color: colors.textSubColor }]}>
                                    [ {item.translation} ]
                                </LangphyText>
                            </View>
                        ))
                    }
                </View>
                )
            }

        </View>
    )
}

export default PracticeLessonDetails;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 16,
        marginTop: 'auto'
    },
    exampleContainer: {
        flexDirection:"column",
        alignItems: "flex-start",
        marginTop: 10
    },
    content: {
        flex: 1,
        width: "100%",
        padding: 10,
        borderStartStartRadius: 0,
        borderStartEndRadius: 15,
        borderEndEndRadius: 15,
        borderEndStartRadius: 15,
        marginTop: 10,
        gap: 6
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        alignItems: "center"
    },
    mainText: {
        fontSize: 20,
        fontWeight: "700",
    },
    subText: {
        fontSize: 13,
        fontWeight: "400",
        color: "#24DEEC"
    },
    levelText: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 10
    }
});