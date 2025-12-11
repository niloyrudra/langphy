import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
// import sizes from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import HorizontalLine from '@/components/HorizontalLine';
import LessonComponent from '@/components/lesson-components/LessonComponent';

import ToolTipPerWordComponent from '@/components/ToolTipPerWordComponent';
import SessionLayout from '@/components/layouts/SessionLayout';
import { useLocalSearchParams } from 'expo-router';
import { PracticeSessionType } from '@/types';
import ListeningComponent from '@/components/listening-components/ListeningComponent';

const PracticeLessons = () => {
  const { colors } = useTheme();

  const {category, categoryId, slug, unit, unitId} = useLocalSearchParams();

  return (
    <SessionLayout<PracticeSessionType> sessionType={typeof slug == 'string' ? slug : ""} categoryId={ typeof categoryId == 'string' ? categoryId : "" } unitId={ typeof unitId == 'string' ? unitId : "" }>
      {({ item, wordRefs, containerRef, setTooltip }) => {

        const handleTooltip = (value: any) => {
          setTooltip(value);
        };
        // console.log( item.examples, item.examples.every(item => item?.example !== "") )
        return (
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1, paddingTop: 50 }}>
              {/* English Section */}
              <ListeningComponent
                language="English"
                color="#0A9AB0"
                style={{backgroundColor: colors.listeningCardBackgroundColor}} // {{ borderColor: "#08C1D2" }}
                buttonStyle={{ backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor }}
                speechContent={item.meaning}
                speechLang="en-US"
              >
                {/* <Text style={[styles.text, { color: colors.textDark }]}>{item?.name || item?.meaning}</Text> */}
                <Text style={[styles.text, { color: colors.text }]}>{item.meaning}</Text>
              </ListeningComponent>

              {/* <HorizontalLine style={{ marginTop: 30, marginBottom: 50 }} /> */}
              <View style={{height: 80}} />

              {/* German Section */}
              <ListeningComponent
                language="German"
                color="#1B7CF5"
                style={{backgroundColor: colors.listeningCardBackgroundColor}} // {{ borderColor: "#1B7CF5" }}
                buttonStyle={{ backgroundColor: colors.lessonActionCardSpeakerBackgroundColor }}
                speechContent={item.phrase}
                speechLang="de-DE"
              >
                {/* Tappable Words with ToolTip */}
                <ToolTipPerWordComponent
                  onHandler={handleTooltip}
                  item={item}
                  containerRef={containerRef}
                  wordRefs={wordRefs}
                  textContainerStyle={{marginBottom: 10}}
                />

                {/* Sentence Footer */}
                {
                  item?.usage_context && (
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#142957",
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 16,
                        marginTop: 'auto'
                      }}
                    >

                      <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                        <Text style={[styles.subText, { color: "#24DEEC" }]}>Context:</Text>
                        <Text style={[styles.subText, { color: colors.textSubColor }]}>
                          {item?.usage_context}
                        </Text>
                      </View>

                      <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                        <Text style={[styles.subText, { color: "#24DEEC" }]}>Additional Info:</Text>
                        <Text style={[styles.subText, { color: colors.textSubColor }]}>
                          {item?.discussion ?? "..."}
                        </Text>
                      </View>

                      <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                        <Text style={[styles.subText, { color: "#24DEEC" }]}>Grammer Notes:</Text>
                        <Text style={[styles.subText, { color: colors.textSubColor }]}>
                          {item?.grammar_note}
                        </Text>
                      </View>

                      <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                        <Text style={[styles.subText, { color: "#24DEEC" }]}>Regions:</Text>
                        <Text style={[styles.subText, { color: colors.textSubColor }]}>
                          {item?.region}
                        </Text>
                      </View>

                      <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5, alignItems: "flex-end"}}>
                        <Text style={[styles.subText, { color: "#24DEEC" }]}>Level:</Text>
                        <Text style={[styles.subText, { fontSize: 16, fontWeight: "900", color: colors.textSubColor }]}>
                          {item?.german_level || "A1"}
                        </Text>
                      </View>

                      {
                        item?.examples.length && item.examples.every(item => item?.example !== "") && (
                          <View style={{flexDirection:"column", alignItems: "flex-start", marginTop: 10}}>
                            <Text style={[styles.subText, { color: "#24DEEC" }]}>Examples:</Text>
                            {
                              item.examples.map( (item, idx) => (
                                <View
                                  key={idx.toString()}
                                  style={{
                                    flex: 1,
                                    width: "100%",
                                    padding: 10,
                                    borderStartStartRadius: 0,
                                    borderStartEndRadius: 15,
                                    borderEndEndRadius: 15,
                                    borderEndStartRadius: 15,
                                    backgroundColor: colors.LessonSourceCardBackgroundColor,
                                    marginTop: 10,
                                    gap: 6
                                  }}
                                >
                                  <Text style={[styles.subText, { fontSize: 14, fontWeight: "900", color: colors.textSubColor }]}>
                                    {item?.example}
                                  </Text>
                                  <Text style={[styles.subText, { fontSize: 13, fontWeight: "900", color: colors.textSubColor }]}>
                                    [ {item?.translation} ]
                                  </Text>
                                </View>
                              ))
                            }
                          </View>
                        )
                      }

                    </View>
                  )
                }

              </ListeningComponent>

              <View style={{height: 30}} />
            </View>
          </ScrollView>
        )
      }}
    </SessionLayout>
  );
};

export default PracticeLessons;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    alignItems: "center"
  },
  mainText: {
    fontSize: 20,
    fontWeight: "700",
  },
  subText: {
    fontSize: 13,
    fontWeight: "400",
    // flexWrap: "wrap"
  },
  levelText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10
  }
});