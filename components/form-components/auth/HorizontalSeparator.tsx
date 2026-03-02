import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from '@/components/text-components/LangphyText';

const HorizontalSeparator = ({style}: {style?: StyleProp<ViewStyle>}) => {
    const {colors} = useTheme();
    return (
        <View style={[STYLES.childContentCentered, {position:"relative", marginVertical: 30}, (style && style)]}>
            <View style={{width: "100%", height: 1, backgroundColor: colors.orSeparatorColor}} />
            <View style={{backgroundColor: colors.background, position: "absolute", padding: 6}}>
                <LangphyText style={{color: colors.orSeparatorColor, fontSize: 14}}>or</LangphyText>
            </View>
        </View>
    );
}
export default HorizontalSeparator;