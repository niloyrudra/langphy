import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import STYLES from '@/constants/styles';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import SpeakerComponent from '@/components/SpeakerComponent';
import { SpeakingSessionType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import RecorderActionButton from '@/components/recoder-components/RecorderActionButton';
import useSpeechRecorder from '@/hooks/useSpeechRecorder';
import { RecorderReload } from '@/utils/SVGImages';
import SpeechResultModal from '@/components/modals/SpeechAnalyzedResultModal.tsx';
import api from '@/lib/api';


const SpeakingLessons = () => {
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const [data, setData] = React.useState<SpeakingSessionType[]>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

  const {categoryId, slug, unitId} = useLocalSearchParams();

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

  React.useEffect(() => {
    const dataLoad = async () => {
      setIsLoading(true)
      try {
        const res = await api.get(`/speaking/${categoryId}/${unitId}`);
        if( res.status !== 200 ) return setData([])

        const data: (SpeakingSessionType)[] = res.data;
        if( data ) setData(data)

      } catch (err) {
        console.error("Error fetching practice data:", err);
        setData([])
      }
      setIsLoading(false)
    }

    if (categoryId && unitId && slug) dataLoad();
  }, [categoryId, unitId, slug]);

  if( isLoading ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<SpeakingSessionType>
        preFetchedData={data}
        onPositionChange={setActiveIndex}
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
              <View style={{flex: 1}}>
      
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

                  <View style={{flex:1}} />
      
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
    </>
  );
}

export default SpeakingLessons;

const styles = StyleSheet.create({
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