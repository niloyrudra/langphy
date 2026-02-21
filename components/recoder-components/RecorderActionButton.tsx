import { TouchableOpacity } from 'react-native'
import React from 'react'
import { RecorderLightActiveIcon, RecorderPlay, RecorderStop } from '@/utils/SVGImages'
import SIZES from '@/constants/size'

type RecorderActionButtonProps = {
    isActive: boolean,
    isRecorded?: boolean;
    isPlaying?: boolean;
    isPaused?: boolean;
    onActionHandler: () => void
}

const dimentions = {
    width: SIZES.speakerNRecorderDimensions,
    height: SIZES.speakerNRecorderDimensions
}

const RecorderActionButton: React.FC<RecorderActionButtonProps> = ({
    isActive,
    isRecorded=false,
    isPlaying=false,
    isPaused=false,
    onActionHandler
}) => {
    return (
        <TouchableOpacity
            onPress={onActionHandler}
        >
            {
                !isPlaying && isRecorded && (<RecorderPlay {...dimentions} />)
            }
            {
                isPlaying && (<RecorderStop {...dimentions} />)
            }
            {
                (!isRecorded && !isPlaying && isPaused) &&
                (
                    isActive
                        ? (<RecorderLightActiveIcon {...dimentions} />)
                        : (<RecorderStop {...dimentions} />)
                    )                    
            }
        </TouchableOpacity>
    )
}

export default RecorderActionButton;