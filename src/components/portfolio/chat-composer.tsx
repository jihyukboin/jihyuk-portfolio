'use client';

import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { siteOwner } from '@/data/site';
import styles from './chat-composer.module.css';

export function ChatComposer() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { text: string; time: string; dateTime: string }[]
  >([]);
  const [multiline, setMultiline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage() {
    const text = message.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    setMessages((previous) => [
      ...previous,
      { text, time, dateTime: now.toISOString() }
    ]);
    setMessage('');
    setMultiline(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 flex flex-col items-center">
      {messages.length > 0 && (
        <section
          aria-label="채팅 대화"
          ref={messagesRef}
          className={`${styles.input} pointer-events-auto mx-5 mb-3 flex max-h-[min(40dvh,400px)] w-[calc(100%-40px)] max-w-[800px] flex-col gap-6 overflow-y-auto rounded-[24px] border border-[#e5e8eb] bg-white/95 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]`}
        >
          {messages.map(({ text, time, dateTime }, index) => (
            <div key={index} className="flex flex-col gap-6">
              <div className="flex max-w-full items-end gap-2 self-end">
                <time
                  dateTime={dateTime}
                  className="shrink-0 text-xs text-[#8b95a1]"
                >
                  {time}
                </time>
                <div className="min-w-0 whitespace-pre-wrap break-words rounded-[24px] bg-[#f2f4f6] px-5 py-3 text-[#333d4b]">
                  {text}
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
                <div className="flex min-w-0 items-end gap-2">
                  <div className="rounded-[20px] bg-[#f2f4f6] px-4 py-3 text-[#333d4b]">
                    답장입니다.
                  </div>
                  <time
                    dateTime={dateTime}
                    className="shrink-0 text-xs text-[#8b95a1]"
                  >
                    {time}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      <div className="flex w-full justify-center bg-white/35 px-5 pb-[22px] backdrop-blur-[8px]">
        <div className="pointer-events-auto relative w-full max-w-[800px] rounded-[28px] border border-[#e5e8eb] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <textarea
            aria-label="채팅 메시지"
            ref={textareaRef}
            value={message}
            placeholder="무엇이든 물어보세요"
            rows={1}
            className={`${styles.input} block min-h-[54px] max-h-[264px] w-full resize-none overflow-y-auto rounded-[28px] bg-transparent py-3 pl-6 text-base leading-6 text-[#333d4b] outline-none ${multiline ? 'pr-6' : 'pr-16'}`}
            onChange={(event) => {
              const textarea = event.currentTarget;
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
                sendMessage();
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
              disabled={!message.trim()}
              onClick={sendMessage}
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
