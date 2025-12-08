import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";

interface Props {
  isSpeaking: boolean;
  size?: number;
  color?: string;
}

export default function SoundRipple({ isSpeaking, size = 60, color = "#4dabf7" }: Props) {
  const s1 = useSharedValue(0.4);
  const s2 = useSharedValue(0.4);
  const s3 = useSharedValue(0.4);

  const o1 = useSharedValue(1);
  const o2 = useSharedValue(1);
  const o3 = useSharedValue(1);

  useEffect(() => {
    if (!isSpeaking) {
      // reset
      s1.value = withTiming(0.4, { duration: 150 });
      s2.value = withTiming(0.4, { duration: 150 });
      s3.value = withTiming(0.4, { duration: 150 });

      o1.value = withTiming(1, { duration: 150 });
      o2.value = withTiming(1, { duration: 150 });
      o3.value = withTiming(1, { duration: 150 });

      return;
    }

    // scale
    s1.value = withRepeat(withTiming(1.8, { duration: 1400 }), -1, false);
    s2.value = withDelay(300, withRepeat(withTiming(1.8, { duration: 1400 }), -1, false));
    s3.value = withDelay(600, withRepeat(withTiming(1.8, { duration: 1400 }), -1, false));

    // opacity fade OUT
    o1.value = withRepeat(withTiming(0, { duration: 1400 }), -1, false);
    o2.value = withDelay(300, withRepeat(withTiming(0, { duration: 1400 }), -1, false));
    o3.value = withDelay(600, withRepeat(withTiming(0, { duration: 1400 }), -1, false));

  }, [isSpeaking]);

  const style1 = useAnimatedStyle(() => ({
    transform: [{ scale: s1.value }],
    opacity: o1.value,
  }));

  const style2 = useAnimatedStyle(() => ({
    transform: [{ scale: s2.value }],
    opacity: o2.value,
  }));

  const style3 = useAnimatedStyle(() => ({
    transform: [{ scale: s3.value }],
    opacity: o3.value,
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.ripple,
          style1,
          { width: size, height: size, borderColor: color, borderWidth: 2, borderRadius: size / 2 },
        ]}
      />
      <Animated.View
        style={[
          styles.ripple,
          style2,
          { width: size, height: size, borderColor: color, borderWidth: 2, borderRadius: size / 2 },
        ]}
      />
      <Animated.View
        style={[
          styles.ripple,
          style3,
          { width: size, height: size, borderColor: color, borderWidth: 2, borderRadius: size / 2 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  ripple: {
    position: "absolute",
  },
});


// import React, { useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withRepeat,
//   withTiming,
//   withDelay,
// } from "react-native-reanimated";

// interface Props {
//   isSpeaking: boolean;
//   size?: number;
//   color?: string;
// }

// export default function SoundRipple({
//   isSpeaking,
//   size = 60,
//   color = "#4dabf7",
// }: Props) {
//   const scales = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];
//   const opacities = [useSharedValue(0.7), useSharedValue(0.7), useSharedValue(0.7)];

//   useEffect(() => {
//     if (!isSpeaking) {
//       scales.forEach((s) => (s.value = 0));
//       opacities.forEach((o) => (o.value = 0));
//       return;
//     }

//     scales.forEach((s, i) => {
//       s.value = withDelay(
//         i * 300,
//         withRepeat(withTiming(1.8, { duration: 1400 }), -1, false)
//       );
//     });

//     opacities.forEach((o, i) => {
//       o.value = withDelay(
//         i * 300,
//         withRepeat(withTiming(0, { duration: 1400 }), -1, false)
//       );
//     });
//   }, [isSpeaking]);

//   return (
//     <View style={[styles.container, { width: size, height: size }]}>
//       {scales.map((s, i) => {
//         const style = useAnimatedStyle(() => ({
//           transform: [{ scale: s.value }],
//           opacity: opacities[i].value,
//         }));

//         return (
//           <Animated.View
//             key={i}
//             style={[
//               styles.ripple,
//               style,
//               {
//                 width: size,
//                 height: size,
//                 borderColor: color,
//                 borderWidth: 2,
//                 borderRadius: size,
//               },
//             ]}
//           />
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { justifyContent: "center", alignItems: "center" },
//   ripple: {
//     position: "absolute",
//   },
// });