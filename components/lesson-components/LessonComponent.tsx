import { Dimensions, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode } from 'react'

interface LessonProps {
    language: string,
    iconComponent: ReactNode,
    children?: ReactNode | undefined,
    style?: StyleProp<ViewStyle>
    buttonStyle?: StyleProp<ViewStyle>
}

const LessonComponent: FC<LessonProps> = ({language, iconComponent, children, style, buttonStyle}) => {
  return (
    <View style={[styles.speakerButtonWrapper, style]}>
        <View style={[styles.speakerButton, buttonStyle]}>
            <Text style={styles.languageText}>{language}</Text>
            {iconComponent}
        </View>
        {/* Render children if provided; otherwise show default text */}
        {children ? children : <Text style={styles.text}>Hello!</Text>}
    </View>
  )
}

export default LessonComponent;

const styles = StyleSheet.create({
  speakerButtonWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 92,
    borderRadius: 16,
    paddingVertical: 30, // 40
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#08C1D2",
    backgroundColor: "#ffffff",
    fontWeight: "600"
  },
  speakerButton: {
    position: "absolute",
    top: -22,
    left: Dimensions.get("screen").width/2 - (34+50),
    zIndex: 2,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 130,
    height: 44,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 8,

    gap: 12,
    backgroundColor: "#CFFDFE",
    fontWeight: "600"
  },
  languageText: {
    fontSize: 16,
    color: "#142C57",
    fontWeight: "700",
    marginLeft: 10
  },
  text: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  }
})