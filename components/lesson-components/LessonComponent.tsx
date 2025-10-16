import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LessonProps } from '@/types';
import { useTheme } from '@/theme/ThemeContext'
import sizes from '@/constants/size';
import { speechHandler, speechSlowHandler } from '@/utils';

const LessonComponent: React.FC<LessonProps> = ({language, iconComponent, children, style, buttonStyle, speechContent, speechLang}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.speakerButtonWrapper, style, {backgroundColor: colors.cardBackgroundColor}]}>

      <View style={[styles.content]}>

        <View
          style={[styles.speakerButton, buttonStyle]}
        >
          <Text style={[styles.languageText, {color: colors.text}]}>{language}</Text>

          {/* Speaker */}
          <View
            style={{
              flexDirection:"row",
              gap: 10
            }}
          >

            <TouchableOpacity onPress={() => speechHandler( speechContent, speechLang )}>
              {iconComponent}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => speechSlowHandler( speechContent, speechLang )}>
              {iconComponent}
            </TouchableOpacity>

          </View>

        </View>

      </View>

      {/* Render children if provided; otherwise show default text */}
      {children && children}

    </View>
  )
}

export default LessonComponent;

const styles = StyleSheet.create({
  speakerButtonWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-start",
    // height: 92,
    paddingVertical: 30, // 40
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 16
  },
  content: {
    width: sizes.screenWidth - (sizes.bodyPaddingHorizontal*2),
    position: "absolute",
    top: -23,
    justifyContent:"center",
    alignItems: "center",
    zIndex: 2,
  },
  speakerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 170, // 130
    height: 44,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 12,
    fontWeight: "600"
  },
  languageText: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10
  }
});