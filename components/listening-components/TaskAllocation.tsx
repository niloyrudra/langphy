/**
 * TaskAllocation.tsx
 *
 * Changes from old version:
 * - Uses speechController directly — no more async start() wrapper needed
 *   since warmUp is already done at app boot
 * - speechController and taskPhrase removed from useCallback dep arrays
 *   (speechController is a module-level singleton, not a React value;
 *    taskPhrase should be in deps — kept it)
 * - dimensions object moved outside component so it's not recreated each render
 */

import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ChallengeScreenTitle from '../challenges/ChallengeScreenTitle';
import SoundRipple from '../animated-components/_helper-components/SoundRipple';
import { useTheme } from '@/theme/ThemeContext';
import { RecorderStop, SpeakerActionButtonIcon } from '@/utils/SVGImages';
import SIZES from '@/constants/size';
import { speechController } from '@/helpers/speechController';

const ICON_DIMS = {
    width: SIZES.speakerNRecorderDimensions,
    height: SIZES.speakerNRecorderDimensions,
};

interface TaskAllocationProps {
    rippleSize?: number;
    taskTitle: string;
    taskPhrase: string;
}

const TaskAllocation: React.FC<TaskAllocationProps> = ({ taskTitle, taskPhrase, rippleSize }) => {
    const { colors } = useTheme();
    const [isSpeaking, setIsSpeaking] = React.useState(false);

    const onSpeak = useCallback(() => {
        speechController.start(taskPhrase, 'de-DE', setIsSpeaking);
    }, [taskPhrase]);

    const onStop = useCallback(() => {
        speechController.stop();
        setIsSpeaking(false);
    }, []);

    return (
        <View style={styles.flex}>
            <ChallengeScreenTitle title={taskTitle} />

            <View style={styles.container}>
                <SoundRipple
                    isSpeaking={isSpeaking}
                    size={rippleSize ?? 100}
                    color={colors.primary}
                />

                <TouchableOpacity
                    onPress={isSpeaking ? onStop : onSpeak}
                    style={styles.button}
                >
                    {isSpeaking
                        ? <RecorderStop {...ICON_DIMS} />
                        : <SpeakerActionButtonIcon {...ICON_DIMS} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaskAllocation;

const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        zIndex: 1,
    },
});