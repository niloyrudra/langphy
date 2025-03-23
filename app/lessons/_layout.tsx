// app/lessons/_layout.tsx
import CustomHeader from '@/components/CustomHeader';
import { Stack } from 'expo-router';

export default function LessonsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => (<CustomHeader />) }} />
      <Stack.Screen name="[category]/index" options={{ headerShown: false }} />
    </Stack>
  );
}
