import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileDOBAndEmailDetail from './ProfileDOBAndEmailDetail'
import SeparatorVerticalLine from './SeparatorVerticalLine'
// import LangphyText from '@/components/text-components/LangphyText'

const ProfileDOBAndEmail = ({email, joinAt}: {email: string, joinAt: string}) => {
    return (
        // <LangphyText style={[styles.container]} numberOfLines={1}>
        //     <ProfileDOBAndEmailDetail iconName="calendar-outline" dob data={joinAt} />
        //     <LangphyText>  </LangphyText>
        //     <SeparatorVerticalLine />
        //     <LangphyText>  </LangphyText>
        //     <ProfileDOBAndEmailDetail iconName="mail-outline" email data={email} />
        // </LangphyText>
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
        maxWidth: "100%",
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        // justifyContent: "center",
        position: "relative",
        // flexWrap: "nowrap"
        overflow: "hidden"
    }
});