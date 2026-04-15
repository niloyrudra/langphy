import api from "@/lib/api";
import { getLocalSettings, markSettingsClean, upsertSettings } from "@/db/settings.repo";

export const syncDirtySettings = async (userId: string) => {
  try {
    let localSettings = await getLocalSettings(userId);

    // 🟢 If no local settings → fetch and store
    if (!localSettings) {
      const res = await api.get(`/settings`);
      const settings = res.data?.settings;
      if (!settings) return false; // server also has nothing yet — skip silently

      // Guard: server row must have both id and user_id before we write to SQLite
      if (!settings.id || !settings.user_id) {
        console.warn("[syncSettings] Server returned settings without id/user_id — skipping upsert");
        return false;
      }

      await upsertSettings({ ...settings, dirty: 0 });
      return true;
    }

    // 🟢 If not dirty → nothing to sync
    if (!localSettings.dirty) return true;

    // 🔵 Only sync when dirty
    const res = await api.put(`/settings`, {
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
      updated_at: new Date(localSettings.updated_at * 1000).toISOString(), // ✅ convert Unix → ISO
    });

    if (res.status !== 200) throw new Error(`Unexpected status ${res.status}`);
 
    const updatedSettings = res.data?.settings;
 
    if (updatedSettings?.id && updatedSettings?.user_id) {
      // Server confirmed — store the canonical server row and mark clean
      await upsertSettings({ ...updatedSettings, dirty: 0 });
    } else {
      // Server responded 200 but didn't return a full settings object —
      // just mark the existing local row clean so we don't loop forever
      console.warn("[syncSettings] PUT 200 but no settings in response — marking local clean");
      await markSettingsClean(localSettings);
    }
 
    console.log(`Settings synced!`);
    return true;

  } catch (error) {
    console.log("syncSettings error:", error);
    return false;
  }
};
