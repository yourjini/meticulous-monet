// Helpers for the prompt library (../library/*.md).
// `entry.body` from the content collection already gives the raw prompt text
// (frontmatter stripped) — that's what the copy button uses. For the per-entry
// ".md export" we want the original file verbatim (frontmatter + body), so we
// read it off disk at build time.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const LIBRARY_DIR = fileURLToPath(new URL('../../../library/', import.meta.url));

export function rawFile(id: string): string {
  return readFileSync(path.join(LIBRARY_DIR, `${id}.md`), 'utf8');
}

/** Trim outer blank lines but keep a single trailing newline. */
export function tidyText(s: string): string {
  return s.replace(/^\s*\n/, '').replace(/\s+$/, '') + '\n';
}

export function fmtDate(d: Date | undefined): string | undefined {
  if (!d) return undefined;
  return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`;
}

export type LibrarySummaryParts = {
  summary?: string;
  note?: string;
  body: string;
};

/** What to show as the one-line blurb on cards. */
export function blurb({ summary, note, body }: LibrarySummaryParts): string | undefined {
  const pick = summary || note;
  if (pick) return pick;
  const firstLine = body.split('\n').map((l) => l.trim()).find(Boolean);
  if (!firstLine) return undefined;
  return firstLine.length > 160 ? firstLine.slice(0, 159).trimEnd() + '…' : firstLine;
}
