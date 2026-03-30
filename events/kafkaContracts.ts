import { SessionType } from "@/types";

export interface LessonCompletedEvent {
  categoryId: string;
  unitId: string;
  userId: string;
  lessonId: string;
  session_key: string;
  session_type: SessionType;
  score?: number;
  duration_ms?: number;
  occurredAt: number
};

export interface SessionCompletedEvent {
  userId: string;
  unitId: string;
  session_key: string;
  session_type: string;
  score?: number;
  attempts: number;          // ✅ add — Zod requires it
  total_duration_ms?: number;
  completed_at: number;      // ✅ snake_case — matches Zod schema
};

export interface StreakUpdateEvent {
  userId: string;
  occurredAt: number;
}