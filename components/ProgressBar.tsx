import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';

import { ProgressBarActivePng } from '@/utils/pngImages';

const ProgressBar = ({completion}: {completion: number}) => {
    const {colors}  = useTheme();
    return (
        <View style={[STYLES.childContentCentered, styles.container]}>
            <View style={[styles.content, {backgroundColor: colors.progressBarBackground}]}>
                <Image
                    source={ProgressBarActivePng}
                    style={[styles.image,{width: (completion / 100)*52}]}
                />
            </View>
        </View>
    );
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 75,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
    },
    content: {
        width: 52,
        height: 8,
        borderRadius: 20,
        justifyContent:"center",
        alignItems: "flex-start"
    },
    image: {
        height: 8,
        objectFit: "fill"
    }
});