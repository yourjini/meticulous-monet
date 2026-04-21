# prompts/required/pre-commit.md — 커밋 직전 자가진단

- **언제 쓰나**: `git commit` 직전.
- **예상 소요시간**: 1~2분.
- **다음**: 푸시 → 배포 전 [`pre-deploy.md`](pre-deploy.md).

---

## Claude 에게 붙여넣을 프롬프트

```
커밋하기 전에 아래 절차를 순서대로 해줘. 문제 발견 시 커밋을 중단하고 나에게 보고해.

1) `git status` 실행. 스테이징된 파일 목록을 나에게 보여줘.
2) `git diff --cached` 실행. 추가/수정된 라인을 훑어.
3) 아래 패턴이 스테이징에 있으면 **즉시 중단**하고 어떤 파일/라인인지 알려줘.
   - 파일명: `.env`, `.env.*`(단 `.env.example` 제외), `*.pem`, `*.key`, `*.pfx`, `*.p12`,
            `id_rsa*`, `id_ed25519*`, `id_ecdsa*`, `credentials.*`, `secrets.*`,
            `service-account*.json`, `.aws/`, `.gcloud/`, `.azure/`
   - 리터럴: `sk-...`, `ghp_...`, `github_pat_...`, `AKIA...`, `ASIA...`, `AIza...`,
            `xox[baprs]-...`, `postgres://...:...@...`
   - 개인정보: 주민번호 패턴, 전화번호 목록, 실명+연락처 조합
   - 1MB 초과 바이너리
4) 레포 가시성을 다시 확인해(public 이라면 3단계를 한 번 더 검토).
5) 문제가 없으면 커밋 메시지 제안을 달라고 나에게 물어봐. 내가 승인하면 커밋.
6) `git add -A` 나 `git add .` 는 절대 쓰지 마. 파일을 하나씩 명시.
7) `--no-verify` 도 내가 명시적으로 요청하지 않는 한 쓰지 마.
```
