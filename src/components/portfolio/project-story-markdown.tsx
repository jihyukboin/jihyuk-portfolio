import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './project-story-markdown.module.css';

export function ProjectStoryMarkdown({ children }: { children: string }) {
  return (
    <div className={styles.markdown}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          h1: ({ children }) => <h5>{children}</h5>,
          h2: ({ children }) => <h6>{children}</h6>
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
