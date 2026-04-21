# prompts/required/pre-work.md — 작업 시작 전 자가진단

- **언제 쓰나**: Claude Code 세션을 열자마자, 첫 지시 전에.
- **예상 소요시간**: 1분.
- **다음**: 작업 진행 → 커밋 전 [`pre-commit.md`](pre-commit.md).

---

## Claude 에게 붙여넣을 프롬프트

```
지금부터 작업을 시작하기 전에, 먼저 아래 세 가지를 나(사용자)에게 한 줄씩 질문해서 확인해줘.
확인이 끝나기 전까지는 git 명령이나 파일 수정을 시작하지 마.

1) 지금 접속한 환경(집 데스크탑 / 회사 노트북 / 모바일 / 공용 PC 등)이 뭐야?
2) 활성화된 Claude 계정과 GitHub 계정이 각각 개인/회사/공용 중 무엇이야?
   (필요하면 `gh auth status`, `git config --global user.email` 실행해서 검증)
3) 오늘 작업할 레포가 이미 있는지 신규인지, 있다면 public/private 어느 쪽이야?
   (있다면 `gh repo view --json visibility,isPrivate` 로 확인)

세 답이 다 확정되고, 내가 명시적으로 "시작해" 라고 말한 뒤에만 다음 단계로 넘어가.
만약 내가 위 질문 중 하나라도 "모름" 이라고 답하면, 답을 찾는 방법부터 안내해.
```
