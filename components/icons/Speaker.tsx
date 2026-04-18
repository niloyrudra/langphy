/**
 * Speaker.tsx  (icons/Speaker)
 *
 * Unified speaker icon used in ListeningComponent and anywhere that needs
 * both normal + slow speed from the same component.
 *
 * Changes from old version:
 * - Uses speechController directly (no more split between utils/index.ts functions)
 * - isSlowing drives startSlow() vs start() — one clear branch, no handler lookup
 * - speakerRef.reset() before play() prevents Lottie getting stuck mid-animation
 *   when tapped repeatedly
 * - isLoading removed from slow mode: the turtle icon IS the loading indicator
 *   for slow speech; showing a spinner on top of it was confusing
 */

import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { SpeakerTurtleDark, SpeakerTurtleLight } from '@/utils/SVGImages';
import LottieView from 'lottie-react-native';
import AnimatedSpeaker from '../AnimatedSpeaker';
import IconLoadingState from './_partials/IconLoadingState';
import { speechController } from '@/helpers/speechController';

interface SpeakerProps {
  speechContent: string;
  speechLang: 'en-US' | 'de-DE' | string;
  isSlowing?: boolean;
}

const Speaker: React.FC<SpeakerProps> = ({ speechContent, speechLang, isSlowing = false }) => {
  const { theme } = useTheme();
  // const [isLoading, setLoading] = React.useState(false);
  const speakerRef = React.useRef<LottieView>(null);

  const handlePress = React.useCallback(() => {
    speakerRef.current?.reset();
    speakerRef.current?.play();

    if (isSlowing) {
      speechController.startSlow(speechContent, speechLang);
    } else {
      // speechController.start(speechContent, speechLang, setLoading);
      speechController.start(speechContent, speechLang);
    }
  }, [speechContent, speechLang, isSlowing]);

  const icon = useMemo(() => {
      if (!isSlowing) {
        return <AnimatedSpeaker speakerRef={speakerRef} lang={speechLang} />;
      }
      return theme === 'dark' ? <SpeakerTurtleDark /> : <SpeakerTurtleLight />;
  }, [isSlowing, speechLang, theme]);

  return (
    <TouchableOpacity onPress={handlePress}>
    {/* <TouchableOpacity disabled={isLoading} onPress={handlePress}> */}
      {icon}
      {/* {isLoading ? <IconLoadingState /> : icon} */}
    </TouchableOpacity>
  );
};

export default React.memo(Speaker);