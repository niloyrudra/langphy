import { SessionType } from "@/types";

export type BaseEvent<T> = {
  event_id: string;          // UUID v7
  event_type: string;        // e.g. session.completed.v1
  occurred_at: number;       // unix seconds
  user_id: string;

  idempotency_key: string;   // 🔥 CRITICAL
  payload: T;
};

// lesson.completed.v1
export type LessonCompletedPayload = {
  lesson_id: string;
  session_key: string;
  content_type: SessionType;
  score?: number;
};

// session.scored.v1
export type SessionScoredPayload = {
  session_key: string;
  content_type: SessionType;
  avg_score?: number;
  attempts: number;
};

// session.completed.v1
export type SessionCompletedPayload = {
  session_key: string;
  total_lessons: number;
};
