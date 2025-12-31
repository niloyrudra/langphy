import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import ChallengeScreenTitle from '../challenges/ChallengeScreenTitle'
import SoundRipple from '../animated-components/_helper-components/SoundRipple'
import { useTheme } from '@/theme/ThemeContext'
import ChallengeScreenSpeakerActionSection from '../challenges/ChallengeScreenSpeakerActionSection'
import { RecorderStop, SpeakerActionButtonIcon } from '@/utils/SVGImages'
import SIZES from '@/constants/size'
import { speechController, warmUpSpeech } from '@/helpers/speechController'

import * as Speech from 'expo-speech';
import { speechHandler } from '@/utils'


interface TaskAllocationProps {
    rippleSize?: number;
    taskTitle: string;
    taskPhrase: string
}
const TaskAllocation: React.FC<TaskAllocationProps> = ({ taskTitle, taskPhrase, rippleSize }) => {
    const { colors } = useTheme();
    const [ isSpeaking, setIsSpeaking ] = React.useState<boolean>(false);

    const dimentions = {
        width: SIZES.speakerNRecorderDimensions,
        height: SIZES.speakerNRecorderDimensions
    }

    const onSpeak = async () => {
        setIsSpeaking(true);
        // await speechHandler(
        //     taskPhrase,
        //     "de-DE",
        //     (speakingState: boolean) => {
        //         setIsSpeaking(speakingState);
        //     }
        // );


        // Speech.speak(taskPhrase, {
        //     language: "de-DE",
        //     pitch: 1,
        //     rate: 1,
        //     onDone: () => {
        //         setIsSpeaking(false);
        //     },
        //     onStopped: () => {
        //         setIsSpeaking(false);
        //     },
        //     onError: () => {
        //         setIsSpeaking(false);
        //     }

        // });
        speechController.start(
            taskPhrase,
            "de-DE",
            (speakingState: boolean) => {
                setIsSpeaking(speakingState);
            }
        );
    }
    const onStop = () => {
        setIsSpeaking(false);
        // Speech.stop();
        speechController.stop();
    }

    useEffect(() => {
        warmUpSpeech();
    }, [taskPhrase]);

    return (
        <View style={{flex: 1}}>
                {/* Title Section */}
                <ChallengeScreenTitle title={taskTitle} />               

                <View
                    style={{
                        flex: 1,
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <SoundRipple
                        isSpeaking={isSpeaking}
                        size={rippleSize || 100}
                        color={colors.primary}
                    />

                    <TouchableOpacity
                        onPress={isSpeaking ? onStop : onSpeak}
                        style={{
                            position: "absolute",
                            zIndex: 1
                        }}
                    >
                        {
                            !isSpeaking ? (<SpeakerActionButtonIcon {...dimentions} />) : (<RecorderStop {...dimentions} />)
                        }                        
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default TaskAllocation

const styles = StyleSheet.create({})