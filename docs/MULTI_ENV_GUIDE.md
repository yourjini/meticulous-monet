# MULTI_ENV_GUIDE.md — 다중 환경 / 다중 계정 운영 가이드

> Claude Code 를 **집·회사·모바일·데스크탑·노트북 × 개인·회사계정 × 때로는 공유**로 쓴다면
> 환경마다 지켜야 할 것이 다르다. 여기서는 조합별로 정리한다.

---

## 공통 (모든 환경 · 필수)

- [ ] 어느 환경에서도 `~/.ssh/` 와 `~/.claude/` 는 **클라우드 동기화 대상이 아니다**.
- [ ] 어느 환경에서도 `git config --global user.email` 을 수시로 확인한다. (개인/회사 오염 방지)
- [ ] 어느 환경에서도 커밋 직전 [`SECURITY_CHECKLIST.md §5`](SECURITY_CHECKLIST.md#5-커밋-직전) 를 실행한다.

---

## 환경별

### 🏠 집 (개인 데스크탑 / 개인 노트북)
- [ ] 디스크 암호화 ON (BitLocker / FileVault / LUKS).
- [ ] 자동 화면 잠금 5~10분.
- [ ] OS·브라우저·Claude Code 자동 업데이트 ON.
- [ ] 공유기 관리자 비밀번호 기본값이 아님.
- [ ] 가족·룸메이트와 기기 공유 시 **계정 분리**.

### 🏢 회사 (회사 데스크탑 / 회사 노트북)
- [ ] 회사 자산에는 **회사 계정만** 로그인.
- [ ] 회사 AI 사용 정책 (허용 모델·금지 데이터) 을 확인.
- [ ] 회사 VPN 위에서만 접근해야 하는 내부 레포는 VPN ON 상태를 확인.
- [ ] 회사 레포 / 이슈 / 고객 데이터를 **개인 Claude 세션에 붙여넣지 않는다**.
- [ ] 퇴근·외출 시 잠금. `git push` 걸어놓고 자리를 뜨지 않는다.

### 📱 모바일 / 태블릿
- [ ] **로컬 폴더 참조가 사실상 불가능**하므로 레포 기반(GitHub 웹/Codespaces/모바일 앱)이 기본.
- [ ] 생체 인증 ON.
- [ ] 세션 전사를 공유 디스플레이(차량/카페/회의실 캐스팅) 에 띄우지 않는다.
- [ ] 복붙이 쉬운 환경이므로, **잘못된 붙여넣기로 민감정보가 세션에 남는 사고**가 잦다. 붙여넣기 전에 한 번 확인.

### 🧳 출장지 / 외부 네트워크
- [ ] 공용 Wi-Fi 에서는 VPN 필수. 가능하면 테더링 우선.
- [ ] 호텔·공유오피스 프린터에 민감 문서를 남기지 않는다.
- [ ] 출장용 임시 PAT 를 발급하고, 출장 종료 시 **revoke**.

### 💻 공용 기기 / 타인 기기
- [ ] 원칙: **쓰지 않는다**.
- [ ] 써야 하면: 브라우저 시크릿 모드 → 쓰고 나면 로그아웃 → 브라우저 기록·다운로드 폴더 정리.
- [ ] SSH 키 / gh token 을 이 기기에 저장하지 않는다.

---

## 계정별

### 👤 개인 Claude 계정 + 👤 개인 GitHub
- 일반적인 개인 프로젝트. 본인 책임이므로 모든 체크리스트를 **본인이** 지킨다.

### 🏢 회사 Claude 계정 + 🏢 회사 GitHub
- 회사 DLP / 감사 로그가 있다는 전제. 회사 정책 > 본 문서.
- 세션 전사가 감사용으로 저장될 수 있음을 인지한다.

### 🔀 개인 Claude + 회사 GitHub (또는 반대)
- **가장 위험한 조합**. 오인 푸시가 가장 자주 발생한다.
- `git config user.email` 을 프로젝트별(`--local`) 로 고정한다.
- `~/.ssh/config` 에서 Host alias 로 분리 (`github.com-personal`, `github.com-company`).
- Claude 세션 시작 시 **"이번엔 어느 조합이냐"** 를 명시적으로 밝힌다.

### 👥 하나의 계정을 여러 사람이 공유
- 세션 전사는 **모든 접속자**가 열람 가능. 본인 개인정보·민감 키를 세션에 넣지 않는다.
- 공유 계정 하에서는 **개인 신용카드 / 결제정보** 를 세션에서 다루지 않는다.
- 공유 사용자 간 규칙을 README / 고정 메모 형태로 공유한다.
- 한 사람이 실수로 공용 자격증명을 유출하면 **모두에게 책임**이 돌아간다. 정기 비밀번호 교체.

---

## 다중 계정 분리 설정 (예시)

### `~/.ssh/config`
```sshconfig
Host github.com-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes

Host github.com-company
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_company
  IdentitiesOnly yes
```

### 프로젝트별 git 아이덴티티
```bash
# 회사 프로젝트 클론 시
git clone git@github.com-company:org/repo.git
cd repo
git config user.email "me@company.com"
git config user.name  "<Name> (Company)"
```

### `gh` 멀티 계정
```bash
gh auth login            # 계정 A
gh auth login            # 계정 B (추가)
gh auth switch           # 전환
gh auth status           # 현재 활성 계정 확인
```

---

## 환경 전환 시 체크 (하루 여러 번 전환하는 경우)

- [ ] 이전 환경에서 남긴 **임시 토큰**이 새 환경에 옮겨가지 않았다.
- [ ] `gh auth status` / `git config user.email` 이 의도한 값이다.
- [ ] 작업 중이던 브랜치를 **다른 환경에서 이어 받을 수 있는 상태로** 푸시해 두었다.
- [ ] 로컬에만 있는 민감 파일(`.env`)이 브랜치 전환 전에 안전한 곳에 백업되어 있다.
