import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RecorderDarkInactiveIcon, RecorderLightActiveIcon, RecorderPlay, RecorderStop } from '@/utils/SVGImages'
import SIZES from '@/constants/size'
import { useTheme } from '@/theme/ThemeContext'

type RecorderActionButtonProps = {
    isActive: boolean,
    isRecorded?: boolean;
    isPlaying?: boolean;
    isPaused?: boolean;
    onActionHandler: () => void
}

const RecorderActionButton: React.FC<RecorderActionButtonProps> = ({
    isActive,
    isRecorded=false,
    isPlaying=false,
    isPaused=false,
    onActionHandler
}) => {
    // const {theme} = useTheme();
    const dimentions = {
        width: SIZES.speakerNRecorderDimensions,
        height: SIZES.speakerNRecorderDimensions
    }

    // console.log({isActive, isRecorded, isPlaying, isPaused});
    return (
        <TouchableOpacity
            onPress={onActionHandler}
            // style={!isActive && {opacity: 0.4}}
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