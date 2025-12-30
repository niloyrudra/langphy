import { StyleSheet, View, Text, Modal, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { InfoIndicatorDarkIcon, InfoIndicatorLightIcon, ModalCloseDarkIcon, ModalCloseLightIcon } from '@/utils/SVGImages';
import { SpeechResult } from '@/types';
import { confidenceColor } from '@/utils';
import HorizontalLine from '../HorizontalLine';
import ActionPrimaryButton from '../form-components/ActionPrimaryButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SpeechResultModalProps {
    isVisible: boolean;
    onModalVisible: () => void;
    result: SpeechResult;
    onRetry: () => void;
    // onContinue: (() => void) | undefined;
    onContinue: () => void;
}

const SpeechResultModal = ({isVisible, onModalVisible, result, onRetry, onContinue}: SpeechResultModalProps) => {
    const insets = useSafeAreaInsets();
    const {colors, theme} = useTheme();
    return (
        <Modal
            animationType='slide'
            transparent
            statusBarTranslucent
            visible={isVisible}
            onRequestClose={onModalVisible}
            backdropColor="transparent"
            style={{
                // backgroundColor: "red",
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
                            backgroundColor: colors.cardBackgroundColor,
                            borderTopColor: colors.cardBorderColor,
                            borderLeftColor: colors.cardBorderColor,
                            borderRightColor: colors.cardBorderColor,
                            width: '96%',
                            padding: 20,
                        }
                    ]}
                >
                
                    {/* Modal Content */}
                    <View
                        style={{
                            gap: 5
                        }}
                    >
                        <Text style={{color:colors.text}}>Transcription: {result.transcription}</Text>
                        <Text style={{color:colors.text}}>Similarity Score: {Math.round(result.analysis.similarity * 100)}%</Text>
                        <Text style={{color:colors.text}}>{result.analysis.feedback}</Text>
                        <Text style={{color:colors.text}}>Pronunciation Score: {result.analysis.pronunciation_score}</Text>
                        {/* <Text style={{color:colors.text}}>Compression Ratio:{result.sagments[0].compression_ratio}</Text> */}
                        {/* <Text style={{color:colors.text}}>Spoken Text: {result.analysis.spoken_text}</Text> */}
                        {
                            result.hasOwnProperty( 'words' ) && result?.words?.map( (word: {text: string, confidence: string | number}, idx: number) => (
                                <Text style={{color:colors.text}}>{word.text} | <Text style={{color: confidenceColor( result.sagments[0].avg_logprob ) || colors.text}}>{word.confidence}</Text></Text>
                            ))
                        }
                        <Text style={{color:colors.text}}>Issues: {result.analysis?.issues?.join(", ")}</Text>
            
                        
                        <HorizontalLine />

                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <ActionPrimaryButton buttonTitle='Retry' onSubmit={onRetry} buttonStyle={{width: '33%', borderRadius: 30, overflow: 'hidden'}} />
                            <ActionPrimaryButton buttonTitle='Continue' onSubmit={onContinue ? () =>onContinue() : () => console.log("Continue")} buttonStyle={{width: '33%', borderRadius: 30, overflow: 'hidden'}} />
                        </View>

                    </View>

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
    // modalHeader: {
    //     flexDirection: "row",
    //     justifyContent: "flex-start",
    //     alignItems: "center",
    //     gap: 10,
    //     marginBottom: 10
    // },
    buttonClose: {
        position: "absolute",
        top: 10,
        right: 10
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