import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/context/AuthContext';
// import { useAuth } from '@/context/AuthContext';
// import { useProfile } from '@/context/ProfileContext';

const ProfileNameAndId = () => {
    const {colors} = useTheme();
    const {user} = useAuth();
    const {data: profile} = useProfile(user?.id as string);

    const displayName = React.useCallback(() => {
        if( !profile?.first_name && !profile?.last_name ) return "Anonymous"
        else if( profile?.first_name && !profile?.last_name ) return profile?.first_name
        else if( !profile?.first_name && profile?.last_name ) return profile?.last_name
        else if( profile.first_name && profile.last_name ) return profile.first_name + " " + profile.last_name
        else return "Anonymous"
    }, [profile?.first_name, profile?.last_name]);

    // React.useEffect(() => {
    //     console.log("ProfileNameAndId Profile Data:", profile);
    // }, [profile]);

    return (
      <View style={[styles.container]}>
        <Text style={[styles.userDisplayName, {color: colors.text}]}>{displayName()}</Text>
        <Text style={[styles.userName, {color:colors.text}]}>User ID: {profile?.username ?? "..."}</Text>
      </View>
    )
}

export default ProfileNameAndId;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginBottom: 20,
    alignItems: "center"
  },
  userDisplayName: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "800",
  },
  userName: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
  }
});