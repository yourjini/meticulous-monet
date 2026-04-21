---
description: 신규 프로젝트 시작 가이드 (10개 질문 + 초기 생성 순서)
---

`prompts/startup/project-new.md` 를 실행해.

핵심 규칙:
- `docs/NEW_PROJECT_CHECKLIST.md` 의 10개 질문이 끝나기 전에는 `git init` / `gh repo create` 등 생성 명령 금지.
- 레포는 기본 **private** 로 생성.
- `.gitignore` 는 `templates/gitignore.template` 에서 복사.
- 첫 커밋 전에 `git status --ignored` 로 민감파일 실수 체크.
