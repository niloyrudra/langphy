// import {Text} from 'react-native';
import { Stack } from 'expo-router';
// import CustomLessonHeader from '@/components/CustomLessonHeader';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Title from '@/components/Title';
// import Settings from '@/components/header/Settings';
import { useTheme } from '@/theme/ThemeContext';
import { truncateString } from '@/utils';
import ShowListButton from '@/components/header/ShowListButton';

const PracticeSessionLayout = () => {
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
            <Title
              title={ props.route.params?.title ? truncateString( props.route.params?.title, 25 ) : "Unit Session" }
              contentStyle={{fontWeight:"900", fontSize:24}}
              containerStyle={{justifyContent:"center", alignItems:"center"}}
            />
          ),
          headerRight: () => (<ShowListButton />)
        })}
      />
    </Stack>
  );
}

export default PracticeSessionLayout;