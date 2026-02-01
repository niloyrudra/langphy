import { View, Switch, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { useSettings } from '@/hooks/useSettings';
import { useAuth } from '@/context/AuthContext';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';

const SettingSwitcher = ({settingType, enabled, containerStyle}: {settingType: string, enabled: boolean, containerStyle?: StyleProp<ViewStyle>}) => {
    const { toggleTheme, theme } = useTheme()
    const [ isEnabled, setIsEnabled ] = React.useState<boolean>(enabled);
    const{ user } = useAuth();
    const { data: settings } = useSettings(user?.id as string)
    const { mutate: updateSettings } = useUpdateSettings(user?.id as string);

    // Handle
    const toggleSwitch = async (value: boolean) => {
        setIsEnabled(value);
        switch (settingType) {
            case 'toggle_theme':
                toggleTheme();
                break;

            case 'sound_effect' :
                console.log("Sound Effect:", value);
                updateSettings({ field: 'sound_effect', value: value });
                break;

            case 'push_notification' :
                console.log("Push Notification:", value);
                updateSettings({ field: 'notifications', value: value });
                break;
            
            case 'practice' :
                console.log("Practice:", value);
                updateSettings({ field: 'practice_service', value: value });
                break;
            
            case 'quiz' :
                console.log("Quiz:", value);
                updateSettings({ field: 'quiz_service', value: value });
                break;
            
            case 'speaking' :
                console.log("Speaking:", value);
                updateSettings({ field: 'speaking_service', value: value });
                break;
            
            case 'listening' :
                console.log("Listening:", value);
                updateSettings({ field: 'listening_service', value: value });
                break;
            
            case 'reading' :
                console.log("Reading:", value);
                updateSettings({ field: 'reading_service', value: value });
                break;
            
            case 'writing' :
                console.log("Writing:", value);
                updateSettings({ field: 'writing_service', value: value });
                break;

            default:
                console.log('Unhandled settingType:', settingType);
        }

    }
    
    console.log(`SettingSwitcher - ${settingType}:`, isEnabled);

    // Sync ONLY when this switch represents the theme setting
    React.useEffect(() => {
        if (settingType === 'sound_effect') {
            setIsEnabled(isEnabled);
        }
        if (settingType === 'toggle_theme') {
            setIsEnabled(theme === 'dark');
        }
        if (settingType === 'speaking') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'reading') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'writing') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'listening') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'quiz') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'push_notification') {
            setIsEnabled(isEnabled);
        }
    }, [settingType, theme]);

    return (
        <View style={[{height: "100%"}, (containerStyle && containerStyle)]}>
            <Switch
                trackColor={{false: '#999', true: '#8ED4FF'}}
                thumbColor={'#FFF'}
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

export default SettingSwitcher;