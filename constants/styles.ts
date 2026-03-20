import { StyleProp, TextProps, TextStyle, ViewProps } from "react-native";
import SIZES from "./size";

const headerContainer: StyleProp<ViewProps> = <ViewProps> {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.bodyPaddingHorizontal,
    // gap: 10,
    paddingVertical: 10,
    height: SIZES.headerHeight,
    // width: SIZES.screenWidth,
    // backgroundColor: "#000000",
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: "#444555"
};

const boxShadowLight: StyleProp<ViewProps> = <ViewProps> {
    elevation: 3,
    shadowColor: "#55565615",
    shadowOffset: {
        width: 1,
        height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 3
};

const iconShadow: StyleProp<ViewProps> = <ViewProps> {
    elevation: 1,
    shadowColor: "#EEEEEE15",
    shadowOffset: {
        width: 1,
        height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 1
};

const boxShadow: StyleProp<ViewProps> = <ViewProps> {
    elevation: 5,
    shadowColor: "#55565626",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5
};

const headerTitle: StyleProp<TextProps> = <TextProps> {
    fontSize: 20, // 24
    fontWeight: "900"
}


const textShadow: StyleProp<ViewProps> = <ViewProps> {
    textShadowColor: "#444",
    textShadowOffset:{
      width:2,
      height:2
    },
    textShadowRadius: 2
};
const textHeader: StyleProp<ViewProps> = <ViewProps> {};

const textSubHeader: StyleProp<ViewProps> = <ViewProps> {};

const contentCentered: StyleProp<ViewProps> = <ViewProps> {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
};
const childContentCentered: StyleProp<ViewProps> = <ViewProps> {
    justifyContent: "center",
    alignItems: "center"
};
const defaultContainer: StyleProp<ViewProps> = <ViewProps> {
    flex: 1,
    paddingHorizontal: SIZES.bodyPaddingHorizontal,
    paddingTop: 0,// SIZES.bodyPaddingVertical,
    paddingBottom: SIZES.bodyPaddingVertical,
};
const defaultContainerZeroPadding: StyleProp<ViewProps> = <ViewProps> {
    flex: 1,
    padding: 0,
};

const titleHeadingStyle: StyleProp<ViewProps> = <ViewProps> {
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 16,
};
const subTitleHeadingStyle: StyleProp<ViewProps> = <ViewProps> {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16,
};

const wordWrapStyle: StyleProp<TextStyle> = <TextStyle> {
    wordWrap: 'break-word',
    flexShrink: 1,
}

const STYLES = {
    headerContainer,
    defaultContainer,
    defaultContainerZeroPadding,
    boxShadow,
    iconShadow,
    boxShadowLight,
    textShadow,

    headerTitle,

    textHeader,
    textSubHeader,
    contentCentered,
    childContentCentered,
    titleHeadingStyle,
    subTitleHeadingStyle,
    wordWrapStyle
};

export default STYLES;