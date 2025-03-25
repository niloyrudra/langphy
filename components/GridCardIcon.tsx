import React from 'react'
import { StyleSheet, View } from 'react-native'
import STYLES from '@/constants/styles'
import { SvgProps } from 'react-native-svg'
import { useTheme } from '@/theme/ThemeContext'

const GridCardIcon = ({ImgComponent}: {ImgComponent: React.FC<SvgProps>}) => {
    const { colors } = useTheme();
    return (
        <View style={[STYLES.childContentCentered, styles.imageWrapper, {backgroundColor: colors.cardIconBackgroundColor}]}>
            <ImgComponent width={56} height={56} />
        </View>
    );
}

export default GridCardIcon

const styles = StyleSheet.create({
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
});