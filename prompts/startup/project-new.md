# prompts/startup/project-new.md — 신규 프로젝트 시작 시

- **대상**: 오늘 **새** 레포를 만들 예정이거나 방금 만들었을 때.

---

## Claude 에게 붙여넣을 프롬프트

```
오늘 새 프로젝트를 시작할 거야. 아래 순서를 엄격히 지켜줘.

1) `docs/NEW_PROJECT_CHECKLIST.md` 의 10개 질문을 하나씩 나에게 물어봐.
   답이 다 나오기 전까지는 `git init`, `mkdir`, `gh repo create` 등 어떤 생성 명령도 실행하지 마.

2) 10개 질문이 끝나면, 같은 문서의 "2. 초기 생성 순서" 를 순서대로 실행:
   - `.gitignore` 를 `templates/gitignore.template` 에서 복사 (이 레포에서 가져와서).
   - `.env.example` 작성 제안.
   - `git init -b main`.
   - 파일 명시적으로 `git add <file>`. `-A` / `.` 금지.
   - `git status --ignored` 로 실수 방지 확인.
   - `chore: init` 첫 커밋.
   - `gh repo create <name> --private --source=. --remote=origin` (기본 private).
   - 저장소 설정: Secret scanning · Push protection · 기본 브랜치 보호.
   - 첫 푸시.

3) 마지막에 "첫 주 내 할 일" 목록을 보여주고, 그 중 오늘 당장 할 수 있는 것만 선택하게 해.
```
