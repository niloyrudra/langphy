import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface Props {
  pattern: number[];
  isSpeaking: boolean;
  color?: string;
  maxBars?: number;
}

export default function SpeechEqualizer({ pattern, isSpeaking, color = "#45b7ff" }: Props) {
  // const bars = pattern.map(() => useSharedValue(0));

  const bar1 = useSharedValue(0);
  const bar2 = useSharedValue(0);
  const bar3 = useSharedValue(0);
  const bar4 = useSharedValue(0);
  const bar5 = useSharedValue(0);
  const bar6 = useSharedValue(0);
  const bar7 = useSharedValue(0);
  const bar8 = useSharedValue(0);
  const bar9 = useSharedValue(0);
  const bar10 = useSharedValue(0);
  const bars = [bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8, bar9, bar10];

  useEffect(() => {
    if (!isSpeaking) {
      bars.forEach(b => b.value = 0.25);
      return;
    }

    bars.forEach((b, i) => {
      b.value = withRepeat(withTiming(pattern[i], { duration: 180 }), -1, true);
    });
  }, [isSpeaking]);

  return (
    <View style={styles.container}>
      {bars.map((b, i) => {
        const style = useAnimatedStyle(() => ({
          height: ( b.value || 0.25 ) * 10,
        }));
        return <Animated.View key={i} style={[styles.bar, { backgroundColor: color }, style]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 90,
  },
  bar: {
    width: 6,
    marginHorizontal: 2,
    height: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
import React from "react";
import { View, Animated } from "react-native";
import { withRepeat, withTiming, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
// import { useEqualizerBars } from "@/hooks/useEqualizerBars";

interface Props {
  pattern: number[];       // expected small integers like 2..10
  isSpeaking: boolean;
  color?: string;
  maxBars?: number;
}

export default function SpeechEqualizer({
  pattern,
  isSpeaking,
  color = "#45b7ff",
  maxBars = 10,
}: Props) {
  // create shared values via custom hook (legal & stable)
  // const bars = useEqualizerBars(maxBars);
  
  const barsRef = React.useRef<ReturnType<typeof useSharedValue<number>>[] | null>(null);

  if (!barsRef.current) {
    barsRef.current = Array.from({ length: maxBars }, () => useSharedValue(0));
  }

  const bars = barsRef.current;

  console.log(barsRef.current[0])

  // Normalize/stretch pattern to exactly maxBars items (fast)
  const normalizedPattern = React.useMemo(() => {
    if (!pattern || pattern?.length === 0) {
      // fallback synthetic gentle movement
      return Array.from({ length: maxBars }, () => 2 + Math.random() * 4);
    }
    if (pattern?.length === maxBars) return pattern;
    return Array.from({ length: maxBars }, (_, i) => {
      const idx = Math.floor((i / maxBars) * pattern?.length);
      return pattern[idx] ?? 2;
    });
  }, [pattern, maxBars]);

  // animate bars when speaking state or pattern changes
  React.useEffect(() => {
    bars?.forEach((bar, i) => {
      const target = isSpeaking ? ( normalizedPattern[i] ?? 2 ) : 0;
      if (isSpeaking) {
        // repeated / looping motion while speaking
        bar.value = withRepeat(withTiming(target, { duration: 160 }), -1, true);
      } else {
        // gracefully drop to zero when stopped
        bar.value = withTiming(0, { duration: 120 });
      }
    });
  }, [isSpeaking, normalizedPattern]);

  // console.log(bars)

  return (
    <View
      style={{ 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: maxBars * 8,
        height: 90,
        backgroundColor: "#000000"
      }}
    >
      {bars.map((bar, i) => {
        const style = useAnimatedStyle(() => ({
          height: (bar?.value ?? 0.25) * 5, // read shared value inside animated style
          width: 4,
          marginHorizontal: 2,
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
        }));
        return <Animated.View key={i} style={style} />;
      })}
    </View>
  );
}
  */