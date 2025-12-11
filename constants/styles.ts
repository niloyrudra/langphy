import { StyleProp, ViewProps } from "react-native";
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

const titleHeadingStyle: StyleProp<ViewProps> = <ViewProps> {
    // fontSize: 16,
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 12,
    // textTransform: "uppercase",
    fontFamily: 'PlusJakartaSans-ExtraBold',
};
const subTitleHeadingStyle: StyleProp<ViewProps> = <ViewProps> {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 14,
    fontFamily: 'PlusJakartaSans-Bold',
};


const STYLES = {
    headerContainer,
    defaultContainer,
    boxShadow,
    textShadow,
    textHeader,
    textSubHeader,
    contentCentered,
    childContentCentered,
    titleHeadingStyle,
    subTitleHeadingStyle
};

export default STYLES;