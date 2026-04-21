# prompts/required/daily-audit.md — 일일 보안 감사

- **언제 쓰나**: 하루에 한 번 (세션 종료 전 권장).
- **예상 소요시간**: 3분.
- **출력**: [`../../docs/SECURITY_NEWS/YYYY/YYYY-MM-DD.md`](../../docs/SECURITY_NEWS/) 에 기록.

---

## Claude 에게 붙여넣을 프롬프트

```
하루를 마치기 전에 아래 네 가지를 정리해서 나에게 보여줘.

1) 오늘 이 레포(또는 다른 레포)에서 내가 커밋한 내용 요약 (3줄).
2) 오늘 경험하거나 들은 보안/운영 이슈가 있으면 한 건만 골라서 요약.
   - 관련 링크, 한 줄 교훈.
3) 그 이슈를 본 레포의 `docs/SECURITY_NEWS/YYYY/YYYY-MM-DD.md` 엔트리로
   `docs/SECURITY_NEWS/TEMPLATE.md` 서식에 맞춰 작성 제안.
4) 이번 이슈 때문에 `docs/SECURITY_CHECKLIST.md` 나 `docs/AI_CODE_REVIEW.md` 에
   새 항목이 필요하면 diff 형태로 제안. 내가 승인하면 편집 후 커밋.
   커밋 메시지: `chore(checklist): add <issue summary> (YYYY-MM-DD)`

오늘 특별한 이슈가 없으면 "오늘은 해당 없음" 으로 짧게 종료해.
```
