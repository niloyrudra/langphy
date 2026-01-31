import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';

import { SteakIcon } from '@/utils/SVGImages';
import { useStreak } from '@/hooks/useStreaks';
// import { useStreaks } from '@/context/StreaksContext';

const SteakBadge = () => {
  const {colors,theme} = useTheme();
  const { data: streaks } = useStreak()
  return (
    <View style={[STYLES.childContentCentered, styles.container, {backgroundColor: colors.steakBadgeBackgroundColor}]}>
      <SteakIcon width={12} height={18} />
      <Text style={[styles.steakCount, {color: colors.text}, (theme === 'dark' && STYLES.textShadow)]}>
        {streaks?.current_streak ?? '0'}
      </Text>
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