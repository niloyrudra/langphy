// app/lessons/[category]/_layout.tsx
import CustomArchiveHeader from '@/components/CustomArchiveHeader';
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
          statusBarStyle: theme === 'light' ? 'light' : 'dark'
        }}
    >
      <Stack.Screen
        name="index"
        options={(props) => ({
          // header: (props) => (<CustomArchiveHeader title={props.route.params?.title ?? "Lesson Units"} />)
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerLeft: () => (<HeaderTopLeftArrowButton />),
          headerTitle: () => (<Title title={props.route.params?.title ?? "Units"} contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
          headerRight: () => (<Settings />)
        })}
      />

      <Stack.Screen name="[unit]" options={{ headerShown: false }} />
    </Stack>
  );
}
