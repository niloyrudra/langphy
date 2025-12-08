import { useEqualizerBars } from "@/hooks/useEqualizerBars";
import React, { useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  // useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import WaveBar from "../WaveBar";
import { createEqualizerBars } from "@/utils";

interface Props {
  pattern: number[];
  isSpeaking: boolean;
  color?: string;
  barsCount?: number;
}

export default function SoundWave({
  isSpeaking,
  color = "#45b7ff",
  barsCount = 22,     // similar count to your picture
  pattern = []
}: Props) {

  // Create shared values once
  // const bars = useEqualizerBars(barsCount);
  // if (!bars.length) return null; // prevent hook order break
  const bars = useMemo(() => createEqualizerBars(barsCount), [barsCount]);


  // If no pattern → create smooth symmetric pattern (like your PNG)
  const resolvedPattern = useMemo(() => {
    // if (pattern && pattern.length > 0) return pattern;
    const safePattern = Array.isArray(pattern) ? pattern : [];

    if (safePattern.length === barsCount) {
      return safePattern;
    }

    // Generate a symmetric wave like the image
    const half = Math.floor(barsCount / 2);
    const arr = [];

    for (let i = 0; i < barsCount; i++) {
      const dist = Math.abs(i - half);
      const base = 1 + (half - dist) * 0.35;
      arr.push(base);
    }
    return arr;
  }, [pattern, barsCount]);

  useEffect(() => {
    if (!isSpeaking) {
      bars.forEach(b => (b.value = withTiming(0.4, { duration: 150 })));
      return;
    }
    bars.forEach((b, i) => {
      const target = resolvedPattern[i] ?? 1; // fallback safe value
      b.value = withRepeat(
        withTiming( target, { duration: 200 }),
        -1,
        true
      );
    });
  }, [isSpeaking, resolvedPattern]);

  return (
    <View style={styles.container}>
      {bars.map((bar, index) => (
        <WaveBar key={index} bar={bar} color={color} />
      ))}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     {bars.map((bar, index) => {
  //       const style = useAnimatedStyle(() => ({
  //         transform: [{ scaleY: bar.value }],
  //       }));

  //       return (
  //         <Animated.View
  //           key={index}
  //           style={[
  //             styles.bar,
  //             style,
  //             {
  //               backgroundColor: color,
  //             },
  //           ]}
  //         />
  //       );
  //     })}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  bar: {
    width: 4,
    height: 18,           // base height
    marginHorizontal: 2,
    borderRadius: 6,      // rounded ends like the image
  },
});