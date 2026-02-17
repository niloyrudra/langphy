import { Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import { truncateString } from '@/utils';
import HeaderTitle from '@/components/header/HeaderTitle';

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
            <HeaderTitle
              title={ (props.route.params as any)?.title ? truncateString( (props.route.params as any)?.title, 25 ) : "Unit Session" }
            />
          ),
        })}
      />
    </Stack>
  );
}

export default WritingSessionLayout;