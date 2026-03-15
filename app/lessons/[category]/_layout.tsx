import HeaderTitle from '@/components/header/HeaderTitle';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import Title from '@/components/Title';
import STYLES from '@/constants/styles';
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
              <Title
                title={(props.route.params as any)?.title ?? "Units"}
                contentStyle={STYLES.headerTitle}
                alignCenter
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
