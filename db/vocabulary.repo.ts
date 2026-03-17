import { Token } from "@/types";
import { db } from "./index";
import { randomUUID } from "expo-crypto";

export type DBVocabulary = {
    id: string;
    user_id: string;
    word: string;
    lemma: string;
    pos: string;
    meaning_en: string | null;
    unit_id: string | null;
    category_id: string | null;
    learned_at: number;
    dirty: number;
};

// export type VocabularyToken = {
//     text: string;
//     lemma: string;
//     pos: string;
//     meaning_en: string | null;
// };

// POS tags to collect — nouns, verbs, adjectives, adverbs only
const CONTENT_POS = new Set(["NOUN", "VERB", "ADJ", "ADV"]);

/**
 * Save content words from a phrase's NLP tokens.
 * Deduped by (user_id, lemma) — ON CONFLICT DO NOTHING so
 * re-visiting the same lesson never creates duplicates.
 */
export const saveVocabularyWords = async (params: {
    userId: string;
    tokens: Token[];
    unitId: string;
    categoryId: string;
}): Promise<number> => {
  const { userId, tokens, unitId, categoryId } = params;
  const now = Math.floor(Date.now() / 1000);

  const contentWords = tokens.filter(
    (t) => CONTENT_POS.has(t.pos!) && t.lemma && t.lemma !== "--"
  );

  if (!contentWords.length) return 0;

  let saved = 0;

  await db.withTransactionAsync(async () => {
    for (const token of contentWords) {
      const result = await db.runAsync(
        `
        INSERT INTO lp_vocabulary
          (id, user_id, word, lemma, pos, meaning_en, unit_id, category_id, learned_at, dirty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
        ON CONFLICT(user_id, lemma) DO NOTHING
        `,
        [
          randomUUID(),
          userId,
          token.text,
          token.lemma,
          token.pos,
          token.meaning_en ?? null,
          unitId,
          categoryId,
          now,
        ]
      );
      if (result.changes > 0) saved++;
    }
  });

  return saved; // number of NEW words added this lesson
};

export const getVocabularyCount = async (userId: string): Promise<number> => {
  try {
    const result = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM lp_vocabulary WHERE user_id = ?`,
      [userId]
    );
    return result?.count ?? 0;
  } catch (error) {
    console.error("getVocabularyCount error:", error);
    return 0;
  }
};

export const getAllVocabulary = async (userId: string): Promise<DBVocabulary[]> => {
  try {
    return await db.getAllAsync<DBVocabulary>(
      `SELECT * FROM lp_vocabulary WHERE user_id = ? ORDER BY learned_at DESC`,
      [userId]
    );
  } catch (error) {
    console.error("getAllVocabulary error:", error);
    return [];
  }
};

export const getDirtyVocabulary = async (userId: string): Promise<DBVocabulary[]> => {
  return await db.getAllAsync<DBVocabulary>(
    `SELECT * FROM lp_vocabulary WHERE user_id = ? AND dirty = 1`,
    [userId]
  );
};

export const markVocabularyClean = async (items: DBVocabulary[]) => {
  if (!items.length) return;
  const placeholders = items.map(() => "?").join(",");
  const ids = items.map((v) => v.id);
  await db.runAsync(
    `UPDATE lp_vocabulary SET dirty = 0 WHERE id IN (${placeholders})`,
    ids
  );
};

export const clearVocabulary = async () => {
  try {
    await db.runAsync(`DELETE FROM lp_vocabulary`);
    console.log("Cleared all data from lp_vocabulary table.");
  } catch (error) {
    console.error("clearVocabulary error:", error);
  }
};