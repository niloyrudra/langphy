import React from 'react';
import { StyleSheet, View } from 'react-native';
import SteakBadgeFlagComponent from '../SteakBadgeFlagComponent';
import Profile from './Profile';

const HeaderRightComponent = () => {
  return (
    <View style={styles.container}>
      <SteakBadgeFlagComponent />
      <Profile />
    </View>
  )
}

export default HeaderRightComponent

const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      gap: 10,
      alignItems: "center"
    }
})