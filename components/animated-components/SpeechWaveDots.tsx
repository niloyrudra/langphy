import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  pattern: number[];
  isSpeaking: boolean;
  size?: number;
  color?: string;
  gap?: number;
}

export default function SpeechWaveDots({
  pattern,
  isSpeaking,
  size = 14,
  color = "#4dabf7",
  gap = 10,
}: Props) {
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);

  const index = useSharedValue(0);

  useEffect(() => {
    if (!isSpeaking) {
      scale1.value = withTiming(1, { duration: 300 });
      scale2.value = withTiming(1, { duration: 300 });
      scale3.value = withTiming(1, { duration: 300 });
      return;
    }

    index.value = 0;

    const interval = setInterval(() => {
      const intensity = pattern[index.value % pattern.length];

      // slightly different timings to simulate natural variation
      scale1.value = withTiming(intensity / 10, { duration: 180 });
      scale2.value = withTiming(intensity / 10 + 0.1, { duration: 200 });
      scale3.value = withTiming(intensity / 10 - 0.1, { duration: 160 });

      index.value += 1;
    }, 200);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  const style1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
  }));
  const style2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));
  const style3 = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
  }));

  return (
    <View style={[styles.row, { columnGap: gap }]}>
      <Animated.View style={[styles.dot, style1, { width: size, height: size, backgroundColor: color }]} />
      <Animated.View style={[styles.dot, style2, { width: size, height: size, backgroundColor: color }]} />
      <Animated.View style={[styles.dot, style3, { width: size, height: size, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    borderRadius: 999,
  },
});