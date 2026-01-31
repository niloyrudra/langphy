import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("langphy.db");