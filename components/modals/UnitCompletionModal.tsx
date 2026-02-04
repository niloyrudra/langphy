import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalLayout from './_partials/ModalLayout';
import { DolphinCongratulationsIcon, TargetIcon, WatchIcon } from '@/utils/SVGImages';
import StatsCard from './_partials/StatsCard';
import { useTheme } from '@/theme/ThemeContext';
import ActionButton from '../form-components/ActionButton';
import { useProgress } from '@/hooks/useProgress';
import { useUpdateStreaks } from '@/hooks/useUpdateStreaks';
import { useAuth } from '@/context/AuthContext';
import { useStreak } from '@/hooks/useStreaks';

type UnitCompletionModalProps = {
    isVisible: boolean;
    lessonIds?: string[];
    onModalVisible: () => void;
    stats: {
        total: number;
        correct: number;
        accuracy: number;
        time: string;
    };
    onContinue: () => void;
}

const UnitCompletionModal = ({isVisible, lessonIds, onModalVisible, stats, onContinue}: UnitCompletionModalProps) => {
    const {colors} = useTheme();
    const { user } = useAuth();
    const { data: progress, isLoading, isFetching } = useProgress();
    const { data: streaks } = useStreak( user?.id as string );
    const { mutateAsync: updateStreaks, isPending } = useUpdateStreaks();

    React.useEffect(() => {
        const updateData = async () => {
            try {
                const currentStreaks = ( streaks?.current_streak || 1 ) + 1;
                const longestStreaks = ( streaks?.longest_streak && streaks?.longest_streak > currentStreaks ) ? streaks?.longest_streak : currentStreaks;
                await updateStreaks({
                    user_id: user?.id || "",
                    current_streak: currentStreaks,
                    longest_streak: longestStreaks
                });
            }
            catch(error) {
                console.error("updateData error:", error)
            }
        }

        updateData()
    }, []);

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
                            <DolphinCongratulationsIcon width={152} height={156} />
                        </View>
                        {/* <Text style={{fontSize: 24, fontWeight: '800', marginBottom: 5, color: 'gold'}}>Congratulations!</Text> */}
                        <Text style={styles.resultHeader}>Lesson Complete</Text>
                        <Text style={styles.resultSubHeader}>Great job! Keep learning and improve your skills!</Text>
                    </View>

                    {/* Stats Section */}
                    <View style={styles.stats}>
    
                        <StatsCard
                            title='Accuracy'
                            IconComponent={<TargetIcon width={56} height={56} />}
                            statsValue={stats.accuracy+"%"}
                            feedbackText='Impressive'
                        />

                        <StatsCard
                            title='Time'
                            IconComponent={<WatchIcon width={56} height={56} />}
                            statsValue={stats.time}
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
        height: "20%"
    },
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