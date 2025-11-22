import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';

import { SteakIcon } from '@/utils/SVGImages';

const SteakBadge = () => {
  const {colors,theme} = useTheme()
  return (
    <View style={[STYLES.childContentCentered, styles.container, {backgroundColor: colors.steakBadgeBackgroundColor}]}>
      {/* <SteakIcon width={8} height={12} /> */}
      <SteakIcon width={12} height={18} />
      <Text style={[styles.steakCount, {color: colors.text}, (theme === 'dark' && STYLES.textShadow)]}>1,001</Text>
    </View>
  )
}

export default SteakBadge;

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
    // height: 24,
  },
  steakCount: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: 'PlusJakartaSans-Bold'
  }
});