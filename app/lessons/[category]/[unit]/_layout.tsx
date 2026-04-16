import { useEffect, useRef } from 'react';
import { router, Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { useCelebration } from '@/context/CelebrationContext';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import DailyStreaksModal from '@/components/modals/DailyStreaksModal';
import SessionCompletionModal from '@/components/modals/SessionCompletionModal';
import LessonCompletionModal from '@/components/modals/LessonCompletionModal';
import MilestonesAchievementModal from '@/components/modals/MilestonesAchievementModal';
import LangphyHeaderTitle from '@/components/text-components/LangphyHeaderTitle';

const UnitLayout = () => {
  const {colors} = useTheme();
  const { current, resolveCurrent } = useCelebration();
  const shouldNavigateRef = useRef<boolean>(false);

  useEffect(() => {
    if ( !current && shouldNavigateRef.current ) {
      shouldNavigateRef.current = false;
      router.back();
    }
  }, [current]);

  return (
    <>
      {/* Unit Stack */}
      <Stack>
        <Stack.Screen
          name="index"
          options={(props) => ({
            headerStyle: {backgroundColor: colors.background},
            headerShadowVisible: false,
            headerLeft: () => (<HeaderTopLeftArrowButton />),
            headerTitle: () => (
              <LangphyHeaderTitle
                title={ (props.route.params as any)?.title ?? "Unit Sessions"}
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

      {
        current?.type === "lesson_complete" && (
          <LessonCompletionModal
            isVisible
            actualQuery={current.payload.actualQuery}
            result={current.payload.result}
            onContinue={() => {
              shouldNavigateRef.current = false;
              current.payload.onContinue()
            }}
            onModalVisible={() => {}}
            onRetry={() => {
              current.payload.onRetry()
              resolveCurrent();
            }}
          />
        )
      }

      {
        current?.type === "session_complete" && (
          <SessionCompletionModal
            isVisible
            sessionKey={current.sessionKey}
            onContinue={() => {
              shouldNavigateRef.current = true;
              resolveCurrent();
            }}
            onModalVisible={() => {}}
          />
        )
      }

      {/* Streak Celebration */}
      {
        current?.type === "streak" && (
          <DailyStreaksModal
            visible
            streak={current.streak}
            onClose={() => {
              shouldNavigateRef.current = true;
              resolveCurrent();
            }}
          />
        )
      }

      {/* Milestone Celebration */}
      {
        current?.type === "streak_milestone" && (
          <MilestonesAchievementModal
            isVisible
            streak={current.streak}
            milestone={current.milestone}
            onClose={() => {
              resolveCurrent();
              if (shouldNavigateRef.current) {
                shouldNavigateRef.current = false;
                router.back();
              }
            }}
          />
        )
      }
    </>
  );
}

export default UnitLayout;