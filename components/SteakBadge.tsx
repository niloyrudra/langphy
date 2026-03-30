import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import { SteakIcon } from '@/utils/SVGImages';
import { useStreak } from '@/hooks/useStreaks';
import { authSnapshot } from '@/snapshots/authSnapshot';
import LangphyText from './text-components/LangphyText';

const SteakBadge = () => {
  const {colors} = useTheme();
  const userId = authSnapshot.getUserId() ?? "";
  const { data: streaks, isLoading, isFetched } = useStreak( userId );
  return (
    <View
      style={[
        STYLES.childContentCentered,
        defaultStyles.container,
      ]}
    >
      <SteakIcon width={12} height={18} />
      {
        isLoading || !isFetched ? (
          <ActivityIndicator size="small" color={colors.text} />
        ) : (
          <LangphyText 
            weight="bold"
            style={[
              defaultStyles.steakCount,
              {color: colors.text}
            ]}
          >
            {streaks?.current_streak ?? '0'}
          </LangphyText>
        )
      }
      {/* <LangphyText
        weight="bold"
        style={[
          styles.steakCount,
          {color: colors.text},
          // (theme === 'dark' && STYLES.textShadow)
        ]}
      >
        {streaks?.current_streak ?? '0'}
      </LangphyText> */}
    </View>
  )
}

export default SteakBadge;

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection:"row",
    // borderRadius: 8,
    // paddingVertical: 4,
    // paddingHorizontal: 8,
    gap: 4, // 8,
  },
  steakCount: {
    fontSize: 18, // 14
    fontWeight: "700",
  }
});