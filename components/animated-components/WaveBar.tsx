// BarItem.tsx
import React from "react";
import { ColorValue } from "react-native";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

interface BarItemProps {
  bar: SharedValue<number>;
  color: ColorValue;
}

const WaveBar: React.FC<BarItemProps> = ({ bar, color }) => {
  const style = useAnimatedStyle(() => ({
    transform: [{ scaleY: bar.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: 4,
          height: 18,
          marginHorizontal: 2,
          borderRadius: 6,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
};

export default WaveBar;