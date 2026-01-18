import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { IoniconName } from '@/types';

interface DetailProps {
    iconName: IoniconName;
    iconSize?: number;
    dob?: boolean;
    email?: boolean;
};

const ProfileDOBAndEmailDetail = ({iconName, iconSize=16, dob=false, email=false}: DetailProps) => {
    const {colors} = useTheme();
    const {user} = useAuth();
    return (
        <View style={[styles.container]}>
            <Ionicons name={iconName} size={iconSize} color={colors.text} />
            <Text style={[styles.userInfo, {color: colors.text}]}>
                {dob && (user?.created_at ? new Date( user.created_at ).toLocaleDateString() : '__/__/__')}
                {email && (user?.email ?? "___")}
            </Text>
        </View>
    );
}

export default ProfileDOBAndEmailDetail;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap: 4
    },
    userInfo: {
        fontSize: 14,
        fontWeight: "400",
    }
});