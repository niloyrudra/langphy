import {ToastPosition, Toasts} from "@backpackapp-io/react-native-toast";
import { Easing } from "react-native-reanimated";

// interface ToasterProps {
//     animationType?: 'timing' | 'spring' | 'fade';
//     duration?: number | undefined;
//     position?: ToastPosition | undefined
// }

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
    />
);
