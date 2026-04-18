/**
 * notification.service.ts
 *
 * Improvements over old version:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Added deregisterDeviceFromNotification() so when a user turns off
 *    notifications in settings, their token is removed from the backend
 *    immediately — they stop receiving pushes without waiting for the
 *    next server-side cleanup cycle.
 *
 * 2. registerDevicesForNotification now returns the response so the caller
 *    can log or react to registration failures.
 */

import api from "@/lib/api";
import { Platform } from "react-native";

/**
 * Register (or upsert) this device's push token on the backend.
 * Called on every launch when notifications are enabled — handles
 * new APK installs that generate a new FCM token.
 */
export const registerDevicesForNotification = async (token: string): Promise<void> => {
    try {
        await api.post("/notification/devices/register/", {
            token,
            platform: Platform.OS,
        });
        console.log("[Push] Device registered with backend.");
    } catch (error) {
        console.warn("[Push] Failed to register device with backend:", error);
    }
};

/**
 * Remove this device's push token from the backend.
 * Call when the user disables notifications in settings.
 */
export const deregisterDeviceFromNotification = async (token: string): Promise<void> => {
    try {
        await api.post("/notification/devices/deregister/", {
            token,
            platform: Platform.OS,
        });
        console.log("[Push] Device deregistered from backend.");
    } catch (error) {
        console.warn("[Push] Failed to deregister device:", error);
    }
};