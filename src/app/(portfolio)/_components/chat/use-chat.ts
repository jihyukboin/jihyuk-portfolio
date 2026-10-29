'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import useSWR from 'swr';
import {
  nextUtcMidnight,
  utcDay,
  type ChatErrorBody,
  type ChatSnapshot
} from '@/lib/chat/contracts';
import { getVisitorId, serverVisitorId, subscribeChatStorage } from './session';

class ChatHttpError extends Error {
  constructor(public detail: ChatErrorBody['error']) {
    super(detail.message);
  }
}

async function chatRequest(
  visitorId: string,
  input?: { requestId: string; question: string }
) {
  const response = await fetch('/api/chat', {
    method: input ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${visitorId}`,
      ...(input ? { 'Content-Type': 'application/json' } : {})
    },
    body: input ? JSON.stringify(input) : undefined,
    cache: 'no-store'
  });
  if (!response.ok) {
    const body = (await response.json()) as ChatErrorBody;
    throw new ChatHttpError(body.error);
  }
  return response.json() as Promise<ChatSnapshot>;
}

export function useChat() {
  const visitorId = useSyncExternalStore(
    subscribeChatStorage,
    getVisitorId,
    serverVisitorId
  );
  const { data, error, isLoading, mutate } = useSWR(
    visitorId ? (['chat', visitorId] as const) : null,
    ([, id]) => chatRequest(id),
    {
      errorRetryCount: 2,
      refreshInterval: (current) =>
        current?.turns.some((turn) => turn.status === 'pending') ? 1500 : 0
    }
  );
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const inFlight = useRef(false);
  const uncertainRequest = useRef<{
    requestId: string;
    question: string;
  } | null>(null);
  const pending =
    data?.turns.some((turn) => turn.status === 'pending') ?? false;

  useEffect(() => {
    if (!data) return;
    const timeout = window.setTimeout(
      () => {
        void mutate();
      },
      Math.max(0, new Date(data.resetAt).getTime() - Date.now()) + 100
    );
    return () => window.clearTimeout(timeout);
  }, [data, mutate]);

  async function send(question: string) {
    if (!visitorId || inFlight.current || pending) return false;
    inFlight.current = true;
    setSending(true);
    setSendError(null);
    const request =
      uncertainRequest.current?.question === question
        ? uncertainRequest.current
        : { requestId: crypto.randomUUID(), question };
    uncertainRequest.current = request;
    try {
      await mutate(() => chatRequest(visitorId, request), {
        optimisticData: (current) => ({
          day: current?.day ?? utcDay(),
          resetAt: current?.resetAt ?? nextUtcMidnight(utcDay()),
          quotaReached: false,
          turns: [
            ...(current?.turns ?? []),
            {
              id: request.requestId,
              question,
              answer: null,
              status: 'pending',
              errorMessage: null,
              createdAt: new Date().toISOString()
            }
          ]
        }),
        rollbackOnError: true,
        revalidate: false
      });
      uncertainRequest.current = null;
      return true;
    } catch (reason) {
      if (reason instanceof ChatHttpError) {
        // 저장 단계의 서버 오류도 생성 결과가 불확실하므로 같은 요청 ID로 재확인합니다.
        if (reason.detail.code !== 'UNAVAILABLE')
          uncertainRequest.current = null;
        if (reason.detail.code === 'DAILY_LIMIT') {
          await mutate(
            (current) => ({
              day: current?.day ?? utcDay(),
              resetAt: reason.detail.resetAt ?? nextUtcMidnight(utcDay()),
              turns: current?.turns ?? [],
              quotaReached: true
            }),
            { revalidate: false }
          );
        } else {
          setSendError(reason.message);
          void mutate();
        }
      } else {
        setSendError(
          '답변 수신을 확인하지 못했습니다. 다시 전송하면 저장된 결과를 확인합니다.'
        );
        void mutate();
      }
      return false;
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return {
    data,
    sending: sending || pending,
    loading: isLoading,
    errorMessage:
      sendError ??
      (error ? '대화를 불러오지 못했습니다. 다시 연결해주세요.' : null),
    clearError: () => setSendError(null),
    reload: () => {
      setSendError(null);
      void mutate();
    },
    send
  };
}
