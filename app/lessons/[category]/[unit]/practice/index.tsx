import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import sizes from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import HorizontalLine from '@/components/HorizontalLine';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import LessonComponent from '@/components/lesson-components/LessonComponent';
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';
import { SpeakerIcon, SpeakerAltIcon, SpeakerAltDarkIcon, SpeakerDarkIcon, PreviousBtnLight, PreviousBtnDark, NextBtnLight, NextBtnDark } from '@/utils/SVGImages';
import { useLocalSearchParams } from 'expo-router';
import { db } from '@/utils';
import { UnitIndividualCategory } from '@/types';

const PracticeLessons = () => {
  const { colors, theme } = useTheme();
  const {rootCategory, unitLessonCategory, slug} = useLocalSearchParams();
  const [data, setData] = React.useState<UnitIndividualCategory[]>([]);

  React.useEffect(() => {
    // You can perform any side effects or data fetching here based on the params
    // console.log("PracticeLessons Params Changed:", rootCategory, unitLessonCategory, slug);
    const loadData = async () => {
      // unitData is already an array of UnitIndividualCategory
      const unitData = await db[rootCategory as keyof typeof db];
      
      // TS may still complain if db[slug] could be undefined
      if (Array.isArray(unitData)) {
        // console.log("Unit Data:", unitData);
        const unitSpecificData = unitData.filter(item => item.category === unitLessonCategory);
        // console.log("Filtered PracticeLessons Data:", unitSpecificData[0]?.items);
        if(unitSpecificData[0]?.items?.length > 0) setData(unitSpecificData[0]?.items);
        // setData(unitData);
      } else {
        console.warn(`No data found for slug: ${rootCategory}`);
        setData([]); // fallback
      }
    };
    if( rootCategory && unitLessonCategory && slug ) loadData();
  }, [rootCategory, unitLessonCategory, slug]);

  // console.log("PracticeLessons Data:", data);

  return (
    <SafeAreaLayout>
      
        {/* Content */}
        <View style={{flex: 1}}>

          {/* Lesson Content */}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            ListHeaderComponent={(<View style={{height:0}}/>)}
            renderItem={({item}) => (
              <View style={{width: sizes.screenWidth - (sizes.bodyPaddingHorizontal * 2), marginRight: sizes.bodyPaddingHorizontal, marginTop: 25 }} >
                <View style={{flex:1}}>
                  {/* Source Language Section */}
                  <LessonComponent
                    language="English"
                    iconComponent={theme === 'dark' ? <SpeakerDarkIcon /> : <SpeakerIcon/>}
                    style={{borderColor:"#08C1D2"}}
                    buttonStyle={{backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor}}
                  >
                    <Text style={[styles.text, {color: colors.textDark}]}>{item?.meaning}</Text>
                  </LessonComponent>

                  <HorizontalLine style={{marginTop: 30, marginBottom: 50}} />
                
                  {/* Acting Language Section */}
                  <LessonComponent
                    language="German"
                    iconComponent={theme === 'dark' ? <SpeakerAltDarkIcon /> : <SpeakerAltIcon />}
                    style={{borderColor:"#1B7CF5"}}
                    buttonStyle={{backgroundColor: colors.lessonActionCardSpeakerBackgroundColor}}
                  >
                    <Text style={[styles.mainText, {color: colors.textDark}]}>{item?.phrase}</Text>
                    <Text style={[styles.subText, {color: colors.textSubColor}]}>{'('}{item?.usage_context}{')'}</Text>
                  </LessonComponent>

                </View>

                

              </View>
            )}
            ListFooterComponent={(<View style={{height:30}} />)}
          />

          {/* End of Content */}
          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <TouchableOpacity>
              {
                theme === 'light'
                ? (<PreviousBtnLight width={167} height={sizes.buttonHeight} />)
                : (<PreviousBtnDark width={167} height={sizes.buttonHeight} />)
              }
            </TouchableOpacity>

            <TouchableOpacity>
              {
                theme === 'light'
                ? (<NextBtnLight width={167} height={sizes.buttonHeight} />)
                : (<NextBtnDark width={167} height={sizes.buttonHeight} />)
              }
            </TouchableOpacity>

          </View>
          {/* End of Action Buttons */}

        </View>
          
        {/* Dictionary Floating Button */}
        <FloatingDictionaryIcon />

    </SafeAreaLayout>
  );
}

export default PracticeLessons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: sizes.bodyPaddingVertical + 10
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
  }
})