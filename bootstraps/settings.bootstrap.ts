import { getLocalSettings, upsertSettings } from "@/db/settings.repo";

export const bootstrapSettingsFromToken = async (payload: { user_id: string }) => {
  try {
    const exits = await getLocalSettings( payload.user_id );
    if( exits ) {
      console.log("Settings already exists:", exits);
      return;
    }

    const settings = await upsertSettings({
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
    console.log("Bootstrapped Settings:", settings);
  }
  catch(error) {
    console.error("Bootstrap Settings Error:", error);
  }
};
