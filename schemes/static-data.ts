import {
  GreetingsIcon,
  IntroIcon,
  NumbersIcon,
  TimeIcon,
  ChatIcon,
  FamilyIcon,
  FoodsIcon,
  LocationIcon
} from '@/utils/SVGImages'

export const CATEGORY_DATA = [
  {
    id: '1',
    catTitle: "Greetings",
    slug: "greet",
    // imgSource: require("@/assets/images/categories/greetings.png")
    ImgComponent: GreetingsIcon
  },
  {
    id: '2',
    catTitle: "Introductions",
    slug: "intro",
    // imgSource: require("@/assets/images/categories/intro.png")
    ImgComponent: IntroIcon
  },
  {
    id: '3',
    catTitle: "Numbers",
    slug: "numbers",
    // imgSource: require("@/assets/images/categories/numbers.png")
    ImgComponent: NumbersIcon
  },
  {
    id: '4',
    catTitle: "Time",
    slug: "time",
    // imgSource: require("@/assets/images/categories/time.png")
    ImgComponent: TimeIcon
  },
  {
    id: '5',
    catTitle: "Everyday Phrases",
    slug: "phrases",
    // imgSource: require("@/assets/images/categories/chat.png")
    ImgComponent: ChatIcon
  },
  {
    id: '6',
    catTitle: "Family & Friends",
    slug: "family",
    // imgSource: require("@/assets/images/categories/family.png")
    ImgComponent: FamilyIcon
  },
  {
    id: '7',
    catTitle: "Food & Drinks",
    slug: "foods",
    // imgSource: require("@/assets/images/categories/foods.png")
    ImgComponent: FoodsIcon
  },
  {
    id: '8',
    catTitle: "Directions & Places",
    slug: "locations",
    // imgSource: require("@/assets/images/categories/location.png")
    ImgComponent: LocationIcon
  },
  {
    id: '9',
    catTitle: "Greetings 2",
    slug: "greetings-2",
    // imgSource: require("@/assets/images/categories/svgs/greetings.svg")
    ImgComponent: GreetingsIcon
  },
]