import { router, Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import { useTheme } from '@/theme/ThemeContext';
import { truncateString } from '@/utils';
import HeaderTitle from '@/components/header/HeaderTitle';
import DailyStreaksModal from '@/components/modals/DailyStreaksModal';
import { useCelebration } from '@/context/CelebrationContext';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import { useEffect, useRef } from 'react';
import SessionResultModal from '@/components/modals/SessionResultModal';

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
          <SessionResultModal
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
          <UnitCompletionModal
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