import { z } from 'zod';

export const CHAT_MODEL = 'gpt-5.6-luna';
export const DAILY_TOKEN_LIMIT = 5_000_000;
export const MAX_OUTPUT_TOKENS = 2048;
export const MAX_QUESTION_LENGTH = 4000;
export const QUOTA_MESSAGE =
  '오늘의 무료 사용량이 모두 소진되었습니다. 다음 초기화까지 자세한 내용은 이메일로 문의해주세요. jihyukboin@gmail.com';
export const RESPONSE_ERROR_MESSAGE =
  '답변을 완료하지 못했습니다. 잠시 후 다시 질문해주세요.';

export const visitorIdSchema = z.uuid();
export const questionSchema = z.object({
  requestId: z.uuid(),
  question: z.string().trim().min(1).max(MAX_QUESTION_LENGTH)
});

export type QuestionInput = z.infer<typeof questionSchema>;
export type ChatTurn = {
  id: string;
  question: string;
  answer: string | null;
  status: 'pending' | 'completed' | 'failed';
  errorMessage: string | null;
  createdAt: string;
};
export type ChatSnapshot = {
  day: string;
  resetAt: string;
  turns: ChatTurn[];
  quotaReached: boolean;
};
export type ChatErrorBody = {
  error: { code: string; message: string; resetAt?: string };
};

export function utcDay(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function nextUtcMidnight(day: string) {
  const next = new Date(`${day}T00:00:00.000Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString();
}
