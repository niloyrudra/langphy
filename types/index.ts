import { Href } from "expo-router"
import { ReactNode } from "react"
import { ColorValue, ImageBackgroundProps, ImageSourcePropType, InputModeOptions, StyleProp, ViewProps, ViewStyle } from "react-native"
import { SvgProps } from "react-native-svg"

type Category = {
  id: string,
  catTitle: string,
  slug: string,
  ImgComponent: React.FC<SvgProps>
}

type CategoryProps = {
    catTitle: string,
    slug: string,
    ImgComponent: React.FC<SvgProps>,
    containerWidth: number
    marginRight?: number
}

type UnitLesson = {
  id: string,
  title: string,
  slug: string,
  completion: number,
  ImgComponent: React.FC<SvgProps>
}

type UnitLessonProps = {
    title: string,
    slug: string,
    completion: number,
    ImgComponent: React.FC<SvgProps>,
    containerWidth: number
    marginRight?: number
}

type Quiz = {
  id: string,
  title: string,
  isCorrect: boolean
}

type QuizProps = {
    id: string,
    title: string,
    isCorrect: boolean,
    containerWidth: number
    marginRight?: number
}

type UnitProps = {
    title: string,
    completion: number,
    ImgComponent: React.FC<SvgProps>,
    // imgSource: ImageSourcePropType | undefined,
    customStyle?: StyleProp<ViewStyle>
}

type UnitDataProps = {
    id: string,
    title: string,
    completion: number,
    ImgComponent: React.FC<SvgProps>
}

type LinkProps = {
    linkText: string,
    route: Href
}

type BannerProps = {
    width?: number,
    height?: number
}

type TitleProps = {
  title: string,
  wrapperStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<ViewProps>
}

type SubmitButtonProps = {
    buttonTitle?: string,
    onSubmit: () => void,
    buttonStyle?: StyleProp<ViewStyle>,
    buttonTextStyle?: StyleProp<ViewProps>,
    disabled?: boolean
}

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
    isPassword?: boolean
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

export {
    Category,
    CategoryProps,
    UnitLesson,
    UnitLessonProps,
    UnitProps,
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