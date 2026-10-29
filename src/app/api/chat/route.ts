import { ChatError, askChat, getChat } from '@/lib/chat/server';
import { questionSchema, visitorIdSchema } from '@/lib/chat/contracts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const privateHeaders = { 'Cache-Control': 'private, no-store' };

function visitor(request: Request) {
  const authorization = request.headers.get('authorization');
  const parsed = visitorIdSchema.safeParse(
    authorization?.replace(/^Bearer /, '')
  );
  if (!authorization?.startsWith('Bearer ') || !parsed.success) {
    throw new ChatError(
      'INVALID_VISITOR',
      '브라우저의 대화 식별자를 확인해주세요.',
      401
    );
  }
  return parsed.data.toLowerCase();
}

function errorResponse(error: unknown) {
  if (error instanceof ChatError) {
    return Response.json(
      {
        error: {
          code: error.code,
          message: error.message,
          ...(error.resetAt ? { resetAt: error.resetAt } : {})
        }
      },
      {
        status: error.status,
        headers: {
          ...privateHeaders,
          ...(error.resetAt
            ? {
                'Retry-After': String(
                  Math.max(
                    1,
                    Math.ceil(
                      (new Date(error.resetAt).getTime() - Date.now()) / 1000
                    )
                  )
                )
              }
            : {})
        }
      }
    );
  }
  // 드라이버·SDK 오류에는 질문과 접속 정보가 포함될 수 있어 그대로 출력하지 않습니다.
  console.error(
    '[chat] 요청 처리 실패:',
    error instanceof Error ? error.name : 'UnknownError'
  );
  return Response.json(
    {
      error: {
        code: 'UNAVAILABLE',
        message: '채팅에 연결하지 못했습니다. 잠시 후 다시 시도해주세요.'
      }
    },
    { status: 503, headers: privateHeaders }
  );
}

async function readQuestion(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    throw new ChatError(
      'INVALID_BODY',
      'JSON 형식으로 질문을 보내주세요.',
      415
    );
  }
  const reader = request.body?.getReader();
  if (!reader) throw new ChatError('INVALID_BODY', '질문을 입력해주세요.', 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 20_000) {
      await reader.cancel();
      throw new ChatError(
        'TOO_LARGE',
        '질문을 4,000자 이내로 입력해주세요.',
        413
      );
    }
    chunks.push(value);
  }
  let body: unknown;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new ChatError('INVALID_BODY', '질문 형식을 확인해주세요.', 400);
  }
  const parsed = questionSchema.safeParse(body);
  if (!parsed.success) {
    throw new ChatError(
      'INVALID_BODY',
      '질문을 1~4,000자로 입력해주세요.',
      400
    );
  }
  return parsed.data;
}

export async function GET(request: Request) {
  try {
    return Response.json(await getChat(visitor(request)), {
      headers: privateHeaders
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    if (request.headers.get('sec-fetch-site') === 'cross-site') {
      throw new ChatError(
        'INVALID_ORIGIN',
        '현재 사이트에서 질문을 전송해주세요.',
        403
      );
    }
    const visitorId = visitor(request);
    const question = await readQuestion(request);
    return Response.json(await askChat(visitorId, question), {
      headers: privateHeaders
    });
  } catch (error) {
    return errorResponse(error);
  }
}
