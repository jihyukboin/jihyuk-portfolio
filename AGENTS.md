# Repository Guidelines

These instructions apply throughout this repository. Follow more specific nested `AGENTS.md` instructions where present.

## Working rules

- Implement the current requirements with the simplest complete solution; avoid speculative abstractions and dependencies.
- Inspect existing code and configuration first, and preserve unrelated local changes. When moving files, update imports, tests, tooling, and documentation.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Routes

- Keep the home page and its layout in `src/app/(root)/`; place introduction pages under `src/app/(introduce)/<page>/`. Route groups do not change public URLs.
- Use kebab-case for regular file and directory names, and follow Next.js conventions for route files and private folders.

## Tests

- Place test files, configuration, and generated test results under `test/`.
- When code or interfaces change, update affected tests and mocks to match the intended behavior; remove obsolete tests. Check test and tooling paths when moving files.
- Test changed behavior and meaningful edge cases. Avoid tests that merely mirror implementation details.
- Run tests relevant to the change; run the full applicable suite for shared infrastructure changes. Report checks performed and any skipped or failed checks.

## Validation commands

- `npm run lint` and `npm run typecheck`: check code and types.
- `npm run test:e2e`: build and run Playwright browser tests; install Chromium with `npx playwright install chromium` if needed.
- `npm run test:chat`: build and run chat integration tests. These tests delete chat data in the database specified by `TEST_DATABASE_URL`; use a separate disposable database whose name ends in `_test`.
- `npm run format:check`: check formatting. For documentation-only changes, check formatting without running application tests.

## Public information

- Keep `public/llms.txt` up to date when portfolio profile, education, projects, skills, credentials, links, or other information it covers changes. Check it against the current content and use the public site URL.
