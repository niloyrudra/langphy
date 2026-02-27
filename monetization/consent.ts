import { AdsConsent } from "react-native-google-mobile-ads";

export const requestConsent = async () => {
    try {
        await AdsConsent.requestInfoUpdate();
        await AdsConsent.loadAndShowConsentFormIfRequired();
    }
    catch(error) {
        console.warn("requestConsent error:", error);
    }
}