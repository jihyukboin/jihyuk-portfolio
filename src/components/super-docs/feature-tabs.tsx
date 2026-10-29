'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { formats } from '@/data/super-docs';

export function FeatureTabs() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % formats.length;
    else if (event.key === 'ArrowLeft')
      next = (index - 1 + formats.length) % formats.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = formats.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <div
        role="tablist"
        aria-label="문서 형식별 기능"
        className="flex justify-center gap-1.5 mb-8"
      >
        {formats.map((format, index) => (
          <button
            key={format.name}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`tab-${format.name.toLowerCase()}`}
            aria-selected={index === selected}
            aria-controls={`panel-${format.name.toLowerCase()}`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`px-5 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer active:scale-[0.97] ${index === selected ? 'bg-neutral-200 text-neutral-900 shadow-md shadow-black/40' : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'}`}
          >
            {format.name}
          </button>
        ))}
      </div>
      {formats.map((format, index) => (
        <div
          key={format.name}
          role="tabpanel"
          id={`panel-${format.name.toLowerCase()}`}
          tabIndex={0}
          aria-labelledby={`tab-${format.name.toLowerCase()}`}
          hidden={selected !== index}
          className="rounded-2xl overflow-hidden ring-1 ring-neutral-800 bg-neutral-900 shadow-lg"
        >
          <div className="flex min-h-[400px] flex-col md:flex-row">
            <div className="flex flex-col justify-center w-full md:w-1/2 p-8 sm:p-12 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl text-neutral-300 leading-relaxed">
                {format.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
                {format.description}
              </p>
            </div>
            <div className="flex min-h-64 w-full md:w-1/2 items-center justify-center bg-[radial-gradient(ellipse_at_top_right,#6366f150,transparent_70%),linear-gradient(135deg,#1e293b,#292039)] p-8">
              <div
                aria-hidden="true"
                className="w-52 rounded-xl border border-white/15 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-sm"
              >
                <span className="inline-block rounded-md bg-blue-400/15 px-2 py-1 text-xs font-medium tracking-wider text-blue-300">
                  {format.name}
                </span>
                <div className="mt-7 h-2 w-24 rounded bg-white/60" />
                <div className="mt-4 h-1 w-full rounded bg-white/15" />
                <div className="mt-2 h-1 w-full rounded bg-white/15" />
                <div className="mt-2 h-1 w-3/4 rounded bg-white/15" />
                <p className="mt-8 text-xs text-neutral-300">
                  {format.filename}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
