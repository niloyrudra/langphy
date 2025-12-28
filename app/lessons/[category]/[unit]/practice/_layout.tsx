import { Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Title from '@/components/Title';
import { useTheme } from '@/theme/ThemeContext';
import { truncateString } from '@/utils';
import ShowListButton from '@/components/header/ShowListButton';
import { SessionProvider } from '@/context/SessionContext';

const PracticeSessionLayout = () => {
  const { colors, theme } = useTheme();
  return (
    <SessionProvider>

      <Stack
        screenOptions={{
          // statusBarStyle: theme === 'light' ? 'light' : 'dark'
        }}
      >
        <Stack.Screen
          name="index"
          options={(props) => ({
            headerStyle: {backgroundColor: colors.background},
            headerShadowVisible: false,
            // sheetCornerRadius: 20,
            headerLeft: () => (<HeaderTopLeftArrowButton />),
            headerTitle: () => (
              <Title
                title={ props.route.params?.title ? truncateString( props.route.params?.title, 25 ) : "Unit Session" }
                contentStyle={{fontWeight:"900", fontSize:24}}
                containerStyle={{
                  // backgroundColor: "green",
                  justifyContent:"center",
                  alignItems:"center"
                }}
              />
            ),
            headerRight: () => (<ShowListButton />)
          })}
        />
      </Stack>
      
    </SessionProvider>
  );
}

export default PracticeSessionLayout;