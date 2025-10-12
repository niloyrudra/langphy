import SIZES from "@/constants/size";
import dbJson from '@/db/db.json'; // or .ts export
import { DB } from "@/types";
import { StudyingDolphinIcon } from '@/utils/SVGImages'


// Cast dbJson to DB, transforming 'formality' to the correct type
export const db: DB = {
  greetings: dbJson.greetings.map((cat: any) => ({
    category: cat.category,
    category_slug: cat.category_slug,
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
    category_slug: cat.category_slug,
    goal: cat.goal,
    completion: cat.completion,
    ImgComponent: StudyingDolphinIcon,
    items: cat.items.map((item: any) => ({
      ...item,
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
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
      formality: item.formality as "formal" | "informal" | "neutral" | "both"
    }))
  })),

  // grammer: dbJson.grammer.map((cat: any) => ({
  //   category: cat.category,
  //   category_slug: cat.category_slug,
  //   goal: cat.goal,
  //   completion: cat.completion,
  //   ImgComponent: StudyingDolphinIcon,
  //   items: cat.items.map((item: any) => ({
  //     ...item,
  //     formality: item.formality as "formal" | "informal" | "neutral" | "both"
  //   }))
  // })),
};

export const getCardContainerWidth =  () =>  (SIZES.screenWidth - ( (SIZES.bodyPaddingHorizontal*2) + SIZES.cardGap )) / 2;
// export const getMarginValue =  ({id}: {id: string}) =>  ( parseInt(id) % 2 !== 0) ? SIZES.cardGap : 0;