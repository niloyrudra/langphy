import {
    RewardedAd,
    AdEventType,
    TestIds,
    RewardedAdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-xxxxxxxx/xxxxxxxx';

class RewardedController {
    private ad: RewardedAd;
    private loaded = false;

    constructor() {
        this.ad = RewardedAd.createForAdRequest(adUnitId);
        this.load();
    }

    private load() {
        this.ad.load();

        this.ad.addAdEventListener( RewardedAdEventType.LOADED, () => {
            this.loaded = true;
        });

        this.ad.addAdEventListener( AdEventType.CLOSED, () => {
            this.loaded = false;
            this.load(); // preload next
        });
    }

    show(onReward: () => void) {
        if (!this.ad || !this.loaded) return;

        const unsubscribe = this.ad.addAdEventListener( RewardedAdEventType.EARNED_REWARD, () => {
            onReward();
            unsubscribe(); // remove listener after reward
        });

        this.ad.show();
    }
}

export const rewardedController = new RewardedController();