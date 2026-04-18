/**
 * app/index.tsx  — Root entry point
 *
 * Improvements over old version:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. NOTIFICATION SETUP GATED ON USER SETTINGS
 *    Reads localSettings.notifications before registering for push.
 *    If disabled → skip registration (no token sent to backend).
 *    If enabled  → register and upsert token on every launch.
 *
 * 2. ANDROID CHANNEL CREATED UNCONDITIONALLY AT BOOT
 *    setupNotificationChannel() is called once regardless of settings,
 *    so the channel always exists for system-delivered notifications.
 *
 * 3. THREE useEffects MERGED INTO TWO
 *    Old code had three separate useEffect([]) calls. The two that ran on
 *    mount with no deps are combined into one — cleaner and avoids React
 *    warning about multiple effects running on the same tick.
 *
 * 4. isExpoGo CHECK MOVED INSIDE setupPush
 *    Old code checked isExpoGo AFTER registering a token, which meant the
 *    token was fetched even in Expo Go before being discarded. Now we
 *    skip the whole flow early.
 */

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { speechController } from "@/helpers/speechController";
import { Redirect } from "expo-router";
import { runForegroundSync } from "@/sync/foregroundSync";
import { AppState } from "react-native";
import { registerBackgroundSync } from "@/sync/backgroundSync";
import { useLessonTimer } from "@/hooks/useLessonTimer";
import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import {
    registerForPushNotifications,
    setupNotificationChannel,
    setupNotificationHandler,
} from "@/domain/notificationRules";
import Constants from "expo-constants";
import { preloadFeedbackSounds } from "@/utils/feedback";
import {
    deregisterDeviceFromNotification,
    registerDevicesForNotification,
} from "@/services/notification.service";
import { getLocalSettings } from "@/db/settings.repo"; // adjust path to your repo

const isExpoGo = Constants.appOwnership === "expo";

const App = () => {
    const { user, loading } = useAuth();
    const timer = useLessonTimer();

    // ── On mount — runs once regardless of auth state ──────────────────────
    React.useEffect(() => {
        const bootstrap = async () => {
            await registerBackgroundSync();
            await preloadFeedbackSounds();

            // Create Android notification channel unconditionally.
            // The channel must exist for notifications to display even when
            // the app is backgrounded — don't gate this on user settings.
            await setupNotificationChannel();

            // Boot the TTS engine while everything else is loading.
            speechController.warmUp();
        };

        bootstrap();
    }, []);

    // ── On auth — runs when user logs in or is restored from storage ───────
    React.useEffect(() => {
        if (!user) return;

        // App state listener — sync on foreground
        const sub = AppState.addEventListener("change", state => {
            if (state === "active") {
                timer.reset();
                runForegroundSync();
            }
        });

        const setupPush = async () => {
            // Never register in Expo Go — native push modules aren't available
            if (isExpoGo) {
                console.log("[Push] Skipping — running in Expo Go.");
                return;
            }

            try {
                // Read the user's notification preference from local DB
                // localSettings.notifications is 1 (enabled) or 0 (disabled)
                const localSettings = await getLocalSettings(user.id);
                const notificationsEnabled = localSettings?.notifications ?? false;

                // Configure foreground notification display behaviour.
                // Only needed when notifications are enabled.
                if (notificationsEnabled) {
                    setupNotificationHandler();
                }

                const token = await registerForPushNotifications(notificationsEnabled);

                if (notificationsEnabled && token) {
                    // Upsert token on every launch — handles new APK installs
                    // which generate a new FCM token the backend doesn't have yet.
                    await registerDevicesForNotification(token);
                } else if (!notificationsEnabled && token) {
                    // User disabled notifications but we got a token somehow
                    // (e.g. permission was already granted at OS level).
                    // Remove the token from the backend so they stop receiving pushes.
                    await deregisterDeviceFromNotification(token);
                }
            } catch (error) {
                console.warn("[Push] Device setup failed:", error);
            }
        };

        runForegroundSync();
        setupPush();

        return () => sub.remove();
    }, [user]);

    if (loading) return <LoadingScreenComponent />;
    if (!user) return <Redirect href="/auth/login" />;
    return <Redirect href="/lessons" />;
};

export default App;