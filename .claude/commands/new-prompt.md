---
description: 오늘의 새로운 프롬프트 추가 (필수 또는 선택)
argument-hint: "<프롬프트 한 줄 요지>"
---

오늘 새로 만들고 싶은 프롬프트: $ARGUMENTS

처리 순서:
1) 이 프롬프트가 **필수(required)** 인지 **선택(optional)** 인지 나에게 물어.
   - required: 매일/매세션/매커밋/매배포처럼 **빠지면 안 되는** 루틴.
   - optional: 특정 상황에서만 쓰는 것.
2) 경로 결정:
   - required → `prompts/required/<kebab-case>.md`
   - optional → `prompts/optional/<kebab-case>.md`
   - 시작 프롬프트(상황별) → `prompts/startup/<kebab-case>.md`
3) 기존 파일의 포맷을 참고해 상단 메타(언제 쓰나 / 소요시간 / 다음) 를 먼저 채워.
4) 본문은 "Claude 에게 붙여넣을 프롬프트" 코드 블록으로 작성.
5) `prompts/README.md` 의 목록에 링크 한 줄 추가.
6) 필수로 분류된 경우 `CLAUDE.md` 의 해당 훅(작업 시작/커밋/배포 등)에 연결 필요한지 나에게 물어.
7) diff 보여주고 승인받아 커밋. 메시지: `feat(prompts): add <요지> (YYYY-MM-DD)`
