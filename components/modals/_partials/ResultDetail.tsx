import { StyleSheet, Text, View } from 'react-native'
import { memo, ReactNode } from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';

interface ResultDetailProps {
    label?: string;
    detail: string | ReactNode;
    iconComponent?: ReactNode;
}

const ResultDetail = ({label, detail, iconComponent}: ResultDetailProps) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container]}>
            { iconComponent && (
                <View style={styles.iconContainer}>
                    {iconComponent}
                </View>
            )}

            <View style={styles.content}>
                {label && (<Text style={[ {color:colors.text}]}>{label}</Text>)}
                {
                    typeof detail === 'string'
                        ? (<Text style={[styles.detail, STYLES.wordWrapStyle, {color:colors.text}]}>
                            {detail}
                            </Text>)
                        : detail
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
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    detail: {
        fontWeight: "800",
        fontSize: 16
    }
})