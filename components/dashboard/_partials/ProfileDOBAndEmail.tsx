import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileDOBAndEmailDetail from './ProfileDOBAndEmailDetail'
import SeparatorVerticalLine from './SeparatorVerticalLine'

const ProfileDOBAndEmail = () => {
    return (
        <View style={[styles.container]}>
            <ProfileDOBAndEmailDetail iconName="calendar-outline" dob />

            <SeparatorVerticalLine />

            <ProfileDOBAndEmailDetail iconName="mail-outline" email />
        </View>
    );
}

export default ProfileDOBAndEmail

const styles = StyleSheet.create({
    container: {
        gap: 12,
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});