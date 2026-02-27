import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { useEntitlement } from "@/hooks/useEntitlement";

const adUnitId = __DEV__ ? TestIds.BANNER : "ca-app-pub-xxxxxxxxx/xxxxxxxxx";

export const BannerAdView = () => {
    const { isPremium } = useEntitlement();

    if( isPremium ) return null;

    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ADAPTIVE_BANNER}
        />
    );
}