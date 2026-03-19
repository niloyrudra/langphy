import { ImageSourcePropType } from "react-native";

type ImageGroup = Record<string, ImageSourcePropType>;

interface ImageType {
    categories: ImageGroup;
    sessions: ImageGroup;
    dashboard: ImageGroup;
    logo: ImageGroup;
    modals: ImageGroup;
    unit: ImageGroup;
};

export const Images: ImageType = {
    categories: {
        accessories: require( "@/assets/images/categories/webp/Accessories.webp" ),
        activities: require( "@/assets/images/categories/webp/Activities.webp" ),
        airport: require( "@/assets/images/categories/webp/Airport.webp" ),
        alphabets: require( "@/assets/images/categories/webp/Alphabates.webp" ),
        animals: require( "@/assets/images/categories/webp/Animals.webp" ),
        body_parts: require( "@/assets/images/categories/webp/Body-Parts.webp" ),
        business_and_services: require( "@/assets/images/categories/webp/Business.webp" ),
        calendar: require( "@/assets/images/categories/webp/Calendar.webp" ),
        colors: require( "@/assets/images/categories/webp/Colors.webp" ),
        construction: require( "@/assets/images/categories/webp/Construction.webp" ),
        count_measurement: require( "@/assets/images/categories/webp/Counting.webp" ),
        countries: require( "@/assets/images/categories/webp/Country.webp" ),
        culture: require( "@/assets/images/categories/webp/Culture.webp" ),
        devices: require( "@/assets/images/categories/webp/Device.webp" ),
        diseases: require( "@/assets/images/categories/webp/Disease.webp" ),
        dresses: require( "@/assets/images/categories/webp/Dress.webp" ),
        education: require( "@/assets/images/categories/webp/Education.webp" ),
        embbacy_passport: require( "@/assets/images/categories/webp/Passport.webp" ),
        entertainment: require( "@/assets/images/categories/webp/Entertainment.webp" ),
        family: require( "@/assets/images/categories/webp/Family.webp" ),
        flowers: require( "@/assets/images/categories/webp/Flowers.webp" ),
        foods: require( "@/assets/images/categories/webp/Food.webp" ),
        geography: require( "@/assets/images/categories/webp/Geography.webp" ),
        government_diplomacy: require( "@/assets/images/categories/webp/Government.webp" ),
        greetings: require( "@/assets/images/categories/webp/Greetings.webp" ),
        history: require( "@/assets/images/categories/webp/History.webp" ),
        hobbies: require( "@/assets/images/categories/webp/Hobby.webp" ),
        hotel: require( "@/assets/images/categories/webp/Hotel.webp" ),
        house: require( "@/assets/images/categories/webp/House.webp" ),
        introduction: require( "@/assets/images/categories/webp/Introduction.webp" ),
        invitations: require( "@/assets/images/categories/webp/Invitation.webp" ),
        landscape: require( "@/assets/images/categories/webp/Landscape.webp" ),
        locations: require( "@/assets/images/categories/webp/Direction.webp" ),
        materials: require( "@/assets/images/categories/webp/Materials.webp" ),
        math: require( "@/assets/images/categories/webp/Counting.webp" ),
        medical_emergency: require( "@/assets/images/categories/webp/Medical.webp" ),
        music: require( "@/assets/images/categories/webp/Music.webp" ),
        natural_disasters: require( "@/assets/images/categories/webp/Natural-Desaster.webp" ),
        nature: require( "@/assets/images/categories/webp/Nature.webp" ),
        news: require( "@/assets/images/categories/webp/News.webp" ),
        numbers: require( "@/assets/images/categories/webp/Numbers.webp" ),
        office_corporates: require( "@/assets/images/categories/webp/Office.webp" ),
        opinions: require( "@/assets/images/categories/webp/Opinion.webp" ),
        personalities: require( "@/assets/images/categories/webp/Personalities.webp" ),
        politics: require( "@/assets/images/categories/webp/Politics.webp" ),
        preference: require( "@/assets/images/categories/webp/Preference.webp" ),
        professions: require( "@/assets/images/categories/webp/Work.webp" ),
        restaurant: require( "@/assets/images/categories/webp/Restaurant.webp" ),
        science: require( "@/assets/images/categories/webp/Science.webp" ),
        seasons: require( "@/assets/images/categories/webp/Season.webp" ),
        shopping: require( "@/assets/images/categories/webp/Shopping.webp" ),
        space: require( "@/assets/images/categories/webp/Space.webp" ),
        sports: require( "@/assets/images/categories/webp/Sports.webp" ),
        technology: require( "@/assets/images/categories/webp/Technology.webp" ),
        tele_conversation: require( "@/assets/images/categories/webp/Telephone-conversation.webp" ),
        time: require( "@/assets/images/categories/webp/Time.webp" ),
        tools: require( "@/assets/images/categories/webp/Tools.webp" ),
        transportation: require( "@/assets/images/categories/webp/Transportation.webp" ),
        travels: require( "@/assets/images/categories/webp/Travel.webp" ),
        vehicles: require( "@/assets/images/categories/webp/Vehicles.webp" ),
        warfare: require( "@/assets/images/categories/webp/Warfare.webp" ),
        weather: require( "@/assets/images/categories/webp/Weather.webp" ),
        work: require( "@/assets/images/categories/webp/Work.webp" ),
    },
    dashboard: {
        milestone_3: require("@/assets/images/dashboard/milestones/3-Days-Streaks-1.webp"),
        milestone_7: require("@/assets/images/dashboard/milestones/7-Days-Streaks-1.webp"),
        milestone_14: require("@/assets/images/dashboard/milestones/14-Days-Streaks-1.webp"),
        milestone_21: require("@/assets/images/dashboard/milestones/21-Days-Streaks-1.webp"),
        milestone_30: require("@/assets/images/dashboard/milestones/30-Days-Streaks-1.webp"),
        milestone_50: require("@/assets/images/dashboard/milestones/50-Days-Streaks-1.webp"),
        milestone_100: require("@/assets/images/dashboard/milestones/100-Days-Streaks-1.webp"),
        progress_word: require("@/assets/images/dashboard/lesson-progress/Word-1.webp"),
        progress_lesson: require("@/assets/images/dashboard/lesson-progress/Lesson-1.webp"),
        progress_unit: require("@/assets/images/dashboard/lesson-progress/Unit-1.webp"),
        progress_paragraph: require("@/assets/images/dashboard/lesson-progress/Paragraph-1.webp"),
        progress_session: require("@/assets/images/dashboard/lesson-progress/Session-1.webp"),
    },
    modals: {},
    logo: {},
    unit: {
        dolphin_reading: require("@/assets/images/unit/webp/Dolphin-Reading.webp")
    },
    sessions: {
        practice: require( "@/assets/images/sessions/webp/Practice.webp" ),
        quiz: require( "@/assets/images/sessions/webp/Quiz.webp" ),
        speaking: require( "@/assets/images/sessions/webp/Speaking.webp" ),
        reading: require( "@/assets/images/sessions/webp/Reading.webp" ),
        writing: require( "@/assets/images/sessions/webp/Writing.webp" ),
        listening: require( "@/assets/images/sessions/webp/Listening.webp" ),
    }
};