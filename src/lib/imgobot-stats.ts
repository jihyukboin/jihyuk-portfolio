import 'server-only';

export const defaultImgobotUserCount = 3430;

export async function getImgobotUserCount(): Promise<number> {
  try {
    const response = await fetch('https://imgobot.com/api/home/stats', {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000)
    });
    if (!response.ok) return defaultImgobotUserCount;

    const payload = await response.json();
    const count = payload?.data?.totalUsers;
    return payload?.success === true &&
      typeof count === 'number' &&
      Number.isSafeInteger(count) &&
      count >= 0
      ? count
      : defaultImgobotUserCount;
  } catch {
    return defaultImgobotUserCount;
  }
}
