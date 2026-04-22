#!/usr/bin/env bash
# PreToolUse hook: Block dangerous git flags.
#
# Claude Code hooks receive a JSON payload on stdin.
# We extract tool_input.command and test it against the bad-flag regex.
# If matched, we print a message to stderr and exit 2 (deny).
# Otherwise exit 0 (allow).
#
# Design notes:
# - Shipped as a real script (bash shebang) rather than an inline one-liner,
#   because Claude Code hooks execute via /bin/sh on some systems and bash-isms
#   like here-strings (<<<) cause syntax errors that silently block ALL Bash.
# - Each forbidden flag gets its own grep -E -e pattern with explicit word
#   boundaries ([[:space:]]|$) so that filenames starting with '.' (e.g.
#   `git add .claude/settings.json`) are NOT mis-matched as `git add .`.
# - `--force-with-lease` is allowed: the --force pattern requires a non-dash
#   (or EOS) character immediately after "--force".

set -uo pipefail

CMD="$(jq -r '.tool_input.command // empty' 2>/dev/null || true)"

if [ -z "${CMD:-}" ]; then
  exit 0
fi

# Returns 0 if the command matches any forbidden pattern.
if printf '%s\n' "$CMD" | grep -E \
    -e 'git[[:space:]]+add[[:space:]]+-A([[:space:]]|$)' \
    -e 'git[[:space:]]+add[[:space:]]+--all([[:space:]]|$)' \
    -e 'git[[:space:]]+add[[:space:]]+\.([[:space:]]|$)' \
    -e 'git[[:space:]]+commit[[:space:]]+[^#]*--no-verify([[:space:]]|=|$)' \
    -e 'git[[:space:]]+push[[:space:]]+[^#]*--force([^-]|$)' \
    -q; then
  cat >&2 <<'MSG'
[meticulous-monet] 금지된 git 플래그 감지:
  - git add -A / git add --all / git add .
  - git commit --no-verify
  - git push --force (--force-with-lease 는 허용)
CLAUDE.md 및 docs/SECURITY_CHECKLIST.md §5~§6 참조.
정말 필요하면 사용자에게 명시적으로 재요청하세요.
MSG
  exit 2
fi

exit 0
