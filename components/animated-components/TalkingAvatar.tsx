import React from "react";
import { View } from "react-native";
import SpeechEqualizer from "./_helper-components/SpeechEqualizer";
import SoundRipple from "./_helper-components/SoundRipple";
// import AnimatedMouth if you have it

interface Props {
  pattern: number[];
  isSpeaking: boolean;
}

export default function TalkingAvatar({ pattern, isSpeaking }: Props) {
  return (
    <View style={{ alignItems: "center" }}>
      <SoundRipple isSpeaking={isSpeaking} size={70} color="#45b7ff" />
      {/* Speaker icon could be layered with absolute if you want */}
      <View style={{ marginTop: 10 }}>
        <SpeechEqualizer pattern={pattern} isSpeaking={isSpeaking} color="#45b7ff" barsCount={20} />
      </View>
    </View>
  );
}