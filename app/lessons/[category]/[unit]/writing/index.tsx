import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { SessionType, SessionResultType, WritingSessionType } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import SessionResultModal from '@/components/modals/SessionResultModal';
import api from '@/lib/api';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import { useLessons } from '@/hooks/useLessons';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';

const attemptId = randomUUID();

const WritingSession = () => {
  const { colors } = useTheme();
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const {start, stop, isRunning} = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;

  const goToNextRef = React.useRef<(() => void) | null>(null);
  const activeLessonOrderRef = React.useRef<number>(0);
  const currentLessonRef = React.useRef<WritingSessionType | null>(null);
  
  const [ showCompletionModal, setShowCompletionModal ] = React.useState<boolean>(false);
  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ actualDEQuery, setActualDEQuery ] = React.useState<string>('')
  const [ result, setResult ] = React.useState<SessionResultType | null>(null)
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)

  const { data: readingLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );

  const lessonData = React.useMemo<WritingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);

  // Handlers
  const onLessonComplete = React.useCallback(async (lesson: WritingSessionType, score: number) => {
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
        lessonId: lesson.id ?? lesson?._id,
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
        expected: expectedText.trim(),
        user_answer: textContent.trim()
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

  const onContinue = React.useCallback(async () => {
    const score = (result && result!.similarity) ? result!.similarity*100 : 0;
    await onLessonComplete(currentLessonRef.current!, score);
    reset();
    goToNextRef?.current && goToNextRef.current?.();
  }, [reset, result, onLessonComplete]);

  const onContinueHandler = React.useCallback(() => {
    reset();
    setShowCompletionModal(false);
    // navigation back to units page
    router.back();
  }, [reset, setShowCompletionModal, router]);
  
  const modalVisibilityHandler = React.useCallback(() => setShowCompletionModal(true), [setShowCompletionModal]);
  const modalCloseHandler = React.useCallback(() => setShowCompletionModal(false), [setShowCompletionModal]);

  const activeItemChangeHandler = React.useCallback(({ item, index, goToNext }: {item: WritingSessionType, index: number, goToNext: () => void}) => {
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
      <SessionLayout<WritingSessionType>
        sessionType="writing"
        keyboardAvoid={true}
        preFetchedData={lessonData}
        onSessionComplete={modalVisibilityHandler}
        onActiveItemChange={activeItemChangeHandler}
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
                  style={styles.query}
                />

                <View style={styles.flex}/>

              </View>

              {/* Writing Text Field/Input/Area Section */}
              <TextInputComponent
                // multiline={true}
                // numberOfLines={2}
                maxLength={500}
                placeholder='Write here...'
                value={textContent}
                onChange={setTextContent}
                onBlur={() => {}}
                placeholderTextColor={colors.placeholderColor}
                inputMode="text"
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
        onContinue={onContinue}
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

export default WritingSession;

const styles = StyleSheet.create({
  flex: {flex: 1},
  query: { width: '80%'},
  textInput: {
    marginBottom: 20
  }
});