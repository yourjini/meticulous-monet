// Utility helpers to extract title / description from plain markdown that
// doesn't have front-matter (all source files in docs/ and prompts/ are plain).

export function firstHeadingAsTitle(body: string | undefined, fallback: string): string {
  if (!body) return fallback;
  const m = body.match(/^\s*#\s+(.+?)\s*$/m);
  if (!m) return fallback;
  // Strip a leading filename / path prefix like "NAME.md —" or "prompts/foo/bar.md —"
  // to keep titles short. Matches both uppercase (CHECKLIST.md) and lowercase
  // (prompts/required/pre-commit.md) prefixes.
  return m[1].replace(/^[A-Za-z0-9_./-]+\.md\s*[—\-:]\s*/, '').trim();
}

export function firstParagraphAsSummary(body: string | undefined, maxLen = 160): string | undefined {
  if (!body) return undefined;
  const lines = body.split('\n');
  let started = false;
  const buf: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      if (started) break;
      continue;
    }
    if (/^#{1,6}\s+/.test(line)) continue;
    if (/^[->*]\s+/.test(line)) continue;
    if (/^\|/.test(line)) continue;
    if (/^```/.test(line)) continue;
    if (/^<!--/.test(line)) continue;
    started = true;
    buf.push(line);
    if (buf.join(' ').length >= maxLen) break;
  }
  const summary = buf
    .join(' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
  if (!summary) return undefined;
  return summary.length > maxLen ? summary.slice(0, maxLen - 1).trimEnd() + '…' : summary;
}

export function prettyIdToTitle(id: string, fallback = id): string {
  const base = id.split('/').pop() ?? fallback;
  return base
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatDateSlug(id: string): string | undefined {
  const m = id.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return undefined;
  return `${m[1]}.${m[2]}.${m[3]}`;
}
