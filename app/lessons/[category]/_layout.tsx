import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import LangphyHeaderTitle from '@/components/text-components/LangphyHeaderTitle';
import { CelebrationProvider } from '@/context/CelebrationContext';
import { useTheme } from '@/theme/ThemeContext';
import { Stack } from 'expo-router';

export default function CategoryLayout() {
  const {colors} = useTheme();
  return (
    <CelebrationProvider>
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
        <Stack.Screen name="[unit]" options={{ headerShown: false }} />
      </Stack>
    </CelebrationProvider>
  );
}
