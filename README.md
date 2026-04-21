# meticulous-monet

Claude Code를 **여러 환경(집/회사/모바일/데스크탑/노트북) · 여러 계정(개인/회사) · 때로는 다수 사용자**가
공유하며 쓰는 상황에서 "뭘 지켜야 하는가"를 한 곳에 모아둔 **보안·운영 원칙 저장소**다.

본 레포는 코드를 생산하지 않는다. 대신 다음을 제공한다.

- 신규 사용자가 Claude Code를 처음 켤 때 읽어야 하는 원칙
- 신규 프로젝트를 시작할 때 훑어야 하는 체크리스트
- 매 작업 시작 · 커밋 직전에 스스로에게 물어야 하는 자가진단 프롬프트
- Claude Code에게 "이 원칙을 지켜라"라고 강제하는 `CLAUDE.md` 및 slash command
- 보안 이슈를 발견했을 때 체크리스트를 실시간으로 갱신하는 절차

---

## 빠른 시작

### 1. 본인(혹은 팀)이 처음 이 레포를 쓸 때
1. `docs/ONBOARDING.md` 를 읽는다. (15분)
2. `docs/SECURITY_CHECKLIST.md` 를 스캔한다.
3. `docs/MULTI_ENV_GUIDE.md` 에서 본인이 쓰는 환경 조합(집/회사 × 개인/회사계정 × 모바일/데스크탑)에 해당하는 항목을 확인한다.

### 2. Claude Code로 신규 프로젝트를 시작할 때
```
/new-project
```
- `docs/NEW_PROJECT_CHECKLIST.md` 의 질문을 Claude가 하나씩 묻는다.
- 레포가 공개인지 비공개인지, 민감정보를 커밋할 위험이 있는지 먼저 확정된 뒤에만 작업이 진행된다.

### 3. 이미 있는 프로젝트에서 매 작업 시작 시
```
/security-check
```
- 지금 이 순간의 환경/계정/레포 상태를 점검하는 체크리스트.
- SessionStart hook이 설정돼 있으면 세션 시작 시 자동으로 리마인드된다.

### 4. 커밋 직전
```
/pre-commit-check
```
- 스테이징된 파일에 키/토큰/개인정보가 들어있지 않은지 스스로 확인.

### 5. 새 보안 이슈를 발견했을 때
```
/update-checklist
```
- 방금 경험한 이슈를 `docs/SECURITY_CHECKLIST.md` 해당 섹션에 추가하고,
  `CHANGELOG.md` 와 같은 효과로 커밋까지 이어진다.

---

## 디렉토리 구조

```
meticulous-monet/
├── README.md                       # 이 문서
├── CLAUDE.md                       # Claude Code가 매 세션 자동 로드
├── docs/
│   ├── SECURITY_CHECKLIST.md       # 마스터 체크리스트
│   ├── NEW_PROJECT_CHECKLIST.md    # 신규 프로젝트 시작 체크리스트
│   ├── AI_CODE_REVIEW.md           # AI 생성 코드 배포 전 4대 관문
│   ├── MULTI_ENV_GUIDE.md          # 다중 환경/계정 운영 가이드
│   ├── ONBOARDING.md               # 교육용 신규 사용자 온보딩
│   └── SECURITY_NEWS/
│       ├── README.md
│       ├── TEMPLATE.md
│       └── YYYY/YYYY-MM-DD.md      # 오늘의 클로드 보안뉴스 일자별 기록
├── prompts/
│   ├── README.md
│   ├── required/                   # 매일·매세션·매커밋·매배포 무조건
│   │   ├── pre-work.md
│   │   ├── pre-commit.md
│   │   ├── pre-deploy.md
│   │   └── daily-audit.md
│   ├── optional/                   # 필요할 때만
│   │   ├── data-flow-map.md
│   │   ├── routine-scope-review.md
│   │   └── account-hygiene.md
│   └── startup/                    # 세션 시작 시 상황별로 선택
│       ├── beginner.md
│       ├── intermediate.md
│       ├── env-home.md
│       ├── env-office.md
│       ├── env-mobile.md
│       ├── env-common.md
│       ├── project-new.md
│       └── project-existing.md
├── .claude/
│   ├── settings.json               # SessionStart hook + 금지 git 플래그 차단
│   └── commands/
│       ├── security-check.md       # /security-check
│       ├── new-project.md          # /new-project
│       ├── pre-commit-check.md     # /pre-commit-check
│       ├── pre-deploy-check.md     # /pre-deploy-check
│       ├── update-checklist.md     # /update-checklist
│       ├── daily-news.md           # /daily-news
│       ├── new-prompt.md           # /new-prompt
│       └── startup.md              # /startup (상황별 시작 프롬프트)
├── templates/
│   └── gitignore.template          # 신규 프로젝트에 복사해 쓰는 템플릿
└── .gitignore
```

## 오늘 하루의 흐름 (권장)

1. 세션 시작 → `/startup` (또는 `/security-check`)
2. 작업 중 새 이슈 감지 → `/update-checklist <요약>`
3. 새 프롬프트를 만들고 싶을 때 → `/new-prompt <요지>` (필수/선택 분류)
4. 새로운 뉴스/사례 발견 → `/daily-news <제목 또는 URL>`
5. 커밋 직전 → `/pre-commit-check`
6. 배포 직전 → `/pre-deploy-check`
7. 하루 끝 → `prompts/required/daily-audit.md`

---

## 설계 원칙

1. **"로컬 폴더 참조 + 원격 접속"에서 "레포 기반"으로 옮기면 개인정보/인증정보가 git에 섞일 위험이 생긴다.**
   따라서 가장 먼저 확인할 것은 *"이 레포가 공개인가 비공개인가"* 다.
2. **의심이 들면 커밋하지 않는다.** 사후 정리(`git filter-repo` 등)는 비용이 크고 이미 원격에 나간 뒤엔 사실상 되돌릴 수 없다.
3. **체크리스트는 살아있어야 한다.** 새로운 이슈는 발견 당일에 반영하고, 커밋 이력으로 변화를 추적한다.
4. **교육 가능해야 한다.** 본인뿐 아니라 타인에게 건네도 그대로 시작할 수 있는 문서 수준을 유지한다.

세부 원칙은 [`docs/SECURITY_CHECKLIST.md`](docs/SECURITY_CHECKLIST.md) 참고.
