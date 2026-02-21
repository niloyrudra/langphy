import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from '@/components/text-components/LangphyText';

const ProfileNameAndId = ({displayName, username}: {displayName: string, username: string}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container]}>
      <LangphyText weight="extrabold" style={[styles.userDisplayName, {color: colors.text}]}>{displayName}</LangphyText>
      <LangphyText style={[styles.userName, {color:colors.text}]}>User ID: {username}</LangphyText>
    </View>
  );
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