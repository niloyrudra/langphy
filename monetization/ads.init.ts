import mobileAds from "react-native-google-mobile-ads";

export const initializeAds = async () => {
    try {
        await mobileAds().initialize();
        console.log("Ads initialized...")
    }
    catch(error) {
        console.warn("initializeAds error:", error);
    }
}