import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileDOBAndEmailDetail from './ProfileDOBAndEmailDetail'
import SeparatorVerticalLine from './SeparatorVerticalLine';
import {isTablet} from '@/utils/responsive';

const ProfileDOBAndEmail = ({email, joinAt}: {email: string, joinAt: string}) => {
    return (
        <View style={styles.container}>
            <ProfileDOBAndEmailDetail iconName="calendar-outline" dob data={joinAt} />
            <SeparatorVerticalLine />
            <ProfileDOBAndEmailDetail iconName="mail-outline" email data={email} />
        </View>
    );
}

export default ProfileDOBAndEmail

const styles = StyleSheet.create({
    container: {
        flex:1,
        gap: 4,
//         maxWidth: "100%",
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: !isTablet ? "flex-start" : "center",
        position: "relative",
        // flexWrap: "nowrap"
        overflow: "hidden"
    }
});