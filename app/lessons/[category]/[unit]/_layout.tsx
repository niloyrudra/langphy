// app/lessons/[category]/[unit]/_layout.tsx
import { Stack } from 'expo-router';
import CustomArchiveHeader from '@/components/CustomArchiveHeader';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import Title from '@/components/Title';
import { useTheme } from '@/theme/ThemeContext';
import { truncateString } from '@/utils';
import HeaderTitle from '@/components/header/HeaderTitle';

export default function UnitLayout() {
  const {colors, theme} = useTheme();
  return (
    <Stack
      screenOptions={{
        // statusBarStyle: theme === 'light' ? 'light' : 'dark'
      }}
    >
      <Stack.Screen
        name="index"
        // options={{ header: (props) => (<CustomArchiveHeader title={props.route.params?.title ?? "Lessons"} />) }} />
        options={(props) => ({
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerLeft: () => (<HeaderTopLeftArrowButton />),
          headerTitle: () => (
            <HeaderTitle
              title={ props.route.params?.title ? truncateString( props.route.params?.title, 25 ) : "Unit Sessions"}
              // contentStyle={{fontWeight:"900", fontSize:24}}
              // containerStyle={{justifyContent:"center", alignItems:"center"}}
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
