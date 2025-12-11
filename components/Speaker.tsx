import React, { useMemo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { speechHandler, speechSlowHandler } from '@/utils';
import { SpeakerDark, SpeakerLight, SpeakerTurtleDark, SpeakerTurtleLight } from '@/utils/SVGImages';

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

  const handlePress = async () => {
    const handler = isSlowing ? speechSlowHandler : speechHandler;
    handler(speechContent, speechLang, setLoading);
  };

  const icon = useMemo(() => {
    // const isEnglish = speechLang === 'en-US';
    const isDark = theme === 'dark';

    if( !isSlowing ) {
        return isDark ? <SpeakerDark /> : <SpeakerLight />
    }
    return isDark ? <SpeakerTurtleDark /> : <SpeakerTurtleLight />

    // if (!isSlowing) {
    //   if (isDark) return isEnglish ? <SpeakerDarkIcon /> : <SpeakerAltDarkIcon />;
    //   return isEnglish ? <SpeakerIcon /> : <SpeakerAltIcon />;
    // }

    // Slowed icons
    // const iconProps = { width: 33, height: 33 };
    // if (isDark)
    //   return isEnglish ? (
    //     <SpeakerTurtleDarkEnIcon {...iconProps} />
    //   ) : (
    //     <SpeakerTurtleDarkDeIcon {...iconProps} />
    //   );

    // return isEnglish ? (
    //   <SpeakerTurtleLightEnIcon {...iconProps} />
    // ) : (
    //   <SpeakerTurtleLightDeIcon {...iconProps} />
    // );
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