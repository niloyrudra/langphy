import {
  GreetingsIcon,
  IntroIcon,
  NumbersIcon,
  TimeIcon,
  ChatIcon,
  FamilyIcon,
  FoodsIcon,
  LocationIcon,

  BookIcon,
  DolphinIcon,
  StudyingDolphinIcon,
  StudyingDolphinSmallIcon
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
];

export const UNIT_DATA = [
  {
    id: '1',
    title: 'Hello',
    completion: 320,
    goal: 600,
    ImgComponent: DolphinIcon
  },
  {
    id: '2',
    title: 'Good Day!',
    completion: 425,
    goal: 600,
    ImgComponent: StudyingDolphinIcon
  },
  {
    id: '3',
    title: 'Good Bye!',
    completion: 210,
    goal: 600,
    ImgComponent: BookIcon
  },
  {
    id: '4',
    title: 'Welcome',
    completion: 530,
    goal: 600,
    ImgComponent: StudyingDolphinSmallIcon
  },
];

export const LESSON_UNIT_DATA = [
  {
    id: '1',
    title: 'Practice',
    completion: 80,
    goal: 100,
    slug: "practice",
    ImgComponent: DolphinIcon
  },
  {
    id: '2',
    title: 'Quiz',
    completion: 60,
    goal: 100,
    slug: "quiz",
    ImgComponent: DolphinIcon
  },
  {
    id: '3',
    title: 'Listening',
    completion: 40,
    goal: 100,
    slug: "listening",
    ImgComponent: DolphinIcon
  },
  {
    id: '4',
    title: 'Reading',
    completion: 90,
    goal: 100,
    slug: "reading",
    ImgComponent: DolphinIcon
  },
  {
    id: '5',
    title: 'Speaking',
    completion: 75,
    goal: 100,
    slug: "speaking",
    ImgComponent: DolphinIcon
  },
  {
    id: '6',
    title: 'Writing',
    completion: 45,
    goal: 100,
    slug: "writing",
    ImgComponent: DolphinIcon
  }
];

export const QUIZ_DATA = [
  {
    id: '1',
    title: 'Hola',
    isCorrect: false,
  },
  {
    id: '2',
    title: 'Bonjoue',
    isCorrect: false,
  },
  {
    id: '3',
    title: 'Moin Moin',
    isCorrect: true,
  },
  {
    id: '4',
    title: 'Hi!',
    isCorrect: false,
  },
];