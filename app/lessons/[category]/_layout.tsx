// app/lessons/[category]/_layout.tsx
import CustomArchiveHeader from '@/components/CustomArchiveHeader';
import HeaderTitle from '@/components/header/HeaderTitle';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import Title from '@/components/Title';
import { useTheme } from '@/theme/ThemeContext';
import { Stack } from 'expo-router';

export default function CategoryLayout() {
  const {colors, theme} = useTheme();
  return (
    <Stack
        screenOptions={{
          // statusBarStyle: theme === 'light' ? 'light' : 'dark'
        }}
    >
      <Stack.Screen
        name="index"
        options={(props) => ({
          // header: (props) => (<CustomArchiveHeader title={props.route.params?.title ?? "Lesson Units"} />)
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerLeft: () => (<HeaderTopLeftArrowButton />),
          headerTitle: () => (<HeaderTitle title={props.route.params?.title ?? "Units"} />),
          headerRight: () => (<Settings />)
        })}
      />

      <Stack.Screen name="[unit]" options={{ headerShown: false }} />
    </Stack>
  );
}
