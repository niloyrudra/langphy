import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalLayout from './_partials/ModalLayout';
import { TargetIcon, WatchIcon } from '@/utils/SVGImages';
import StatsCard from './_partials/StatsCard';
import { useTheme } from '@/theme/ThemeContext';
import ActionButton from '../form-components/ActionButton';
import { usePerformance } from '@/hooks/usePerformance';
import { formatDuration } from '@/utils';
import LottieView from "lottie-react-native";

const feedback = ( score: number ) => {
    if( score >= 90 ) return "Excellent"
    if( score >= 80 ) return "Impressive"
    if( score >= 70 ) return "Nice"
    if( score >= 60 ) return "Good"
    if( score >= 50 ) return "Not Bad"
    else return "Be positive"
}

type UnitCompletionModalProps = {
    isVisible: boolean;
    sessionKey: string;
    onModalVisible: () => void;
    onContinue: () => void;
};

const UnitCompletionModal = ({isVisible, sessionKey, onModalVisible, onContinue}: UnitCompletionModalProps) => {
    const {colors} = useTheme();
    const { data: performance, isLoading, isFetching } = usePerformance( sessionKey );
    // const animationRef = React.useRef<LottieView>(null);

    // React.useEffect(() => {
    //     if(isVisible) {
    //         animationRef.current?.reset();
    //         animationRef.current?.play();
    //     }
    // }, [isVisible]);

    return (
        <ModalLayout
            isVisible={isVisible}
            onModalVisible={onModalVisible}
            gradianColor={[colors.gradiantDeep, colors.gradiantDeep, colors.gradiantDeep, '#1FCAD7', '#3FA1FF']}
            containerStyle={styles.container}
        >
            <View style={styles.modalContainer}>
                <View style={styles.flex}>
                    <View style={styles.space} />

                    {/* Top Greetings */}
                    <View style={styles.greetingSection}>

                        <View style={styles.greetingContent}>
                            <LottieView
                                // ref={animationRef}
                                source={require(`../../assets/lotties/celebration-illustration.json`)}
                                autoPlay
                                loop={false}
                                speed={1}
                                resizeMode='contain'
                                style={{ width: 320, height: 300 }}
                            />
                        </View>

                        <Text style={styles.resultHeader}>Lesson Complete</Text>
                        <Text style={styles.resultSubHeader}>Great job! Keep learning and improve your skills!</Text>
                    </View>

                    {/* Stats Section */}
                    <View style={styles.stats}>
    
                        <StatsCard
                            title="Accuracy"
                            IconComponent={<TargetIcon width={56} height={56} />}
                            statsValue={
                                typeof performance?.avg_score === "number"
                                ? `${Math.round(performance.avg_score)}%`
                                : "--"
                            }
                            feedbackText={feedback(performance?.avg_score ?? 0)}
                        />

                        <StatsCard
                            title="Time"
                            IconComponent={<WatchIcon width={56} height={56} />}
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

export default UnitCompletionModal;

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
        height: "3%"
    },
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