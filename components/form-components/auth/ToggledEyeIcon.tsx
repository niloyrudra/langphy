import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { EyeProps } from '@/types';
import { useTheme } from '@/theme/ThemeContext';
// Constants
import sizes from '@/constants/size';
import STYLES from '@/constants/styles';

import { EyeDarkIcon, EyeLightIcon, EyeOffDarkIcon, EyeOffLightIcon } from '@/utils/SVGImages';



const ToggledEyeIcon = ({onChange, isSecureTextEntry, style: customStyles}: EyeProps) => {
    const { theme } = useTheme();
  return (
    <View style={[ styles.container, STYLES.childContentCentered, customStyles && customStyles]}>
        {
            theme === 'light'
            ? (
                <TouchableOpacity
                    onPress={onChange}
                >
                    {
                        isSecureTextEntry
                        ? (<EyeLightIcon width={sizes.eye} height={sizes.eye}/>)
                        : (<EyeOffLightIcon width={sizes.eye} height={sizes.eye}/>)
                    }
                </TouchableOpacity>
            )
            : (
                <TouchableOpacity
                    onPress={onChange}
                >
                    {
                        isSecureTextEntry
                        ? (<EyeDarkIcon width={sizes.eye} height={sizes.eye} style={styles.iconOpacity} />)
                        : (<EyeOffDarkIcon width={sizes.eye} height={sizes.eye} style={styles.iconOpacity} />)
                    }
                </TouchableOpacity>
            )
        }
    </View>

  )
}

export default ToggledEyeIcon;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 3,
        right: 16,
        height: sizes.textFieldHeight,
    },
    iconOpacity: {opacity: 0.75}
})