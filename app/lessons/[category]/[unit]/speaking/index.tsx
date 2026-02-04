import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import STYLES from '@/constants/styles';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import SpeakerComponent from '@/components/SpeakerComponent';
import { SessionType, SpeakingSessionType } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import RecorderActionButton from '@/components/recoder-components/RecorderActionButton';
import useSpeechRecorder from '@/hooks/useSpeechRecorder';
import { RecorderReload } from '@/utils/SVGImages';
import SpeechResultModal from '@/components/modals/SpeechAnalyzedResultModal.tsx';
import { useLessons } from '@/hooks/useLessons';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';


const SpeakingLessons = () => {
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const [ showCompletionModal, setShowCompletionModal ] = React.useState<boolean>(false);
  const { categoryId, slug, unitId } = useLocalSearchParams();

  const { data: readingLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  // const { mutate: updateProgress } = useUpdateProgress();

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

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<SpeakingSessionType>
        preFetchedData={lessonData}
        onSessionComplete={() => setShowCompletionModal(true)}
        onActiveItemChange={({ item, goToNext }) => {
          setExpectedText(prevValue => prevValue = item.phrase.trim())
          goToNextRef.current = goToNext;
        }}
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
                      textContainerStyle={{width: '80%'}}
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
                      onActionHandler={isRecordingDone ? play : (isRecording ? stopRecording : startRecording)}
                    />

                    {error && <Text style={{ color: "red" }}>{error}</Text>}

                  </View>
                </View>
              </View>
      
              {/* Action Buttons */}
              <View style={styles.recordingSection}>
                <TouchableOpacity
                  onPress={reset}
                  disabled={!isRecordingDone || loading}
                  style={{opacity: (!isRecordingDone || loading) ? 0.5 : 1}}
                >
                  <RecorderReload />
                </TouchableOpacity>

                <ActionPrimaryButton
                  buttonTitle='Check'
                  onSubmit={() => {
                    setExpectedText(prevValue => prevValue = item.phrase.trim())
                    analyzeSpeech()
                  }}
                  isLoading={loading}
                  disabled={!isRecordingDone || loading}
                  buttonStyle={{width: "70%", borderRadius: 30, overflow: "hidden"}}
                />
              </View>
            </>
          )
        }}
      </SessionLayout>

      {result && (<SpeechResultModal
        isVisible={result ? true : false}
        result={result}
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
  }
})