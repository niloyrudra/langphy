import SIZES from "@/constants/size";
import dbJson from '@/db/db.json'; // or .ts export
import { ColorLegend, DB } from "@/types";
import { StudyingDolphinIcon } from '@/utils/SVGImages'
import * as Speech from 'expo-speech'

let speechReady = false;

export const warmUpSpeech = async () => {
  if (speechReady) return;
  await new Promise((resolve) => {
    Speech.speak(" ", {
      language: "de-DE",
      rate: 1,
      onDone: () => {
        Speech.stop();
        speechReady = true;
        resolve(true);
      },
    });
  });
};

export  const speechFastHandler = async (
  speechContent: string | undefined,
  speechLang: string | undefined
) => {
  await warmUpSpeech();
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
  setLoading?: (val: boolean) => void
) => {
  // await warmUpSpeech();
  setLoading?.(true);
  Speech.speak(speechContent || "Hallo!", {
    language: speechLang || "de-DE",
    rate: 1,
    pitch: 1.2,
    volume: 1,
    onStart: () => setLoading?.(false),
    onDone: () => setLoading?.(false),
    onError: () => setLoading?.(false),
  });
  setTimeout(() => setLoading?.(false), 8000);
};


// export  const speechHandler = (speechContent: string | undefined, speechLang: string | undefined) => {
//   Speech.speak(
//     speechContent || "Hallo!",
//     {
//       language: speechLang || "de-DE",
//       rate: 1, // Normal Speed
//       pitch: 1.2,// Deep Tone
//       volume: 1 // High
//     }
//   )
// }

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

// const CategoryDataType = dbJson.alphabets.map((cat: any) => ({
//     category: cat.category,
//     category_slug: cat.category_slug,
//     goal: cat.goal,
//     completion: cat.completion,
//     ImgComponent: StudyingDolphinIcon,
//     items: cat.items.map((item: any) => ({
//       ...item,
//       formality: item.formality as "formal" | "informal" | "neutral" | "both",
//       german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
//     }))
//   }));

// Cast dbJson to DB, transforming 'formality' to the correct type
export const db: DB = {
  alphabets: dbJson.alphabets.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  greetings: dbJson.greetings.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  introduction: dbJson.introduction.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  colors: dbJson.colors.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  time: dbJson.time.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  numbers: dbJson.numbers.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  count_math_measurement: dbJson.count_math_measurement.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  calendar: dbJson.calendar.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  seasons: dbJson.seasons.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  family: dbJson.family.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  activities: dbJson.activities.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  foods: dbJson.foods.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  locations: dbJson.locations.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  travels: dbJson.travels.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  work: dbJson.work.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  health: dbJson.health.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  medical_emergency: dbJson.medical_emergency.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  shopping: dbJson.shopping.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  preference: dbJson.preference.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  invitations: dbJson.invitations.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  technology: dbJson.technology.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  education: dbJson.education.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  culture: dbJson.culture.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  entertainment: dbJson.entertainment.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  opinions: dbJson.opinions.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  airport: dbJson.airport.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  transportation: dbJson.transportation.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  hotel: dbJson.hotel.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  restaurant: dbJson.restaurant.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  body_parts: dbJson.body_parts.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  landscape: dbJson.landscape.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  school: dbJson.school.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  house: dbJson.house.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  weather: dbJson.weather.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  sports: dbJson.sports.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  business_and_services: dbJson.business_and_services.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  animals: dbJson.animals.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  dresses: dbJson.dresses.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  tools: dbJson.tools.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  countries: dbJson.countries.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  vehicles: dbJson.vehicles.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  accessories: dbJson.accessories.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  personalities: dbJson.personalities.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  flowers: dbJson.flowers.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  professions: dbJson.professions.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  science: dbJson.science.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  politics: dbJson.politics.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  history: dbJson.history.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  geography: dbJson.geography.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  government_diplomacy: dbJson.government_diplomacy.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  hobbies: dbJson.hobbies.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  warfare: dbJson.warfare.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  nature: dbJson.nature.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  natural_disasters: dbJson.natural_disasters.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  music: dbJson.music.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  devices: dbJson.devices.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  materials: dbJson.materials.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  office_corporates: dbJson.office_corporates.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  festivals: dbJson.festivals.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  contructions: dbJson.contructions.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  tele_conversation: dbJson.tele_conversation.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  post_office: dbJson.post_office.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  embbacy_passport: dbJson.embbacy_passport.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),

  space_astronomy: dbJson.space_astronomy.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both",
      german_level: item.german_level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
    }))
  })),
};

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