import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import STYLES from '@/constants/styles';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import SpeakerComponent from '@/components/SpeakerComponent';
import { SessionType, SpeakingSessionType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import RecorderActionButton from '@/components/recoder-components/RecorderActionButton';
import useSpeechRecorder from '@/hooks/useSpeechRecorder';
import { RecorderReload } from '@/utils/SVGImages';
import { useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';

const attemptId = randomUUID();

const SpeakingLessons = () => {
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const {start, stop, isRunning} = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const { data: readingLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const activeLessonOrderRef = React.useRef<number>(0);
  const currentLessonRef = React.useRef<SpeakingSessionType | null>(null);

  const lessonData = React.useMemo<SpeakingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);

  const {
    isRecording,
    isPaused,
    isPlaying,
    setExpectedText,
    startRecording,
    stopRecording,
    play,
    pause,
    reset,
    analyzeSpeech,
    isRecordingDone,
    loading,
    result,
    error,
  } = useSpeechRecorder(null);

  // Handlers
  const onLessonComplete = React.useCallback(async (lesson: SpeakingSessionType, score: number) => {
    if(!userId) return;
    try {
      const duration_ms = stop();
      const sessionType = slug as SessionType;
      const sessionKey = `${unitId}:${sessionType}`;
      const lessonOrder = activeLessonOrderRef.current;
      const isFinalLesson = lessonOrder === lessonData.length - 1;
  
      const result = await lessonCompletionChain({
        categoryId: categoryId as string,
        unitId: unitId as string,
        userId,
        sessionKey,
        performanceSessionKey,
        lessonId: lesson.id ?? lesson?._id,
        lessonOrder: lessonOrder,
        sessionType,
        lessonType: sessionType,
        score,
        duration_ms,
        isFinalLesson
      });
      if( result?.sessionCompleted ) triggerSessionCompletion( performanceSessionKey );
      if( result?.streakUpdated && result?.streakPayload ) triggerStreak( result.streakPayload );
    }
    catch(error) {
      console.error("onLessonComplete error:", error)
    }
  }, [userId, slug, lessonData?.length, stop]);

  const onContinue = React.useCallback( async () => {
    try {
      const score = (result && result!.analysis.similarity) ? result!.analysis.similarity*100 : 0;
      await onLessonComplete(currentLessonRef.current!, score);
      reset();
      goToNextRef?.current && goToNextRef.current?.();

      resolveCurrent();
    }
    catch(error) {
      console.error("Speaking lesson Completion error:", error);
    }
  }, [ reset, result, onLessonComplete, resolveCurrent ]);
    
  const activeItemChangeHandler = React.useCallback(({ item, index, goToNext }: {item: SpeakingSessionType, index: number, goToNext: () => void}) => {
    setExpectedText(prevValue => prevValue = item.phrase.trim())
    activeLessonOrderRef.current = index;
    currentLessonRef.current = item;
    goToNextRef.current = goToNext;
  }, [setExpectedText]);

  // Timer
  React.useEffect(() => {
    if(!isRunning) start();
  }, [isRunning]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <SessionLayout<SpeakingSessionType>
      preFetchedData={lessonData}
      onActiveItemChange={activeItemChangeHandler}
    >
      {({ item, wordRefs, screenRef, containerRef, setTooltip }) => {
        const handleTooltip = (value: any) => {
          setTooltip(value);
        };
        return (
          <>
            <View style={styles.flex}>
    
              {/* Title Section */}
              <ChallengeScreenTitle title="Speak This Sentence" />
    
              {/* Writing Section Starts */}
              <View style={styles.taskContainer}>
    
                <View style={[styles.container]}>
                  {/* Query Listen with Query Text Section */}
                  <SpeakerComponent
                    speechContent={item?.phrase}
                    speechLang='de-DE'
                  />
                          
                  {/* Tappable Words with ToolTip */}
                  <NLPAnalyzedPhase
                    phrase={item.phrase}
                    onHandler={handleTooltip}
                    wordRefs={wordRefs}
                    containerRef={containerRef}
                    screenRef={screenRef}
                    textContainerStyle={styles.nlpWidth}
                  />
                </View>

                <View style={styles.flex} />
    
                {/* Writing Text Field/Input/Area Section */}
                <View style={STYLES.childContentCentered}>
    
                  <RecorderActionButton
                    isActive={!isRecording}
                    isRecorded={isRecordingDone}
                    isPaused={isPaused}
                    isPlaying={isPlaying}
                    onActionHandler={() => {
                      if (isRecordingDone) play();
                      else if (isRecording) stopRecording();
                      else startRecording();
                    }}
                  />

                  { error && (<Error text={error} />) }

                </View>
              </View>
            </View>
    
            {/* Action Buttons */}
            <View style={styles.recordingSection}>
              <TouchableOpacity
                onPress={() => {
                  reset();
                  resolveCurrent();
                }}
                disabled={!isRecordingDone || loading}
                style={{opacity: (!isRecordingDone || loading) ? 0.5 : 1}}
              >
                <RecorderReload />
              </TouchableOpacity>

              <ActionPrimaryButton
                buttonTitle='Check'
                onSubmit={() => {
                  setExpectedText((prevValue) => prevValue = item.phrase.trim());
                  analyzeSpeech(onContinue);
                }}
                isLoading={loading}
                disabled={!isRecordingDone || loading}
                buttonStyle={styles.button}
              />
            </View>
          </>
        )
      }}
    </SessionLayout>
  );
}

export default SpeakingLessons;

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    marginTop: 30,
    marginBottom: 20,
    position: 'relative',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    gap: 20
  },
  taskContainer: {
    flex:1,
    marginBottom: 80
  },
  query: {
    fontSize: 24,
    fontWeight: "700"
  },
  recordingSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  nlpWidth: {width: '80%'},
  button: {width: "70%", borderRadius: 30, overflow: "hidden"},
  error: {color: "red"}
})