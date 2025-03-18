import { StyleProp, ViewProps } from "react-native";

const boxShadow: StyleProp<ViewProps> = <ViewProps> {};
const textShadow: StyleProp<ViewProps> = <ViewProps> {};
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


export {
    boxShadow,
    textShadow,
    textHeader,
    textSubHeader,
    contentCentered,
    childContentCentered
};