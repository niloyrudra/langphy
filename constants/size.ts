import { Dimensions } from "react-native";
import { CONTENT_WIDTH, isTablet } from "@/utils/responsive";

const { width: RAW_SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SIZES = {
    logo: {
        width: 133.07,
        height: 31.34
    },
    // screenWidth: Dimensions.get("screen").width,
    // ── Layout ──────────────────────────────────────────────────────────────
    // CONTENT_WIDTH on phone === screen width (no change)
    // CONTENT_WIDTH on tablet === MAX_CONTENT_WIDTH (480dp) — island cap
    screenWidth:  CONTENT_WIDTH,
    screenHeight: SCREEN_HEIGHT,

    windowWidth: Dimensions.get("window").width,

    // True screen width — use only when you need full-bleed dimensions
    // (e.g. modal overlays that must cover the entire tablet screen)
    rawScreenWidth: RAW_SCREEN_WIDTH,

    headerHeight:           55,
    textFieldHeight:        56,
    buttonHeight:           56,
    authMarginTop:          50,
    
    // ── Spacing ──────────────────────────────────────────────────────────────
    bodyPaddingHorizontal:  20,
    bodyPaddingVertical:    20,
    cardGap:                12,

    
    defaultIconSize:        24,
    headerIcon:             36,
    SpeakerIcon:            20,
    // speakerNRecorderDimensions: 60,

    topProgressBarHeight:   12,

    // Fonts
    fontSizeTextArea:       24,
    fontSizeTextInput:      16,

    // Card
    gridCardIconWrapDimension: 90,
    gridCardIconDimension:  65,

    //Listening Speaker
    speakerDimensions: {
        width: 40,
        height: 40,
    },

    // ── Components ───────────────────────────────────────────────────────────
    speakerNRecorderDimensions: 60, // 56,

    // ── Flags ────────────────────────────────────────────────────────────────
    isTablet,
}

export default SIZES;