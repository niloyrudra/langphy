import CustomHeader from '@/components/CustomHeader';
import HeaderLogo from '@/components/header/HeaderLogo';
import HeaderRightComponent from '@/components/header/HeaderRightComponent';
import { useTheme } from '@/theme/ThemeContext';
import { Stack } from 'expo-router';

export default function LessonsLayout() {
  const {colors, theme} = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: colors.background
          },
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (<HeaderLogo />),
          headerRight: () => (<HeaderRightComponent />)
          // header: () => (<CustomHeader />)
        }}
      />
      <Stack.Screen name="[category]" options={{ headerShown: false }} />
    </Stack>
  );
}
