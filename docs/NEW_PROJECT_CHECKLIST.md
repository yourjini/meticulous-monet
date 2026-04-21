# NEW_PROJECT_CHECKLIST.md — 신규 프로젝트 시작 체크리스트

> **목적**: 신규 레포를 만드는 **첫 10분** 동안 실수하면 이후 복구가 매우 비싸다.
> 이 문서는 10개 질문에 답한 뒤에만 `git init` / `gh repo create` 로 넘어가도록 강제한다.

---

## 0. 시작 전 한 문장

> "이 프로젝트가 유출되면 내가 잃는 것은 무엇인가?"

답이 "아무것도 없음"이 아닌 이상, **private** 으로 시작한다.

---

## 1. 10개 질문 (순서대로)

### Q1. 이 프로젝트의 **성격**은?
- [ ] 개인 실험/토이
- [ ] 개인 오픈소스 공개 예정
- [ ] 회사 내부 코드
- [ ] 고객/클라이언트 위탁 코드
- [ ] 교육/강의용

→ **회사 · 고객** 이면 회사 GitHub 조직 하에 생성. 개인 계정에 만들지 않는다.

### Q2. **어느 계정/조직** 아래에 만들 것인가?
- [ ] 개인 GitHub (`github.com/<me>`)
- [ ] 회사 조직 (`github.com/<org>`)
- [ ] 클라이언트 조직

→ 현재 `gh auth status` 로 활성 계정을 확인했는가?

### Q3. **가시성**은?
- [ ] **private** (기본값, 의심되면 이것)
- [ ] internal (조직 한정)
- [ ] public (의식적 결정)

### Q4. 이 프로젝트가 **건드릴 데이터**는?
- [ ] 없음 / 합성 데이터
- [ ] 내 개인 데이터만
- [ ] 타인/고객 데이터 (→ 처리 위치·보관기간·법적 의무 확인 필요)
- [ ] 개인정보(주민번호·의료·금융) (→ 별도 법적 리뷰)

### Q5. **비밀값**이 필요한가?
- [ ] 외부 API 키
- [ ] DB 접속정보
- [ ] OAuth / 서비스계정 JSON
- [ ] 서명 키 / 인증서

→ 관리 방식: `.env` (로컬) + `.env.example` (레포) + 팀 공유는 1Password/Vault/GitHub Secrets.

### Q6. **라이선스**?
- [ ] 미정 → 미정인 채로 public에 올리지 않는다.
- [ ] MIT / Apache-2.0 / GPL / 사내 비공개

### Q7. **협업자**는?
- [ ] 혼자
- [ ] 팀 (→ CODEOWNERS, 보호 브랜치, 필수 리뷰어 설정 필요)
- [ ] 외부 기여자 수용 (→ CONTRIBUTING, 행동 규범, DCO/CLA 여부)

### Q8. **CI/CD 에 비밀값이 들어가는가?**
- [ ] 아니오
- [ ] 예 → GitHub Actions Secrets / OIDC / 환경 분리(prod/staging) 설계

### Q9. **어떤 기기들에서** 이 레포를 만질 예정인가?
- [ ] 집 데스크탑
- [ ] 개인 노트북
- [ ] 회사 기기
- [ ] 모바일
- [ ] 공용/임시 기기

→ 하나라도 "공용/임시" 가 체크되면 [`MULTI_ENV_GUIDE.md`](MULTI_ENV_GUIDE.md) 의 해당 섹션을 먼저 읽는다.

### Q10. **이름**이 민감정보를 드러내지 않는가?
- [ ] 고객사명/내부 코드명이 public 레포명으로 노출되는 것이 괜찮은가?

---

## 2. 초기 생성 순서 (권장)

1. `mkdir <project> && cd <project>`
2. **먼저** [templates/gitignore.template](../templates/gitignore.template) 을 `.gitignore` 로 복사.
3. `.env.example` 작성. 실제 `.env` 는 만들지만 커밋하지 않는다.
4. `git init -b main`
5. 필요한 파일 최소만 추가 → `git add <file>...` (절대 `git add -A` 금지)
6. `git status --ignored` 로 ignored 영역에 실수로 커밋될 뻔한 파일 확인.
7. `git commit -m "chore: init"`
8. GitHub에 **private** 으로 레포 생성 (`gh repo create <name> --private --source=. --remote=origin`).
9. 레포 설정:
   - Secret scanning · Push protection 활성화
   - 기본 브랜치 보호 (직접 푸시 금지, PR 필수)
   - Dependabot / CodeQL (해당되는 경우)
10. 첫 푸시: `git push -u origin main`

---

## 3. 첫 주 내 할 일

- [ ] README에 "이 레포에 절대 넣지 말 것" 목록을 명시.
- [ ] `CLAUDE.md` (프로젝트별) 작성 — Claude에게 지킬 규칙 전달.
- [ ] `SECURITY.md` (취약점 신고 경로) — public 레포면 필수.
- [ ] pre-commit hook 으로 `gitleaks` / `detect-secrets` 연결.
- [ ] CI에 secret scan 단계 추가.
