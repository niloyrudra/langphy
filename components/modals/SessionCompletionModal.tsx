import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import ModalLayout from './_partials/ModalLayout';
import { TargetIcon, WatchIcon } from '@/utils/SVGImages';
import StatsCard from './_partials/StatsCard';
import { useTheme } from '@/theme/ThemeContext';
import ActionButton from '../form-components/ActionButton';
import { usePerformance } from '@/hooks/usePerformance';
import { formatDuration } from '@/utils';
import LottieView from "lottie-react-native";
import LangphyText from '../text-components/LangphyText';
import { useFeedback } from '@/utils/feedback';

const feedback = ( score: number ) => {
    if( score >= 90 ) return "Excellent"
    if( score >= 80 ) return "Impressive"
    if( score >= 70 ) return "Nice"
    if( score >= 60 ) return "Good"
    if( score >= 50 ) return "Not Bad"
    else return "Be positive"
}

type SessionCompletionModalProps = {
    isVisible: boolean;
    sessionKey: string;
    onModalVisible: () => void;
    onContinue: () => void;
};

const SessionCompletionModal = ({isVisible, sessionKey, onModalVisible, onContinue}: SessionCompletionModalProps) => {
    const {colors} = useTheme();
    const { data: performance } = usePerformance( sessionKey );
    const {triggerFeedback} = useFeedback();

    React.useEffect(() => {        
        triggerFeedback("sessionComplete");
    }, []);
    return (
        <ModalLayout
            isVisible={isVisible}
            onModalVisible={onModalVisible}
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
                                speed={0.85}
                                resizeMode='contain'
                                // resizeMode='cover'
                                style={styles.dimensions}
                            />
                        </View>

                        {/* <LangphyText weight="extrabold" style={styles.resultHeader}>Lesson Complete</LangphyText> */}
                        <LangphyText weight="bold" style={styles.resultHeader}>Lesson Complete</LangphyText>
                        <LangphyText style={styles.resultSubHeader}>Great job! Keep learning and improve your skills!</LangphyText>
                    </View>

                    {/* Stats Section */}
                    <View style={styles.stats}>
    
                        <StatsCard
                            title="Accuracy"
                            IconComponent={<TargetIcon width={50} height={50} />} // 56
                            statsValue={
                                typeof performance?.avg_score === "number"
                                ? `${Math.round(performance.avg_score)}%`
                                : "--"
                            }
                            feedbackText={feedback(performance?.avg_score ?? 0)}
                        />

                        <StatsCard
                            title="Time"
                            IconComponent={<WatchIcon width={50} height={50} />} // 56
                            statsValue={
                                typeof performance?.total_duration_ms === "number"
                                ? formatDuration(performance.total_duration_ms)
                                : "--"
                            }
                            statsUnit="min"
                        />

                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <ActionButton
                        buttonTitle="Continue"
                        onSubmit={onContinue}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>

            </View>
        </ModalLayout>
    );
}

export default SessionCompletionModal;

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
    space: {
        height: "2%"
    },
    greetingSection: {
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 10
    },
    greetingContent: {
        // marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultHeader: {
        fontSize: 28, // 32,
        textAlign: "center",
        fontWeight: '800',
        marginBottom: 4,
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
        justifyContent: 'center',
        // paddingHorizontal: 20,
        gap: 12, // 10,
        marginTop: 12,
        // width: "100%"
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