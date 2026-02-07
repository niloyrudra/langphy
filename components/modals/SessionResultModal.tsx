import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { Lesson, SelectiveResultType, SessionResultType } from '@/types';
import { feedbackComments } from '@/utils';
// import HorizontalLine from '../HorizontalLine';
import ActionPrimaryButton from '../form-components/ActionPrimaryButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import ResultDetail from './_partials/ResultDetail';
import ModalLayout from './_partials/ModalLayout';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useLessonTimer } from '@/hooks/useLessonTimer';

interface SessionResultModalProps {
    isVisible: boolean;
    actualQuery?: string;
    onModalVisible: () => void;
    result: SessionResultType | SelectiveResultType;
    onRetry: () => void;
    onContinue: () => void;
}

const SessionResultModal = ({isVisible, actualQuery,onModalVisible, result, onRetry, onContinue}: SessionResultModalProps) => {
    const insets = useSafeAreaInsets();
    const {colors} = useTheme();
    const feedback = 'answered' in result ? result.feedback : feedbackComments(result.similarity);

    return (
        <ModalLayout
            isVisible={isVisible}
            onModalVisible={onModalVisible}
            feedback={feedback}
            gradianColor={[colors.gradiantDeep, colors.gradiantDeep]} // ['#081A33', '#081A33', '#1FCAD7', '#3FA1FF']
            containerStyle={styles.modalContainer}
        >

            {/* Modal Content */}
            <View style={{ gap: 5 }}>
                {
                    actualQuery && (
                        <ResultDetail
                            label="Expected Query:"
                            detail={actualQuery}
                            iconComponent={<FontAwesome name="question-circle" size={20} color={colors.text} />}
                        />
                    )
                }

                {
                    'answered' in result && (
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

                {
                    'similarity' in result && (
                        <ResultDetail
                            label="Similarity Score:"
                            detail={Math.round(result.similarity * 100) + "%"}
                            iconComponent={<FontAwesome name="trophy" size={20} color={colors.text} />}
                        />
                    )
                }

                {/* <ResultDetail
                    label='Issues:'
                    detail={result.analysis?.issues?.length > 0 ?result.analysis?.issues?.join(", ") : 'No issues found'}
                    iconComponent={<MaterialIcons name="error" size={20} color={colors.text} />}
                /> */}

                {'similarity' in result && (
                    <ResultDetail
                        detail={result.feedback}
                        iconComponent={<FontAwesome name="comment" size={17} color={colors.text} />}
                    />          
                )}
                
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 30}}>
                    <ActionPrimaryButton buttonTitle='Retry' onSubmit={onRetry} buttonStyle={{width: '33%', borderRadius: 30, overflow: 'hidden'}} />
                    <ActionPrimaryButton buttonTitle='Continue' onSubmit={onContinue ? () =>onContinue() : () => console.log("Continue")} buttonStyle={{width: '33%', borderRadius: 30, overflow: 'hidden'}} />
                </View>

            </View>
        </ModalLayout>                    
    );
}

export default SessionResultModal;

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
    modalView: {
        // position: "relative",
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
    }
});