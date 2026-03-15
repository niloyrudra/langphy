import { Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Title from '@/components/Title';
import { useTheme } from '@/theme/ThemeContext';
import { truncateString } from '@/utils';
import ShowListButton from '@/components/header/ShowListButton';
import { SessionProvider } from '@/context/SessionContext';
import Settings from '@/components/header/Settings';
import { View } from 'react-native';
import STYLES from '@/constants/styles';

const PracticeSessionLayout = () => {
  const { colors } = useTheme();
  return (
    <SessionProvider>
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
            headerRight: () => (
              <View style={{flexDirection: "row", gap: 10}}>
                <ShowListButton />
                <Settings />
              </View>
            )
          })}
        />
      </Stack>
    </SessionProvider>
  );
}

export default PracticeSessionLayout;