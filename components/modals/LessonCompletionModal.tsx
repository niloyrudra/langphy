import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { PracticeResultType, SelectiveResultType, SessionResultType, SpeechResultType, Token, WordConfidence } from '@/types';
import { feedbackComments } from '@/utils';
import ActionPrimaryButton from '../form-components/ActionPrimaryButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo, FontAwesome, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ResultDetail from './_partials/ResultDetail';
import ModalLayout from './_partials/ModalLayout';
import WordConfidenceComponent from './_partials/WordConfidenceComponent';
import SecondaryActionButton from '../form-components/SecondaryActionButton';
import LangphyText from '../text-components/LangphyText';
import WordListItem from './_partials/WordListItem';

interface LessonCompletionModalProps {
    isVisible: boolean;
    actualQuery?: string;
    onModalVisible: () => void;
    result: SessionResultType | SelectiveResultType | SpeechResultType | PracticeResultType;
    onRetry: () => void;
    onContinue: () => void;
}

const LessonCompletionModal = ({isVisible, actualQuery,onModalVisible, result, onRetry, onContinue}: LessonCompletionModalProps) => {
    const insets = useSafeAreaInsets();
    const {colors} = useTheme();
    const isSelective = 'answered' in result;
    const isPractice = 'practiceScore' in result;
    const isSpeech = 'analysis' in result && 'transcription' in result;
    const speechResult = isSpeech ? (result as SpeechResultType) : null;
    const isSimilarity = !isSelective && !isSpeech && 'similarity' in result;

    const wordConfidenceList = React.useMemo(
        () => {
            if( !isSpeech ) return null;
            if( !speechResult?.words || !speechResult.words?.length) return null;

            return speechResult.words?.map((word: WordConfidence, index: number) => (
                <WordConfidenceComponent
                    key={index.toString()}
                    text={word.text}
                    confidence={word.confidence}
                />
            ));
        },
        [ isSpeech, speechResult ]
    );

    const wordList = React.useMemo(() => {
        if( !isPractice ) return null;
        if( !result?.words || !result.words?.length) return null;
        return result.words.map( (word: Token, index: number) => (<WordListItem key={index.toString()} word={word.lemma ?? ""} pos={word.pos ?? ""} />));
    }, [isPractice, result]);

    const feedback = React.useMemo(() => {
        if (isSelective) return result.feedback ?? "";
        if (isSimilarity) return feedbackComments( result.similarity ?? "" );
        if (isSpeech) return "Analized Result!" // feedbackComments( result.analysis.similarity ?? 0 );
        if (isPractice) return "Lesson Review!" // feedbackComments( result.analysis.similarity ?? 0 );
        return "Your Result!";
    }, [result, isSelective, isSimilarity, isSpeech, isPractice]);

    const handleContinue = React.useCallback( () => onContinue(), [onContinue]);

    return (
        <ModalLayout
            isVisible={isVisible}
            onModalVisible={onModalVisible}
            feedback={feedback}
            gradianColor={[colors.gradiantDeep, colors.gradiantDeep]}
            containerStyle={styles.modalContainer}
        >

            {/* Modal Content */}
            <View style={styles.content}>
                {/* Expected Query */}
                {
                    actualQuery && (
                        <ResultDetail
                            label="Expected Query:"
                            detail={actualQuery}
                            iconComponent={<FontAwesome name="question-circle" size={20} color={colors.text} />}
                        />
                    )
                }

                {/* SPEECH */}
                {
                    isSpeech && speechResult && (
                        <>
                            <ResultDetail
                                detail={speechResult?.transcription}
                                iconComponent={<FontAwesome name="microphone" size={22} color={colors.text} />}
                            />

                            <ResultDetail
                                detail={wordConfidenceList}
                                iconComponent={<MaterialIcons name="sports-score" size={22} color={colors.text} />}
                            />

                            <ResultDetail
                                label="Similarity:"
                                detail={`${Math.round(speechResult.analysis?.similarity * 100)}%`}
                                iconComponent={<FontAwesome name="trophy" size={20} color={colors.text} />}
                            />

                            <ResultDetail
                                label="Pronunciation:"
                                detail={String(speechResult.analysis?.pronunciation_score)}
                                iconComponent={<FontAwesome6 name="crown" size={16} color={colors.text} />}
                            />

                            <ResultDetail
                                label="Issues:"
                                detail={
                                    speechResult.analysis?.issues?.length > 0
                                        ? speechResult.analysis.issues.join(', ')
                                        : 'No issues found'
                                }
                                iconComponent={<MaterialIcons name="error" size={20} color={colors.text} />}
                            />

                            <ResultDetail
                                detail={speechResult.analysis?.feedback}
                                iconComponent={<FontAwesome name="comment" size={17} color={colors.text} />}
                            />
                        </>
                    )
                }

                {/* QUIZ | READING */}
                {
                    isSelective && (
                        <ResultDetail
                            label="Your Answer:"
                            detail={result.answered}
                            iconComponent={
                                result.feedback.label === "Correct" 
                                ? (<FontAwesome name="check-circle" size={20} color={colors.text} />) 
                                : (<Entypo name="circle-with-cross" size={20} color={colors.text} />)
                            }
                        />
                    )
                }

                {/* PRACTICE */}
                {
                    isPractice && (
                        <ResultDetail
                            // label="Words:"
                            detail={wordList}
                            iconComponent={
                                <MaterialCommunityIcons name="head-lightbulb-outline" size={20} color={colors.text} />
                            }
                        />
                    )
                }

                {
                    isSimilarity && (
                        <>
                            <ResultDetail
                                label="Similarity Score:"
                                detail={Math.round(result.similarity * 100) + "%"}
                                iconComponent={<FontAwesome name="trophy" size={20} color={colors.text} />}
                            />
                            <ResultDetail
                                detail={result.feedback}
                                iconComponent={<FontAwesome name="comment" size={17} color={colors.text} />}
                            /> 
                        </>
                    )
                }
                
                <View style={styles.buttonWrapper}>
                    <SecondaryActionButton
                        buttonTitle='Retry'
                        onSubmit={onRetry}
                        buttonStyle={styles.button}
                        background={colors.gradiantDeep}
                    />
                    <ActionPrimaryButton
                        buttonTitle='Continue'
                        onSubmit={handleContinue}
                        buttonStyle={styles.button} />
                </View>

            </View>
        </ModalLayout>                    
    );
}

export default LessonCompletionModal;

const styles = StyleSheet.create({
    modalContainer: {
        width: "100%"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 0
    },
    content: { gap: 5 },
    modalView: {
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
    divider: {
        marginVertical: 15,
        borderBottomColor: "#3FA1FF"
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    },
    button: {
        width: '45%',
        borderRadius: 30,
        overflow: 'hidden'
    }
});