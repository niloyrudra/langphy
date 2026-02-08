import HeaderTitle from '@/components/header/HeaderTitle';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import { useTheme } from '@/theme/ThemeContext';
import { Stack } from 'expo-router';

export default function CategoryLayout() {
  const {colors} = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={(props) => ({
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerLeft: () => (<HeaderTopLeftArrowButton />),
          headerTitle: () => (<HeaderTitle title={(props.route.params as any)?.title ?? "Units"} />),
          headerRight: () => (<Settings />)
        })}
      />
      <Stack.Screen name="[unit]" options={{ headerShown: false }} />
    </Stack>
  );
}
