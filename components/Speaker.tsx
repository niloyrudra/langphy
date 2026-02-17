import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { speechHandler, speechSlowHandler } from '@/utils';
import { SpeakerTurtleDark, SpeakerTurtleLight } from '@/utils/SVGImages';
import LottieView from 'lottie-react-native';
import AnimatedSpeaker from './AnimatedSpeaker';

interface SpeakerComponentProps {
  speechContent: string;
  speechLang: 'en-US' | 'de-DE' | string;
  isSlowing?: boolean;
}

const SpeakerComponent: React.FC<SpeakerComponentProps> = ({
  speechContent,
  speechLang,
  isSlowing = false,
}) => {
  const { colors, theme } = useTheme();
  const [isLoading, setLoading] = useState(false);
  const speakerRef = React.useRef<LottieView>(null);

  const handlePress = React.useCallback( async () => {
    speakerRef.current?.reset();
    speakerRef.current?.play();
    const handler = isSlowing ? speechSlowHandler : speechHandler;
    handler(speechContent, speechLang, setLoading);
  }, [ speechSlowHandler, speechHandler, setLoading, isSlowing, speechLang, speechContent ]);

  const icon = useMemo(() => {
    const isDark = theme === 'dark';
    if( !isSlowing ) return (<AnimatedSpeaker speakerRef={speakerRef} lang={speechLang} />)
    return isDark ? <SpeakerTurtleDark /> : <SpeakerTurtleLight />
  }, [isSlowing, speechLang, theme]);

  return (
    <TouchableOpacity disabled={isLoading} onPress={handlePress}>
      {isLoading ? (
        <ActivityIndicator size={33} color={colors.primary} />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

export default React.memo(SpeakerComponent);

const styles = StyleSheet.create({
  speaker: {
    width: 40,
    height: 40
  }
});