import React from 'react';
import { ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { speechHandler } from '@/utils';
import AnimatedSpeaker from './AnimatedSpeaker';
import LottieView from 'lottie-react-native';

interface SpeakerComponentProps {
  speechContent: string;
  speechLang: 'en-US' | 'de-DE' | string;
  isSlowing?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SpeakerComponent: React.FC<SpeakerComponentProps> = ({
  speechContent,
  speechLang,
  isSlowing = false,
  style
}) => {
  const { colors } = useTheme();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const speakerRef = React.useRef<LottieView>(null);

  const handlePress = React.useCallback(async () => {
    speakerRef.current?.play();
    speechHandler(speechContent, speechLang, setLoading);
  }, [speechHandler, speechContent, speechLang, setLoading]);

  return (
    <TouchableOpacity disabled={isLoading} onPress={handlePress} style={[(style && style)]}>
      {isLoading
        ? (<ActivityIndicator size={33} color={colors.primary} />)
        : (<AnimatedSpeaker speakerRef={speakerRef} lang={speechLang} />)
      }
    </TouchableOpacity>
  );
};

export default React.memo(SpeakerComponent);