import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { ContentType, SessionResultType, WritingSessionType } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import SessionResultModal from '@/components/modals/SessionResultModal';
import api from '@/lib/api';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import { useLessons } from '@/hooks/useLessons';
import { useUpdateProgress } from '@/hooks/useUpdateProgess';

const WritingSession = () => {
  const { colors } = useTheme();
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const [ showCompletionModal, setShowCompletionModal ] = React.useState<boolean>(false);
  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ actualDEQuery, setActualDEQuery ] = React.useState<string>('')
  const [ result, setResult ] = React.useState<SessionResultType | null>(null)
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)

  const goToNextRef = React.useRef<(() => void) | null>(null);

  const { data: readingLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as ContentType );
  const { mutate: updateProgress } = useUpdateProgress();

  const lessonData = React.useMemo<WritingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);


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

  // React.useEffect(() => {
  //   let isMounted = true;

  //   const dataLoad = async () => {
  //     if (!isMounted) return;
  //     setIsLoading(true);

  //     try {
  //       const res = await api.get(`/writing/${categoryId}/${unitId}`);
  //       setData(res.status === 200 ? res.data : []);
  //       if (isMounted) {
  //         setData(res.status === 200 ? res.data : []);
  //       }
  //     } catch {
  //       if (isMounted) setData([]);
  //     } finally {
  //       if (isMounted) setIsLoading(false);
  //     }
  //   };

  //   if (categoryId && unitId && slug) dataLoad();
  //   return () => { isMounted = false };
  // }, [categoryId, unitId, slug]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<WritingSessionType>
        sessionType="writing"
        keyboardAvoid={true}
        preFetchedData={lessonData}
        // onPositionChange={setActiveIndex}
        onSessionComplete={() => setShowCompletionModal(true)}
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
            <View style={styles.flex}>
              {/* Content */}

              <View style={styles.flex}>
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

      {
        showCompletionModal && (
          <UnitCompletionModal
            isVisible={showCompletionModal}
            stats={{
              time:"00:00",
              total: lessonData.length,
              correct: lessonData.length,
              accuracy: 100
            }}
            onContinue={() => {
              reset();
              setShowCompletionModal(false);
              router.back();
              // navigation back to units page
            }}
            onModalVisible={() => setShowCompletionModal(false)}
          />
        )
      }
    </>
  );
}

export default WritingSession;

const styles = StyleSheet.create({
  flex: {flex: 1}
});