import { requestConsent } from "./consent";
import { initializeAds } from "./ads.init";

let initialized = false;

export const bootstrapAds = async () => {
    if( initialized ) return;

    // 1️⃣ Request GDPR Consent
    await requestConsent();

    // 2️⃣ Initialize Mobile Ads SDK
    await initializeAds();

    initialized = true;
}