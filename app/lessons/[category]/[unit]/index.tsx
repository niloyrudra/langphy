import React from 'react';
import UnitSessionList from '@/components/list-loops/UnitSessionList';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import { AppState } from 'react-native';
import { useLessonTimer } from '@/hooks/useLessonTimer';

const UnitSessions = () => {
  const timer = useLessonTimer();
  React.useEffect(() => {
    const sub = AppState.addEventListener("change", state => {
      if (state === "active") {
        timer.reset();
      }
    });
    return () => sub.remove();
  }, [])
  return (
    <SafeAreaLayout edges={['bottom', 'left', 'right']}>
      <UnitSessionList />
    </SafeAreaLayout>
  );
}
export default UnitSessions;