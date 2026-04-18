import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import LangphyText from '../text-components/LangphyText'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from '@/theme/ThemeContext'

const Query = ({question, containerStyle, regular}: {question: string, containerStyle?: StyleProp<ViewStyle>, regular?: boolean}) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.questionWrapper, (containerStyle && containerStyle)]}>
            <View style={[styles.queryIcon, {backgroundColor: colors.cardIconBackgroundColor}]}>
                <AntDesign name="question" size={20} color={colors.text} />
            </View>
            {
                regular
                    ?   (<LangphyText weight="bold" style={[styles.questionRegular, {color: colors.text}]}>
                            {question}
                        </LangphyText>)
                    :   (<LangphyText weight="semibold" style={[styles.question, {color: colors.text}]}>
                            {question}
                        </LangphyText>)
            }
        </View>
    )
}

export default Query

const styles = StyleSheet.create({
    questionWrapper: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        gap: 20
    },
    queryIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    question: {
        fontSize: 20,
        wordWrap: 'break-word',
        flexShrink: 1,
    },
    questionRegular: {
        fontSize: 16,
        wordWrap: 'break-word',
        flexShrink: 1,
    }
})