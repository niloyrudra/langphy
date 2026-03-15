import { Images } from '@/constants/images';
import { MilestonesType, SettingsData } from '@/types';
import {
  SoundEffectLightIcon,
  SoundEffectDarkIcon,
  ReadingLightIcon,
  ReadingDarkIcon,
  SpeakingDarkIcon,
  SpeakingLightIcon,
  ThemeLightIcon,
  ThemeDarkIcon,
  AcknoledgementDarkIcon,
  AcknowledgementLightIcon,
  PracticeLightIcon,
  PracticDarkIcon,
  HelpDarkIcon,
  HelpLightIcon,
  PrivacyLightIcon,
  PrivacyDarkIcon,
  TermDarkIcon,
  TermLightIcon,
  FeedbackLightIcon,
  FeedbackDarkIcon,
  ListeningDarkIcon,
  ListeningLightIcon
} from '@/utils/SVGImages'

export const CATEGORY_DATA_V3 = [
  {
    id: '1',
    title: "Alphabets",
    slug: "alphabets",
    // ImgComponent: AlphabetIconV3
  },
  {
    id: '2',
    title: "Numbers",
    slug: "numbers",
    // ImgComponent: NumberIconV3
  },
  {
    id: '3',
    title: "Colors",
    slug: "colors",
    // ImgComponent: ColorsIconV3
  },
  {
    id: '4',
    title: "Greetings",
    slug: "greetings",
    // ImgComponent: GreetingsIconV3
  },
  {
    id: '5',
    title: "Introductions",
    slug: "introduction",
    // ImgComponent: IntroIconV3
  },
  {
    id: '6',
    title: "Time",
    slug: "time",
    // ImgComponent: TimeIconV3
  },
  {
    id: '7',
    title: "Calendar",
    slug: "calendar",
    // ImgComponent: CalendeIconV3
  },
  {
    id: '8',
    title: "Family & Friends",
    slug: "family",
    // ImgComponent: FamilyIconV3
  },
  {
    id: '9',
    title: "Body Parts",
    slug: "body_parts",
    // ImgComponent: BodyPartsIconV3
  },
  {
    id: '10',
    title: "House",
    slug: "house",
    // ImgComponent: HouseIconV3
  },
  {
    id: '11',
    title: "Food & Drinks",
    slug: "foods",
    // ImgComponent: FoodIconV3
  },
  {
    id: '12',
    title: "Dresses",
    slug: "dresses",
    // ImgComponent: DressIconV3
  },
  {
    id: '13',
    title: "Weather",
    slug: "weather",
    // ImgComponent: WeatherIconV3
  },
  {
    id: '14',
    title: "Seasons",
    slug: "seasons",
    // ImgComponent: SeasonsIconV3
  },
  {
    id: '15',
    title: "Preference",
    slug: "preference",
    // ImgComponent: PreferencesIconV3
  },
  {
    id: '16',
    title: "Animals",
    slug: "animals",
    // ImgComponent: AnimalIconV3
  },
  {
    id: '17',
    title: "Nature",
    slug: "nature",
    // ImgComponent: NatureIconV3
  },
  {
    id: '18',
    title: "Flowers",
    slug: "flowers",
    // ImgComponent: FlowerIconV3
  },
  {
    id: '19',
    title: "Landscapes",
    slug: "Landscape",
    // ImgComponent: LandscapesIconV3
  },
  {
    id: '20',
    title: "Activities",
    slug: "activities",
    // ImgComponent: ActivitiesIconV3
  },
  {
    id: '21',
    title: "Hobbies",
    slug: "hobbies",
    // ImgComponent: HobbyIconV3
  },
  {
    id: '22',
    title: "Music",
    slug: "music",
    // ImgComponent: MusicIconV3
  },
  {
    id: '23',
    title: "Tools",
    slug: "tools",
    // ImgComponent: ToolsIconV3
  },
  {
    id: '24',
    title: "Transportation",
    slug: "transportation",
    // ImgComponent: TransportationIconV3
  },
  {
    id: '25',
    title: "Vehicles",
    slug: "vehicles",
    // ImgComponent: VehicleIconV3
  },
  {
    id: '26',
    title: "Directions",
    slug: "locations",
    // ImgComponent: DirectionIconV3
  },
  {
    id: '27',
    title: "Shopping",
    slug: "shopping",
    // ImgComponent: ShoppingIconV3
  },
  {
    id: '28',
    title: "Restaurants",
    slug: "restaurant",
    // ImgComponent: RestaurantIconV3
  },
  {
    id: '29',
    title: "Hotels",
    slug: "hotel",
    // ImgComponent: HotelIconV3
  },
  {
    id: '30',
    title: "Telephone Conversations",
    slug: "tele_conversation",
    // ImgComponent: TeleCommunicationIconV3
  },
  {
    id: '31',
    title: "Countries",
    slug: "countries",
    // ImgComponent: CountryIconV3
  },
  {
    id: '32',
    title: "Travel",
    slug: "travels",
    // ImgComponent: TravelIconV3
  },
  {
    id: '33',
    title: "Airport",
    slug: "airport",
    // ImgComponent: AirportIconV3
  },
  {
    id: '34',
    title: "Ambassy & Passport",
    slug: "embbacy_passport",
    // ImgComponent: PassportIconV3
  },
  {
    id: '35',
    title: "Medical Emergencies",
    slug: "medical_emergency",
    // ImgComponent: MedicalIconV3
  },
  {
    id: '36',
    title: "Diseases",
    slug: "diseases",
    // ImgComponent: DiseaseIconV3
  },
  {
    id: '37',
    title: "Work & Profession",
    slug: "professions",
    // ImgComponent: WorkIconV3
  },
  {
    id: '38',
    title: "Businesses & Services",
    slug: "business_and_services",
    // ImgComponent: BusinessIconV3
  },
  {
    id: '39',
    title: "Education",
    slug: "education",
    // ImgComponent: EducationIconV3
  },
  {
    id: '40',
    title: "Opinions",
    slug: "opinions",
    // ImgComponent: OpinionIconV3
  },
  {
    id: '41',
    title: "Invitations",
    slug: "invitations",
    // ImgComponent: InvitationIconV3
  },
  {
    id: '42',
    title: "Culture & Festivals",
    slug: "culture",
    // ImgComponent: CultureIconV3
  },
  {
    id: '43',
    title: "Entertainment",
    slug: "entertainment",
    // ImgComponent: EntertainmentIconV3
  },
  {
    id: '44',
    title: "Sports",
    slug: "sports",
    // ImgComponent: SportsIconV3
  },
  {
    id: '45',
    title: "Office & Corporates",
    slug: "office_corporates",
    // ImgComponent: OfficeIconV3
  },
  {
    id: '46',
    title: "Technology",
    slug: "technology",
    // ImgComponent: TechnologyIconV3
  },
  {
    id: '47',
    title: "News & Media",
    slug: "news",
    // ImgComponent: NewspaperIconV3
  },
  {
    id: '48',
    title: "Devices",
    slug: "devices",
    // ImgComponent: DeviceIconV3
  },
  {
    id: '49',
    title: "Counting, Mathematics & Measurements",
    slug: "count_measurement",
    // ImgComponent: CountingMathMeasureIconV3
  },
  {
    id: '50',
    title: "Science",
    slug: "science",
    // ImgComponent: ScienceIconV3
  },
  {
    id: '51',
    title: "Space & Astronomy",
    slug: "space",
    // ImgComponent: SpaceIconV3
  },
  {
    id: '52',
    title: "Construction",
    slug: "construction",
    // ImgComponent: ConstructionIconV3
  },
  {
    id: '53',
    title: "Natural Disasters",
    slug: "natural_disasters",
    // ImgComponent: NaturalDisastersIconV3
  },
  {
    id: '54',
    title: "History",
    slug: "history",
    // ImgComponent: HistoryIconV3
  },
  {
    id: '55',
    title: "Materials",
    slug: "materials",
    // ImgComponent: MaterialsIconV3
  },
  {
    id: '56',
    title: "Geography",
    slug: "geography",
    // ImgComponent: GeographyIconV3
  },
  {
    id: '57',
    title: "Government & Diplomacy",
    slug: "government_diplomacy",
    // ImgComponent: GovernmentIconV3
  },
  {
    id: '58',
    title: "Politics",
    slug: "politics",
    // ImgComponent: PoliticsIconV3
  },
  {
    id: '59',
    title: "Defence, Missions",
    slug: "warfare",
    // ImgComponent: WarfareIconV3
  },

  {
    id: '60',
    title: "Personalities",
    slug: "personalities",
    // ImgComponent: PersonalitiesIconV3
  },
  {
    id: '61',
    title: "Accessories",
    slug: "accessories",
    // ImgComponent: AccessoriesIconV3
  },

  /*  ******* *********** ********** ********************* */
  {
    id: '62',
    title: "Mathematics",
    slug: "math",
    // ImgComponent: WarfareIconV3
  },
  /*  ******* *********** ********** ********************* */
 
  // {
  //   id: '63',
  //   title: "Grammar",
  //   slug: "grammar",
  //   ImgComponent: BookIcon
  // },
  // {
  //   id: '64',
  //   title: "Vocabulary",
  //   slug: "vocabulary",
  //   ImgComponent: BookIcon
  // }
];

export const LESSON_UNIT_DATA = [
  {
    id: '1',
    title: 'Practice',
    completion: 80,
    goal: 100,
    slug: "practice",
    // ImgComponent: PracticeIconV3
  },
  {
    id: '2',
    title: 'Quiz',
    completion: 60,
    goal: 100,
    slug: "quiz",
    // ImgComponent: QuizIconV3
  },
  {
    id: '3',
    title: 'Listening',
    completion: 40,
    goal: 100,
    slug: "listening",
    // ImgComponent: ListeningIconV3
  },
  {
    id: '4',
    title: 'Reading',
    completion: 90,
    goal: 100,
    slug: "reading",
    // ImgComponent: ReadingIconV3
  },
  {
    id: '5',
    title: 'Speaking',
    completion: 75,
    goal: 100,
    slug: "speaking",
    // ImgComponent: SpeakingIconV3
  },
  {
    id: '6',
    title: 'Writing',
    completion: 45,
    goal: 100,
    slug: "writing",
    // ImgComponent: WritingIconV3
  }
];

export const SETTINGS_DATA: SettingsData[] = [
  {
    title: "General",
    data: [
      {
        elementTitle: "Sound Effect",
        ImgComponentLight: SoundEffectLightIcon,
        ImgComponentDark: SoundEffectDarkIcon,
        actionType: "switcher",
        settingType: "sound_effect",
        route: "/settings"
      },
      {
        elementTitle: "Dark Mode",
        ImgComponentLight: ThemeLightIcon,
        ImgComponentDark: ThemeDarkIcon,
        actionType: "switcher",
        settingType: "theme",
        route: "/settings"
      }
    ]
  },
  {
    title: "Exercises",
    data: [
      {
        elementTitle: "Speaking Exercise",
        ImgComponentLight: SpeakingLightIcon,
        ImgComponentDark: SpeakingDarkIcon,
        actionType: "switcher",
        settingType: "speaking",
        route: "/settings"
      },
      {
        elementTitle: "Reading Exercise",
        ImgComponentLight: ReadingLightIcon,
        ImgComponentDark: ReadingDarkIcon,
        actionType: "switcher",
        settingType: "reading",
        route: "/settings"
      },
      {
        elementTitle: "Writing Exercise",
        ImgComponentLight: ReadingLightIcon,
        ImgComponentDark: ReadingDarkIcon,
        actionType: "switcher",
        settingType: "writing",
        route: "/settings"
      },
      {
        elementTitle: "Listening Exercise",
        ImgComponentLight: ListeningLightIcon,
        ImgComponentDark: ListeningDarkIcon,
        actionType: "switcher",
        settingType: "listening",
        route: "/settings"
      },
      // {
      //   elementTitle: "Writing Exercise",
      //   ImgComponentLight: null,
      //   ImgComponentDark: null,
      //   actionType: "switcher",
      //   settingType: "writing",
      //   route: "/settings"
      // }
    ]
  },
  {
    title: "Notifications",
    data: [
      {
        elementTitle: "Practise Reminder",
        ImgComponentLight: PracticeLightIcon,
        ImgComponentDark: PracticDarkIcon,
        actionType: "switcher",
        settingType: "push_notification",
        route: "/settings"
      }
    ]
  },
  {
    title: "Others",
    data: [
      {
        elementTitle: "Help Center",
        ImgComponentLight: HelpLightIcon,
        ImgComponentDark: HelpDarkIcon,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/help-center",
      },
      {
        elementTitle: "Privacy Policy",
        ImgComponentLight: PrivacyLightIcon,
        ImgComponentDark: PrivacyDarkIcon,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/privacy-policy",
      },
      {
        elementTitle: "Terms & Conditions",
        ImgComponentLight: TermLightIcon,
        ImgComponentDark: TermDarkIcon,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/terms-and-conditions",
      },
      {
        elementTitle: "Achknowledgment",
        ImgComponentLight: AcknowledgementLightIcon,
        ImgComponentDark: AcknoledgementDarkIcon,
        actionType: "router",
        settingType: "*",
        route: "/dashboard/settings/others/acknowledgment",
      },
      // {
      //   elementTitle: "Feedback",
      //   ImgComponentLight: FeedbackLightIcon,
      //   ImgComponentDark: FeedbackDarkIcon,
      //   actionType: "router",
      //   settingType: "*",
      //   route: "/dashboard/settings/others/feedback",
      // }
    ]
  },
];

export const milestonesData: MilestonesType[] = [
    {
        id: 1,
        milestonesTitle: "3 Day",
        isFeatured: true,
        milestones: 3,
        icon: Images.dashboard.milestone_3,
    },
    {
        id: 2,
        milestonesTitle: "7 Day",
        isFeatured: true,
        milestones: 7,
        icon: Images.dashboard.milestone_7,
    },
    {
        id: 3,
        milestonesTitle: "14 Day",
        isFeatured: false,
        milestones: 14,
        icon: Images.dashboard.milestone_14,
    },
    {
        id: 4,
        milestonesTitle: "30 Day",
        isFeatured: false,
        milestones: 30,
        icon: Images.dashboard.milestone_30,
    },
    {
        id: 5,
        milestonesTitle: "50 Day",
        isFeatured: false,
        milestones: 50,
        icon: Images.dashboard.milestone_50,
    },
    {
        id: 6,
        milestonesTitle: "100 Day",
        isFeatured: false,
        milestones: 100,
        icon: Images.dashboard.milestone_100,
    }
];