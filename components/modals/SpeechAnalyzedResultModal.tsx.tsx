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
    const feedback = feedbackComments(result.analysis.similarity);

    return (
        <Modal
            animationType='slide'
            // transparent
            statusBarTranslucent
            visible={isVisible}
            onRequestClose={onModalVisible}
            backdropColor={colors.modalBackDropColor}
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                bottom: 0
            }}
            
        >
            <View style={[styles.centeredView]}>
                
                <View 
                    style={[
                        styles.modalView,
                        {
                            borderTopColor: colors.modalBoderColor, // cardBorderColor
                            borderLeftColor: colors.modalBoderColor,
                            borderRightColor: colors.modalBoderColor,
                            width: '98%',
                            overflow: 'hidden'
                        }
                    ]}
                >
                    {/* Modal Content */}
                    <LinearGradient
                        colors={['#081A33', '#081A33', '#1FCAD7', '#3FA1FF']}
                        style={[{padding: 20}]}
                    >

                        {/* Modal Header */}
                        <View
                            style={{
                                marginBottom: 15
                            }}
                        >
                            <Text style={[styles.modalText, {color: feedback.color}]}>{feedback.label}</Text>
                        </View>

                        {/* Modal Content */}
                        <View
                            style={{
                                gap: 5
                            }}
                        >

                            <ResultDetail
                                detail={result.transcription}
                                iconComponent={<FontAwesome name="microphone" size={22} color={colors.text} />}
                            />

                            <ResultDetail
                                label="Similarity Score:"
                                detail={Math.round(result.analysis.similarity * 100) + "%"}
                                iconComponent={<FontAwesome name="trophy" size={20} color={colors.text} />}
                            />
                            
                            <ResultDetail
                                label="Pronunciation Score:"
                                detail={`${result.analysis.pronunciation_score}`}
                                iconComponent={<FontAwesome6 name="crown" size={16} color={colors.text} />}
                            />

                            <ResultDetail
                                label='Issues:'
                                detail={result.analysis?.issues?.length > 0 ?result.analysis?.issues?.join(", ") : 'No issues found'}
                                iconComponent={<MaterialIcons name="error" size={20} color={colors.text} />}
                            />

                            <ResultDetail
                                detail={result.analysis.feedback}
                                iconComponent={<FontAwesome name="comment" size={17} color={colors.text} />}
                            />

                            {/* <Text style={{color:colors.text}}>Compression Ratio:{result.sagments[0].compression_ratio}</Text> */}
                            {/* {
                                result.hasOwnProperty( 'words' ) && result?.words?.map( (word: {text: string, confidence: string | number}, idx: number) => (
                                    <Text style={{color:colors.text}}>{word.text} | <Text style={{color: confidenceColor( result.sagments[0].avg_logprob ) || colors.text}}>{word.confidence}</Text></Text>
                                ))
                            } */}               
                            
                            <HorizontalLine
                                style={{
                                    marginVertical: 15,
                                    borderBottomColor: "#3FA1FF" // colors.cardBorderColor
                                }}
                            />

                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <ActionPrimaryButton buttonTitle='Retry' onSubmit={onRetry} buttonStyle={{width: '33%', borderRadius: 30, overflow: 'hidden'}} />
                                <ActionPrimaryButton buttonTitle='Continue' onSubmit={onContinue ? () =>onContinue() : () => console.log("Continue")} buttonStyle={{width: '33%', borderRadius: 30, overflow: 'hidden'}} />
                            </View>

                        </View>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
}

export default SpeechResultModal;

const styles = StyleSheet.create({
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