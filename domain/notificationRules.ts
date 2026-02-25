import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";

let NotificationsSafe: typeof import("expo-notifications") | null = null;

if ( Constants.appOwnership !== "expo" || __DEV__ ) {
    NotificationsSafe = require("expo-notifications");
}

export const setupNotificationHandler = () => {
    if (!NotificationsSafe) return;

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });
};

const handleRegistrationError = ( errorMessage: string ) => {
    console.error(errorMessage);
    throw new Error(errorMessage);
};

export const registerForPushNotifications = async () => {
    if (!NotificationsSafe) return;
    try {
        if( Platform.OS === "android" ) {
            await Notifications.setNotificationChannelAsync(
                "default",
                {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C'
                }
            );
        }

        if( Device.isDevice ) {
            const { status: existingStatus }  = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;

            if( existingStatus !== 'granted' ) {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if( finalStatus !== "granted" ) {
                handleRegistrationError("Permission not granted to get push token for push notification!");
                return;
            }

            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

            if( !projectId ) handleRegistrationError("Project ID not found.");

            try {
                const pushTokenString = (
                    await Notifications.getExpoPushTokenAsync({ projectId })
                ).data;

                console.log( pushTokenString );
                return pushTokenString;
            }
            catch(error) {
                handleRegistrationError(`${error}`);
            }

        }
        else {
            handleRegistrationError("Must use physical device for push notifications!");
        }
    }
    catch(error) {
        console.error("error:", error)
    }
}

// export const registerPush = async (userId: string) => {
//     try {
//         const { status } = await Notifications.requestPermissionsAsync();

//         if( status !== "granted" ) return;

//         const token = ( await Notifications.getExpoPushTokenAsync() ).data;

//         console.log("Push Notification Token:", token);

//         // const res = await api.post( "/users/push-token", { userId, token } );
//         // if( res.status === 200 ) console.log( "Push Notification Token is sent to users->push-token" );
//     }
//     catch(error) {
//         console.error("registerPush Error:", error);
//     }
// }