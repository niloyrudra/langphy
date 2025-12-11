import { SettingsData } from '@/types';
import {
  BookIcon,
  AlphabetIconV3,
  GreetingsIconV3,
  IntroIconV3,
  NumberIconV3,
  HouseIconV3,
  CountingMathMeasureIconV3,
  TimeIconV3,
  WeatherIconV3,
  SportsIconV3,
  BodyPartsIconV3,
  MedicalIconV3,
  FoodIconV3,
  FlowerIconV3,
  TransportationIconV3,
  RestaurantIconV3,
  ShoppingIconV3,
  DressIconV3,
  VehicleIconV3,
  EducationIconV3,
  CultureIconV3,
  EntertainmentIconV3,
  FamilyIconV3,
  CalendeIconV3,
  AnimalIconV3,
  DirectionIconV3,
  TravelIconV3,
  AirportIconV3,
  HotelIconV3,
  LandscapesIconV3,
  CountryIconV3,
  ToolsIconV3,
  WorkIconV3,
  PreferencesIconV3,
  InvitationIconV3,
  TechnologyIconV3,
  OpinionIconV3,
  ColorsIconV3,
  NatureIconV3,
  SeasonsIconV3,
  ActivitiesIconV3,
  HobbyIconV3,
  MusicIconV3,
  PassportIconV3,
  DiseaseIconV3,
  BusinessIconV3,
  OfficeIconV3,
  TeleCommunicationIconV3,
  NewspaperIconV3,
  DeviceIconV3,
  ScienceIconV3,
  SpaceIconV3,
  ConstructionIconV3,
  NaturalDisastersIconV3,
  HistoryIconV3,
  MaterialsIconV3,
  GeographyIconV3,
  GovernmentIconV3,
  PoliticsIconV3,
  WarfareIconV3,
  AccessoriesIconV3,
  PersonalitiesIconV3,
  PracticeIconV3,
  QuizIconV3,
  ListeningIconV3,
  ReadingIconV3,
  SpeakingIconV3,
  WritingIconV3,

} from '@/utils/SVGImages'

export const CATEGORY_DATA_V3 = [
  {
    id: '1',
    title: "Alphabets",
    slug: "alphabets",
    ImgComponent: AlphabetIconV3
  },
  {
    id: '2',
    title: "Numbers",
    slug: "numbers",
    ImgComponent: NumberIconV3
  },
  {
    id: '3',
    title: "Colors",
    slug: "colors",
    ImgComponent: ColorsIconV3
  },
  {
    id: '4',
    title: "Greetings",
    slug: "greetings",
    ImgComponent: GreetingsIconV3
  },
  {
    id: '5',
    title: "Introductions",
    slug: "introduction",
    ImgComponent: IntroIconV3
  },
  {
    id: '6',
    title: "Time",
    slug: "time",
    ImgComponent: TimeIconV3
  },
  {
    id: '7',
    title: "Calendar",
    slug: "calendar",
    ImgComponent: CalendeIconV3
  },
  {
    id: '8',
    title: "Family & Friends",
    slug: "family",
    ImgComponent: FamilyIconV3
  },
  {
    id: '9',
    title: "Body Parts",
    slug: "body_parts",
    ImgComponent: BodyPartsIconV3
  },
  {
    id: '10',
    title: "House",
    slug: "house",
    ImgComponent: HouseIconV3
  },
  {
    id: '11',
    title: "Food & Drinks",
    slug: "foods",
    ImgComponent: FoodIconV3
  },
  {
    id: '12',
    title: "Dresses",
    slug: "dresses",
    ImgComponent: DressIconV3
  },
  {
    id: '13',
    title: "Weather",
    slug: "weather",
    ImgComponent: WeatherIconV3
  },
  {
    id: '14',
    title: "Seasons",
    slug: "seasons",
    ImgComponent: SeasonsIconV3
  },
  {
    id: '15',
    title: "Preference",
    slug: "preference",
    ImgComponent: PreferencesIconV3
  },
  {
    id: '16',
    title: "Animals",
    slug: "animals",
    ImgComponent: AnimalIconV3
  },
  {
    id: '17',
    title: "Nature",
    slug: "nature",
    ImgComponent: NatureIconV3
  },
  {
    id: '18',
    title: "Flowers",
    slug: "flowers",
    ImgComponent: FlowerIconV3
  },
  {
    id: '19',
    title: "Landscapes",
    slug: "Landscape",
    ImgComponent: LandscapesIconV3
  },
  {
    id: '20',
    title: "Activities",
    slug: "activities",
    ImgComponent: ActivitiesIconV3
  },
  {
    id: '21',
    title: "Hobbies",
    slug: "hobbies",
    ImgComponent: HobbyIconV3
  },
  {
    id: '22',
    title: "Music",
    slug: "music",
    ImgComponent: MusicIconV3
  },
  {
    id: '23',
    title: "Tools",
    slug: "tools",
    ImgComponent: ToolsIconV3
  },
  {
    id: '24',
    title: "Transportation",
    slug: "transportation",
    ImgComponent: TransportationIconV3
  },
  {
    id: '25',
    title: "Vehicles",
    slug: "vehicles",
    ImgComponent: VehicleIconV3
  },
  {
    id: '26',
    title: "Directions",
    slug: "locations",
    ImgComponent: DirectionIconV3
  },
  {
    id: '27',
    title: "Shopping",
    slug: "shopping",
    ImgComponent: ShoppingIconV3
  },
  {
    id: '28',
    title: "Restaurants",
    slug: "restaurant",
    ImgComponent: RestaurantIconV3
  },
  {
    id: '29',
    title: "Hotels",
    slug: "hotel",
    ImgComponent: HotelIconV3
  },
  {
    id: '30',
    title: "Telephone Conversations",
    slug: "tele_conversation",
    ImgComponent: TeleCommunicationIconV3
  },
  {
    id: '31',
    title: "Countries",
    slug: "countries",
    ImgComponent: CountryIconV3
  },
  {
    id: '32',
    title: "Travel",
    slug: "travels",
    ImgComponent: TravelIconV3
  },
  {
    id: '33',
    title: "Airport",
    slug: "airport",
    ImgComponent: AirportIconV3
  },
  {
    id: '34',
    title: "Ambassy & Passport",
    slug: "embbacy_passport",
    ImgComponent: PassportIconV3
  },
  {
    id: '35',
    title: "Medical Emergencies",
    slug: "medical_emergency",
    ImgComponent: MedicalIconV3
  },
  {
    id: '36',
    title: "Diseases",
    slug: "diseases",
    ImgComponent: DiseaseIconV3
  },
  {
    id: '37',
    title: "Work & Profession",
    slug: "professions",
    ImgComponent: WorkIconV3
  },
  {
    id: '38',
    title: "Businesses & Services",
    slug: "business_and_services",
    ImgComponent: BusinessIconV3
  },
  {
    id: '39',
    title: "Education",
    slug: "education",
    ImgComponent: EducationIconV3
  },
  {
    id: '40',
    title: "Opinions",
    slug: "opinions",
    ImgComponent: OpinionIconV3
  },
  {
    id: '41',
    title: "Invitations",
    slug: "invitations",
    ImgComponent: InvitationIconV3
  },
  {
    id: '42',
    title: "Culture & Festivals",
    slug: "culture",
    ImgComponent: CultureIconV3
  },
  {
    id: '43',
    title: "Entertainment",
    slug: "entertainment",
    ImgComponent: EntertainmentIconV3
  },
  {
    id: '44',
    title: "Sports",
    slug: "sports",
    ImgComponent: SportsIconV3
  },
  {
    id: '45',
    title: "Office & Corporates",
    slug: "office_corporates",
    ImgComponent: OfficeIconV3
  },
  {
    id: '46',
    title: "Technology",
    slug: "technology",
    ImgComponent: TechnologyIconV3
  },
  {
    id: '47',
    title: "News & Media",
    slug: "news",
    ImgComponent: NewspaperIconV3
  },
  {
    id: '48',
    title: "Devices",
    slug: "devices",
    ImgComponent: DeviceIconV3
  },
  {
    id: '49',
    title: "Counting, Mathematics & Measurements",
    slug: "count_measurement",
    ImgComponent: CountingMathMeasureIconV3
  },
  {
    id: '50',
    title: "Science",
    slug: "science",
    ImgComponent: ScienceIconV3
  },
  {
    id: '51',
    title: "Space & Astronomy",
    slug: "space",
    ImgComponent: SpaceIconV3
  },
  {
    id: '52',
    title: "Construction",
    slug: "construction",
    ImgComponent: ConstructionIconV3
  },
  {
    id: '53',
    title: "Natural Disasters",
    slug: "natural_disasters",
    ImgComponent: NaturalDisastersIconV3
  },
  {
    id: '54',
    title: "History",
    slug: "history",
    ImgComponent: HistoryIconV3
  },
  {
    id: '55',
    title: "Materials",
    slug: "materials",
    ImgComponent: MaterialsIconV3
  },
  {
    id: '56',
    title: "Geography",
    slug: "geography",
    ImgComponent: GeographyIconV3
  },
  {
    id: '57',
    title: "Government & Diplomacy",
    slug: "government_diplomacy",
    ImgComponent: GovernmentIconV3
  },
  {
    id: '58',
    title: "Politics",
    slug: "politics",
    ImgComponent: PoliticsIconV3
  },
  {
    id: '59',
    title: "Defence, Missions",
    slug: "warfare",
    ImgComponent: WarfareIconV3
  },

  {
    id: '60',
    title: "Personalities",
    slug: "personalities",
    ImgComponent: PersonalitiesIconV3
  },
  {
    id: '61',
    title: "Accessories",
    slug: "accessories",
    ImgComponent: AccessoriesIconV3
  },

  /*  ******* *********** ********** ********************* */
  {
    id: '62',
    title: "Mathematics",
    slug: "math",
    ImgComponent: WarfareIconV3
  },
  /*  ******* *********** ********** ********************* */
 
  {
    id: '63',
    title: "Grammar",
    slug: "grammar",
    ImgComponent: BookIcon
  },
  {
    id: '64',
    title: "Vocabulary",
    slug: "vocabulary",
    ImgComponent: BookIcon
  }
];

export const LESSON_UNIT_DATA = [
  {
    id: '1',
    title: 'Practice',
    completion: 80,
    goal: 100,
    slug: "practice",
    ImgComponent: PracticeIconV3
  },
  {
    id: '2',
    title: 'Quiz',
    completion: 60,
    goal: 100,
    slug: "quiz",
    ImgComponent: QuizIconV3
  },
  {
    id: '3',
    title: 'Listening',
    completion: 40,
    goal: 100,
    slug: "listening",
    ImgComponent: ListeningIconV3
  },
  {
    id: '4',
    title: 'Reading',
    completion: 90,
    goal: 100,
    slug: "reading",
    ImgComponent: ReadingIconV3
  },
  {
    id: '5',
    title: 'Speaking',
    completion: 75,
    goal: 100,
    slug: "speaking",
    ImgComponent: SpeakingIconV3
  },
  {
    id: '6',
    title: 'Writing',
    completion: 45,
    goal: 100,
    slug: "writing",
    ImgComponent: WritingIconV3
  }
];

export const SETTINGS_DATA: SettingsData[] = [
  {
    subSettingTitle: "General",
    settingsElements: [
      {
        elementTitle: "Sound Effect",
        ImgComponent: null,
        actionType: "switcher",
        settingType: "sound_effect",
        route: "/settings"
      },
      {
        elementTitle: "Dark Mode",
        ImgComponent: null,
        actionType: "switcher",
        settingType: "toggle_theme",
        route: "/settings"
      }
    ]
  },
  {
    subSettingTitle: "Exercises",
    settingsElements: [
      {
        elementTitle: "Speaking Exercise",
        ImgComponent: null,
        actionType: "switcher",
        settingType: "speaking",
        route: "/settings"
      },
      {
        elementTitle: "Reading Exercise",
        ImgComponent: null,
        actionType: "switcher",
        settingType: "reading",
        route: "/settings"
      },
      {
        elementTitle: "Listening Exercise",
        ImgComponent: null,
        actionType: "switcher",
        settingType: "listening",
        route: "/settings"
      },
      {
        elementTitle: "Writing Exercise",
        ImgComponent: null,
        actionType: "switcher",
        settingType: "writing",
        route: "/settings"
      }
    ]
  },
  {
    subSettingTitle: "Notifications",
    settingsElements: [
      {
        elementTitle: "Practise Reminder",
        ImgComponent: null,
        actionType: "switcher",
        settingType: "push_notification",
        route: "/settings"
      }
    ]
  },
  {
    subSettingTitle: "Others",
    settingsElements: [
      {
        elementTitle: "Help Center",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/help-center",
      },
      {
        elementTitle: "Privacy Policy",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/privacy-policy",
      },
      {
        elementTitle: "Terms & Conditions",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/terms-and-conditions",
      },
      {
        elementTitle: "Achknowledgment",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/acknowledgment",
      },
      {
        elementTitle: "Feedback",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/feedback",
      }
    ]
  },
];
