import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { IoniconName } from '@/types';
import LangphyText from '@/components/text-components/LangphyText';

interface DetailProps {
    iconName: IoniconName;
    data: string;
    iconSize?: number;
    dob?: boolean;
    email?: boolean;
};

const ProfileDOBAndEmailDetail = ({iconName, data, iconSize=16, dob=false, email=false}: DetailProps) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container]}>
            <Ionicons name={iconName} size={iconSize} color={colors.text} />
            <LangphyText style={[styles.userInfo, {color: colors.text}]}>
                {dob && (data ? new Date( data ).toLocaleDateString() : '__/__/__')}
                {email && (data ?? "___")}
            </LangphyText>
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