import { Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Title from '@/components/Title';
import { truncateString } from '@/utils';
import Settings from '@/components/header/Settings';
import STYLES from '@/constants/styles';

const SpeakingSessionLayout = () => {
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

export default SpeakingSessionLayout;