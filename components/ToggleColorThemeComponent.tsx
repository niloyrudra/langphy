import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
// import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import sizes from '@/constants/size';

const ToggleColorThemeComponent = () => {
    const {colors, theme, toggleTheme} = useTheme()
    return (
        <TouchableOpacity onPress={toggleTheme}>
            {
                theme === 'light' ?
                (<MaterialIcons name="dark-mode" size={sizes.headerIcon - 5 } color={colors.themeIconColor} />) // (<Entypo name="moon" size={sizes.headerIcon} color={colors.themeIconColor} />)
                :
                (<MaterialIcons name="light-mode" size={sizes.headerIcon - 5 } color={colors.themeIconColor} />)
            }
        </TouchableOpacity>
    )
}
export default ToggleColorThemeComponent;