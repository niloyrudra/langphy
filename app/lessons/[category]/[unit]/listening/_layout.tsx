import { Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import { truncateString } from '@/utils';
import { useTheme } from '@/theme/ThemeContext';
import HeaderTitle from '@/components/header/HeaderTitle';
import Settings from '@/components/header/Settings';
import { ListeningProvider } from '@/context/ListeningContext';

const ListeningSessionLayout = () => {
  const { colors } = useTheme();
  return (
    <ListeningProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={(props) => ({
            headerStyle: {backgroundColor: colors.background},
            headerShadowVisible: false,
            headerLeft: () => (<HeaderTopLeftArrowButton />),
            headerTitle: () => (
              <HeaderTitle
                title={ props.route.params?.title ? truncateString( props.route.params?.title, 25 ) : "Unit Session" }
              />
            ),
            headerRight: () => (<Settings />)
          })}
        />
      </Stack>
    </ListeningProvider>
  );
}

export default ListeningSessionLayout;