import { Href } from "expo-router"
import { ReactNode } from "react"
import { ColorValue, ImageBackgroundProps, ImageSourcePropType, InputModeOptions, StyleProp, ViewProps, ViewStyle } from "react-native"
import { SvgProps } from "react-native-svg"

type Category = {
  id: string,
  title: string,
  slug: string,
  ImgComponent: React.FC<SvgProps>
}

type CategoryProps = {
    title: string,
    slug: string,
    ImgComponent: React.FC<SvgProps>,
    containerWidth?: number
    marginRight?: number
}

// UNIT LESSON
type UnitLesson = {
  id: string,
  title: string,
  slug: string,
  completion: number,
  goal: number,
  ImgComponent: React.FC<SvgProps>
}

type UnitLessonProps = {
    id: string,
    title: string,
    slug: string,
    rootCategory: string,
    unitLessonCategory: string,
    completion: number,
    goal: number,
    ImgComponent: React.FC<SvgProps>,
    containerWidth?: number,
    marginRight?: number
}
// UNIT Props
type UnitProps = {
    title: string,
    completion: number,
    goal: number,
    ImgComponent: React.FC<SvgProps>,
    // imgSource: ImageSourcePropType | undefined,
    customStyle?: StyleProp<ViewStyle>
}
type UnitCategoryItemProps = {
    title: string,
    unitLessonCategory: string,
    rootCategory: string,
    completion: number,
    goal: number,
    ImgComponent: React.FC<SvgProps>,
    // imgSource: ImageSourcePropType | undefined,
    customStyle?: StyleProp<ViewStyle>,
    // items: any[]
}
type UnitLessonItemProps = {
    id: string,
    title: string,
    slug: string,
    completion: number,
    goal: number,
    ImgComponent: React.FC<SvgProps>,
    containerWidth?: number,
    marginRight?: number,
    // items: any[]
}

// UNIT DATA Props
type UnitDataProps = {
    id: string,
    title: string,
    completion: number,
    goal: number,
    ImgComponent: React.FC<SvgProps>
}


// QUIZ
type Quiz = {
  id: string,
  title: string,
  isCorrect: boolean
}

type QuizProps = {
    title: string,
    isCorrect: boolean,
    onSelect: (title: string, isCorrect: boolean ) => void,
    isSelectionHappened?: boolean,
    containerWidth: number
    marginRight?: number
    customStyle?: StyleProp<ViewStyle>
}
// LINK Props
type LinkProps = {
    linkText: string,
    route: Href
}

// BANNER Props
type BannerProps = {
    width?: number,
    height?: number
}
// TITLE Props
type TitleProps = {
  title: string,
  wrapperStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<ViewProps>
}
// ACTION BUTTON Props
type SubmitButtonProps = {
    buttonTitle?: string,
    onSubmit: () => void,
    buttonStyle?: StyleProp<ViewStyle>,
    buttonTextStyle?: StyleProp<ViewProps>,
    disabled?: boolean
}
// TEXT_INPUT Props
type InputProps = { // extends TextInputProps -> better approach
    value: string,
    placeholder?: string,
    onChange: (text: string) => void,
    // onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    multiline?: boolean,
    numberOfLines?: number,
    maxLength?: number,
    inputMode?: InputModeOptions | undefined,
    placeholderTextColor?: ColorValue | undefined,
    isPassword?: boolean,
    contentContainerStyle?: StyleProp<ViewStyle>
}

type EyeProps = {
    onChange: () => void,
    isSecureTextEntry: boolean,
    style?: StyleProp<ViewStyle>
}

type LessonProps = {
    language: string,
    iconComponent: ReactNode,
    children?: ReactNode | undefined,
    style?: StyleProp<ViewStyle>
    buttonStyle?: StyleProp<ViewStyle>
}

type UnitIndividualCategoryItem = {
  phrase: string;
  response: string;
  meaning: string;
  meaning_response: string;
  usage_context: string;
  formality: "formal" | "informal" | "neutral" | "both";
  grammar_note: string;
  example_sentences?: string[];
  audio_file?: string;
  region: string;
  ipa: string;
  sound: string;
};

type UnitIndividualCategory = {
  category: string;
  category_slug: string;
  goal: number;
  completion: number;
  ImgComponent: React.FC<SvgProps>;
  // items: UnitIndividualCategoryItem[];
};

type DB = {
  greetings: UnitIndividualCategory[];
  introduction: UnitIndividualCategory[];
  // add other keys if needed
};

export {
    Category,
    UnitIndividualCategoryItem,
    UnitIndividualCategory,
    DB,
    CategoryProps,
    UnitLesson,
    UnitLessonProps,
    UnitProps,
    UnitCategoryItemProps,
    UnitLessonItemProps,
    UnitDataProps,
    Quiz,
    QuizProps,
    LinkProps,
    BannerProps,
    TitleProps,
    SubmitButtonProps,
    InputProps,
    EyeProps,
    LessonProps
};