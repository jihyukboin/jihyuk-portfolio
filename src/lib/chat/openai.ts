import 'server-only';
import OpenAI from 'openai';
import { profile, projects, skills } from '@/data/portfolio';
import { CHAT_MODEL, MAX_OUTPUT_TOKENS } from './contracts';

// 매 호출에 다시 전달합니다. previous_response_id는 instructions를 상속하지 않습니다.
const instructions = [
  '당신은 정지혁의 포트폴리오 안내 도우미입니다. 정지혁 본인인 것처럼 말하지 마세요.',
  '방문자의 질문에 한국어로 간결하고 친절하게 답하세요.',
  '아래 공개 프로필을 근거로 답하고, 확인되지 않은 경력이나 연락처를 만들지 마세요.',
  '제공된 자료로 알 수 없는 내용은 모른다고 설명하고 이메일 문의를 안내하세요.',
  JSON.stringify({ profile, projects, skills })
].join('\n');

function getClient() {
  if (!process.env.OPENAI_API_KEY?.trim()) {
    throw new Error('OPENAI_API_KEY 환경 변수가 필요합니다.');
  }
  // 재시도로 생성 요청이 중복되거나 토큰 예약을 초과하지 않게 합니다.
  return new OpenAI({ maxRetries: 0, timeout: 90_000 });
}

export function responseInput(
  question: string,
  previousResponseId: string | null
) {
  return {
    model: CHAT_MODEL,
    instructions,
    input: question,
    previous_response_id: previousResponseId,
    reasoning: { effort: 'none' as const }
  };
}

export async function countInputTokens(
  input: ReturnType<typeof responseInput>
) {
  const result = await getClient().responses.inputTokens.count(input, {
    timeout: 15_000
  });
  if (!Number.isSafeInteger(result.input_tokens) || result.input_tokens < 0) {
    throw new Error('입력 토큰 수를 확인하지 못했습니다.');
  }
  return result.input_tokens;
}

export function createResponse(input: ReturnType<typeof responseInput>) {
  return getClient().responses.create({
    ...input,
    max_output_tokens: MAX_OUTPUT_TOKENS,
    store: true
  });
}

export function definitelyUnbilled(error: unknown) {
  return (
    error instanceof OpenAI.APIError &&
    error.status !== undefined &&
    [400, 401, 403, 404, 422, 429].includes(error.status)
  );
}
