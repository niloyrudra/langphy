/**
 * SpeakerComponent.tsx  (icons/SpeakerComponent)
 *
 * Simpler variant — normal speed only, used in SpeakerWithQuestion,
 * LessonComponent's single-speed slot, etc.
 *
 * Changes from old version:
 * - Uses speechController.start() instead of importing speechHandler from utils
 * - style prop simplified: was `style={[(style && style)]}` which is an array
 *   with a conditional — equivalent to just `style={style}` since undefined
 *   is already ignored by React Native's style prop.
 */

import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import AnimatedSpeaker from '../AnimatedSpeaker';
import LottieView from 'lottie-react-native';
import { speechController } from '@/helpers/speechController';

interface SpeakerComponentProps {
  speechContent: string;
  speechLang: 'en-US' | 'de-DE' | string;
  style?: StyleProp<ViewStyle>;
}

const SpeakerComponent: React.FC<SpeakerComponentProps> = ({
  speechContent,
  speechLang,
  style,
}) => {
  // const [isLoading, setLoading] = React.useState(false);
  const speakerRef = React.useRef<LottieView>(null);

  const handlePress = React.useCallback(() => {
    speakerRef.current?.reset();
    speakerRef.current?.play();
    // speechController.start(speechContent, speechLang, setLoading);
    speechController.start(speechContent, speechLang);
  }, [speechContent, speechLang]);

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <AnimatedSpeaker speakerRef={speakerRef} lang={speechLang} />
    </TouchableOpacity>
  );
};

export default React.memo(SpeakerComponent);