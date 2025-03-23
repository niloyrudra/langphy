// app/lessons/[category]/_layout.tsx
import CustomArchiveHeader from '@/components/CustomArchiveHeader';
import { Stack } from 'expo-router';

export default function CategoryLayout() {
  return (
    <Stack
        // screenOptions={{
        //     headerShown: false
        // }}
    >
      <Stack.Screen name="index" options={{ header: (props) => (<CustomArchiveHeader title={props.route.params?.title ?? "Lesson Units"} />) }} />
      <Stack.Screen name="[unit]/index" options={{ headerShown: false }} />
    </Stack>
  );
}
