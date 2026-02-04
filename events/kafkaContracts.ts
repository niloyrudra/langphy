export type LessonCompletedEvent = {
  type: "lesson.completed.v1";
  userId: string;
  lessonId: string;
  sessionKey: string;
  timestamp: number;
};

export type SessionCompletedEvent = {
  type: "session.completed.v1";
  userId: string;
  sessionKey: string;
  sessionType: string;
  score?: number;
  timestamp: number;
};