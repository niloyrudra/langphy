import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RecorderDarkInactiveIcon, RecorderLightActiveIcon, RecorderPlay, RecorderStop } from '@/utils/SVGImages'
import SIZES from '@/constants/size'
import { useTheme } from '@/theme/ThemeContext'

type RecorderActionButtonProps = {
    isActive: boolean,
    isRecorded?: boolean;
    onActionHandler: () => void
}

const RecorderActionButton: React.FC<RecorderActionButtonProps> = ({isActive, isRecorded=false, onActionHandler}) => {
    const {theme} = useTheme();
    const dimentions = {
        width: SIZES.speakerNRecorderDimensions,
        height: SIZES.speakerNRecorderDimensions
    }
    return (
        <TouchableOpacity
            onPress={onActionHandler}
            // style={!isActive && {opacity: 0.4}}
        >
            {
                // theme === 'light'
                // ?
                    isRecorded
                        ? (<RecorderPlay {...dimentions} />)
                        : (
                            isActive
                                ? (<RecorderLightActiveIcon {...dimentions} />)
                                : (<RecorderStop {...dimentions} />)
                        )
                    
                    
                // :
                    
                //     isActive
                //         ? (<RecorderLightActiveIcon {...dimentions} />)
                //         : (<RecorderStop {...dimentions} />)
                    
            }
        </TouchableOpacity>
    )
}

export default RecorderActionButton

const styles = StyleSheet.create({})