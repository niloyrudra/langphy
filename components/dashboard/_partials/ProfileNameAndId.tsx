import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import { useAuth } from '@/context/AuthContext';

const ProfileNameAndId = () => {
    const {colors} = useTheme();
    const {user} = useAuth();
    const displayName = React.useCallback(() => {
        if( !user?.first_name && !user?.last_name ) return "Anonymous"
        else if( user?.first_name && !user?.last_name ) return user?.first_name
        else if( !user?.first_name && user?.last_name ) return user?.last_name
        else if( user.first_name && user.last_name ) return user.first_name + " " + user.last_name
        else return "Anonymous"
    }, [user?.first_name, user?.last_name]);

    return (
        <View style={[styles.container]}>
            <Text style={[styles.userDisplayName, {color: colors.text}]}>{displayName()}</Text>
            <Text style={[styles.userName, {color:colors.text}]}>User ID: {user?.username ?? "..."}</Text>
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