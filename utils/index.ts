import SIZES from "@/constants/size";
import dbJson from '@/db/db.json'; // or .ts export
import { ColorLegend, DB } from "@/types";
import { StudyingDolphinIcon } from '@/utils/SVGImages'
import * as Speech from 'expo-speech'

export  const speechFastHandler = (speechContent: string | undefined, speechLang: string | undefined) => {
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
export  const speechHandler = (speechContent: string | undefined, speechLang: string | undefined) => {
  Speech.speak(
    speechContent || "Hallo!",
    {
      language: speechLang || "de-DE",
      rate: 1, // Normal Speed
      pitch: 1.2,// Deep Tone
      volume: 1 // High
    }
  )
}
export  const speechSlowHandler = (speechContent: string | undefined, speechLang: string | undefined) => {
  Speech.speak(
    speechContent || "Hallo!",
    {
      language: speechLang || "de-DE",
      rate: 0.2, // Normal Speed
      pitch: 1.2,// Deep Tone
      volume: 1 // High
    }
  )
}

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
  body_parts: [],
  landscape: [],
  school: [],
  house: [],
  weather: [],
  sports: [],
  services: [],
  animals: [],
  dresses: [],
  tools: [],
  // flowers: [],
  // countries: [],
  vehicles: []
};

export const getCardContainerWidth =  () =>  (SIZES.screenWidth - ( (SIZES.bodyPaddingHorizontal*2) + SIZES.cardGap )) / 2;
// export const getMarginValue =  ({id}: {id: string}) =>  ( parseInt(id) % 2 !== 0) ? SIZES.cardGap : 0;

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
  adverb: "#FFA500",
  time_adverb: "#FFA500",
  article: "#FFD700",
  possessive_article: "#DA70D6",
}