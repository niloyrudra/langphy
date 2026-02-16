import { router, Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import { useTheme } from '@/theme/ThemeContext';
import { truncateString } from '@/utils';
import HeaderTitle from '@/components/header/HeaderTitle';
import DailyStreaksModal from '@/components/modals/DailyStreaksModal';
import { useCelebration } from '@/context/CelebrationContext';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import { useEffect, useRef, useState } from 'react';

const UnitLayout = () => {
  const {colors} = useTheme();
  const { current, resolveCurrent } = useCelebration();
  // const [shouldNavigate, setShouldNavigate] = useState<boolean>(false);
  const shouldNavigateRef = useRef<boolean>(false);


  useEffect(() => {
    // if ( !current && shouldNavigate ) {
    if ( !current && shouldNavigateRef.current ) {
      router.replace("/lessons/[category]/[unit]");
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
        current?.type === "session_complete" && (
          <UnitCompletionModal
            isVisible
            sessionKey={current.sessionKey}
            onContinue={() => {
              // setShouldNavigate(true);
              shouldNavigateRef.current = true;
              resolveCurrent();
              // router.replace("/lessons/[category]/[unit]")
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
                router.replace("/lessons/[category]/[unit]");
              }
            }}
          />
        )
      }
    </>
  );
}

export default UnitLayout;