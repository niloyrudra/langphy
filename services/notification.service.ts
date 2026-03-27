import api from "@/lib/api";
import { Token } from "@/types";
import { Platform } from "react-native";

export const registerDevicesForNotification = async ( token: string ) => {
    await api.post("/notification/devices/register", {
        token,
        platform: Platform.OS,
    });
}