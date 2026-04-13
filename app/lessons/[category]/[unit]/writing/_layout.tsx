import { Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Settings from '@/components/header/Settings';
import LangphyHeaderTitle from '@/components/text-components/LangphyHeaderTitle';

const WritingSessionLayout = () => {
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

export default WritingSessionLayout;