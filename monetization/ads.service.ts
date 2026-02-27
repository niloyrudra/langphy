import {
    InterstitialAd,
    AdEventType,
    TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-xxxxxxxx/xxxxxxxx';

class InterstitialController {
    private ad: InterstitialAd;
    private loaded = false;

    constructor() {
        this.ad = InterstitialAd.createForAdRequest( adUnitId );
        this.load();
    }

    private load() {
        this.ad.load();

        this.ad.addAdEventListener(AdEventType.LOADED, () => {
            this.loaded = true;
        });

        this.ad.addAdEventListener(AdEventType.CLOSED, () => {
            this.loaded = false;
            this.load(); // preload next
        });
    }

    show( callback?: () => void ) {
        if( this.loaded ) {
            this.ad.show();
            callback?.();
        }
        else {
            callback?.();
        }
    }
}

export const interstitialController = new InterstitialController();

// let interstitial: InterstitialAd | null = null;

// export function preloadInterstitial() {
//     interstitial = InterstitialAd.createForAdRequest(adUnitId);
//     interstitial.load();
// }

// export function showInterstitialIfLoaded(callback?: () => void) {
//     if (!interstitial) return;

//     const unsubscribe = interstitial.addAdEventListener(
//         AdEventType.CLOSED,
//         () => {
//             unsubscribe();
//             preloadInterstitial();
//             callback?.();
//         }
//     );

//     if (interstitial.loaded) {
//         interstitial.show();
//     } else {
//         callback?.();
//     }
// }

// export class AdsService {
//     shouldShowInterstitial( event: string, isPremium: boolean ) {
//         if( isPremium ) return false;

//         if( event == "LESSON_COMPLETED" ) return true;
//         if( event == "STREAK_REVIVE" ) return true;

//         return false;
//     }
// }