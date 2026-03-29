import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import ModalLayout from './_partials/ModalLayout';
import { useTheme } from '@/theme/ThemeContext';
import ActionButton from '../form-components/ActionButton';
import LottieView from "lottie-react-native";
import LangphyText from '../text-components/LangphyText';
import { useFeedback } from '@/utils/feedback';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { MILESTONE_META, MilestoneDay } from '@/utils/milestone-config';
import { DBStreak } from '@/types';


type MilestonesAchievementModalProps = {
    isVisible: boolean;
    streak: DBStreak;
    milestone: MilestoneDay;
    onClose: () => void;
};

const MilestonesAchievementModal = ({isVisible, streak, milestone, onClose}: MilestonesAchievementModalProps) => {
    const {colors} = useTheme();
    const { triggerFeedback } = useFeedback();
 
    const meta = MILESTONE_META[milestone];
 
    // Badge scale-in with overshoot spring
    const badgeScale = useSharedValue(0);
    const badgeRotate = useSharedValue(-15);
    const labelOpacity = useSharedValue(0);
    const labelTranslateY = useSharedValue(20);
    const messageOpacity = useSharedValue(0);
 
    const badgeStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: badgeScale.value },
            { rotate: `${badgeRotate.value}deg` },
        ],
    }));
 
    const labelStyle = useAnimatedStyle(() => ({
        opacity: labelOpacity.value,
        transform: [{ translateY: labelTranslateY.value }],
    }));
 
    const messageStyle = useAnimatedStyle(() => ({
        opacity: messageOpacity.value,
    }));
 
    React.useEffect(() => {
        if (!isVisible) return;
 
        // Badge springs in with a slight tilt-to-straight
        badgeScale.value = withSpring(1, { damping: 8, stiffness: 120 });
        badgeRotate.value = withSpring(0, { damping: 10, stiffness: 100 });
 
        // Label slides up after badge
        labelOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
        labelTranslateY.value = withDelay(300, withSpring(0, { damping: 12, stiffness: 100 }));
 
        // Message fades in last
        messageOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
 
        triggerFeedback("sessionComplete");
    }, [isVisible]);

    return (
        <ModalLayout
            isVisible={isVisible}
            onModalVisible={onClose}
            gradianColor={[colors.gradiantDeep, colors.gradiantDeep, colors.gradiantDeep, colors.secondary_900, colors.primary_900]}
            containerStyle={styles.container}
        >
            <View style={styles.modalContainer}>
                <View style={styles.flex}>
                    <View style={styles.space} />

                    {/* Top Greetings */}
                    <View style={styles.greetingSection}>

                        <View style={styles.greetingContent}>
                            <LottieView
                                source={require(`../../assets/lotties/celebration-illustration.json`)}
                                autoPlay
                                loop={false}
                                speed={0.8}
                                resizeMode='cover'
                                style={styles.dimensions}
                            />
                        </View>

                        {/* <LangphyText weight="extrabold" style={styles.resultHeader}>Lesson Complete</LangphyText> */}
                        {/* <LangphyText style={styles.resultSubHeader}>Great job! Keep learning and improve your skills!</LangphyText> */}
                        
                        <View style={styles.contentSection}>
    
                            {/* Milestone badge emoji */}
                            <Animated.View style={[styles.badgeContainer, badgeStyle]}>
                                <LangphyText style={styles.badgeEmoji}>{meta.badge}</LangphyText>
                            </Animated.View>
    
                            {/* Milestone label */}
                            <Animated.View style={labelStyle}>
                                <LangphyText
                                    weight="extrabold"
                                    style={[styles.milestoneLabel, { color: "#68F0F8" }]}
                                >
                                    {meta.label}
                                </LangphyText>
                            </Animated.View>
    
                            {/* Day count */}
                            <Animated.View style={labelStyle}>
                                <LangphyText
                                    weight="extrabold"
                                    style={[styles.dayCount, { color: colors.text }]}
                                >
                                    {streak?.current_streak}
                                </LangphyText>
                                
                                <LangphyText
                                    weight="bold"
                                    style={[styles.daySuffix, { color: colors.text }]}
                                >
                                    Day{milestone > 1 ? "s" : ""} Streak
                                </LangphyText>
                            </Animated.View>
    
                            {/* Motivational message */}
                            <Animated.View style={[styles.messageContainer, messageStyle]}>
                                <LangphyText style={[styles.message, { color: colors.text }]}>
                                    {meta.message}
                                </LangphyText>
                            </Animated.View>
    
                        </View>

                    </View>
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
        </ModalLayout>
    );
}

export default MilestonesAchievementModal;

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
    flex: {flex: 1},
    dimensions: { width: 320, height: 300 },
    // space: {
    //     height: "3%"
    // },
    space: { height: "8%" },
 
    // Lottie sits behind content
    lottieWrapper: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.25,
    },
    lottieBackground: {
        // width: width,
        // height: width,
    },
 
    contentSection: {
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        paddingHorizontal: 20,
    },
 
    badgeContainer: {
        marginBottom: 8,
    },
    badgeEmoji: {
        fontSize: 80,
        textAlign: "center",
    },
 
    milestoneLabel: {
        fontSize: 22,
        textAlign: "center",
        letterSpacing: 0.5,
    },
    dayCount: {
        fontSize: 72,
        textAlign: "center",
        lineHeight: 80,
    },
    daySuffix: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 4,
    },
 
    messageContainer: {
        marginTop: 16,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    message: {
        fontSize: 15,
        textAlign: "center",
        lineHeight: 22,
        opacity: 0.9,
    },
 
    // buttonContainer: {
    //     marginTop: "auto",
    //     marginBottom: 20,
    // },
    greetingSection: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    greetingContent: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultHeader: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 5,
        color: '#68F0F8'
    },
    resultSubHeader: {
        fontSize: 12,
        color: '#EEF8FF',
        textAlign: 'center'
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        gap: 10,
        marginTop: 15
        // width: "80%"
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
})