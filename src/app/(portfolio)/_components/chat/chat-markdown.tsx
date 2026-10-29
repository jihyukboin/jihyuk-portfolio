import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './chat-markdown.module.css';

const components: Components = {
  a: ({ href, title, children }) =>
    href ? (
      <a href={href} title={title} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <span>{children}</span>
    ),
  table: ({ children }) => (
    <div
      className={styles.tableScroll}
      tabIndex={0}
      role="region"
      aria-label="답변 표"
    >
      <table>{children}</table>
    </div>
  )
};

export function ChatMarkdown({ children }: { children: string }) {
  return (
    <div className={styles.markdown}>
      <Markdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
        {children}
      </Markdown>
    </div>
  );
}
