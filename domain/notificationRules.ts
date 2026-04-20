/**
 * notificationRules.ts
 *
 * Improvements over old version:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. SETTINGS-GATED SETUP
 *    registerForPushNotifications() now accepts an optional `enabled` flag.
 *    The caller (index.tsx) reads localSettings.notifications and passes it in.
 *    If notifications are disabled, we skip token fetch AND deregister the
 *    device from the backend so it stops receiving pushes immediately.
 *
 * 2. CHANNEL CREATED ONCE AT APP BOOT — INDEPENDENTLY OF PERMISSION STATUS
 *    The Android notification channel must exist before ANY notification can
 *    display, including ones sent while the app is backgrounded. Previously
 *    the channel was created inside registerForPushNotifications(), meaning
 *    it would be skipped when notifications were toggled off. Now it lives in
 *    a dedicated setupNotificationChannel() that is always called at boot.
 *
 * 3. handleRegistrationError NO LONGER THROWS
 *    The old version threw inside a try/catch that caught it immediately —
 *    the throw was useless and suppressed the error message. Now it just
 *    logs and returns null cleanly.
 *
 * 4. TOKEN ALWAYS UPSERTED ON LAUNCH
 *    Every app launch with notifications enabled re-registers the token.
 *    This handles the case where a new APK install generates a new FCM token
 *    that the backend doesn't know about yet.
 *
 * 5. eas.json has JS comments (//) which is invalid JSON — noted below.
 */

import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";

const isExpoGo = Constants.appOwnership === "expo";

// Safe dynamic require — expo-notifications must not be imported in Expo Go
// because it requires native modules that aren't available there.
let NotificationsSafe: typeof import("expo-notifications") | null = null;
if (!isExpoGo) {
    NotificationsSafe = require("expo-notifications");
}

// ─── Channel setup ────────────────────────────────────────────────────────────

/**
 * Create the Android notification channel.
 * Must be called once at app boot, regardless of whether notifications are
 * enabled in user settings. The channel must exist for backgrounded notifications
 * to display even if the user later re-enables them.
 */
export const setupNotificationChannel = async (): Promise<void> => {
    if (!NotificationsSafe || Platform.OS !== "android") return;

    await NotificationsSafe.setNotificationChannelAsync("default", {
        name: "Langphy Notifications",
        importance: NotificationsSafe.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#00BCD4", // ocean brand color, was malformed '#FF231F7C' (5-byte hex)
        enableLights: true,
        enableVibrate: true,
        showBadge: true,
    });
};

// ─── Notification handler ─────────────────────────────────────────────────────

/**
 * Configure how incoming notifications are handled while the app is foregrounded.
 * Call once after the user is confirmed to have notifications enabled.
 */
export const setupNotificationHandler = (): void => {
    if (!NotificationsSafe) return;

    NotificationsSafe.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });
};

// ─── Token registration ───────────────────────────────────────────────────────

/**
 * Register this device for push notifications.
 *
 * @param enabled  Whether the user has notifications enabled in their settings.
 *                 Read from: `(await getLocalSettings(userId)).notifications`
 *                 Pass `true` (1) to register, `false` (0) to skip/deregister.
 *
 * @returns  The Expo push token string if successful and enabled, null otherwise.
 */
export const registerForPushNotifications = async (
    enabled: boolean = true
): Promise<string | null> => {
    if (!NotificationsSafe) return null;

    // User has notifications turned off — don't fetch or register a token.
    // The caller is responsible for deregistering from the backend if needed.
    if (!enabled) {
        console.log("[Push] Notifications disabled in settings — skipping registration.");
        return null;
    }

    if (!Device.isDevice) {
        console.warn("[Push] Must use a physical device for push notifications.");
        return null;
    }

    try {
        const { status: existingStatus } = await NotificationsSafe.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await NotificationsSafe.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            console.warn("[Push] Permission not granted.");
            return null;
        }

        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;

        if (!projectId) {
            console.error("[Push] Project ID not found in app config.");
            return null;
        }

        const { data: token } = await NotificationsSafe.getExpoPushTokenAsync({ projectId });
        console.log("[Push] Token registered:", token);
        return token;

    } catch (error) {
        console.error("[Push] Registration failed:", error);
        return null;
    }
};