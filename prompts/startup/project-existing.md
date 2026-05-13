# 기존 레포에서 작업 재개 시

- **대상**: 이미 있는 레포에서 작업을 이어갈 때.

---

## Claude 에게 붙여넣을 프롬프트

```
기존 레포에서 작업을 이어갈 거야. 먼저 아래를 실행해서 현재 상태를 보여줘.

1) `git remote -v` — 원격 URL 확인. 개인/회사 계정 오염 여부 체크.
2) `gh repo view --json visibility,isPrivate,defaultBranchRef` — 가시성/기본 브랜치 확인.
3) `git status` — 남아있는 워킹 트리 확인. 이전 세션에서 남긴 임시파일/디버깅 파일이 있나?
4) `git log --oneline -5` — 최근 커밋 5개 확인.
5) 현재 브랜치가 공유 브랜치(main/master/develop)인지 개인 브랜치인지 확인.

확인이 끝나면:
- 오늘의 목표 한 줄을 내가 말하게 해.
- 작업 시작 전 `prompts/required/pre-work.md` 의 기본 3가지 체크는 여전히 실행.
- 커밋 시 `prompts/required/pre-commit.md` 필수.
- 배포 시 `prompts/required/pre-deploy.md` 필수.

만약 레포가 **public** 이고, 내가 이 세션에서 만드는 변경에 민감정보가 섞일 여지가 있으면
평소보다 한 단계 더 엄격하게 점검해.
```
