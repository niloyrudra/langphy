import api from "@/lib/api";
import { getLocalSettings, upsertSettings } from "@/db/settings.repo";

export const syncSettings = async (userId: string) => {
  let settings = await getLocalSettings(userId);
  if (!settings || !settings.dirty) {
    settings = await api.get(`/settings/${userId}`).then(res => res.data.settings);
    if (!settings) {
      throw new Error("No settings found to sync");
    }
  };
  const res = await api.put(`/settings/update/${userId}`, {
    ...settings,
  });

  if( res.status !== 200) {
    throw new Error("Failed to sync settings");
  }
    const newSettings = res.data;

  await upsertSettings(newSettings);
};