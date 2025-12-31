import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';
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
// import AnalyzedResult from '@/components/recoder-components/AnalyzedResult';
import { RecorderReload } from '@/utils/SVGImages';
import SpeechResultModal from '@/components/modals/SpeechAnalyzedResultModal.tsx';


const SpeakingLessons = () => {
  const { colors } = useTheme();
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const [data, setData] = React.useState<SpeakingSessionType[]>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

  // const captureGoToNext = React.useCallback((fn?: () => void) => {
  //   goToNextRef.current = fn ?? null;
  // }, []);

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
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/speaking/${categoryId}/${unitId}`);
        if (!res.ok) {
          console.error("Error fetching practice data:", res.status);
          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        // const data: T[] = await res.json();
        const data: (SpeakingSessionType)[] = await res.json();
        setData(data)

      } catch (err) {
        console.error("Error fetching practice data:", err);
        setData([])
        // throw err;
      }
      setIsLoading(false)
    }

    if (categoryId && unitId && slug) dataLoad();
  }, [categoryId, unitId, slug]);

  React.useEffect(() => {reset()}, [activeIndex]);

  if( isLoading ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<SpeakingSessionType>
        preFetchedData={data}
        sessionType={typeof slug == 'string' ? slug : ""}
        categoryId={ typeof categoryId == 'string' ? categoryId : "" }
        unitId={ typeof unitId == 'string' ? unitId : "" }
        onPositionChange={setActiveIndex}
        onActiveItemChange={({ item, goToNext }) => {
          setExpectedText(item.phrase);
          goToNextRef.current = goToNext;
          reset(); // optional: reset recorder per item
        }}
      >
        {({ item, wordRefs, screenRef, containerRef, setTooltip }) => {
          setExpectedText(item.phrase);
          const handleTooltip = (value: any) => {
            setTooltip(value);
          };
          return (
            <>
              <View style={{flex: 1}}>
      
                {/* Title Section */}
                <ChallengeScreenTitle title="Speak This Sentence" />
      
                {/* Writing Section Starts */}
                <View
                  style={{
                    flex:1,
                    marginBottom: 80
                  }}
                >
      
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
      
              {/* {result && (<AnalyzedResult result={result} />)} */}

              {/* Action Buttons */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10
                }}
              >
                <TouchableOpacity
                  onPress={reset}
                  disabled={!isRecordingDone || loading}
                  style={{opacity: (!isRecordingDone || loading) ? 0.5 : 1}}
                >
                  <RecorderReload />
                </TouchableOpacity>

                <ActionPrimaryButton
                  buttonTitle='Check'
                  onSubmit={analyzeSpeech}
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
  query: {
    fontSize: 24,
    fontWeight: "700"
  }
})