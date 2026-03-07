// import { initializeAds } from "@/monetization/ads.init";
// import { requestConsent } from "@/monetization/consent";
// import Constants from "expo-constants";

// let initialized = false;

// export const bootstrapAds = async () => {
//     const isExpoGo: boolean = Constants.appOwnership === 'expo' || __DEV__;

//     if (isExpoGo) {
//         console.log("Skipping ads in Expo Go");
//         return;
//     }

//     if( initialized ) return;
//     try {
//         // 1️⃣ Request GDPR Consent
//         await requestConsent();
    
//         // 2️⃣ Initialize Mobile Ads SDK
//         await initializeAds();
    
//         initialized = true;
//     }
//     catch(error) {
//         console.warn("bootstrapAds error:", error);
//     }
// }