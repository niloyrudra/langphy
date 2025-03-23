// app/lessons/[category]/[unit]/_layout.tsx
import { Stack } from 'expo-router';
import CustomArchiveHeader from '@/components/CustomArchiveHeader';

export default function UnitLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: (props) => (<CustomArchiveHeader title={props.route.params?.title ?? "Lessons"} />) }} />
      <Stack.Screen name="practice" options={{ headerShown: false }} />
      <Stack.Screen name="quiz" options={{ headerShown: false }} />
      <Stack.Screen name="listening" options={{ headerShown: false }} />
      <Stack.Screen name="reading" options={{ headerShown: false }} />
      <Stack.Screen name="speaking" options={{ headerShown: false }} />
      <Stack.Screen name="writing" options={{ headerShown: false }} />
    </Stack>
  );
}
