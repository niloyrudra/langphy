import { Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import { useTheme } from '@/theme/ThemeContext';
import { truncateString } from '@/utils';
import HeaderTitle from '@/components/header/HeaderTitle';

export default function UnitLayout() {
  const {colors} = useTheme();
  return (
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
  );
}
