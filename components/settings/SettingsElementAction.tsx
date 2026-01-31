import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SettingSwitcher from '../dashboard/SettingSwitcher';
import { Route, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface SettingsElementActionProps  {
    actionType: string;
    settingType: string;
    route: Route | string;
}

const SettingsElementAction = ({actionType, settingType, route}: SettingsElementActionProps) => {
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            {
            actionType == "switcher" && (<SettingSwitcher settingType={settingType} />)
            }
            {
            actionType == "router" && (
                <TouchableOpacity
                    onPress={() => router.push(route as any)}
                    style={{ marginVertical: "auto" }}
                >
                    <Ionicons name="chevron-forward" size={24} color={colors.text} />
                </TouchableOpacity>
            )
            }
        </View>
    );
}

export default SettingsElementAction;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%"
    }
});