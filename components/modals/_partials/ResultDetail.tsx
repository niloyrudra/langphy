import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import { memo, ReactNode } from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import LangphyText from '@/components/text-components/LangphyText';

interface ResultDetailProps {
    label?: string;
    isRegular?: boolean;
    labelStyle?: StyleProp<TextStyle>;
    contentStyle?: StyleProp<TextStyle>;
    detail: string | ReactNode;
    iconComponent?: ReactNode;
}

const ResultDetail = ({label, isRegular=false, labelStyle, contentStyle, detail, iconComponent}: ResultDetailProps) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container]}>
            { iconComponent && (
                <View style={styles.iconContainer}>
                    {iconComponent}
                </View>
            )}

            <View style={styles.content}>
                {
                    typeof detail !== 'string'
                        ? (detail)
                        : (<LangphyText>
                                {label && (<LangphyText weight="medium" style={[styles.label, {color:colors.text}]}>{label}</LangphyText>)}
                                {
                                    typeof detail === 'string'
                                        && (<LangphyText
                                                weight={isRegular ? "medium" : "bold"}
                                                style={[
                                                    styles.detail,
                                                    STYLES.wordWrapStyle,
                                                    {color:colors.text},
                                                    (contentStyle && contentStyle)
                                                ]}
                                            >
                                                {detail}
                                            </LangphyText>)
                                        
                                }
                            </LangphyText>)
                }
            </View>
        </View>
    )
}

export default memo(ResultDetail);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10
    },
    iconContainer: {
        width: 24,
        alignItems:"flex-start",
        justifyContent: "flex-start"
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        flexWrap: "wrap"
    },
    label: {
        fontSize: 12,
        marginRight: 5
    },
    detail: {
        fontSize: 12,
        flexWrap: "wrap"
    }
})