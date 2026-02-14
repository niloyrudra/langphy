import { db } from "./index";

export type DBSettings = {
  id: string;           // UUID, local key
  user_id: string;
  theme: string;
  sound_effect: boolean;
  speaking_service: boolean;
  reading_service: boolean;
  listening_service: boolean;
  writing_service: boolean;
  practice_service: boolean;
  quiz_service: boolean;
  notifications: boolean;
  language: string;
  dirty: number;         // 0 | 1
  updated_at: number;
};

const SETTINGS_FIELDS = [
  "toggle_theme",
  "sound_effect",
  "speaking_service",
  "reading_service",
  "listening_service",
  "writing_service",
  "practice_service",
  "quiz_service",
  "push_notification",
  "notifications",
  "language",
] as const;

type SettingsField = typeof SETTINGS_FIELDS[number];

export const getLocalSettings = async (userId: string): Promise<DBSettings | null> => {
  const result = await db.getFirstAsync<DBSettings>(
    "SELECT * FROM lp_settings WHERE user_id = ? LIMIT 1",
    [userId]
  );
  return result || null;
}

export const getDirtySettings = async (userId: string): Promise<DBSettings[]> => {
  const result = await db.getAllAsync<DBSettings>(
    "SELECT * FROM lp_settings WHERE dirty = 1 AND user_id = ?",
    [userId]
  );
  return result;
}

export const upsertSettings = async (p: {
    id: string;
    user_id: string;
    theme: string;
    sound_effect: boolean;
    speaking_service: boolean;
    reading_service: boolean;
    listening_service: boolean;
    writing_service: boolean;
    practice_service: boolean;
    quiz_service: boolean;
    notifications: boolean;
    language: string;
    dirty?: number;
}): Promise<DBSettings> => {
  const now = Math.floor(Date.now() / 1000);
  const result = await db.getFirstAsync<DBSettings>(
    `
      INSERT OR REPLACE INTO lp_settings (
        id,
        user_id,
        theme,
        sound_effect,
        speaking_service,
        reading_service,
        listening_service,
        writing_service,
        practice_service,
        quiz_service,
        notifications,
        language,
        updated_at,
        dirty
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    [
      p.id,
      p.user_id,
      p.theme ?? "light",
      p.sound_effect ?? false,
      p.speaking_service ?? false,
      p.reading_service ?? false,
      p.listening_service ?? false,
      p.writing_service ?? false,
      p.practice_service ?? false,
      p.quiz_service ?? false,
      p.notifications ?? false,
      p.language ?? "en",
      now, // updated_at
      p.dirty ?? 1
    ]
  );

  return result!;
};

export const updateSettingField = async ( payload: {
  user_id: string;
  field: SettingsField;
  value: string | number | boolean;
} ): Promise<DBSettings> => {

  if( !SETTINGS_FIELDS.includes( payload.field ) ) {
    throw new Error("Invalid settings field: " + payload.field);
  }

  const now = Math.floor(Date.now() / 1000);
  const result = await db.getFirstAsync<DBSettings>(
    `
      UPDATE lp_settings
        SET ${payload.field} = ?, updated_at = ?, dirty = 1 WHERE user_id = ?
      RETURNING *
    `,
    [
      payload.value,
      now,
      payload.user_id
    ]
  );
  return result!;
};

export const markSettingsClean = async (settings: DBSettings) => {
  await db.runAsync(
    `UPDATE lp_settings SET dirty = 0 WHERE id = ?`,
    [settings.id]
  );
};