import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import sizes from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import HorizontalLine from '@/components/HorizontalLine';
import LessonComponent from '@/components/lesson-components/LessonComponent';

import ToolTipPerWordComponent from '@/components/ToolTipPerWordComponent';
import SessionLayout from '@/components/layouts/SessionLayout';

const PracticeLessons = () => {
  const { colors } = useTheme();
  return (
    <SessionLayout>

      {({ item, wordRefs, containerRef, setTooltip }) => {

        const handleTooltip = (value: any) => {
          setTooltip(value);
        };

        return (
          <View style={{ flex: 1 }}>
            {/* English Section */}
            <LessonComponent
              language="English"
              style={{ borderColor: "#08C1D2" }}
              buttonStyle={{ backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor }}
              speechContent={item?.name || item?.meaning}
              speechLang="en-US"
            >
              <Text style={[styles.text, { color: colors.textDark }]}>{item?.name || item?.meaning}</Text>
            </LessonComponent>

            <HorizontalLine style={{ marginTop: 30, marginBottom: 50 }} />

            {/* German Section */}
            <LessonComponent
              language="German"
              style={{ borderColor: "#1B7CF5" }}
              buttonStyle={{ backgroundColor: colors.lessonActionCardSpeakerBackgroundColor }}
              speechContent={item?.phrase}
              speechLang="de-DE"
            >
              {/* Tappable Words with ToolTip */}
              <ToolTipPerWordComponent
                onHandler={handleTooltip}
                item={item}
                containerRef={containerRef}
                wordRefs={wordRefs}
              />

              {/* Sentence Footer */}
              <View>
                <Text style={[styles.subText, { color: colors.textSubColor }]}>
                  ({item?.usage_context})
                </Text>

                {item?.german_level && (
                  <Text style={[styles.levelText, { color: colors.textSubColor }]}>
                    German Level: ({item?.german_level})
                  </Text>
                )}
                {item?.grammar_note && (
                  <Text style={[styles.subText, { color: colors.textSubColor }]}>
                    Grammar Notes: ({item?.grammar_note})
                  </Text>
                )}
              </View>
            </LessonComponent>
          </View>
        )
      }}
    </SessionLayout>              
  );
};

export default PracticeLessons;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "700",
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
  },
  levelText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    marginTop: 10,
  }
});