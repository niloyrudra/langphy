import { Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import { useTheme } from '@/theme/ThemeContext';
import { truncateString } from '@/utils';
import HeaderTitle from '@/components/header/HeaderTitle';
import DailyStreaksModal from '@/components/modals/DailyStreaksModal';
import { useStreakCelebration } from '@/hooks/useStreakCelebration';
import { authSnapshot } from '@/snapshots/authSnapshot';

const UnitLayout = () => {
  const {colors} = useTheme();
  const userId = authSnapshot.getUserId() ?? "";
  const { showStreakModal, streak, dismiss } = useStreakCelebration( userId );
  return (
    <>
      {/* Streak Celebration */}
      <DailyStreaksModal
        visible={showStreakModal}
        streak={streak}
        onClose={dismiss}
      />

      {/* Unit Stack */}
      <Stack>
        <Stack.Screen
          name="index"
          options={(props) => ({
            headerStyle: {backgroundColor: colors.background},
            headerShadowVisible: false,
            headerLeft: () => (<HeaderTopLeftArrowButton />),
            headerTitle: () => (
              <HeaderTitle
                title={ (props.route.params as any)?.title ? truncateString( (props.route.params as any)?.title, 25 ) : "Unit Sessions"}
              />
            ),
            headerRight: () => (<Settings />)
          })}
        />

        <Stack.Screen name="practice" options={{ headerShown: false }} />
        <Stack.Screen name="quiz" options={{ headerShown: false }} />
        <Stack.Screen name="listening" options={{ headerShown: false }} />
        <Stack.Screen name="reading" options={{ headerShown: false }} />
        <Stack.Screen name="speaking" options={{ headerShown: false }} />
        <Stack.Screen name="writing" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default UnitLayout;