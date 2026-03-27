import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { RecorderLightActiveIcon, RecorderPlay, RecorderStop } from '@/utils/SVGImages';
import SIZES from '@/constants/size';
import SoundRipple from '../animated-components/_helper-components/SoundRipple';
import { SvgProps } from 'react-native-svg';

type RecorderActionButtonProps = {
    isActive: boolean;
    showRipple?: boolean;
    isRecording?: boolean;
    isRecorded?: boolean;
    isPlaying?: boolean;
    isPaused?: boolean;
    rippleSize?: number;
    onActionHandler: () => void;
};

const dimensions = {
    width: SIZES.speakerNRecorderDimensions,
    height: SIZES.speakerNRecorderDimensions,
};

const RecorderActionButton: React.FC<RecorderActionButtonProps> = ({
    isActive,
    showRipple = true,
    isRecording = false,
    isRecorded = false,
    isPlaying = false,
    isPaused = false,
    rippleSize = 140,
    onActionHandler,
}) => {
    // Determine which icon to render
    let IconComponent: React.FC<SvgProps>;

    if (isPlaying) {
        IconComponent = RecorderStop;
    } else if (isRecorded) {
        IconComponent = RecorderPlay;
    } else if (!isRecorded && isPaused) {
        IconComponent = isActive ? RecorderLightActiveIcon : RecorderStop;
    } else {
        IconComponent = isActive ? RecorderLightActiveIcon : RecorderStop;
    }

    return (
        <TouchableOpacity onPress={onActionHandler} style={styles.button}>
            {showRipple && (<SoundRipple isSpeaking={isRecording} size={rippleSize}/>)}
            <IconComponent {...dimensions} style={styles.icon} />
        </TouchableOpacity>
    );
};

export default RecorderActionButton;

const styles = StyleSheet.create({
    button: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        width: 64,
        height: 64,
        overflow: "visible"
    },
    icon: {
        position: "absolute",
        zIndex: 2,
    }
});