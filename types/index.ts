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
    style?: StyleProp<ViewStyle>,
    buttonStyle?: StyleProp<ViewStyle>,
    speechContent?: string,
    speechLang?: string
}



// Define color legend for grammatical roles
type ColorLegend = {
  subject: string;
  main_verb: string;
  subordinate_verb: string;
  direct_object: string;
  modal_verb: string;
  article: string;
  possessive_article: string;
  indirect_object: string;
  time_adverb: string;
  conjunction: string;
  place: string;
  preposition_article: string;
  adverb: string;
}

// Define structure for example sentences
type Example = {
  example: string;
  translation: string;
  sound: string;
}

// Define grammatical role for each word in analysis
type WordRole = {
  word: string;
  role:
    | "subject"
    | "modal_verb"
    | "main_verb"
    | "subordinate_verb"
    | "direct_object"
    | "indirect_object"
    | "article"
    | "possessive_article"
    | "preposition_article"
    | "adverb"
    | "time_adverb"
    | "conjunction"
    | "place";
  case: "nominative" | "accusative" | "dative" | "genitive" | null;
  translation: string;
}

// Define analysis section of the phrase
type Analysis = {
  type: "statement" | "question" | "command" | "exclamation" | string;
  roles: WordRole[];
}

// Define full item structure
// type PhraseItem = {
//   phrase: string;
//   meaning: string;
//   response: string;
//   meaning_response: string;
//   german_level: string;
//   usage_context: string;
//   formality: string;
//   region: string;
//   discussion: string;
//   grammar_note: string;
//   ipa: string;
//   isCompleted: boolean;
//   examples: Example[];
//   analysis: Analysis;
// }

// Define dataset structure
// type PhraseDataset = {
//   items: PhraseItem[];
//   color_legend: ColorLegend;
// }

type UnitIndividualCategoryItem = {
  phrase: string;
  name?: string;
  response: string;
  meaning: string;
  meaning_response: string;
  usage_context: string;
  formality: "formal" | "informal" | "neutral" | "both";
  german_level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | null;
  grammar_note: string;
  example_sentences?: string[];
  audio_file?: string;
  region: string;
  ipa: string;
  sound?: string;
  examples: Example[];
  analysis?: Analysis;
};

type UnitIndividualCategory = {
  category: string;
  category_slug: string;
  goal: number;
  completion: number;
  notes?: string[];
  ImgComponent: React.FC<SvgProps>;
  // items: UnitIndividualCategoryItem[];
};

type DB = {
  alphabets: UnitIndividualCategory[];
  greetings: UnitIndividualCategory[];
  introduction: UnitIndividualCategory[];
  colors: UnitIndividualCategory[];
  numbers: UnitIndividualCategory[];
  body_parts: UnitIndividualCategory[];
  locations: UnitIndividualCategory[];
  travels: UnitIndividualCategory[];
  landscape: UnitIndividualCategory[];
  work: UnitIndividualCategory[];
  opinions: UnitIndividualCategory[];
  invitations: UnitIndividualCategory[];
  technology: UnitIndividualCategory[];
  education: UnitIndividualCategory[];
  school: UnitIndividualCategory[];
  preference: UnitIndividualCategory[];
  time: UnitIndividualCategory[];
  family: UnitIndividualCategory[];
  house: UnitIndividualCategory[];
  calendar: UnitIndividualCategory[];
  seasons: UnitIndividualCategory[];
  weather: UnitIndividualCategory[];
  sports: UnitIndividualCategory[];
  activities: UnitIndividualCategory[];
  services: UnitIndividualCategory[];
  airport: UnitIndividualCategory[];
  transportation: UnitIndividualCategory[];
  hotel: UnitIndividualCategory[];
  restaurant: UnitIndividualCategory[];
  foods: UnitIndividualCategory[];
  health: UnitIndividualCategory[];
  medical_emergency: UnitIndividualCategory[];
  animals: UnitIndividualCategory[];
  shopping: UnitIndividualCategory[];
  dresses: UnitIndividualCategory[];
  tools: UnitIndividualCategory[];
  vehicles: UnitIndividualCategory[];
  culture: UnitIndividualCategory[];
  entertainment: UnitIndividualCategory[];
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
    LessonProps,
    WordRole,
    ColorLegend
};