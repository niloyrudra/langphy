import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';

import { TopProgressBarActivePng } from '@/utils/pngImages';

const HeaderLessonProgressBar = ({completion, goal}: {completion: number, goal: number}) => {
    const {colors} = useTheme();
    const width = SIZES.screenWidth - (SIZES.bodyPaddingHorizontal*2) - (SIZES.buttonHeight*2);
    const imageWidth = (completion/goal)*width;

    return (
        <View
            style={{
                width: width,
                height: SIZES.topProgressBarHeight,
                borderRadius: 30,
                backgroundColor: colors.headerProgressBarBackgroundColor
            }}
        >
        <Image
            source={TopProgressBarActivePng}
            style={{
                width: completion === 0 ? 0 : imageWidth,
                height: SIZES.topProgressBarHeight,
                objectFit: "fill",
                borderRadius: 30,
            }}
        />
        </View>
    );
}

export default HeaderLessonProgressBar;