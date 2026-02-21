import { StyleSheet, View, Text, Dimensions } from "react-native";
import ModalLayout from "./_partials/ModalLayout";
import { useTheme } from "@/theme/ThemeContext";
import { DBStreak } from "@/types";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
import LottieView from "lottie-react-native";
import ActionPrimaryButton from "../form-components/ActionPrimaryButton";
import LangphyText from "../text-components/LangphyText";

type StreakTier =
    | "warm"
    | "hot"
    | "fire"
    | "legend"
    | "king"
    | "king-of-kings";

const STREAK_TIERS: { min: number; tier: StreakTier }[] = [
    { min: 100, tier: "king-of-kings" },
    { min: 50, tier: "king" },
    { min: 30, tier: "legend" },
    { min: 14, tier: "fire" },
    { min: 7, tier: "hot" },
    { min: 3, tier: "warm" },
    { min: 0, tier: "warm" },
];


interface DailyStreaksModalProps {
    visible: boolean;
    streak: DBStreak | null | undefined;
    onClose: () => void;
}

function getStreakTier(days: number): StreakTier {
    return (
        STREAK_TIERS.find(t => days >= t.min)?.tier ?? "warm"
    );
}

const animationConfig: Record<
    StreakTier,
    { scale: number[]; duration: number }
> = {
    warm: { scale: [0.9, 1], duration: 300 },
    hot: { scale: [0.8, 1.05, 1], duration: 500 },
    fire: { scale: [0.7, 1.1, 1], duration: 700 },
    legend: { scale: [0.6, 1.15, 1], duration: 900 },
    king: { scale: [0.5, 1.2, 1], duration: 1100 },
    "king-of-kings": { scale: [0.4, 1.25, 1], duration: 1300 },
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
        // if (!visible || !streak) return;

        const tier = getStreakTier(streak?.current_streak ?? 1);
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
            gradianColor={[colors.gradiantDeep, colors.gradiantFlat, colors.gradiantFlat]}
            containerStyle={styles.container}
        >
            <View style={styles.modalContainer}>
                <View style={styles.flex}>
                    <View style={styles.space} />

                    <View style={styles.greetingSection}>
                        <View style={styles.greetingContent}>
                            <LottieView
                                source={require(`../../assets/lotties/streak.json`)}
                                speed={1}
                                autoPlay
                                loop={false}
                                resizeMode="contain"
                                style={styles.lottie}
                            />
                        </View>

                        <Animated.View style={animatedStyle}>
                            <LangphyText weight="extrabold" style={[styles.streakCount, {color:colors.text}]}>{streak?.current_streak}</LangphyText>
                        </Animated.View>

                        <View style={styles.details}>
                            <LangphyText weight="bold" style={[styles.streakCountSuffix, {color:colors.text}]}>Day{(streak!.current_streak > 1 ? 's' : '')} Streak</LangphyText>
                            <LangphyText style={[styles.subText, {color:colors.text}]}>Consistency makes you fluent.</LangphyText>
                        </View>

                    </View>

                    <View style={styles.buttonContainer}>
                        <ActionPrimaryButton
                            buttonTitle="Continue Learning"
                            onSubmit={onClose}
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
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 20,
        height: Dimensions.get('window').height,
    },
    details: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    streakCount: {
        fontSize: 64,
        fontWeight: "800",
        textAlign: "center"
    },
    streakCountSuffix: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center"
    },
    subText: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center"
    },
    lottie: {width: 200, height: 200},
    flex: {flex: 1},
    space: {
        height: "10%"
    },
    greetingSection: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
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
});