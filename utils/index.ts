import SIZES from "@/constants/size";
import {
  ColorLegend,
  Feedback,
  MeasureCallback,
  LocalUnitType,
  APIUnitType,
  Category,
  LocalCategory,
  SessionType
} from "@/types";
import * as Speech from 'expo-speech';

/**
 * V3 - Category Icons
 */
import AccessoriesIconV3 from '@/assets/images/categories/v3/Accessesories.svg';
import ActivitiesIconV3 from '@/assets/images/categories/v3/Activities.svg';
import AirportIconV3 from '@/assets/images/categories/v3/Airport.svg';
import AlphabetIconV3 from '@/assets/images/categories/v3/Alphabates.svg';
import AnimalIconV3 from '@/assets/images/categories/v3/Animals.svg';
import BodyPartsIconV3 from '@/assets/images/categories/v3/Body-Parts.svg';
import BusinessIconV3 from '@/assets/images/categories/v3/Business.svg';
import CalendeIconV3 from '@/assets/images/categories/v3/Calender.svg';
import ColorsIconV3 from '@/assets/images/categories/v3/Colors.svg';
import ConstructionIconV3 from '@/assets/images/categories/v3/Construction.svg';
import CountryIconV3 from '@/assets/images/categories/v3/Country.svg';
import CultureIconV3 from '@/assets/images/categories/v3/Culture.svg';
import CountingMathMeasureIconV3 from '@/assets/images/categories/v3/Counting.svg';
import DeviceIconV3 from '@/assets/images/categories/v3/Device.svg';
import DirectionIconV3 from '@/assets/images/categories/v3/Direction.svg';
import DiseaseIconV3 from '@/assets/images/categories/v3/Disease.svg';
import DressIconV3 from '@/assets/images/categories/v3/Dress.svg';
import EducationIconV3 from '@/assets/images/categories/v3/Education.svg';
import EntertainmentIconV3 from '@/assets/images/categories/v3/Entertainment.svg';
import FamilyIconV3 from '@/assets/images/categories/v3/Family.svg';
import FlowerIconV3 from '@/assets/images/categories/v3/Flowers.svg';
import FoodIconV3 from '@/assets/images/categories/v3/Food.svg';
import GeographyIconV3 from '@/assets/images/categories/v3/Geography.svg';
import GovernmentIconV3 from '@/assets/images/categories/v3/Goverment.svg';
import GreetingsIconV3 from '@/assets/images/categories/v3/Greetings.svg';
import HistoryIconV3 from '@/assets/images/categories/v3/History.svg';
import HobbyIconV3 from '@/assets/images/categories/v3/Hobby.svg';
import HotelIconV3 from '@/assets/images/categories/v3/Hotel.svg';
import HouseIconV3 from '@/assets/images/categories/v3/House.svg';
import IntroIconV3 from '@/assets/images/categories/v3/Introduction.svg';
import InvitationIconV3 from '@/assets/images/categories/v3/Invitation.svg';
import LandscapesIconV3 from '@/assets/images/categories/v3/Landscape.svg';
import MaterialsIconV3 from '@/assets/images/categories/v3/Materials.svg';
import MedicalIconV3 from '@/assets/images/categories/v3/Medical.svg';
import MusicIconV3 from '@/assets/images/categories/v3/Music.svg';
import NaturalDisastersIconV3 from '@/assets/images/categories/v3/Natural-Disaster.svg';
import NatureIconV3 from '@/assets/images/categories/v3/Nature.svg';
import NewspaperIconV3 from '@/assets/images/categories/v3/News.svg';
import NumberIconV3 from '@/assets/images/categories/v3/Numbers.svg';
import OfficeIconV3 from '@/assets/images/categories/v3/Office.svg';
import OpinionIconV3 from '@/assets/images/categories/v3/Opinion.svg';
import PassportIconV3 from '@/assets/images/categories/v3/Passport.svg';
import PersonalitiesIconV3 from '@/assets/images/categories/v3/Personalities.svg';
import PoliticsIconV3 from '@/assets/images/categories/v3/Politics.svg';
import PreferencesIconV3 from '@/assets/images/categories/v3/Preference.svg';
import RestaurantIconV3 from '@/assets/images/categories/v3/Restaurant.svg';
import ScienceIconV3 from '@/assets/images/categories/v3/science.svg';
import SeasonsIconV3 from '@/assets/images/categories/v3/Season.svg';
import ShoppingIconV3 from '@/assets/images/categories/v3/Shopping.svg';
import SpaceIconV3 from '@/assets/images/categories/v3/Space.svg';
import SportsIconV3 from '@/assets/images/categories/v3/Sports.svg';
import TechnologyIconV3 from '@/assets/images/categories/v3/Technology.svg';
import TeleCommunicationIconV3 from '@/assets/images/categories/v3/Telephone-conversation.svg';
import TimeIconV3 from '@/assets/images/categories/v3/Time.svg';
import ToolsIconV3 from '@/assets/images/categories/v3/Tools.svg';
import TransportationIconV3 from '@/assets/images/categories/v3/Transportation.svg';
import TravelIconV3 from '@/assets/images/categories/v3/Travel.svg';
import VehicleIconV3 from '@/assets/images/categories/v3/Vehicles.svg';
import WarfareIconV3 from '@/assets/images/categories/v3/Warfare.svg';
import WeatherIconV3 from '@/assets/images/categories/v3/weather.svg';
import WorkIconV3 from '@/assets/images/categories/v3/Work.svg';
import { makeMutable, SharedValue } from 'react-native-reanimated';
import { findNodeHandle, UIManager } from "react-native";
import api from "@/lib/api";

export const createEqualizerBars = (count: number): SharedValue<number>[] => {
  return Array.from({ length: count }, () => makeMutable(0));
};

export const textToolTipHandler = async () => {}

export const calculateSimilarity = (a: string, b: string) => {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  const same = longer.split("").filter((c, i) => shorter[i] === c).length;
  return same / longerLength;
};

export const getFeedback = (score: number, spoken: string) => {
  if (!spoken) return "No speech detected.";
  if (score > 0.9) return `✅ Perfect! You said: "${spoken}"`;
  if (score > 0.7) return `👍 Close! You said: "${spoken}"`;
  return `😕 Needs work. You said: "${spoken}"`;
};

// TEXT_TO_SPEECH
export  const speechFastHandler = async (
  speechContent: string | undefined,
  speechLang: string | undefined
) => {
  Speech.speak(
    speechContent || "Hallo!",
    {
      language: speechLang || "de-DE",
      rate: 1.75, // Normal Speed
      pitch: 1.2,// Deep Tone
      volume: 1 // High
    }
  )
}

export const speechHandler = async (
  speechContent: string | undefined,
  speechLang: string | undefined,
  onLoading?: (isLoading: boolean) => void
) => {
  Speech.speak(speechContent || "Hallo!", {
    language: speechLang || "de-DE",
    rate: 1,
    pitch: 1.2,
    volume: 1,
    onStart: () => {
      // setLoading?.(false)
      onLoading?.(false)
    },
    onDone: () => {
      onLoading?.(false)
    },
    onStopped: () => {
      onLoading?.(false)
    },
    onError: () => {
      onLoading?.(false)
    },
  });
  // setTimeout(() => setLoading?.(false), 8000);
};

export  const speechSlowHandler = async (
  speechContent: string | undefined,
  speechLang: string | undefined,
  setLoading?: (val: boolean) => void
) => {
  // await warmUpSpeech();
  setLoading?.(true);
  Speech.speak(
    speechContent || "Hallo!",
    {
      language: speechLang || "de-DE",
      rate: 0.2, // Normal Speed
      pitch: 1.2,// Deep Tone
      volume: 1, // High
      onStart: () => setLoading?.(false),
      onDone: () => setLoading?.(false),
      onError: () => setLoading?.(false),
    }
  );
  setTimeout(() => setLoading?.(false), 8000);
}

/* ************************************************************************ */
// utils/generateWavePattern.ts
export function generateWavePattern(text: string) {
  if (!text) return [1, 2, 3, 2, 1];

  const words = text.split(/\s+/);

  return words.map((word) => {
    let intensity = word.length;

    // punctuation → shape & emphasis
    if (/!$/.test(word)) intensity += 4;        // strong emphasis
    else if (/\?$/.test(word)) intensity += 2;  // rising tone
    else if (/,/.test(word)) intensity -= 1;    // slight pause

    // Add small randomness for organic feel
    intensity += Math.floor(Math.random() * 3); // ±2 random variation

    // cap intensity between 2–10 for animation bounds
    return Math.max(2, Math.min(intensity, 10));
  });
}

export const getCardContainerWidth =  () =>  (SIZES.screenWidth - ( (SIZES.bodyPaddingHorizontal*2) + SIZES.cardGap )) / 2;
// export const getMarginValue =  ({id}: {id: string}) =>  ( parseInt(id) % 2 !== 0) ? SIZES.cardGap : 0;

export const stripPunctuationHandler = (word: string) => word.replace(/[.,!?;:()"'„“]/g, "")

export const color_legend: ColorLegend = {
  subject: "#1E90FF",
  main_verb: "#32CD32",
  modal_verb: "#2E8B57",
  subordinate_verb: "#228B22",
  direct_object: "#FF6347",
  indirect_object: "#BA55D3",
  conjunction: "#9932CC",
  place: "#FF8C00",
  preposition_article: "#FFD700",
  possessive_article: "#DA70D6",
  adverb: "#FFA500",
  introgetive_adverb: "#08c721ff",
  time_adverb: "#FFA500",
  article: "#FFD700",
  adjective: "#ffa640ff",
}

export const categoryIcon = {
  accessories: AccessoriesIconV3,
  activities: ActivitiesIconV3,
  airport: AirportIconV3,
  alphabets: AlphabetIconV3,
  animals: AnimalIconV3,
  body_parts: BodyPartsIconV3,
  business_and_services: BusinessIconV3,
  calendar: CalendeIconV3,
  colors: ColorsIconV3,
  countries: CountryIconV3,
  count_measurement: CountingMathMeasureIconV3,
  construction: ConstructionIconV3,
  culture: CultureIconV3,
  devices: DeviceIconV3,
  diseases: DiseaseIconV3,
  dresses: DressIconV3,
  education: EducationIconV3,
  embbacy_passport: PassportIconV3,
  entertainment: EntertainmentIconV3,
  family: FamilyIconV3,
  flowers: FlowerIconV3,
  foods: FoodIconV3,
  geography: GeographyIconV3,
  government_diplomacy: GovernmentIconV3,
  // grammar: BookIcon,
  greetings: GreetingsIconV3,
  hobbies: HobbyIconV3,
  history: HistoryIconV3,
  hotel: HotelIconV3,
  house: HouseIconV3,
  introduction: IntroIconV3,
  invitations: InvitationIconV3,
  landscape: LandscapesIconV3,
  locations: DirectionIconV3,
  materials: MaterialsIconV3,
  math: CountingMathMeasureIconV3,
  medical_emergency: MedicalIconV3,
  music: MusicIconV3,
  nature: NatureIconV3,
  natural_disasters: NaturalDisastersIconV3,
  news: NewspaperIconV3,
  numbers: NumberIconV3,
  office_corporates: OfficeIconV3,
  opinions: OpinionIconV3,
  personalities: PersonalitiesIconV3,
  politics: PoliticsIconV3,
  preference: PreferencesIconV3,
  professions: WorkIconV3,
  restaurant: RestaurantIconV3,
  shopping: ShoppingIconV3,
  seasons: SeasonsIconV3,
  science: ScienceIconV3,
  space: SpaceIconV3,
  sports: SportsIconV3,
  technology: TechnologyIconV3,
  time: TimeIconV3,
  tools: ToolsIconV3,
  transportation: TransportationIconV3,
  travels: TravelIconV3,
  tele_conversation: TeleCommunicationIconV3,
  vehicles: VehicleIconV3,
  // vocabulary: BookIcon,
  warfare: WarfareIconV3,
  weather: WeatherIconV3,
  work: WorkIconV3,
}

export const isToday = (unixSeconds: number) => {
  const date = new Date(unixSeconds * 1000);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

export const formatDuration = (ms?: number) => {
  if (!ms) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const msToMinutes = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const truncateString = ( str: string, maxLength: number ) => {
  if (str.length > maxLength) {
    // Truncate the string to the maximum length
    let truncated = str.substring(0, maxLength); //

    // Optional: Prevent cutting words in half by finding the last space
    // If we can find a space before the cutoff, truncate there
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      truncated = truncated.substring(0, lastSpaceIndex);
    }
    
    return truncated + '...';
  }
  return str;
}

export const measureInWindowSafe = (
  ref: unknown,
  callback: MeasureCallback
) => {
  if (!ref) return;

  // If it's already a native handle (number)
  if (typeof ref === "number") {
    UIManager.measureInWindow(ref, callback);
    return;
  }

  // If it's a ref object with a native node
  const handle = findNodeHandle(ref as any);
  if (handle) {
    UIManager.measureInWindow(handle, callback);
  }
};

export const confidenceColor = (avgLogProb: number) => {
  if (avgLogProb > -0.5) return "green";
  if (avgLogProb > -0.8) return "orange";
  return "red";
}

export const feedbackComments = (similarity: number): Feedback => {
  if (similarity >= 0.95) {
    return {
      label: "Outstanding 🎉",
      color: "#2E7D32", // dark green
    };
  }

  if (similarity >= 0.9) {
    return {
      label: "Excellent ✅",
      color: "#388E3C", // green
    };
  }

  if (similarity >= 0.8) {
    return {
      label: "Very Good 👍",
      color: "#689F38", // light green
    };
  }

  if (similarity >= 0.7) {
    return {
      label: "Good 🙂",
      color: "#FBC02D", // yellow
    };
  }

  if (similarity >= 0.6) {
    return {
      label: "Fair – Keep Practicing 💪",
      color: "#FB8C00", // orange
    };
  }

  return {
    label: "Needs Improvement ❗",
    color: "#E53935", // red
  };
};


const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};

// universal normalize function for all collections
export const normalizeId = <T extends { _id: string }>(item: T) => ({ id: item._id, ...item });
export const normalizeIds = <T extends { _id: string }>(items: T[]) => items.map(normalizeId);

// Generic mapping helper
// For a single item
export const normalizeMongoId = <T extends { _id: string }>(item: T) => {
  const { _id, ...rest } = item;
  return { id: _id, ...rest };
};

// For an array of items
export const normalizeLessonData = <T extends { _id: string }>(items: T[]) => items.map(normalizeMongoId);

export const normalizeCategories = (categories: Category[]): LocalCategory[] => {
  return categories.map(cat => ({
    id: cat._id,               // map _id → id
    title: cat.title,
    slug: cat.slug,
    position_at: cat.position_at
  }));
};

export const normalizeUnits = (units: APIUnitType[]): LocalUnitType[] => {
  return units.map(u => ({
    id: u._id,               // map _id → id
    category_id: u.categoryId, // map categoryId → category_id
    title: u.title,
    slug: u.slug
  }));
};

// BackendLesson is your API shape
export const normalizeLessons = <T extends { _id: string; categoryId: string; unitId: string }>(
  lessons: T[],
  type: SessionType
) =>
  lessons.map(l => ({
    id: l._id,
    unit_id: l.unitId,
    category_id: l.categoryId,
    type,
    payload: JSON.stringify(l),
    updated_at: Date.now(),
    dirty: 0,
  })
);

export const denormalizeLesson = <T>(lessonPayload: string): T => {
  return JSON.parse(lessonPayload) as T;
};