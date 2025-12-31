import React from 'react'
import { Alert, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenSpeakerActionSection from '@/components/challenges/ChallengeScreenSpeakerActionSection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { generateWavePattern, speechHandler } from '@/utils';
import { ListeningSessionType, SessionResultType } from '@/types';
// import SpeechWave from '@/components/animated-components/SpeechWave';
// import SpeechWaveDots from '@/components/animated-components/SpeechWaveDots';
// import TalkingAvatar from '@/components/animated-components/TalkingAvatar';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import SessionResultModal from '@/components/modals/SessionResultModal';
import SoundRipple from '@/components/animated-components/_helper-components/SoundRipple';
import TaskAllocation from '@/components/listening-components/TaskAllocation';

const ListeningLessons = () => {
  const { colors } = useTheme();
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const [ pattern, setPattern ] = React.useState<number[]>([]);
  const [ isSpeaking, setIsSpeaking ] = React.useState<boolean>(false);
  const goToNextRef = React.useRef<(() => void) | null>(null);

  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ result, setResult ] = React.useState<SessionResultType | null>(null)
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)
  const [data, setData] = React.useState<ListeningSessionType[]>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  
  const analyzeListeningHandler = React.useCallback(async (expectedText: string) => {
    if(!textContent) {
      setError("No expected text found!");
      return;
    }
    if (!expectedText) {
      setError("No expected text found!");
      return;
    }

    try {
      setLoading(true);
      console.log( "Action triggered..." )
      const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_BASE}/nlp/analyze/answer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              expected: expectedText,
              user_answer: textContent
            }),
          }
      );

      if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
      }
      console.log("No error during fetching....")
      const data = await res.json();

      setResult(data);

      console.log("data:", data)

    } catch (err: any) {
      console.error(err);
      setError("Speech analysis failed");
    } finally {
      setLoading(false);
    }
  }, [textContent]);

  const reset = React.useCallback(() => {
    setTextContent("");
    setResult(null);
    setError("");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const dataLoad = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/listening/${categoryId}/${unitId}`);
        if (!res.ok) {
          console.error("Error fetching listening data:", res.status);
          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        // const data: T[] = await res.json();
        const data: (ListeningSessionType)[] = await res.json();
        setData(data)

      } catch (err) {
        console.error("Error fetching listening data:", err);
        setData([])
        // throw err;
      }
      setIsLoading(false)
    }

    if (categoryId && unitId && slug) dataLoad();
  }, [categoryId, unitId, slug]);

  if( isLoading ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<ListeningSessionType>
          sessionType="listening"
          keyboardAvoid={true}
          preFetchedData={data}
          onPositionChange={setActiveIndex}
          onActiveItemChange={({ item, goToNext }) => {
            goToNextRef.current = goToNext;
            reset(); // optional: reset recorder per item
          }}
        >
        {({ item }) => {

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

          const onCheckHandler = () => {
            analyzeListeningHandler( item.phrase );
            // if(  textContent?.toLocaleLowerCase() === item?.phrase?.toLocaleLowerCase() ) {
            //   Alert.alert(
            //     "Congratulations!",
            //     "Correct Answer",
            //     [
            //       {
            //         text: 'Cancel',
            //         onPress: () => {
            //           setTextContent("");
            //         },
            //         style: 'cancel',
            //       },
            //       {
            //         text: 'OK',
            //         onPress: () => {
            //           setTextContent("");
            //           goToNext?.();
            //         }
            //       },
            //     ]
            //   )
            // } else {
            //   Alert.alert(
            //     "Unfortunately!",
            //     `Wrong Answer! The correct answer is: ${item?.phrase}`,
            //     [
            //       {
            //         text: 'Cancel',
            //         onPress: () => {
            //           setTextContent("");
            //         },
            //         style: 'cancel',
            //       },
            //       {
            //         text: 'Try Again!',
            //         onPress: () => {
            //           setTextContent("");
            //         }
            //       },
            //     ]
            //   )
            // }
          };

          return (
            <View style={{flex: 1}}>
            {/* Content */}

              <TaskAllocation
                taskTitle={'Listen and Write afterwards.'}
                taskPhrase={item.phrase}
                rippleSize={120}
              />

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
                onBlur={() => {}}
                contentContainerStyle={{
                  marginBottom: 40
                }}
              />

              {/* Action Buttons */}
              <ActionPrimaryButton
                buttonTitle='Check'
                onSubmit={onCheckHandler}
                isLoading={loading}
                disabled={textContent.length === 0}
              />

            </View>
          );
        }}
      </SessionLayout>

      {result && (<SessionResultModal
        isVisible={result ? true : false}
        result={result!}
        onContinue={() => {
          reset();
          goToNextRef?.current && goToNextRef.current?.();
        }}
        onModalVisible={reset}
        onRetry={reset}
      />)}
      
    </>
  );
}

export default ListeningLessons;