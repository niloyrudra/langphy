import { Href } from "expo-router"
import { ReactNode } from "react"
import { ColorValue, ImageBackgroundProps, ImageSourcePropType, InputModeOptions, StyleProp, ViewProps, ViewStyle } from "react-native"
import { SvgProps } from "react-native-svg"

type Category = {
  // id: string,
  _id: string,
  title: string,
  slug: string,
  position_at: string
  // ImgComponent: React.FC<SvgProps>
}

type CategoryProps = {
    cat_id: string,
    title: string,
    slug: string,
    ImgComponent?: React.FC<SvgProps>,
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
    ImgComponent?: React.FC<SvgProps>,
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

// Reading
type ReadingSessionItem = {
  _id: string,
  categoryId: string,
  unitId: string,
  question_en: string,
  options: [string, string, string, string], // Array<string>,
  answer: string,
  explanation: string,
  phrase: string
}

type WritingSessionItem = {
  _id: string,
  categoryId: string,
  unitId: string,
  phrase: string,
  meaning: string,
  german_level?: string,
}

type ListeningSessionItem = {
  _id: string,
  categoryId: string,
  unitId: string,
  phrase: string,
  meaning: string,
  german_level?: string,
}

type QuizSessionItem = {
  _id: string,
  categoryId: string,
  unitId: string,
  german_level: string,
  question: string,
  options: [string, string, string, string], // Array<string>,
  answer: string,
  explanation?: string
}

type QuizProps = {
    option: string,
    // ref: React.Ref<any>,
    selectedOption: string,
    answer: string,
    // isCorrect: boolean,
    onSelect: (option: string ) => void,
    // onSelect: (title: string, isCorrect: boolean ) => void,
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
    // iconComponent?: ReactNode,
    // iconTurtleComponent?: ReactNode | undefined,
    children?: ReactNode | undefined,
    style?: StyleProp<ViewStyle>,
    buttonStyle?: StyleProp<ViewStyle>,
    speechContent?: string,
    speechLang?: string
}

interface WordDataShape {
  phrase: string;
  analysis?: { roles: WordRole[] };
  name?: string;
  meaning?: string;
}

// Define color legend for grammatical roles
type ColorLegend = {
  subject: string;
  main_verb: string;
  modal_verb: string;
  subordinate_verb: string;
  direct_object: string;
  indirect_object: string;
  article: string;
  possessive_article: string;
  preposition_article: string;
  time_adverb: string;
  conjunction: string;
  place: string;
  introgetive_adverb: string;
  adverb: string;
  adjective: string;
}

// Define structure for example sentences
type Example = {
  example: string;
  translation: string;
  sound?: string;
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
    | "adjective"
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
  accessories: UnitIndividualCategory[];
  alphabets: UnitIndividualCategory[];
  animals: UnitIndividualCategory[];
  body_parts: UnitIndividualCategory[];
  colors: UnitIndividualCategory[];
  construction: UnitIndividualCategory[];
  devices: UnitIndividualCategory[];
  office_corporates: UnitIndividualCategory[];
  festivals: UnitIndividualCategory[];
  embbacy_passport: UnitIndividualCategory[];
  contructions: UnitIndividualCategory[];
  count_measurement: UnitIndividualCategory[];
  introduction: UnitIndividualCategory[];
  locations: UnitIndividualCategory[];
  greetings: UnitIndividualCategory[];
  landscape: UnitIndividualCategory[];
  flowers: UnitIndividualCategory[];
  countries: UnitIndividualCategory[];
  opinions: UnitIndividualCategory[];
  invitations: UnitIndividualCategory[];
  technology: UnitIndividualCategory[];
  education: UnitIndividualCategory[];
  preference: UnitIndividualCategory[];
  time: UnitIndividualCategory[];
  family: UnitIndividualCategory[];
  house: UnitIndividualCategory[];
  calendar: UnitIndividualCategory[];
  activities: UnitIndividualCategory[];
  business_and_services: UnitIndividualCategory[];
  airport: UnitIndividualCategory[];
  transportation: UnitIndividualCategory[];
  hotel: UnitIndividualCategory[];
  restaurant: UnitIndividualCategory[];
  foods: UnitIndividualCategory[];
  math: UnitIndividualCategory[];
  health: UnitIndividualCategory[];
  materials: UnitIndividualCategory[];
  medical_emergency: UnitIndividualCategory[];
  shopping: UnitIndividualCategory[];
  dresses: UnitIndividualCategory[];
  tools: UnitIndividualCategory[];
  vehicles: UnitIndividualCategory[];
  culture: UnitIndividualCategory[];
  entertainment: UnitIndividualCategory[];
  professions: UnitIndividualCategory[];
  personalities: UnitIndividualCategory[];
  science: UnitIndividualCategory[];
  politics: UnitIndividualCategory[];
  history: UnitIndividualCategory[];
  geography: UnitIndividualCategory[];
  government_diplomacy: UnitIndividualCategory[];
  hobbies: UnitIndividualCategory[];
  music: UnitIndividualCategory[];
  natural_disasters: UnitIndividualCategory[];
  nature: UnitIndividualCategory[];
  news: UnitIndividualCategory[];
  numbers: UnitIndividualCategory[];
  space: UnitIndividualCategory[];
  seasons: UnitIndividualCategory[];
  sports: UnitIndividualCategory[];
  tele_conversation: UnitIndividualCategory[];
  travels: UnitIndividualCategory[];
  warfare: UnitIndividualCategory[];
  weather: UnitIndividualCategory[];
  work: UnitIndividualCategory[];
};

type ToolTip = {
  visible: boolean;
  x: number;
  y: number;
  translation: string;
  color: string;
}

export {
  WordDataShape,
  ToolTip,
  ReadingSessionItem,
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
    QuizSessionItem,
    QuizProps,
    LinkProps,
    BannerProps,
    TitleProps,
    SubmitButtonProps,
    InputProps,
    EyeProps,
    LessonProps,
    WordRole,
    ColorLegend,
    WritingSessionItem,
    ListeningSessionItem
};