---
description: 새 보안 이슈를 체크리스트에 반영하고 커밋
argument-hint: "<한 줄 이슈 요약>"
---

내가 방금 경험하거나 목격한 보안/운영 이슈: $ARGUMENTS

아래 순서로 처리해.

1) 이 이슈가 기존의 어떤 문서/섹션에 들어가야 하는지 판단:
   - `docs/SECURITY_CHECKLIST.md` 의 §1~§8 중 어디?
   - 혹은 `docs/AI_CODE_REVIEW.md` 4대 관문 중 어디?
   - 혹은 `docs/MULTI_ENV_GUIDE.md` 의 특정 환경?
2) 해당 위치에 **체크박스 항목 1~2개** 로 요약해서 추가. 장황한 설명은 금지.
3) `docs/SECURITY_CHECKLIST.md` §9 "체크리스트 갱신 로그" 에도 한 블록 추가 (오늘 날짜 포함).
4) diff 를 나에게 먼저 보여주고, 승인받은 뒤에만 커밋.
5) 커밋 메시지: `chore(checklist): add <issue summary> (YYYY-MM-DD)`
6) 푸시 여부는 나에게 확인.
