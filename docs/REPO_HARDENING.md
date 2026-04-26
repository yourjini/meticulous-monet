# REPO_HARDENING.md — 신규 레포 보안 강화 레시피

> **이 문서의 성격**
> - 매번 점검하는 자가체크리스트가 **아님**.
> - 새 레포 만들 때 **한 번씩 따라가는 레시피**. 한 번 세팅하면 GitHub 인프라가 알아서 일함.
> - 출처: 본인 프로젝트(Jininews 등)에서 실제로 운용 중인 패턴.
>
> **언제 펼쳐 보나**
> - `gh repo create` / GitHub 웹에서 New repository 누른 직후
> - 기존 레포에 보안을 한 단계 올리고 싶을 때
> - 누군가에게 "어떻게 하드닝하나?" 물어봤을 때 빠르게 던져줄 링크

---

## 1. GitHub 웹 UI에서 켜는 것 (Settings)

### 1.1 Branch ruleset on `main`
**경로:** Settings → Rules → Rulesets → New ruleset → Branch ruleset

| 항목 | 값 | 왜 |
|------|----|----|
| Enforcement | Active | 안 켜면 무력 |
| Restrict deletions | ON | main 실수 삭제 차단 |
| Block force pushes | ON | `--force` 로 히스토리 덮어씌우기 차단 |
| Require pull request before merging | ON · Required approvals: 1 · Code Owners review | main 직접 push 봉쇄 |
| Require status checks | `Analyze (javascript-typescript)`, `Analyze (python)`, `Scan for secrets` | CI 통과 안 하면 머지 불가 |
| Require linear history | ON | merge commit 금지 → 히스토리 깔끔 |
| Require signed commits | ON (GPG / SSH) | 커밋 위조 방지 |

> 💡 **함정:** `Require status checks` 는 **해당 워크플로가 한 번 이상 실행된 적이 있어야** 드롭다운에 뜸. 빈 레포라면 더미 PR 하나 올려서 CI 한 번 돌리고 와야 함.

### 1.2 Code security & analysis
**경로:** Settings → Code security

- [ ] **Secret scanning** ON
- [ ] **Push protection** ON · bypass: Repository admins only
- [ ] **Dependency graph** ON
- [ ] **Dependabot alerts** ON
- [ ] **Dependabot security updates** ON
- [ ] **Grouped security updates** ON (PR 노이즈 줄임)
- [ ] **Private vulnerability reporting** ON (외부 제보 채널)
- [ ] **CodeQL code scanning** — Default 또는 Advanced setup

> 💡 **Push protection** 이 가장 강력. 시크릿이 push 되는 **순간** 거부. CI보다 빠름.

---

## 2. 레포 안에 들어가는 파일

### 2.1 `.github/workflows/codeql.yml`
- [ ] CodeQL workflow (push / PR / 주간 스케줄)
- [ ] 언어별로 `Analyze (javascript-typescript)`, `Analyze (python)` job 이름 분리 → ruleset에서 status check로 지정 가능

### 2.2 `.github/workflows/secret-scan.yml`
- [ ] gitleaks action: PR diff 스캔
- [ ] job 이름을 `Scan for secrets` 로 고정 (ruleset 매칭)

### 2.3 `.github/CODEOWNERS`
- [ ] 보안 관련 파일에 본인 자동 리뷰어 지정
  ```
  # 본인 자동 리뷰
  /.github/        @yourjini
  /.gitignore      @yourjini
  /SECURITY.md     @yourjini
  /CODEOWNERS      @yourjini
  ```

### 2.4 `.github/pull_request_template.md`
- [ ] PR 만들 때 자동으로 뜨는 체크리스트
- [ ] 필수 항목: PII 미포함 / 시크릿 미포함 / 의존성 추가 사유 / 테스트

### 2.5 `.github/dependabot.yml`
- [ ] 패키지 매니저별 update schedule
- [ ] `groups:` 로 minor/patch 묶어서 PR 노이즈 줄이기

### 2.6 `SECURITY.md`
- [ ] 취약점 제보 채널 명시 (Private vulnerability reporting 사용법)

### 2.7 `.gitignore`
- [ ] [`templates/gitignore.template`](../templates/gitignore.template) 기준 + 프로젝트별 추가
- [ ] **첫 커밋에 반드시 포함**

---

## 3. 로컬에서 도는 것 (pre-commit)

### 3.1 `.pre-commit-config.yaml`
- [ ] **gitleaks** — diff에 시크릿 검출
- [ ] **detect-secrets** — 보조 (entropy 기반)
- [ ] **trailing-whitespace / end-of-file-fixer** — 위생용
- [ ] (선택) **conventional-pre-commit** — Conventional Commits 강제

### 3.2 셋업 명령
```bash
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg   # commit msg 검사 쓸 때
```

> 💡 **2중 방어 의미:** 로컬 pre-commit은 **본인 PC에서만** 동작. 다른 환경/공유 계정에서는 안 돌 수도 있음. 그래서 **CI gitleaks + GitHub Push protection** 이 진짜 안전망.

---

## 4. 컨벤션 (모든 PR에서 강제)

### 4.1 브랜치 네이밍
| Prefix | 용도 |
|--------|------|
| `feat/` | 새 기능 |
| `fix/` | 버그 수정 |
| `chore/` | 잡일 (의존성, 설정) |
| `docs/` | 문서만 |
| `sec/` | 보안 변경 |
| `claude/<slug>` | Claude Code 세션 작업 |

### 4.2 Conventional Commits
형식: `<type>(<scope>): <summary>`

```
feat(diary): add markdown encryption layer
fix(collector): handle empty RSS feed
chore(deps): bump astro to 5.1
docs(readme): clarify setup steps
sec(deps): patch gitleaks CVE-2024-xxxx
```

### 4.3 PR 머지 정책
- [ ] **Squash merge 만 허용** (Settings → General → Pull Requests)
- [ ] Merge commit · Rebase 비활성화
- [ ] linear history 유지

---

## 5. 데이터·시크릿 원칙

### 5.1 PII / 민감 콘텐츠
- [ ] 본문(다이어리, 고객정보, 의료기록 등)은 **레포에 평문 저장 금지**
- [ ] 로컬 SQLite 등 `data/local/` 에 두고 **gitignore**
- [ ] 대칭 암호화 키(`*_ENCRYPTION_KEY`)는 `.env` 또는 OS Keychain
- [ ] 암호화 키는 절대 커밋 X (Push protection이 막아도 일단 본인이 안 만들어야 함)

### 5.2 API 키
- [ ] 로컬: `.env` (gitignore 처리)
- [ ] CI: GitHub Actions Secrets
- [ ] 배포: 플랫폼 환경변수 (Vercel · Cloudflare 등)
- [ ] **레포에 평문 키가 들어가는 모든 경로를 차단** (§1.2 Push protection + §3.1 gitleaks)

### 5.3 모듈 간 분리
- [ ] 민감 모듈(diary)은 다른 모듈(collector)이 **DB조차 조회 못 하게** 논리 분리
- [ ] 패키지 단위든 별도 프로세스든, 경계가 명확해야 사고 시 폭발 반경 작음

---

## 6. 한 번 세팅 후 검증

세팅 끝났으면 한 번씩 시도해보고 **거부되는지 확인**:

- [ ] main에 직접 push 시도 → ruleset에 의해 거부되어야 함
- [ ] 가짜 시크릿(`AKIAIOSFODNN7EXAMPLE` — AWS 공식 placeholder) 넣고 push 시도 → Push protection이 거부해야 함
- [ ] PR 만들 때 PR 템플릿이 자동으로 뜨는지
- [ ] 더미 의존성(예: 오래된 버전)을 넣고 Dependabot 알림이 뜨는지

이 4개 다 의도대로 막히거나 뜨면 OK. 하나라도 안 되면 위 §1~§3 다시 점검.

---

## 7. 참고

- [`NEW_PROJECT_CHECKLIST.md`](NEW_PROJECT_CHECKLIST.md) — 레포를 만들기 **전** 결정해야 할 것
- [`SECURITY_CHECKLIST.md`](SECURITY_CHECKLIST.md) §3 — 신규 레포 생성 시 자가점검
- [GitHub Docs: About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)
- [Pre-commit hooks 모음](https://pre-commit.com/hooks.html)
