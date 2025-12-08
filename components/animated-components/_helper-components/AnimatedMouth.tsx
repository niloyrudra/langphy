import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

interface Props {
  pattern: number[];
  isSpeaking: boolean;
  color?: string;
}

export default function AnimatedMouth({ pattern, isSpeaking, color = "#000" }: Props) {
  const openness = useSharedValue(4);
  let index = 0;

  useEffect(() => {
    if (!isSpeaking) {
      openness.value = withTiming(4, { duration: 200 });
      return;
    }

    const interval = setInterval(() => {
      const level = pattern[index % pattern.length] / 10;
      openness.value = withTiming(4 + level * 10, { duration: 120 });
      index++;
    }, 150);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  const style = useAnimatedStyle(() => ({
    height: openness.value,
  }));

  return <Animated.View style={[styles.mouth, style, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  mouth: { width: 20, marginTop: 10, borderRadius: 5 },
});