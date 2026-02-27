import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "lesson_ad_counter";

export async function shouldShowLessonAd() {
    const value = await AsyncStorage.getItem(KEY);
    const count = value ? parseInt(value) : 0;

    const newCount = count + 1;
    await AsyncStorage.setItem(KEY, newCount.toString());

    return newCount % 3 === 0; // every 3 lessons
}