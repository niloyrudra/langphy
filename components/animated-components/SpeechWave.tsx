import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

interface Props {
  pattern: number[];
  isSpeaking: boolean;
  size?: number;
  color?: string;
}

export default function SpeechWave({
  pattern,
  isSpeaking,
  size = 24,
  color = '#4dabf7',
}: Props) {
  const scale = useSharedValue(1);
  const index = useSharedValue(0);

  useEffect(() => {
    if (!isSpeaking) {
      scale.value = withTiming(1, { duration: 300 });
      return;
    }

    index.value = 0;

    const interval = setInterval(() => {
      const intensity = pattern[index.value % pattern.length];
      scale.value = withTiming(intensity / 10, { duration: 180 });

      index.value += 1;
    }, 200);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.dot,
        animatedStyle,
        { width: size, height: size, backgroundColor: color },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 999,
  },
});