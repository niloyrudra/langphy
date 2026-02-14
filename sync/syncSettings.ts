import api from "@/lib/api";
import { getLocalSettings, upsertSettings } from "@/db/settings.repo";

export const syncDirtySettings = async (userId: string) => {
  try {
    let localSettings = await getLocalSettings(userId);

    // 🟢 If no local settings → fetch and store
    if (!localSettings) {
      const res = await api.get(`/settings/${userId}`);
      const settings = res.data.settings;

      if (!settings) {
        throw new Error("No settings found");
      }

      await upsertSettings({ ...settings, dirty: 0 });
      return true;
    }

    // 🟢 If not dirty → nothing to sync
    if (!localSettings.dirty) {
      return true;
    }

    // 🔵 Only sync when dirty
    const res = await api.put(`/settings/${userId}`, {
      theme: localSettings.theme,
      language: localSettings.language,
      notifications: Boolean(localSettings.notifications),
      sound_effect: Boolean(localSettings.sound_effect),
      speaking_service: Boolean(localSettings.speaking_service),
      reading_service: Boolean(localSettings.reading_service),
      listening_service: Boolean(localSettings.listening_service),
      writing_service: Boolean(localSettings.writing_service),
      practice_service: Boolean(localSettings.practice_service),
      quiz_service: Boolean(localSettings.quiz_service),
      updated_at: localSettings.updated_at,
      // dirty: localSettings.dirty,
    });

    if (res.status !== 200) {
      throw new Error("Failed to sync settings");
    }

    const updatedSettings = res.data.settings;

    await upsertSettings({
      ...updatedSettings,
      dirty: 0,
    });

    return true;

  } catch (error) {
    console.log("syncSettings error:", error);
    return false;
  }
};
