import { StyleSheet, View, Text, Modal, Dimensions } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { SpeechResult } from '@/types';
import { feedbackComments } from '@/utils';
import HorizontalLine from '../HorizontalLine';
import ActionPrimaryButton from '../form-components/ActionPrimaryButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import ResultDetail from './_partials/ResultDetail';
import WordConfidenceComponent from './_partials/WordConfidenceComponent';

interface SpeechResultModalProps {
    isVisible: boolean;
    onModalVisible: () => void;
    result: SpeechResult;
    onRetry: () => void;
    onContinue: () => void;
}

const SpeechResultModal = ({isVisible, onModalVisible, result, onRetry, onContinue}: SpeechResultModalProps) => {
    const insets = useSafeAreaInsets();
    const {colors} = useTheme();

    const feedback = React.useMemo(
        () => feedbackComments( result?.analysis?.similarity ?? 0 ),
        [result?.analysis?.similarity]
    );
    
    const wordConfidenceList = React.useMemo(
        () => {
            if(!result?.words?.length) return null;

            return result.words?.map((word, index) => (
                <WordConfidenceComponent
                    key={index.toString()}
                    text={word.text}
                    confidence={word.confidence}
                />
            ));
        },
        [result?.words]
    );

    const handleContinue = React.useCallback( () => onContinue(), [onContinue]);

    if (!isVisible) return null

    return (
        <Modal
            animationType="slide"
            statusBarTranslucent
            visible={isVisible}
            onRequestClose={onModalVisible}
            backdropColor={colors.modalBackDropColor}
            style={styles.modalContainer}
        >
            <View style={styles.centeredView}>
                <View
                    style={[
                        styles.modalView,
                        {
                            borderTopColor: colors.modalBoderColor,
                            borderLeftColor: colors.modalBoderColor,
                            borderRightColor: colors.modalBoderColor,
                        },
                    ]}
                >
                    <LinearGradient
                        colors={[colors.gradiantDeep, colors.gradiantDeep]}
                        style={styles.gradientCard}
                    >
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalText, { color: feedback.color }]}>
                                {feedback.label}
                            </Text>
                        </View>

                        {/* Content */}
                        <View style={styles.modalContent}>
                            <ResultDetail
                                detail={result.transcription}
                                iconComponent={<FontAwesome name="microphone" size={22} color={colors.text} />}
                            />

                            <ResultDetail
                                detail={wordConfidenceList}
                                iconComponent={<MaterialIcons name="sports-score" size={22} color={colors.text} />}
                            />

                            <ResultDetail
                                label="Similarity:"
                                detail={`${Math.round(result.analysis.similarity * 100)}%`}
                                iconComponent={<FontAwesome name="trophy" size={20} color={colors.text} />}
                            />

                            <ResultDetail
                                label="Pronunciation:"
                                detail={String(result.analysis.pronunciation_score)}
                                iconComponent={<FontAwesome6 name="crown" size={16} color={colors.text} />}
                            />

                            <ResultDetail
                                label="Issues:"
                                detail={
                                    result.analysis.issues?.length > 0
                                        ? result.analysis.issues.join(', ')
                                        : 'No issues found'
                                }
                                iconComponent={<MaterialIcons name="error" size={20} color={colors.text} />}
                            />

                            <ResultDetail
                                detail={result.analysis.feedback}
                                iconComponent={<FontAwesome name="comment" size={17} color={colors.text} />}
                            />

                            <HorizontalLine style={styles.divider} />

                            <View style={styles.buttonRow}>
                                <ActionPrimaryButton
                                    buttonTitle="Retry"
                                    onSubmit={onRetry}
                                    buttonStyle={styles.button}
                                />
                                <ActionPrimaryButton
                                    buttonTitle="Continue"
                                    onSubmit={handleContinue}
                                    buttonStyle={styles.button}
                                />
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
}

export default React.memo(SpeechResultModal);

const styles = StyleSheet.create({
    modalContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        bottom: 0
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 0
    },
    modalView: {
        width: "98%",
        overflow: "hidden",
        borderStartStartRadius: 20,
        borderEndStartRadius: 20,
        borderTopWidth: 6,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: "700"
    },
    contentWrapper: {
        marginTop: 10,
        flexDirection: "column",
        gap: 5
    },
    gradientCard: {padding: 20},
    modalHeader: {marginBottom: 15},
    modalContent: {gap: 5},
    wordConfidenceContainer: {
        gap: 2,
        flexDirection: "column"
    },
    divider: {
        marginVertical: 15,
        borderBottomColor: "#3FA1FF"
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center"
    },
    button: {
        width: '45%',
        borderRadius: 30,
        overflow: 'hidden'
    }
});