import { TouchableOpacity } from 'react-native';
import React from 'react';
import { RecorderLightActiveIcon, RecorderPlay, RecorderStop } from '@/utils/SVGImages';
import SIZES from '@/constants/size';

type RecorderActionButtonProps = {
    isActive: boolean;
    isRecorded?: boolean;
    isPlaying?: boolean;
    isPaused?: boolean;
    onActionHandler: () => void;
};

const dimensions = {
    width: SIZES.speakerNRecorderDimensions,
    height: SIZES.speakerNRecorderDimensions,
};

const RecorderActionButton: React.FC<RecorderActionButtonProps> = ({
    isActive,
    isRecorded = false,
    isPlaying = false,
    isPaused = false,
    onActionHandler,
}) => {
    // Determine which icon to render
    let IconComponent;

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
        <TouchableOpacity onPress={onActionHandler}>
            <IconComponent {...dimensions} />
        </TouchableOpacity>
    );
};

export default RecorderActionButton;