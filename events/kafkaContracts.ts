import { SessionType } from "@/types";

export interface LessonCompletedEvent {
  // type: "lesson.completed.v1";
  userId: string;
  lessonId: string;
  sessionKey: string;
  lessonType: SessionType;
  score?: number;
  duration_ms?: number;
  occurredAt: number
};

export interface SessionCompletedEvent {
  // type: "session.completed.v1";
  userId: string;
  sessionKey: string;
  sessionType: string;
  // score?: number;
  total_duration_ms?: number;
  occurredAt: number;
};