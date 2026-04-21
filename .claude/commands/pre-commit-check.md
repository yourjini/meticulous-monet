---
description: 커밋 직전 자가 점검 (스테이징된 파일/리터럴/개인정보 검사)
---

`prompts/required/pre-commit.md` 를 지금 실행해.

문제 발견 시 커밋 절대 금지. 사용자에게 보고하고 처리 방향을 물어.
- `git add -A` / `.` 금지, 파일 명시.
- `--no-verify` 사용자 명시 요청 없이는 금지.
