import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileDOBAndEmailDetail from './ProfileDOBAndEmailDetail'
import SeparatorVerticalLine from './SeparatorVerticalLine'

const ProfileDOBAndEmail = ({email, joinAt}: {email: string, joinAt: string}) => {
    return (
        <View style={[styles.container]}>
            <ProfileDOBAndEmailDetail iconName="calendar-outline" dob data={joinAt} />

            <SeparatorVerticalLine />

            <ProfileDOBAndEmailDetail iconName="mail-outline" email data={email} />
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