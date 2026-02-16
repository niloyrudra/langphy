import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
// import { useProfile } from '@/hooks/useProfile';
// import { useAuth } from '@/context/AuthContext';
// import { authSnapshot } from '@/snapshots/authSnapshot';
// import { useAuth } from '@/context/AuthContext';
// import { useProfile } from '@/context/ProfileContext';

const ProfileNameAndId = ({displayName, username}: {displayName: string, username: string}) => {
    const {colors} = useTheme();
    // const userId = authSnapshot.getUserId() ?? "";
    // const {data: profile, isLoading} = useProfile(userId as string);
    // const [displayName, setDisplayName] = React.useState<string>("Anonymous");
    // const [username, setUsername] = React.useState<string>("...");

    // React.useEffect(() => {
    //     // console.log("ProfileNameAndId Profile Data:", profile);
    //   if(!isLoading) {
    //     // if( !profile?.first_name && !profile?.last_name ) setDisplayName("Anonymous")
    //     if( profile?.first_name && !profile?.last_name ) setDisplayName(profile?.first_name)
    //     else if( !profile?.first_name && profile?.last_name ) setDisplayName(profile?.last_name)
    //     else if( profile?.first_name && profile?.last_name ) setDisplayName(profile.first_name + " " + profile.last_name)
    //     // else setDisplayName("Anonymous")
        
    //     if(profile?.username) setUsername(profile?.username)
    //   } 
    // }, [profile?.first_name, profile?.last_name, profile?.username, isLoading]);

    return (
      <View style={[styles.container]}>
        <Text style={[styles.userDisplayName, {color: colors.text}]}>{displayName}</Text>
        <Text style={[styles.userName, {color:colors.text}]}>User ID: {username}</Text>
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