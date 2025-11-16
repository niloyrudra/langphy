import { Dimensions } from "react-native";

const SIZES = {
    logo: {
        width: 133.07,
        height: 31.34
    },
    screenWidth: Dimensions.get("screen").width,
    windowWidth: Dimensions.get("window").width,
    headerHeight: 55,
    textFieldHeight: 56,
    buttonHeight: 56,
    authMarginTop: 50,
    bodyPaddingHorizontal: 20,
    bodyPaddingVertical: 20,
    defaultIconSize: 24,
    headerIcon: 36,
    SpeakerIcon: 20,
    cardGap: 12,
    speakerNRecorderDimensions: 60,

    topProgressBarHeight: 12,

    // Fonts
    fontSizeTextArea: 24,
    fontSizeTextInput: 16,

    // Card
    // gridCardIconWrapDimension: 80,
    // gridCardIconDimension: 56
    gridCardIconWrapDimension: 96,
    gridCardIconDimension: 76
}

export default SIZES;