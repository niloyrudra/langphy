import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { speechHandler, speechSlowHandler } from '@/utils';
// import {
//   SpeakerAltDarkIcon,
//   SpeakerAltIcon,
//   SpeakerDarkIcon,
//   SpeakerIcon,
//   SpeakerTurtleDarkDeIcon,
//   SpeakerTurtleDarkEnIcon,
//   SpeakerTurtleLightDeIcon,
//   SpeakerTurtleLightEnIcon,
// } from '@/utils/SVGImages';
import AnimatedSpeaker from './AnimatedSpeaker';
import LottieView from 'lottie-react-native';

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
  const { colors } = useTheme();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const speakerRef = React.useRef<LottieView>(null);

  const handlePress = async () => {
    speakerRef.current?.play();
    const handler = isSlowing ? speechSlowHandler : speechHandler;
    handler(speechContent, speechLang, setLoading);
  };

  // const icon = useMemo(() => {
  //   const isEnglish = speechLang === 'en-US';
  //   const isDark = theme === 'dark';

  //   if (!isSlowing) {
  //     if (isDark) return isEnglish ? <SpeakerDarkIcon /> : <SpeakerAltDarkIcon />;
  //     return isEnglish ? <SpeakerIcon /> : <SpeakerAltIcon />;
  //   }

  //   // Slowed icons
  //   const iconProps = { width: 33, height: 33 };
  //   if (isDark)
  //     return isEnglish ? (
  //       <SpeakerTurtleDarkEnIcon {...iconProps} />
  //     ) : (
  //       <SpeakerTurtleDarkDeIcon {...iconProps} />
  //     );

  //   return isEnglish ? (
  //     <SpeakerTurtleLightEnIcon {...iconProps} />
  //   ) : (
  //     <SpeakerTurtleLightDeIcon {...iconProps} />
  //   );
  // }, [isSlowing, speechLang, theme]);

  return (
    <TouchableOpacity disabled={isLoading} onPress={handlePress}>
      {isLoading ? (
        <ActivityIndicator size={33} color={colors.primary} />
      ) : (<AnimatedSpeaker speakerRef={speakerRef} lang={speechLang} />)}
    </TouchableOpacity>
  );
};

export default React.memo(SpeakerComponent);