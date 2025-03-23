// app/lessons/[category]/[unit]/_layout.tsx
import { Stack } from 'expo-router';
import CustomArchiveHeader from '@/components/CustomArchiveHeader';

export default function UnitLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: (props) => (<CustomArchiveHeader title={props.route.params?.title ?? "Lessons"} />) }} />
    </Stack>
  );
}
