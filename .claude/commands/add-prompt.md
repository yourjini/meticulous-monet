---
description: 발견한 AI 프롬프트를 library/ 에 새 항목으로 저장
argument-hint: "<프롬프트 텍스트 또는 한 줄 메모 (선택)>"
---

새로 모을 AI 프롬프트: $ARGUMENTS

`library/` 에 한 개의 `.md` 파일로 저장한다. 형식·필드는 `library/README.md` 와 `library/_TEMPLATE.md` 를 따른다.

처리 순서:

1) **프롬프트 본문** 확보:
   - `$ARGUMENTS` 가 비어 있거나 메모 수준이면, 프롬프트 전문을 나에게 달라고 요청한다 (길이 제한 없음, 여러 줄 OK).
   - 본문에는 프롬프트 텍스트만 담는다. 설명·맥락은 본문에 섞지 말고 아래 `note`/`source` 로 뺀다.
2) 다음을 나에게 한 번에 묻는다 (이미 명시했으면 건너뜀):
   - `title`: 사람이 읽는 제목 (한국어 OK).
   - `tags`: 자유 태그 배열. 추천: 보안 · 창작 · 교육 · 업무 · 자동화 · 개발 · 글쓰기 · 리서치 · 요약 · 번역 · 데이터 · 이미지 · 프롬프트설계 · 에이전트. 기존 `library/*.md` 들에서 이미 쓰인 태그가 있으면 표기를 맞춘다.
   - `source`: 어디서 발견했는지 (URL / 책 / 사람 / "직접 작성").
   - `model` (선택, 기본 `any`): 어떤 모델용/검증한 모델.
   - `note` (선택): 사용 팁·주의·변형.
   - `summary` (선택): 목록에 보일 한 줄 요약.
3) 파일명(`<slug>.md`) 결정: 영문 소문자 + 하이픈 권장 (예: `structured-code-review`). 제목이 한국어면 의미가 통하는 영문 슬러그를 제안하고 내 확인을 받는다. `library/<slug>.md` 가 이미 있으면 다른 슬러그를 제안한다.
4) `library/<slug>.md` 작성:
   - 프론트매터: `title`, `tags`, `source`, `added`(오늘 날짜 `YYYY-MM-DD`), `model`, 그리고 값이 있는 경우에만 `note` / `summary`.
   - 그 아래에 프롬프트 본문 그대로.
5) 보안 점검 (이 레포의 커밋 원칙): 본문/프론트매터에 실제 API 키·토큰·개인정보(`sk-`, `ghp_`, `AKIA`, `AIza`, 전화번호, 이메일 목록 등)가 들어있지 않은지 확인. 있으면 플레이스홀더로 치환하자고 제안한다.
6) `git status` → 만든 파일만 명시적으로 스테이징 (`git add library/<slug>.md`). `git add -A` / `git add .` 금지.
7) diff 를 보여주고 승인받은 뒤 커밋. 메시지: `feat(library): add "<title>" (YYYY-MM-DD)`
8) 푸시 여부는 나에게 확인.
