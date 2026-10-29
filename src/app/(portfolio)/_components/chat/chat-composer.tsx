'use client';

import { ArrowUp, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { siteOwner } from '@/data/site';
import { MAX_QUESTION_LENGTH, QUOTA_MESSAGE } from '@/lib/chat/contracts';
import {
  ensureVisitorId,
  getPanelClosed,
  getPanelHeight,
  serverPanelClosed,
  serverPanelHeight,
  setPanelClosed,
  setPanelHeight,
  subscribeChatStorage
} from './session';
import { useChat } from './use-chat';
import { ChatMarkdown } from './chat-markdown';
import styles from './chat-composer.module.css';

export function ChatComposer() {
  const [message, setMessage] = useState('');
  const chat = useChat();
  const panelClosed = useSyncExternalStore(
    subscribeChatStorage,
    getPanelClosed,
    serverPanelClosed
  );
  const messages = chat.data?.turns ?? [];
  const savedPanelHeight = useSyncExternalStore(
    subscribeChatStorage,
    getPanelHeight,
    serverPanelHeight
  );
  const [dragHeight, setDragHeight] = useState<number | null>(null);
  const panelHeight = dragHeight ?? savedPanelHeight;
  const panelRef = useRef<HTMLElement>(null);
  const resizeRef = useRef<{
    pointerId: number;
    startY: number;
    startHeight: number;
    height: number;
    maxHeight: number;
  } | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [multiline, setMultiline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chat.data, chat.sending, panelClosed]);

  function finishResize(event: { pointerId: number }) {
    const resize = resizeRef.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    resizeRef.current = null;
    setPanelHeight(resize.height);
    setDragHeight(null);
  }

  async function sendMessage() {
    const text = message.trim();
    if (
      !text ||
      chat.sending ||
      chat.loading ||
      chat.data?.quotaReached ||
      storageError
    )
      return;
    const draft = message;
    setPanelClosed(false);
    const previousHeight = textareaRef.current?.style.height ?? 'auto';
    setMessage('');
    setMultiline(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
    if (!(await chat.send(text))) {
      setMessage(draft);
      setMultiline(multiline);
      if (textareaRef.current) {
        textareaRef.current.style.height = previousHeight;
      }
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 flex max-h-[calc(100dvh-var(--site-header-height)-16px)] flex-col items-center">
      {!panelClosed &&
        (messages.length > 0 ||
          chat.errorMessage ||
          storageError ||
          chat.data?.quotaReached) && (
          <section
            ref={panelRef}
            aria-label="채팅 대화"
            style={
              panelHeight === null
                ? undefined
                : { height: panelHeight, maxHeight: 'none' }
            }
            className="pointer-events-auto relative mx-5 mb-1 flex min-h-0 max-h-[min(40dvh,400px)] w-[calc(100%-40px)] max-w-[800px] flex-col overflow-hidden rounded-[24px] border border-[#e5e8eb] bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-end bg-transparent px-2 pt-1">
              <button
                type="button"
                aria-label="채팅 패널 높이 조절"
                title="위아래로 드래그하거나 위아래 방향키로 높이를 조절합니다."
                onPointerDown={(event) => {
                  if (
                    !event.isPrimary ||
                    event.button !== 0 ||
                    !panelRef.current
                  )
                    return;
                  event.preventDefault();
                  const rect = panelRef.current.getBoundingClientRect();
                  resizeRef.current = {
                    pointerId: event.pointerId,
                    startY: event.clientY,
                    startHeight: rect.height,
                    height: rect.height,
                    maxHeight: getMaxPanelHeight(rect.bottom)
                  };
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerMove={(event) => {
                  const resize = resizeRef.current;
                  if (!resize || resize.pointerId !== event.pointerId) return;
                  resize.height = Math.min(
                    resize.maxHeight,
                    Math.max(
                      160,
                      resize.startHeight + resize.startY - event.clientY
                    )
                  );
                  setDragHeight(resize.height);
                }}
                onPointerUp={finishResize}
                onPointerCancel={finishResize}
                onLostPointerCapture={finishResize}
                onKeyDown={(event) => {
                  if (
                    !['ArrowUp', 'ArrowDown'].includes(event.key) ||
                    !panelRef.current
                  )
                    return;
                  event.preventDefault();
                  const rect = panelRef.current.getBoundingClientRect();
                  setPanelHeight(
                    Math.min(
                      getMaxPanelHeight(rect.bottom),
                      Math.max(
                        160,
                        rect.height + (event.key === 'ArrowUp' ? 24 : -24)
                      )
                    )
                  );
                }}
                className="pointer-events-auto group absolute top-0 left-1/2 flex h-11 w-16 -translate-x-1/2 touch-none cursor-ns-resize select-none items-start justify-center rounded-full pt-2 outline-none focus-visible:ring-2 focus-visible:ring-[#3182f6]"
              >
                <span
                  aria-hidden="true"
                  className="h-[5px] w-9 rounded-full bg-[#b0b8c1] transition-colors duration-150 group-hover:bg-[#007aff] group-focus-visible:bg-[#007aff]"
                />
              </button>
              <button
                type="button"
                aria-label="채팅 패널 닫기"
                onClick={() => {
                  setPanelClosed(true);
                  textareaRef.current?.focus();
                }}
                className="pointer-events-auto group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#3182f6]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e5e8eb] text-[#6b7684] transition-colors group-hover:bg-[#d1d6db] group-active:bg-[#b0b8c1]">
                  <X size={17} strokeWidth={2.5} aria-hidden="true" />
                </span>
              </button>
            </div>
            <div
              ref={messagesRef}
              className={`${styles.input} flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 pt-14 pb-5`}
            >
              {messages.map(
                ({ id, question, answer, createdAt, status, errorMessage }) => (
                  <div key={id} className="flex flex-col gap-6">
                    <div className="flex max-w-full items-end gap-2 self-end">
                      <time
                        dateTime={createdAt}
                        className="shrink-0 text-xs text-[#8b95a1]"
                      >
                        {formatTime(createdAt)}
                      </time>
                      <div className="min-w-0 whitespace-pre-wrap break-words rounded-[24px] bg-[#f2f4f6] px-5 py-3 text-[#333d4b]">
                        {question}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Image
                        src={siteOwner.image}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 rounded-full object-cover object-top"
                      />
                      <div className="flex min-w-0 max-w-full flex-1 flex-col gap-2">
                        <div
                          aria-live="polite"
                          className="min-w-0 rounded-[20px] bg-[#f2f4f6] px-4 py-3 text-[#333d4b]"
                        >
                          {answer ? (
                            <ChatMarkdown>{answer}</ChatMarkdown>
                          ) : status === 'pending' ? (
                            '답변을 작성하고 있습니다…'
                          ) : (
                            errorMessage
                          )}
                        </div>
                        {status === 'failed' && answer && (
                          <p className="text-xs text-[#8b95a1]">
                            {errorMessage}
                          </p>
                        )}
                        <time
                          dateTime={createdAt}
                          className="shrink-0 text-xs text-[#8b95a1]"
                        >
                          {formatTime(createdAt)}
                        </time>
                      </div>
                    </div>
                  </div>
                )
              )}
              {chat.data?.quotaReached && (
                <div role="status" className="text-sm text-[#4e5968]">
                  <p>{QUOTA_MESSAGE}</p>
                  <p className="mt-2 text-xs">
                    다음 이용 가능:{' '}
                    {new Date(chat.data.resetAt).toLocaleString('ko-KR')}
                  </p>
                </div>
              )}
              {(storageError || chat.errorMessage) && (
                <div className="text-sm text-[#4e5968]">
                  <p role="alert">{storageError ?? chat.errorMessage}</p>
                  {!storageError && (
                    <button
                      type="button"
                      onClick={chat.reload}
                      className="mt-2 underline"
                    >
                      다시 연결
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      <div className="flex w-full shrink-0 justify-center bg-white/35 px-5 pb-[22px] backdrop-blur-[8px]">
        <div className="pointer-events-auto relative w-full max-w-[800px] rounded-[28px] border border-[#e5e8eb] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <textarea
            aria-label="채팅 메시지"
            ref={textareaRef}
            value={message}
            placeholder="무엇이든 물어보세요"
            rows={1}
            maxLength={MAX_QUESTION_LENGTH}
            readOnly={chat.sending}
            aria-busy={chat.sending}
            className={`${styles.input} block min-h-[54px] max-h-[264px] w-full resize-none overflow-y-auto rounded-[28px] bg-transparent py-3 pl-6 text-base leading-6 text-[#333d4b] outline-none ${multiline ? 'pr-6' : 'pr-16'}`}
            onChange={(event) => {
              const textarea = event.currentTarget;
              if (textarea.value) {
                try {
                  ensureVisitorId();
                  setStorageError(null);
                } catch {
                  setStorageError(
                    '대화를 저장하려면 브라우저의 로컬 저장소를 사용할 수 있어야 합니다.'
                  );
                }
              }
              chat.clearError();
              setMessage(textarea.value);
              textarea.style.height = 'auto';
              setMultiline(textarea.scrollHeight > 54);
              textarea.style.height = `${textarea.scrollHeight}px`;
            }}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                void sendMessage();
              }
            }}
          />
          <div
            className={
              multiline
                ? 'flex justify-end px-2 pb-2'
                : 'absolute right-2 bottom-[7px]'
            }
          >
            <button
              type="button"
              aria-label="메시지 전송"
              disabled={
                !message.trim() ||
                chat.sending ||
                chat.loading ||
                !!chat.data?.quotaReached ||
                !!storageError
              }
              onClick={() => {
                void sendMessage();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-white disabled:bg-[#e5e8eb] disabled:text-[#9ca3af]"
            >
              <ArrowUp size={20} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMaxPanelHeight(bottom: number) {
  const headerHeight =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--site-header-height'
      )
    ) || 0;
  return Math.max(160, bottom - headerHeight - 16);
}

function formatTime(dateTime: string) {
  return new Date(dateTime).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
