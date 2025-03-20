import { StyleProp, ViewProps } from "react-native";
import sizes from "./size";

const headerContainer: StyleProp<ViewProps> = <ViewProps> {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: 10,
    height: sizes.headerHeight,
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
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: sizes.bodyPaddingVertical,
};


const STYLES = {
    headerContainer,
    defaultContainer,
    boxShadow,
    textShadow,
    textHeader,
    textSubHeader,
    contentCentered,
    childContentCentered
};

export default STYLES;