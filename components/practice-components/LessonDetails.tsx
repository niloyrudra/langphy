import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LessonDetailsItem from './LessonDetailsItem';

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
        <View
            style={{
                width: "100%",
                backgroundColor: "#142957",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 16,
                marginTop: 'auto'
            }}
        >

            <LessonDetailsItem label={'Context'} content={usage_context ?? ""} />
            <LessonDetailsItem label={'Additional Info'} content={discussion ?? ""} />
            <LessonDetailsItem label={'Grammer Notes'} content={grammar_note ?? ""} />
            {
                formality && (<LessonDetailsItem label={'Formality'} content={formality} />)
            }
            <LessonDetailsItem label={'Regions'} content={region ?? ""} />
            <LessonDetailsItem label={'Level'} content={german_level ?? "A1"} />

            {
                examples && examples?.length > 0 && examples?.every((item) => item.example !== "") && (
                <View style={{flexDirection:"column", alignItems: "flex-start", marginTop: 10}}>
                    <Text style={[styles.subText, { color: "#24DEEC" }]}>Examples:</Text>
                    {
                        examples.map( (item, idx) => (
                            <View
                                key={idx.toString()}
                                style={{
                                    flex: 1,
                                    width: "100%",
                                    padding: 10,
                                    borderStartStartRadius: 0,
                                    borderStartEndRadius: 15,
                                    borderEndEndRadius: 15,
                                    borderEndStartRadius: 15,
                                    backgroundColor: colors.LessonSourceCardBackgroundColor,
                                    marginTop: 10,
                                    gap: 6
                                }}
                            >
                                <Text style={[styles.subText, { fontSize: 14, fontWeight: "900", color: colors.textSubColor }]}>
                                    {item.example}
                                </Text>
                                <Text style={[styles.subText, { fontSize: 13, fontWeight: "900", color: colors.textSubColor }]}>
                                    [ {item.translation} ]
                                </Text>
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
    // flexWrap: "wrap"
  },
  levelText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10
  }
});