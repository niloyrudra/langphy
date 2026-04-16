import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { useEffect, useRef } from 'react';

export const useEqualizerBars = (barsCount: number | undefined) => {
  const barsRef = useRef<SharedValue<number>[]>([]);

  // FIX: Wait until barsCount is valid
  useEffect(() => {
    if (!barsCount || barsCount <= 0) return;

    // create only once
    if (barsRef.current.length === 0) {
      barsRef.current = Array.from({ length: barsCount }).map(() =>
        useSharedValue(0)
      );
    }
  }, [barsCount]);

  return barsRef.current;
};