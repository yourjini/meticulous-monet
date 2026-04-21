# docs/SECURITY_NEWS/ — 오늘의 클로드 보안뉴스

이 디렉토리는 **매일(혹은 이슈가 있을 때)** Claude / Anthropic / AI 코딩 도구 관련 보안 뉴스·사건·교훈을
한 건씩 기록한다. 추상 원칙만으로는 기억에 남지 않아 **사례 기반 기록**을 함께 운영한다.

---

## 구조

```
docs/SECURITY_NEWS/
├── README.md               # 이 문서
├── TEMPLATE.md             # 복사해서 쓰는 서식
└── YYYY/
    └── YYYY-MM-DD.md       # 일자별 엔트리
```

## 기록 원칙

1. **하루 1건** 이 목표. 없는 날은 비워 둔다(억지 생성 금지).
2. 사건을 요약하고, **본 레포의 어떤 체크리스트 항목이 이 사고를 막을 수 있었을지** 연결한다.
3. 링크는 신뢰 가능한 1차 출처를 우선.
4. 기록 후 필요하다면 [`../SECURITY_CHECKLIST.md`](../SECURITY_CHECKLIST.md) 와
   [`../AI_CODE_REVIEW.md`](../AI_CODE_REVIEW.md) 에 항목 추가.

## 빠른 작성

```
/daily-news
```
슬래시 커맨드가 `TEMPLATE.md` 를 복사해 `YYYY/YYYY-MM-DD.md` 로 만들어준다.
