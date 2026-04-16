import { View, Switch, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { SettingsFieldType } from '@/types';
import { useFeedback } from '@/utils/feedback';
import { queryClient } from '@/queryClient';

const SettingSwitcher = ({settingType, enabled, containerStyle}: {settingType: SettingsFieldType, enabled: boolean, containerStyle?: StyleProp<ViewStyle>}) => {
    const { toggleTheme, theme } = useTheme();
    const { triggerFeedback } = useFeedback();
    const [ isEnabled, setIsEnabled ] = React.useState<boolean>(enabled);
    const userId = authSnapshot.getUserId() ?? "";
    const { mutate: updateSettings } = useUpdateSettings(userId);

    // Handle
    const toggleSwitch = async (value: boolean) => {
        setIsEnabled(value);
        await triggerFeedback("tap");
        switch (settingType) {
            case 'theme':
                toggleTheme();
                break;
                
            case 'sound_effect' :
                console.log("Sound Effect:", value);
                updateSettings({ field: 'sound_effect', value: value });
                // ✅ Invalidate so cache reflects new value instantly
                await queryClient.invalidateQueries({ queryKey: ["lp_settings", userId] });
                break;

            case 'notifications' :
                console.log("Push Notification:", value);
                updateSettings({ field: 'notifications', value: value });
                break;
            
            case 'practice_service' :
                console.log("Practice:", value);
                updateSettings({ field: 'practice_service', value: value });
                break;
            
            case 'quiz_service' :
                console.log("Quiz:", value);
                updateSettings({ field: 'quiz_service', value: value });
                break;
            
            case 'speaking_service' :
                console.log("Speaking:", value);
                updateSettings({ field: 'speaking_service', value: value });
                break;
            
            case 'listening_service' :
                console.log("Listening:", value);
                updateSettings({ field: 'listening_service', value: value });
                break;
            
            case 'reading_service' :
                console.log("Reading:", value);
                updateSettings({ field: 'reading_service', value: value });
                break;
            
            case 'writing_service' :
                console.log("Writing:", value);
                updateSettings({ field: 'writing_service', value: value });
                break;

            default:
                console.log('Unhandled settingType:', settingType);
        }
    }
    
    // Sync ONLY when this switch represents the theme setting
    React.useEffect(() => {
        if (settingType === 'sound_effect') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'theme') {
            setIsEnabled(theme === 'dark');
        }
        if (settingType === 'speaking_service') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'reading_service') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'writing_service') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'listening_service') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'quiz_service') {
            setIsEnabled(isEnabled ? true : false);
        }
        if (settingType === 'notifications') {
            setIsEnabled(isEnabled ? true : false);
        }
    }, [settingType, theme]);

    return (
        <View style={[styles.switchContainer, (containerStyle && containerStyle)]}>
            <Switch
                trackColor={{false: '#999', true: '#8ED4FF'}}
                thumbColor={'#FFF'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={styles.switch}
            />
        </View>
    );
}

export default SettingSwitcher;

const styles = StyleSheet.create({
    switchContainer: {
        height: "100%"
    },
    switch: {
        marginVertical: "auto"
    }
});