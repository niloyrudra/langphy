import React from 'react';
import { View } from 'react-native';
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
import api from '@/lib/api';

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
  // const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const analyzeWritingHandler = React.useCallback(async (expectedText: string) => {
    if(!textContent.trim()) {
      setError("Please write your answer first!");
      return;
    }
    if (!expectedText) {
      setError("No expected text found!");
      return;
    }

    try {
      setLoading(true);
      setActualDEQuery(expectedText);
      const res = await api.post( `/nlp/analyze/answer`, {
        expected: expectedText,
        user_answer: textContent
      });
      if (res.status === 200 && res.data) {
        setResult(res.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Speech analysis failed");
    } finally {
      setLoading(false);
    }
  }, [textContent, api]);

  const reset = React.useCallback(() => {
    setTextContent("");
    setResult(null);
    setError("");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    const dataLoad = async () => {
      if (!isMounted) return;
      setIsLoading(true);

      try {
        const res = await api.get(`/writing/${categoryId}/${unitId}`);
        setData(res.status === 200 ? res.data : []);
        if (isMounted) {
          setData(res.status === 200 ? res.data : []);
        }
      } catch {
        if (isMounted) setData([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (categoryId && unitId && slug) dataLoad();
    return () => { isMounted = false };
  }, [categoryId, unitId, slug]);

  if( isLoading ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<WritingSessionType>
        sessionType="writing"
        keyboardAvoid={true}
        preFetchedData={data}
        // onPositionChange={setActiveIndex}
        onActiveItemChange={({ item, goToNext }) => {
          goToNextRef.current = goToNext;
          // reset();
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
                placeholder='Write here...'
                value={textContent}
                onChange={setTextContent}
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