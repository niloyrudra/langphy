import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProfileLearningProgressCardBg } from '@/utils/SVGImages';
import { useTheme } from '@/theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import LangphyText from '@/components/text-components/LangphyText';

interface LearningProgressItemProps {
    icon: React.ReactNode;
    title: string;
    score: string;
}

const LearningProgressItem = ({icon, title, score}: LearningProgressItemProps) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.profileCardBg}]}>
            {/* Background Image */}
            <View style={styles.bgImage}>
                <ProfileLearningProgressCardBg />
            </View>

            <View style={styles.content}>
                <View style={styles.progressDetail}>
                    <View style={[styles.icon, {backgroundColor: colors.profileCardImgBgClr}]}>
                        {icon}
                    </View>
                    <LangphyText weight="medium" style={[styles.title, {color: colors.text }]}>{title}</LangphyText>
                </View>

                <LinearGradient
                    colors={[colors.profileCardStatsGradientLight, colors.profileCardStatsGradientDark]}
                    style={styles.scoreContainer}
                >
                    <LangphyText weight="semibold" style={[styles.score, {color: colors.text }]}>{score}</LangphyText>

                </LinearGradient>

            </View>

        </View>
    );
}

export default LearningProgressItem;

const styles = StyleSheet.create({
    container: {
        height: 60,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        flex: 1,
        overflow: "hidden",
        position: "relative"
    },
    bgImage: {
        position: "absolute",
        top: 0,
        right: 0
    },
    content: {
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 20,
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center"
    },
    progressDetail: {
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: "500"
    },
    scoreContainer: {
        width: 100,
        height: 35,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    score: {
        fontSize: 16,
        fontWeight: "600"
    }
});