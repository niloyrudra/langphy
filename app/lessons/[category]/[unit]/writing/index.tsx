import React from 'react';
import { Alert, View } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { SessionResultType, WritingSessionType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import SessionResultModal from '@/components/modals/SessionResultModal';

const WritingSession = () => {
  const { colors } = useTheme();
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const goToNextRef = React.useRef<(() => void) | null>(null);

  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ actualDEQuery, setActualDEQuery ] = React.useState<string>('')
  const [ result, setResult ] = React.useState<SessionResultType | null>(null)
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)
  const [data, setData] = React.useState<WritingSessionType[]>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const analyzeWritingHandler = React.useCallback(async (expectedText: string) => {
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
      setActualDEQuery(expectedText);
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
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/writing/${categoryId}/${unitId}`);
        if (!res.ok) {
          console.error("Error fetching writing data:", res.status);
          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        // const data: T[] = await res.json();
        const data: (WritingSessionType)[] = await res.json();
        setData(data)

      } catch (err) {
        console.error("Error fetching writing data:", err);
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
      <SessionLayout<WritingSessionType>
        sessionType="writing"
        keyboardAvoid={true}
        preFetchedData={data}
        onPositionChange={setActiveIndex}
        onActiveItemChange={({ item, goToNext }) => {
          goToNextRef.current = goToNext;
          reset(); // optional: reset recorder per item
        }}
      >
        {({ item }) => {
          
          const onCheckHandler = () => {
            analyzeWritingHandler(item?.phrase);
          };
          
          return (
            <View style={{flex: 1}}>
              {/* Content */}

              <View style={{flex: 1}}>
                {/* Title Section */}
                <ChallengeScreenTitle title="Listen And Write." />

                {/* Writing Section Starts */}
                <ChallengeScreenQuerySection
                  query={item.meaning}
                  lang="en-US"
                  style={{ width: '80%'}}
                />

                <View style={{flex:1}}/>

              </View>

              {/* Writing Text Field/Input/Area Section */}
              <TextInputComponent
                multiline={true}
                numberOfLines={2}
                maxLength={500}
                // enterKeyHint="done"
                placeholder='Write here...'
                value={textContent}
                onChange={(text) => setTextContent(text)}
                onBlur={() => {}}
                placeholderTextColor={colors.placeholderColor}
                inputMode="text"
                contentContainerStyle={{
                  marginBottom: 20
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
        actualQuery={actualDEQuery}
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

export default WritingSession;