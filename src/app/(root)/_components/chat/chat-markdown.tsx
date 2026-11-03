import Markdown, { type Components } from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkCjkFriendly from 'remark-cjk-friendly/parseOnly';
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough/parseOnly';
import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';
import styles from './chat-markdown.module.css';

// GFM 다음에 CJK 확장을 적용합니다. 단일 ~는 한국어의 범위 표기로 보존합니다.
const remarkPlugins: PluggableList = [
  [remarkGfm, { singleTilde: false }],
  remarkCjkFriendly,
  [remarkCjkFriendlyGfmStrikethrough, { singleTilde: false }],
  remarkBreaks
];

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
      <Markdown remarkPlugins={remarkPlugins} components={components} skipHtml>
        {children}
      </Markdown>
    </div>
  );
}
