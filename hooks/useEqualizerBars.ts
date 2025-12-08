import { SharedValue, useSharedValue } from 'react-native-reanimated';
import React, { useEffect, useRef } from 'react';

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


// import { useRef } from "react";
// import { useSharedValue } from "react-native-reanimated";

// export const useEqualizerBars = (count: number) => {
//   const barsRef = useRef<Array<ReturnType<typeof useSharedValue<number>>> | null>(null);

//   if (!barsRef.current) {
//     barsRef.current = Array.from({ length: count }, () => useSharedValue(0));
//   }

//   return barsRef.current;
// };

/**
 * Safe version: creates N shared values ONCE.
 */
// export const useEqualizerBars = (count: number) => {
//   const barsRef = useRef<Array<ReturnType<typeof useSharedValue<number>>> | null>(null);

//   if (barsRef.current === null) {
//     // Create shared values only once
//     barsRef.current = Array.from({ length: count }, () => useSharedValue(0));
//   }

//   return barsRef.current;
// };


// import { useMemo } from "react";
// import { useSharedValue } from "react-native-reanimated";

// /**
//  * Returns an array of `count` SharedValue<number> objects.
//  * This custom hook calls useSharedValue() the same number of times
//  * on every render (legal hook usage).
//  */
// export const useEqualizerBars = (count: number) => {
//   // useMemo so the array identity is stable; but hooks are executed directly
//   // in the same order every render — that's the important bit.
//   return useMemo(() => {
//     const arr = [];
//     for (let i = 0; i < count; i++) {
//       arr.push(useSharedValue(0));
//     }
//     return arr;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // intentionally empty so these shared values are created once per component instance
// }