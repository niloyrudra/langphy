// Toaster.tsx
import { ToastPosition, Toasts } from "@backpackapp-io/react-native-toast";
import { Easing } from "react-native-reanimated";

export const Toaster = () => (
    <Toasts
        globalAnimationType="spring"
        globalAnimationConfig={{
            duration: 500,
            flingPositionReturnDuration: 200,
            easing: Easing.elastic(1)
        }}
        defaultPosition={ToastPosition.TOP}
        defaultDuration={3000}
        // ✅ Bypass SafeAreaContext lookup on Android Fabric entirely.
        // Expo Router's SafeAreaProvider sits above us in the tree but
        // the native module hasn't initialized at the moment <Toasts>
        // first renders — passing explicit zeros prevents the raw-number
        // text node that causes "Text strings must be rendered within <Text>".
        // overrideSafeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
        fixAndroidInsets={false}
        extraInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
        defaultStyle={{
            view: { backgroundColor: "#EAFFE5", borderRadius: 8 },
            text: { color: "#676767" },
            indicator: { display: "none" },
        }}
    />
);