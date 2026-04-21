# prompts/optional/account-hygiene.md — 분기별 계정·토큰 정리

- **언제 쓰나**: 3개월에 한 번.
- **예상 소요시간**: 20~30분.

---

## Claude 에게 붙여넣을 프롬프트

```
내 계정·토큰·SSH 키를 분기 점검해줘. (내가 직접 봐야 하는 건 링크를 알려주고, 자동 가능한 건 실행)

1) `gh auth status` 로 활성 GitHub 계정 목록 확인.
2) GitHub Personal Access Token 목록을 보라고 안내해 (https://github.com/settings/tokens).
   아래 기준으로 줄이도록 제안:
   - 만료일이 없는 토큰 → 90일 이내 만료 + fine-grained 로 재발급
   - 쓰지 않는 토큰 → revoke
   - 스코프가 과한 토큰 → 최소 권한으로 재발급
3) `~/.ssh/` 내 키 목록을 `ls -la` 로 보여주고, 용도/만든 날짜를 내가 직접 답하게 유도.
   1년 이상 쓴 키, 용도 불명 키는 교체 후보.
4) `git config --list --show-origin | grep user.email` 로 계정 오염 가능성 점검.
   개인/회사 이메일이 섞인 레포가 있으면 목록화.
5) Anthropic / Claude 계정의 세션·API 키 관리 페이지로 이동 안내 (사용자 환경별로).
6) 마지막에 "revoke 한 토큰/키 목록" 을 기록으로 남기도록
   `docs/SECURITY_NEWS/YYYY/YYYY-MM-DD.md` 에 간단 엔트리 작성 제안.
```
