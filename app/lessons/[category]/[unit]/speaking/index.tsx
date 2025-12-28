import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import SIZES from '@/constants/size';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { RecorderDarkInactiveIcon, RecorderLightActiveIcon } from '@/utils/SVGImages';
// import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';

import SessionLayout from '@/components/layouts/SessionLayout';
import ToolTipPerWordComponent from '@/components/ToolTipPerWordComponent';
import SpeakerComponent from '@/components/SpeakerComponent';
import { SpeakingSessionType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import SoundRecorder from '@/components/recoder-components/SoundRecorder';


const SpeakingLessons = () => {
  const { theme, colors } = useTheme();
  const [isRecorderActive, setIsRecorderActive] = React.useState(true)

  const [data, setData] = React.useState<SpeakingSessionType[]>([]);
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const {categoryId, slug, unitId} = useLocalSearchParams();

  React.useEffect(() => {
    const dataLoad = async () => {
      setLoading(true)
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
      setLoading(false)
    }

    if (categoryId && unitId && slug) dataLoad();
  }, [categoryId, unitId, slug]);

  if( loading ) return (<LoadingScreenComponent />)

  return (
    <SessionLayout<SpeakingSessionType>
      preFetchedData={data}
      sessionType={typeof slug == 'string' ? slug : ""}
      categoryId={ typeof categoryId == 'string' ? categoryId : "" }
      unitId={ typeof unitId == 'string' ? unitId : "" }
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
              <View
                style={{
                  flex:1,
                  marginBottom: 80
                }}
              >
    
                {/* <ChallengeScreenQuerySection query={item?.phrase || ''} /> */}


                <View
                  style={[
                    styles.container
                  ]}
                >
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
                  />
                  {/* <ToolTipPerWordComponent
                    onHandler={handleTooltip}
                    item={item}
                    containerRef={containerRef}
                    wordRefs={wordRefs}
                  /> */}
                </View>



    
                <View style={{flex:1}} />
    
                {/* Writing Text Field/Input/Area Section */}
                <View style={STYLES.childContentCentered}>
    
                    <TouchableOpacity
                      onPress={() => {
                        setIsRecorderActive( prevVal => prevVal = !prevVal )
                        // speechRecognitionPermission()
                      }}
                      style={!isRecorderActive && {opacity: 0.4}}
                    >
                      {
                        theme === 'light'
                          ?
                            (
                              isRecorderActive
                                ? (<RecorderLightActiveIcon width={SIZES.speakerNRecorderDimensions} height={SIZES.speakerNRecorderDimensions} />)
                                : (<RecorderLightActiveIcon width={SIZES.speakerNRecorderDimensions} height={SIZES.speakerNRecorderDimensions} />)
                            )
                          :
                            (
                              isRecorderActive
                                ? (<RecorderLightActiveIcon width={SIZES.speakerNRecorderDimensions} height={SIZES.speakerNRecorderDimensions} />)
                                : (<RecorderDarkInactiveIcon width={SIZES.speakerNRecorderDimensions} height={SIZES.speakerNRecorderDimensions} />)
                            )
                      }
                    </TouchableOpacity>
    
                </View>
                
              </View>
            
            </View>
    
            <SoundRecorder />

            {/* Action Buttons */}
            <ActionPrimaryButton
              buttonTitle='Check'
              onSubmit={() => console.log("Submitted")}
              disabled={true}
            />
          </>
        )
      }}
    </SessionLayout>
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