import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import { SteakIcon } from '@/utils/SVGImages';
import { useStreak } from '@/hooks/useStreaks';
import { authSnapshot } from '@/snapshots/authSnapshot';
import LangphyText from './text-components/LangphyText';

const SteakBadge = () => {
  const {colors,theme} = useTheme();
  const userId = authSnapshot.getUserId() ?? "";
  const { data: streaks } = useStreak( userId );
  return (
    <View style={[STYLES.childContentCentered, styles.container, {backgroundColor: colors.steakBadgeBackgroundColor}]}>
      <SteakIcon width={12} height={18} />
      <LangphyText
        weight="bold"
        style={[
          styles.steakCount,
          {color: colors.text},
          (theme === 'dark' && STYLES.textShadow)
        ]}
      >
        {streaks?.current_streak ?? '0'}
      </LangphyText>
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
    gap: 8,
    // height: 24,
  },
  steakCount: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: 'PlusJakartaSans-Bold'
  }
});