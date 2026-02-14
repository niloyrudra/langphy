import { SessionType } from "@/types";

export interface LessonCompletedEvent {
  categoryId: string;
  unitId: string;
  userId: string;
  lessonId: string;
  sessionKey: string;
  lessonType: SessionType;
  score?: number;
  duration_ms?: number;
  occurredAt: number
};

export interface SessionCompletedEvent {
  userId: string;
  sessionKey: string;
  sessionType: string;
  total_duration_ms?: number;
  occurredAt: number;
};

export interface StreakUpdateEvent {
  userId: string;
  occurredAt: number;
}