// app/lessons/[category]/[unit]/speaking/_layout.tsx
import { Stack } from 'expo-router';
import CustomLessonHeader from '@/components/CustomLessonHeader';
import { useTheme } from '@/theme/ThemeContext';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import Title from '@/components/Title';
import { truncateString } from '@/utils';
import ShowListButton from '@/components/header/ShowListButton';
import HeaderTitle from '@/components/header/HeaderTitle';
import Settings from '@/components/header/Settings';

const SpeakingSessionLayout = () => {
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
          headerRight: () => (<Settings />)
        })}
      />
    </Stack>
  );
}

export default SpeakingSessionLayout;