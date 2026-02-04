import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import { SessionType, ListeningSessionType, SessionResultType } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import SessionResultModal from '@/components/modals/SessionResultModal';
import TaskAllocation from '@/components/listening-components/TaskAllocation';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import { useListening } from '@/context/ListeningContext';
import api from '@/lib/api';
import { useLessons } from '@/hooks/useLessons';
import { useUpdateProgress } from '@/hooks/useUpdateProgess';

const ListeningLessons = () => {
  const { colors } = useTheme();
  const { resultHandler } = useListening();
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const [ showCompletionModal, setShowCompletionModal ] = React.useState<boolean>(false);
  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ actualDEQuery, setActualDEQuery ] = React.useState<string>('')
  const [ result, setResult ] = React.useState<SessionResultType | null>(null)
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)
  // const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const { data: listeningLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );

  const lessonData = React.useMemo<ListeningSessionType[]>(() => {
    if( !listeningLessons ) return [];
    return listeningLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [listeningLessons]);


  
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
      setActualDEQuery(expectedText);
      const res = await api.post( `/nlp/analyze/answer`, {
        expected: expectedText,
        user_answer: textContent
      });
      if( res.status !== 200 ) return setResult(null);

      const {data} = res;
      if( data ) setResult(data);

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

  const lessonCompletionHandler = React.useCallback( async () => {
    await resultHandler(result!);
    reset();
    goToNextRef?.current && goToNextRef.current?.();
  }, [reset, goToNextRef, result]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<ListeningSessionType>
        sessionType="listening"
        keyboardAvoid={true}
        preFetchedData={lessonData}
        // onPositionChange={setActiveIndex}
        onSessionComplete={() => setShowCompletionModal(true)}
        onActiveItemChange={({ item, goToNext }) => {
          goToNextRef.current = goToNext;
        }}
      >
        {({ item }) => {

          const onCheckHandler = () => analyzeListeningHandler( item.phrase );

          return (
            <View style={styles.flex}>
              {/* Content */}

              <TaskAllocation
                taskTitle={'Listen and Write afterwards.'}
                taskPhrase={item.phrase}
                rippleSize={150}
              />

              {/* Writing Text Field/Input/Area Section */}
              <TextInputComponent
                // multiline={true}
                // numberOfLines={2}
                maxLength={500}
                placeholder='Write here...'
                value={textContent}
                onChange={setTextContent}
                placeholderTextColor={colors.placeholderColor}
                inputMode="text"
                onBlur={() => {}}
                contentContainerStyle={styles.textInput}
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
        onContinue={lessonCompletionHandler}
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

export default ListeningLessons;

const styles = StyleSheet.create({
  flex: {flex: 1},
  textInput: {
    marginBottom: 20
  }
});