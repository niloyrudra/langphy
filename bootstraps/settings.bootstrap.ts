import { upsertSettings } from "@/db/settings.repo";
import { v4 as uuidv4 } from "uuid";

export const bootstrapSettingsFromToken = async (payload: { user_id: string }) => {
  await upsertSettings({
    id: payload.user_id,
    user_id: payload.user_id,
    theme: "light",
    sound_effect: true,
    speaking_service: true,
    reading_service: true,
    listening_service: true,
    writing_service: true,
    practice_service: true,
    quiz_service: true,
    notifications: true,
    language: "en",
  });
};
