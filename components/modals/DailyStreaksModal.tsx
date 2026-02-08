import { StyleSheet, View, Text, Dimensions } from "react-native";
import ModalLayout from "./_partials/ModalLayout";
import { useTheme } from "@/theme/ThemeContext";
import { SteakIcon } from "@/utils/SVGImages";
import { DBStreak } from "@/types";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
import ActionButton from "../form-components/ActionButton";

interface DailyStreaksModalProps {
    visible: boolean;
    streak: DBStreak | null | undefined;
    onClose: () => void;
}

function getStreakTier(days: number) {
    if (days >= 30) return "legend";
    if (days >= 14) return "fire";
    if (days >= 7) return "hot";
    return "warm";
}

const animationConfig = {
    warm: { scale: [0.9, 1], duration: 300 },
    hot: { scale: [0.8, 1.05, 1], duration: 500 },
    fire: { scale: [0.7, 1.1, 1], duration: 700 },
    legend: { scale: [0.6, 1.15, 1], duration: 900 },
};


const DailyStreaksModal = ({
    visible,
    streak,
    onClose
}: DailyStreaksModalProps) => {
    const {colors} = useTheme();
    const scale = useSharedValue(0.8);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        if (!visible || !streak) return;

        const tier = getStreakTier(streak.current_streak);
        const cfg = animationConfig[tier];

        scale.value = withSequence(
            ...cfg.scale.map(s =>
                withTiming(s, { duration: cfg.duration / cfg.scale.length })
            )
        );
    }, [visible, streak?.current_streak]);

    return (
        <ModalLayout
            isVisible={visible}
            onModalVisible={onClose}
            gradianColor={[colors.gradiantDeep, colors.gradiantDeep, colors.gradiantDeep, '#1FCAD7', '#3FA1FF']}
            containerStyle={styles.container}
        >
            <View style={styles.modalContainer}>
                <View style={styles.flex}>
                    <View style={styles.space} />

                    <View style={styles.greetingSection}>
                        <View style={styles.greetingContent}>
                            <SteakIcon width={100} height={100} />
                        </View>

                        <Animated.View style={animatedStyle}>
                            <Text>Streak Updated!</Text>
                            <Text>You are on a {streak?.current_streak}-day Streak!</Text>
                        </Animated.View>

                    </View>

                    <View style={styles.buttonContainer}>
                        <ActionButton
                            buttonTitle="Continue"
                            onSubmit={onClose}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                    </View>

                </View>
            </View>
        </ModalLayout>
    );
}

export default DailyStreaksModal;

const styles = StyleSheet.create({
    container: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    modalContainer: {
        // flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 20,
        height: Dimensions.get('window').height,
    },
    flex: {flex: 1},
    space: {
        height: "20%"
    },
    buttonWrapper: {
        marginTop: "auto"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 0
    },
    content: { gap: 5 },
    greetingSection: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    greetingContent: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: "auto",
        marginBottom: 20
    },
    button: {
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF"
    },
    buttonText: {
        color: "#142C57"
    }
});