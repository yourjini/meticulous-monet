# prompts/ — Claude Code 에 바로 붙여넣는 프롬프트 모음

이 디렉토리에는 **세 가지 범주** 의 프롬프트가 있다.

```
prompts/
├── required/   # 매일·매세션·매커밋 무조건 돌리는 프롬프트
├── optional/   # 필요할 때만 쓰는 프롬프트
└── startup/    # 세션 시작 시, 상황별로 하나만 고르는 프롬프트
```

## required/ (필수)
- [`pre-work.md`](required/pre-work.md) — 작업 시작 전 자가진단
- [`pre-commit.md`](required/pre-commit.md) — 커밋 직전 자가진단
- [`pre-deploy.md`](required/pre-deploy.md) — 배포 직전 4대 관문
- [`daily-audit.md`](required/daily-audit.md) — 하루 한 번 보안 감사

## optional/ (선택)
- [`data-flow-map.md`](optional/data-flow-map.md) — 외부로 나가는 데이터 흐름 맵핑
- [`routine-scope-review.md`](optional/routine-scope-review.md) — 자동화 에이전트 작업 범위·권한 재확인
- [`account-hygiene.md`](optional/account-hygiene.md) — 분기별 계정·토큰 정리

## startup/ (시작 프롬프트 — 상황별)
세션 시작 시 **하나만** 골라서 붙여넣는다. 혹은 `/startup` 을 쓴다.

- 숙련도: [`beginner.md`](startup/beginner.md) · [`intermediate.md`](startup/intermediate.md)
- 환경: [`env-home.md`](startup/env-home.md) · [`env-office.md`](startup/env-office.md) · [`env-mobile.md`](startup/env-mobile.md) · [`env-common.md`](startup/env-common.md)
- 맥락: [`project-new.md`](startup/project-new.md) · [`project-existing.md`](startup/project-existing.md)

---

## 작성 원칙

1. 프롬프트는 **Claude 에게 건네는 문장형** 으로 쓴다. 체크리스트형 문서는 `docs/` 에.
2. 각 프롬프트는 **단독 실행 가능** 해야 한다 (다른 프롬프트 전제 금지).
3. 상단에 "언제 쓰나 / 예상 소요시간 / 이어지는 다음 프롬프트" 를 명시한다.
