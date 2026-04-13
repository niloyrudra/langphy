import { Stack } from 'expo-router';
import HeaderTopLeftArrowButton from '@/components/header/HeaderTopLeftArrowButton';
import { useTheme } from '@/theme/ThemeContext';
import ShowListButton from '@/components/header/ShowListButton';
import { SessionProvider } from '@/context/SessionContext';
import Settings from '@/components/header/Settings';
import { StyleSheet, View } from 'react-native';
import LangphyHeaderTitle from '@/components/text-components/LangphyHeaderTitle';

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
              <LangphyHeaderTitle
                title={ (props.route.params as any)?.title ?? "Unit Sessions"}
              />
            ),
            headerRight: () => (
              <View style={styles.rightSection}>
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

const styles = StyleSheet.create({
  rightSection: {flexDirection: "row", gap: 10}
});