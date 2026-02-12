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
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { randomUUID } from 'expo-crypto';

const attemptId = randomUUID();

const ListeningLessons = () => {
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const userId: string = authSnapshot.getUserId() ?? "";
  const { colors } = useTheme();
  const {start, stop, isRunning} = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;

  const { data: listeningLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const { resultHandler } = useListening();
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const activeLessonOrderRef = React.useRef<number>(0);
  const currentLessonRef = React.useRef<ListeningSessionType | null>(null);

  const [ showCompletionModal, setShowCompletionModal ] = React.useState<boolean>(false);
  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ actualDEQuery, setActualDEQuery ] = React.useState<string>('')
  const [ result, setResult ] = React.useState<SessionResultType | null>(null)
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)
  // const [activeIndex, setActiveIndex] = React.useState<number>(0);


  const lessonData = React.useMemo<ListeningSessionType[]>(() => {
    if( !listeningLessons ) return [];
    return listeningLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [listeningLessons]);

  // Handlers
  const onLessonComplete = React.useCallback(async (lesson: ListeningSessionType, score: number) => {
    if(!userId) return;
    try {
      const duration_ms = stop();
      const sessionType = slug as SessionType;
      const sessionKey = `${unitId}:${sessionType}`;
      const lessonOrder = activeLessonOrderRef.current;
      const isFinalLesson = lessonOrder === lessonData.length - 1;
  
      await lessonCompletionChain({
        userId,
        sessionKey,
        performanceSessionKey,
        lessonId: lesson?.id ?? lesson?._id,
        lessonOrder: lessonOrder,
        sessionType,
        lessonType: sessionType,
        score: score,
        duration_ms,
        isFinalLesson
      });
    }
    catch(error) {
      console.error("onLessonComplete error:", error)
    }
  }, [userId, slug, lessonData?.length, stop]);
  
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
    try {
      const score = result!.similarity ? result!.similarity*100 : 0;
      await onLessonComplete(currentLessonRef.current!, score);
      resultHandler(result!);
      reset();
      goToNextRef?.current && goToNextRef.current?.();
    }
    catch(error) {
      console.error("lessonCompletionHandler error:", error)
    }
  }, [reset, result, onLessonComplete]);

  const onContinueHandler = React.useCallback(() => {
    reset();
    setShowCompletionModal(false);
    // navigation back to units page
    router.back();
  }, [reset, setShowCompletionModal, router]);

  const modalVisibilityHandler = React.useCallback(() => setShowCompletionModal(true), [setShowCompletionModal]);
  const modalCloseHandler = React.useCallback(() => setShowCompletionModal(false), [setShowCompletionModal]);

  const activeItemChangeHandler = React.useCallback(({ item, index, goToNext }: {item: ListeningSessionType, index: number, goToNext: () => void}) => {
    activeLessonOrderRef.current = index;
    currentLessonRef.current = item;
    goToNextRef.current = goToNext;
    // reset();
  }, []);

  // Timer
  React.useEffect(() => {
    if(!isRunning) start();
  }, [isRunning]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<ListeningSessionType>
        keyboardAvoid={true}
        preFetchedData={lessonData}
        onSessionComplete={modalVisibilityHandler}
        onActiveItemChange={activeItemChangeHandler}
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
            sessionKey={performanceSessionKey}
            onContinue={onContinueHandler}
            onModalVisible={modalCloseHandler}
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