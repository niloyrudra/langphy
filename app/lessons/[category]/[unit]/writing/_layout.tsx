import { Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import { truncateString } from '@/utils';
import Title from '@/components/Title';
import STYLES from '@/constants/styles';

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
            <Title
              title={ (props.route.params as any)?.title ? truncateString( (props.route.params as any)?.title, 25 ) : "Unit Session" }
              contentStyle={STYLES.headerTitle}
              alignCenter
            />
          ),
        })}
      />
    </Stack>
  );
}

export default WritingSessionLayout;