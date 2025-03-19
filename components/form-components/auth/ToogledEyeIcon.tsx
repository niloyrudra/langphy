import { StyleProp, StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

// Light Theme Icons
import EyeLightIcon from '@/assets/images/auth/toggled-eyes/light-theme/eye.svg'
import EyeOffLightIcon from '@/assets/images/auth/toggled-eyes/light-theme/eye-off.svg'
// Dark Theme Icons
import EyeDarkIcon from '@/assets/images/auth/toggled-eyes/dark-theme/eye.svg'
import EyeOffDarkIcon from '@/assets/images/auth/toggled-eyes/dark-theme/eye-off.svg'

// Constants
import sizes from '@/constants/size';
import * as STYLES from '@/constants/styles';

interface EyeProps {
    onChange: () => void,
    isSecureTextEntry: boolean,
    style?: StyleProp<ViewProps>
}

const ToggledEyeIcon = ({onChange, isSecureTextEntry, style: customStyles}: EyeProps) => {
    const { theme } = useTheme();
    // const [ isSecureTextEntry, setIsSecureTextEntry ] = React.useState(false)
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