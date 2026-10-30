'use client';

import { blueCtaClass } from '@/components/button-styles';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cardClass, projectLabelClass } from './portfolio-styles';

export function ProjectStory({ id, title }: { id: string; title: string }) {
  const [expanded, setExpanded] = useState(false);
  const contentId = `${id}-story`;

  return (
    <div>
      <div id={contentId} className="grid gap-[14px]">
        <h4 className={projectLabelClass}>스토리</h4>
        <div
          className={`${cardClass} relative overflow-hidden px-5 py-4 sm:px-6 sm:py-5 ${expanded ? '' : 'h-60'}`}
        >
          <p className="whitespace-pre-line">
            {Array(20).fill('스토리입니다.').join('\n')}
          </p>
          {!expanded && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[40%] bottom-0 bg-gradient-to-b from-transparent via-[#f2f4f6]/70 to-[#f2f4f6] backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,transparent,#000_60%)]"
            />
          )}
        </div>
      </div>
      <footer className="mt-7 flex h-[50px] items-center justify-center border-b border-[#e5e8eb]">
        <div className="min-w-0 max-w-full px-3 sm:px-4">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded(!expanded)}
            className={`${blueCtaClass} h-10 gap-2 px-4 text-[15px] leading-5`}
          >
            <span className="truncate">
              {expanded ? '접기' : `${title} 자세한 스토리 더보기`}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`size-5 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </footer>
    </div>
  );
}
