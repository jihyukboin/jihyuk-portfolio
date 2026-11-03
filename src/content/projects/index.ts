import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const storyFiles: Record<string, string> = {
  imgobot: 'imgobot/story.md'
};

export async function getProjectStory(projectId: string) {
  const file = storyFiles[projectId];
  if (!file) return null;

  return readFile(
    path.join(process.cwd(), 'src/content/projects', file),
    'utf8'
  );
}
