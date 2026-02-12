import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ChallengeScreenTitle from '../challenges/ChallengeScreenTitle';
import SoundRipple from '../animated-components/_helper-components/SoundRipple';
import { useTheme } from '@/theme/ThemeContext';
import { RecorderStop, SpeakerActionButtonIcon } from '@/utils/SVGImages';
import SIZES from '@/constants/size';
import { speechController } from '@/helpers/speechController';

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

    return (
        <View style={styles.flex}>
            {/* Title Section */}
            <ChallengeScreenTitle title={taskTitle} />               

            <View style={styles.container}>

                <SoundRipple
                    isSpeaking={isSpeaking}
                    size={rippleSize || 100}
                    color={colors.primary}
                />

                <TouchableOpacity
                    onPress={isSpeaking ? onStop : onSpeak}
                    style={styles.button}
                >
                    {
                        !isSpeaking
                            ? (<SpeakerActionButtonIcon {...dimentions} />)
                            : (<RecorderStop {...dimentions} />)
                    }                        
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default TaskAllocation;

const styles = StyleSheet.create({
    flex: {flex: 1},
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        position: "absolute",
        zIndex: 1
    }
});