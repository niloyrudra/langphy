import SIZES from "@/constants/size";
import dbJson from '@/db/db.json'; // or .ts export
import { DB } from "@/types";
import { StudyingDolphinIcon } from '@/utils/SVGImages'
// import db from '@/db/db'


// Cast dbJson to DB, transforming 'formality' to the correct type
export const db: DB = {
  greetings: dbJson.greetings.map((cat: any) => ({
    category: cat.category,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
    }))
  })),
  introduction: dbJson.introduction.map((cat: any) => ({
    category: cat.category,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
    }))
  }))
};

export const getCardContainerWidth =  () =>  (SIZES.screenWidth - ( (SIZES.bodyPaddingHorizontal*2) + SIZES.cardGap )) / 2;
// export const getMarginValue =  ({id}: {id: string}) =>  ( parseInt(id) % 2 !== 0) ? SIZES.cardGap : 0;