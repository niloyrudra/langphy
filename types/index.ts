import { Href } from "expo-router"
import { ReactNode } from "react"
import { ColorValue, ImageSourcePropType, InputModeOptions, StyleProp, ViewProps, ViewStyle } from "react-native"
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

type SubCategoryProps = {
    title: string,
    completion: number,
    imgSource: ImageSourcePropType | undefined,
    customStyle?: StyleProp<ViewStyle>
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
    SubCategoryProps,
    LinkProps,
    BannerProps,
    TitleProps,
    SubmitButtonProps,
    InputProps,
    EyeProps,
    LessonProps
};