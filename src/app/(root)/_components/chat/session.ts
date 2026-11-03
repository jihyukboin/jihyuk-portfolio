'use client';

import { visitorIdSchema } from '@/lib/chat/contracts';

const STORAGE_KEY = 'portfolio.chat.visitor';
const SESSION_EVENT = 'portfolio-chat-session';
const PANEL_CLOSED_KEY = 'portfolio.chat.panelClosed';
const PANEL_HEIGHT_KEY = 'portfolio.chat.panelHeight';
let panelClosedFallback: boolean | undefined;
let panelHeightFallback: number | undefined;

export function getVisitorId() {
  try {
    const parsed = visitorIdSchema.safeParse(localStorage.getItem(STORAGE_KEY));
    return parsed.success ? parsed.data.toLowerCase() : null;
  } catch {
    return null;
  }
}

export function ensureVisitorId() {
  const existing = getVisitorId();
  if (existing) return existing;
  const visitorId = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEY, visitorId);
  window.dispatchEvent(new Event(SESSION_EVENT));
  return visitorId;
}

export function subscribeChatStorage(listener: () => void) {
  window.addEventListener('storage', listener);
  window.addEventListener(SESSION_EVENT, listener);
  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener(SESSION_EVENT, listener);
  };
}

export function serverVisitorId() {
  return null;
}

export function getPanelClosed() {
  if (panelClosedFallback !== undefined) return panelClosedFallback;
  try {
    return localStorage.getItem(PANEL_CLOSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setPanelClosed(closed: boolean) {
  panelClosedFallback = closed;
  try {
    localStorage.setItem(PANEL_CLOSED_KEY, String(closed));
    panelClosedFallback = undefined;
  } catch {
    // 저장소 사용이 제한되어도 현재 탭에서는 패널을 닫을 수 있게 합니다.
  }
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function serverPanelClosed() {
  return false;
}

export function getPanelHeight() {
  if (panelHeightFallback !== undefined) return panelHeightFallback;
  try {
    const height = Number(localStorage.getItem(PANEL_HEIGHT_KEY));
    return Number.isFinite(height) && height >= 160 ? height : null;
  } catch {
    return null;
  }
}

export function setPanelHeight(height: number) {
  panelHeightFallback = height;
  try {
    localStorage.setItem(PANEL_HEIGHT_KEY, String(height));
    panelHeightFallback = undefined;
  } catch {
    // 저장소 사용이 제한되어도 현재 탭에서는 높이를 유지합니다.
  }
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function serverPanelHeight() {
  return null;
}
