// import CustomHeader from '@/components/CustomHeader';
import HeaderLogo from '@/components/header/HeaderLogo';
import HeaderRightComponent from '@/components/header/HeaderRightComponent';
import { useTheme } from '@/theme/ThemeContext';
import { Stack } from 'expo-router';

const LessonCategoryLayout = () => {
  const {colors, theme} = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (<HeaderLogo />),
          headerRight: () => (<HeaderRightComponent />)
        }}
      />
      <Stack.Screen name="[category]" options={{ headerShown: false }} />
    </Stack>
  );
}

export default LessonCategoryLayout;
