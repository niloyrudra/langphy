import React from 'react';
import { StyleSheet, View } from 'react-native';
import SteakBadge from './SteakBadge';
import FlagSquareComponent from './FlagSquareComponent';

const SteakBadgeFlagComponent = () => {
  return (
    <View style={styles.container}>
        <SteakBadge />
        <FlagSquareComponent />
    </View>
  )
}

export default SteakBadgeFlagComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 20, // 10,
        // borderWidth: 1,
        // borderColor: "#68F0F8",
        // paddingVertical: 4,
        // paddingHorizontal: 6,
        // borderRadius: 12,
        // height: 36,
    }
});