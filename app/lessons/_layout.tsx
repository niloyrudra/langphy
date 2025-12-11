import CustomHeader from '@/components/CustomHeader';
import HeaderLogo from '@/components/header/HeaderLogo';
import HeaderRightComponent from '@/components/header/HeaderRightComponent';
import { useTheme } from '@/theme/ThemeContext';
import { Stack } from 'expo-router';

const LessonCategoryLayout = () => {
  const {colors, theme} = useTheme();
  return (
    <Stack
      screenOptions={{
        // statusBarStyle: theme === 'light' ? 'light' : 'dark'
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (<HeaderLogo />),
          headerRight: () => (<HeaderRightComponent />)
          // header: () => (<CustomHeader />)
        }}
      />
      <Stack.Screen name="[category]" options={{ headerShown: false }} />
    </Stack>
  );
}

export default LessonCategoryLayout;
