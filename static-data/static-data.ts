import { Images } from '@/constants/images';
import { MilestonesType, SettingsData, SettingsFieldType } from '@/types';
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
  // FeedbackLightIcon,
  // FeedbackDarkIcon,
  ListeningDarkIcon,
  ListeningLightIcon,
  WritingLightIcon,
  WritingDarkIcon
} from '@/utils/SVGImages'

export const CATEGORY_DATA_V3 = [
  {
    id: '1',
    title: "Alphabets",
    slug: "alphabets",
  },
  {
    id: '2',
    title: "Numbers",
    slug: "numbers",
  },
  {
    id: '3',
    title: "Colors",
    slug: "colors",
  },
  {
    id: '4',
    title: "Greetings",
    slug: "greetings",
  },
  {
    id: '5',
    title: "Introductions",
    slug: "introduction",
  },
  {
    id: '6',
    title: "Time",
    slug: "time",
  },
  {
    id: '7',
    title: "Calendar",
    slug: "calendar",
  },
  {
    id: '8',
    title: "Family & Friends",
    slug: "family",
  },
  {
    id: '9',
    title: "Body Parts",
    slug: "body_parts",
  },
  {
    id: '10',
    title: "House",
    slug: "house",
  },
  {
    id: '11',
    title: "Food & Drinks",
    slug: "foods",
  },
  {
    id: '12',
    title: "Dresses",
    slug: "dresses",
  },
  {
    id: '13',
    title: "Weather",
    slug: "weather",
  },
  {
    id: '14',
    title: "Seasons",
    slug: "seasons",
  },
  {
    id: '15',
    title: "Preference",
    slug: "preference",
  },
  {
    id: '16',
    title: "Animals",
    slug: "animals",
  },
  {
    id: '17',
    title: "Nature",
    slug: "nature",
  },
  {
    id: '18',
    title: "Flowers",
    slug: "flowers",
  },
  {
    id: '19',
    title: "Landscapes",
    slug: "Landscape",
  },
  {
    id: '20',
    title: "Activities",
    slug: "activities",
  },
  {
    id: '21',
    title: "Hobbies",
    slug: "hobbies",
  },
  {
    id: '22',
    title: "Music",
    slug: "music",
  },
  {
    id: '23',
    title: "Tools",
    slug: "tools",
  },
  {
    id: '24',
    title: "Transportation",
    slug: "transportation",
  },
  {
    id: '25',
    title: "Vehicles",
    slug: "vehicles",
  },
  {
    id: '26',
    title: "Directions",
    slug: "locations",
  },
  {
    id: '27',
    title: "Shopping",
    slug: "shopping",
  },
  {
    id: '28',
    title: "Restaurants",
    slug: "restaurant",
  },
  {
    id: '29',
    title: "Hotels",
    slug: "hotel",
  },
  {
    id: '30',
    title: "Telephone Conversations",
    slug: "tele_conversation",
  },
  {
    id: '31',
    title: "Countries",
    slug: "countries",
  },
  {
    id: '32',
    title: "Travel",
    slug: "travels",
  },
  {
    id: '33',
    title: "Airport",
    slug: "airport",
  },
  {
    id: '34',
    title: "Ambassy & Passport",
    slug: "embbacy_passport",
  },
  {
    id: '35',
    title: "Medical Emergencies",
    slug: "medical_emergency",
  },
  {
    id: '36',
    title: "Diseases",
    slug: "diseases",
  },
  {
    id: '37',
    title: "Work & Profession",
    slug: "professions",
  },
  {
    id: '38',
    title: "Businesses & Services",
    slug: "business_and_services",
  },
  {
    id: '39',
    title: "Education",
    slug: "education",
  },
  {
    id: '40',
    title: "Opinions",
    slug: "opinions",
  },
  {
    id: '41',
    title: "Invitations",
    slug: "invitations",
  },
  {
    id: '42',
    title: "Culture & Festivals",
    slug: "culture",
  },
  {
    id: '43',
    title: "Entertainment",
    slug: "entertainment",
  },
  {
    id: '44',
    title: "Sports",
    slug: "sports",
  },
  {
    id: '45',
    title: "Office & Corporates",
    slug: "office_corporates",
  },
  {
    id: '46',
    title: "Technology",
    slug: "technology",
  },
  {
    id: '47',
    title: "News & Media",
    slug: "news",
  },
  {
    id: '48',
    title: "Devices",
    slug: "devices",
  },
  {
    id: '49',
    title: "Counting, Mathematics & Measurements",
    slug: "count_measurement",
  },
  {
    id: '50',
    title: "Science",
    slug: "science",
  },
  {
    id: '51',
    title: "Space & Astronomy",
    slug: "space",
  },
  {
    id: '52',
    title: "Construction",
    slug: "construction",
  },
  {
    id: '53',
    title: "Natural Disasters",
    slug: "natural_disasters",
  },
  {
    id: '54',
    title: "History",
    slug: "history",
  },
  {
    id: '55',
    title: "Materials",
    slug: "materials",
  },
  {
    id: '56',
    title: "Geography",
    slug: "geography",
  },
  {
    id: '57',
    title: "Government & Diplomacy",
    slug: "government_diplomacy",
  },
  {
    id: '58',
    title: "Politics",
    slug: "politics",
  },
  {
    id: '59',
    title: "Defence, Missions",
    slug: "warfare",
  },

  {
    id: '60',
    title: "Personalities",
    slug: "personalities",
  },
  {
    id: '61',
    title: "Accessories",
    slug: "accessories",
  },

  /*  ******* *********** ********** ********************* */
  {
    id: '62',
    title: "Mathematics",
    slug: "math",
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
    slug: "practice",
  },
  {
    id: '2',
    title: 'Quiz',
    slug: "quiz",
  },
  {
    id: '3',
    title: 'Listening',
    slug: "listening",
  },
  {
    id: '4',
    title: 'Reading',
    slug: "reading",
  },
  {
    id: '5',
    title: 'Speaking',
    slug: "speaking",
  },
  {
    id: '6',
    title: 'Writing',
    slug: "writing",
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
        settingType: "speaking_service",
        route: "/settings"
      },
      {
        elementTitle: "Reading Exercise",
        ImgComponentLight: ReadingLightIcon,
        ImgComponentDark: ReadingDarkIcon,
        actionType: "switcher",
        settingType: "reading_service",
        route: "/settings"
      },
      {
        elementTitle: "Writing Exercise",
        ImgComponentLight: WritingLightIcon,
        ImgComponentDark: WritingDarkIcon,
        actionType: "switcher",
        settingType: "writing_service",
        route: "/settings"
      },
      {
        elementTitle: "Listening Exercise",
        ImgComponentLight: ListeningLightIcon,
        ImgComponentDark: ListeningDarkIcon,
        actionType: "switcher",
        settingType: "listening_service",
        route: "/settings"
      }
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
        settingType: "notifications",
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
        route: "/dashboard/settings/others/help-center",
      },
      {
        elementTitle: "Privacy Policy",
        ImgComponentLight: PrivacyLightIcon,
        ImgComponentDark: PrivacyDarkIcon,
        actionType: "router",
        route: "/dashboard/settings/others/privacy-policy",
      },
      {
        elementTitle: "Terms & Conditions",
        ImgComponentLight: TermLightIcon,
        ImgComponentDark: TermDarkIcon,
        actionType: "router",
        route: "/dashboard/settings/others/terms-and-conditions",
      },
      {
        elementTitle: "Achknowledgment",
        ImgComponentLight: AcknowledgementLightIcon,
        ImgComponentDark: AcknoledgementDarkIcon,
        actionType: "router",
        route: "/dashboard/settings/others/acknowledgment",
      },
      // {
      //   elementTitle: "Feedback",
      //   ImgComponentLight: FeedbackLightIcon,
      //   ImgComponentDark: FeedbackDarkIcon,
      //   actionType: "router",
      //   settingType: null,
      //   route: "/dashboard/settings/others/feedback",
      // }
    ]
  },
];

export const milestonesData: MilestonesType[] = [
    {
        id: 1,
        title: "3 Day",
        description: "You’re moving forward.",
        isFeatured: true,
        milestones: 3,
        icon: Images.dashboard.milestone_3,
    },
    {
        id: 2,
        title: "7 Day",
        description: "You’re finding your rhythm.",
        isFeatured: true,
        milestones: 7,
        icon: Images.dashboard.milestone_7,
    },
    {
        id: 3,
        title: "14 Day",
        description: "You’re building momentum.",
        isFeatured: false,
        milestones: 14,
        icon: Images.dashboard.milestone_14,
    },
    {
        id: 4,
        title: "21 Day",
        description: "It’s starting to flow.",
        isFeatured: false,
        milestones: 21,
        icon: Images.dashboard.milestone_21,
    },
    {
        id: 5,
        title: "30 Day",
        description: "Confidence is growing.",
        isFeatured: false,
        milestones: 30,
        icon: Images.dashboard.milestone_30,
    },
    {
        id: 6,
        title: "50 Day",
        description: "It feels familiar now.",
        isFeatured: false,
        milestones: 50,
        icon: Images.dashboard.milestone_50,
    },
    {
        id: 7,
        title: "100 Day",
        description: "What felt hard is now possible.",
        isFeatured: false,
        milestones: 100,
        icon: Images.dashboard.milestone_100,
    }
];