import { Stack } from 'expo-router';
import CustomLessonHeader from '@/components/CustomLessonHeader';

export default function UnitLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: (props) => (<CustomLessonHeader completion={props.route.params?.completion} goal={props.route.params?.goal} />) }} />
    </Stack>
  );
}