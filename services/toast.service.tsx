// toast.service.tsx

import { toast, ToastOptions } from "@backpackapp-io/react-native-toast";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const toastSuccess = (message: string, config?: ToastOptions) => {
    toast.success(  // ✅ was toast.error
        message,
        {
            isSwipeable: true,
            icon: <MaterialIcons size={20} name="check-circle" color="#44F434" />,
            ...config
        }
    );
};

export const toastError = (message: string, config?: ToastOptions) => {
    toast.error(
        message,
        {
            isSwipeable: true,
            styles: {
                view: { backgroundColor: "#FFF2F1" }
            },
            icon: <MaterialIcons size={20} name="error" color="#ED2015" />,
            ...config
        }
    );
};

export const toastLoading = (message: string, config?: ToastOptions): string | undefined => {
    return toast.loading(message, {  // ✅ now returns the ID
        isSwipeable: true,
        styles: {
            view: { backgroundColor: "#ECFFFF" }
        },
        icon: <MaterialIcons size={20} name="hourglass-top" color="#08C1D2" />,
        ...config,
    });
};