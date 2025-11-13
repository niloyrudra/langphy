import React from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import SIZES from '@/constants/size';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { RecorderDarkInactiveIcon, RecorderLightActiveIcon } from '@/utils/SVGImages';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import { useLocalSearchParams } from 'expo-router';
import { UnitIndividualCategory } from '@/types';
// import { db, speechRecognitionPermission } from '@/utils';
import { db } from '@/utils';
import PaginationButton from '@/components/PaginationButton';


const SpeakingLessons = () => {
  const { theme, colors } = useTheme();
  const { rootCategory, unitLessonCategory, slug } = useLocalSearchParams();

  const [data, setData] = React.useState<UnitIndividualCategory[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isRecorderActive, setIsRecorderActive] = React.useState(true)


  const flatListRef = React.useRef<FlatList>(null);
  // const wordRefs = React.useRef<Map<string, any>>(new Map());
  const containerRef = React.useRef<View | null>(null);


  React.useEffect(() => {
    const loadData = async () => {
      const unitData = await db[rootCategory as keyof typeof db];
      if (Array.isArray(unitData)) {
        const unitSpecificData = unitData?.filter(item => item?.category === unitLessonCategory);
        setData(unitSpecificData[0]?.items || []);
      } else {
        console.warn(`No data found for slug: ${rootCategory}`);
        setData([]);
      }
    };
    if (rootCategory && unitLessonCategory && slug) loadData();
  }, [rootCategory, unitLessonCategory, slug]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
      (SIZES.screenWidth - SIZES.bodyPaddingHorizontal * 2)
    );
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
      // setTooltip(prev => ({ ...prev, visible: false }));
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
      // setTooltip(prev => ({ ...prev, visible: false }));
    }
  };


  return (
    <SafeAreaLayout>

      {/* Content */}
      <View ref={containerRef} style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          renderItem={({ item }) => (
            <View
              style={{ width: SIZES.screenWidth - (SIZES.bodyPaddingHorizontal * 2), marginTop: 25 }}>

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

                  <ChallengeScreenQuerySection query={item?.phrase || ''} />

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

              {/* Action Buttons */}
              <ActionPrimaryButton
                buttonTitle='Check'
                onSubmit={() => console.log("Submitted")}
                disabled={true}
              />

            </View>
          )}
        />

        {/* Navigation Buttons */}
          <View style={[styles.navButtons, {borderTopColor: colors.orSeparatorColor}]}>
            <PaginationButton
              actionHandler={goToPrevious}
              isDisabled={currentIndex === 0}
              modeLeft={true}
            />
            <PaginationButton
              actionHandler={goToNext}
              isDisabled={currentIndex === data.length - 1}
            />
          </View>

      </View>

    </SafeAreaLayout>
  );
}

export default SpeakingLessons;

const styles = StyleSheet.create({
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.bodyPaddingHorizontal,
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1
  }
});