import { Stack } from 'expo-router';
// import CustomLessonHeader from '@/components/CustomLessonHeader';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Title from '@/components/Title';
import ShowListButton from '@/components/header/ShowListButton';
import { truncateString } from '@/utils';
import { useTheme } from '@/theme/ThemeContext';
import HeaderTitle from '@/components/header/HeaderTitle';

const ListeningSessionLayout = () => {
  const { colors, theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        // statusBarStyle: theme === 'light' ? 'light' : 'dark'
      }}
    >
      <Stack.Screen
        name="index"
        // options={{header: (props) => (<CustomLessonHeader completion={props.route.params?.completion} goal={props.route.params?.goal} />)}}
        options={(props) => ({
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerLeft: () => (<HeaderTopLeftArrowButton />),
          headerTitle: () => (
            <HeaderTitle
              title={ props.route.params?.title ? truncateString( props.route.params?.title, 25 ) : "Unit Session" }
              // contentStyle={{fontWeight:"900", fontSize:24}}
              // containerStyle={{justifyContent:"center", alignItems:"center"}}
            />
          ),
          // headerRight: () => (<ShowListButton />)
        })}
      />
    </Stack>
  );
}

export default ListeningSessionLayout;