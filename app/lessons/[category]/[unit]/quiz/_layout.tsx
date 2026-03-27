import { Stack } from 'expo-router';
import Title from '@/components/Title';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import { truncateString } from '@/utils';
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import Settings from '@/components/header/Settings';

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
            <Title
              title={ (props.route.params as any)?.title ? truncateString( (props.route.params as any)?.title, 25 ) : "Unit Session" }
              contentStyle={STYLES.headerTitle}
              alignCenter
            />
          ),
          headerRight: () => (<Settings />)
        })}
      />
    </Stack>
  );
}

export default QuizSessionLayout;