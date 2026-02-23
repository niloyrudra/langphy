import { useEffect, useRef } from 'react';
import { router, Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { useCelebration } from '@/context/CelebrationContext';
import { truncateString } from '@/utils';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import HeaderTitle from '@/components/header/HeaderTitle';
import DailyStreaksModal from '@/components/modals/DailyStreaksModal';
import SessionCompletionModal from '@/components/modals/SessionCompletionModal';
import LessonCompletionModal from '@/components/modals/LessonCompletionModal';

const UnitLayout = () => {
  const {colors} = useTheme();
  const { current, resolveCurrent } = useCelebration();
  const shouldNavigateRef = useRef<boolean>(false);

  useEffect(() => {
    if ( !current && shouldNavigateRef.current ) {
      shouldNavigateRef.current = false
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
            // onModalVisible={current.payload.onRetry}
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
              resolveCurrent();
              if (shouldNavigateRef.current) {
                shouldNavigateRef.current = false;
                // router.replace("/lessons/[category]/[unit]");
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