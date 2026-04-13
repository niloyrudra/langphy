import { Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import { useTheme } from '@/theme/ThemeContext';
import Settings from '@/components/header/Settings';
import LangphyHeaderTitle from '@/components/text-components/LangphyHeaderTitle';

const QuizSessionLayout = () => {
  const { colors } = useTheme();
  return (
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
    </Stack>
  );
}

export default QuizSessionLayout;