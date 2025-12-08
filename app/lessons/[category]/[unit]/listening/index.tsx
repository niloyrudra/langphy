import React from 'react'
import { Alert, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenSpeakerActionSection from '@/components/challenges/ChallengeScreenSpeakerActionSection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { generateWavePattern, speechHandler } from '@/utils';
import { ListeningSessionItem } from '@/types';
// import SpeechWave from '@/components/animated-components/SpeechWave';
// import SpeechWaveDots from '@/components/animated-components/SpeechWaveDots';
import TalkingAvatar from '@/components/animated-components/TalkingAvatar';

const ListeningLessons = () => {
  const { colors } = useTheme();
  const [ textContent, setTextContent ] = React.useState<string>('');
  const [ pattern, setPattern ] = React.useState<number[]>([]);
  const [ isSpeaking, setIsSpeaking ] = React.useState<boolean>(false);
  
  return (
    <SessionLayout<ListeningSessionItem> sessionType="writing" keyboardAvoid={true}>
      {({ item, goToNext }) => {

        const onSpeak = (text: string) => {
          const pattern = generateWavePattern(text);
          setPattern(pattern);
          // start animation immediately for snappy UX
          setIsSpeaking(true);

          speechHandler(text, 'de-DE', (speaking) => {
            if (speaking) {
              setPattern(generateWavePattern(text));
              requestAnimationFrame(() => setIsSpeaking(true));
            } else {
              setIsSpeaking(false);
            }
          });

        };

        // const onSpeak = (text: string) => {
        //   // 1) compute pattern synchronously (fast)
        //   const pattern = generateWavePattern(text);

        //   // 2) call speech and use onStart to set pattern -> then start animation a frame later
        //   speechHandler(text, 'de-DE', (isSpeaking) => {
        //     if (isSpeaking) {
        //       // Ensure React has time to mount the pattern before starting animation:
        //       setPattern(pattern); // put pattern into state

        //       // Start animation next frame so animated component reads pattern
        //       // option A: requestAnimationFrame
        //       requestAnimationFrame(() => {
        //         setIsSpeaking(true);
        //       });

        //       // option B alternative: setTimeout(() => setIsSpeaking(true), 16);
        //       // option C alternative: InteractionManager.runAfterInteractions(() => setIsSpeaking(true));
        //     } else {
        //       // stop immediately
        //       setIsSpeaking(false);
        //       // optionally clear pattern (or keep it for UI)
        //       // setPattern([]);
        //     }
        //   });
        // };

        const onCheckHandler = () => {
          if(  textContent?.toLocaleLowerCase() === item?.phrase?.toLocaleLowerCase() ) {
            Alert.alert(
              "Congratulations!",
              "Correct Answer",
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    setTextContent("");
                  },
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    setTextContent("");
                    goToNext?.();
                  }
                },
              ]
            )
          } else {
            Alert.alert(
              "Unfortunately!",
              `Wrong Answer! The correct answer is: ${item?.phrase}`,
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    setTextContent("");
                  },
                  style: 'cancel',
                },
                {
                  text: 'Try Again!',
                  onPress: () => {
                    setTextContent("");
                  }
                },
              ]
            )
          }
        };

        return (
          <View style={{flex: 1}}>
          {/* Content */}

            <View style={{flex: 1}}>
              {/* Title Section */}
              <ChallengeScreenTitle title="Listen And Write." />

              {/* Writing Section Starts */}
              <ChallengeScreenSpeakerActionSection onTap={() => onSpeak( item.phrase ) } />

              {/* <SpeechWave pattern={pattern} isSpeaking={isSpeaking} size={30} color="#00c4ff" /> */}
              {/* <SpeechWaveDots pattern={pattern} isSpeaking={isSpeaking} size={16} color="#00c4ff" gap={6} /> */}
              <TalkingAvatar isSpeaking={isSpeaking} pattern={pattern} />
            </View>

            {/* Writing Text Field/Input/Area Section */}
            <TextInputComponent
              multiline={true}
              numberOfLines={3}
              maxLength={500}
              placeholder='Write here...'
              value={textContent}
              onChange={(text) => setTextContent(text)}
              placeholderTextColor={colors.placeholderColor}
              inputMode="text"
              contentContainerStyle={{
                marginBottom: 40
              }}
            />

            {/* Action Buttons */}
            <ActionPrimaryButton
              buttonTitle='Check'
              onSubmit={onCheckHandler}
              disabled={textContent.length === 0}
            />

          </View>
        );
      }}
    </SessionLayout>
  );
}

export default ListeningLessons;