import { View, Text, Switch, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';

const SettingSwitcher = ({settingType, containerStyle}: {settingType: string, containerStyle?: StyleProp<ViewStyle>}) => {
    const {toggleTheme, theme} = useTheme()
    const [ isEnabled, setIsEnabled ] = React.useState<boolean>( ( settingType === 'toggle_theme' && theme === 'dark' ) ? true : false);

    // Handle
    const toggleSwitch = async (value: boolean) => {
        setIsEnabled(value);
        switch (settingType) {
            case 'toggle_theme':
                // console.log('About to call toggleTheme');
                toggleTheme();
                // console.log('toggleTheme() was called (but theme value will update asynchronously).');
            break;

            case 'sound_effect' :
                console.log("Sound Effect:", value);
                break;

            default:
                console.log('Unhandled settingType:', settingType);
        }

    }
    
    // Sync ONLY when this switch represents the theme setting
    React.useEffect(() => {
        if (settingType === 'toggle_theme') {
            setIsEnabled(theme === 'dark');
        }
    }, [settingType, theme]);

    return (
        <View style={[{height: "100%"}, (containerStyle && containerStyle)]}>
            <Switch
                trackColor={{false: '#999', true: '#8ED4FF'}}
                thumbColor={isEnabled ? '#FFF' : '#FFF'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{
                    marginVertical: "auto"
                }}
            />
        </View>
    );
}

export default SettingSwitcher