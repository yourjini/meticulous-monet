# web/ — meticulous-monet 웹진

> 이 레포의 `docs/`, `prompts/`, `docs/SECURITY_NEWS/` 마크다운을
> **원본 그대로** 소스로 삼아 빌드되는 Astro 정적 웹사이트.

## 로컬 개발

```bash
cd web
npm install
npm run dev     # http://localhost:4321
npm run build   # dist/ 로 정적 빌드
npm run preview # 빌드 결과 미리보기
```

## 디자인 원칙

- 최대 너비 ~680px 의 **타이포 중심** 레이아웃.
- 흑백 + 포인트 1색(주황). 장식 최소.
- 다크모드는 OS 설정(`prefers-color-scheme`) 에 따라 자동 전환.
- 모바일 first: 기본 상태가 모바일이고, 데스크탑에서도 그대로 확장.

## 콘텐츠 소스 매핑

| 사이트 경로 | 소스 (레포 루트 기준) |
|---|---|
| `/checklists/<slug>` | `docs/*.md` (일부 화이트리스트) |
| `/news/<slug>` | `docs/SECURITY_NEWS/**/*.md` |
| `/prompts/required/<slug>` | `prompts/required/*.md` |
| `/prompts/optional/<slug>` | `prompts/optional/*.md` |
| `/prompts/startup/<slug>` | `prompts/startup/*.md` |

마크다운에는 front matter가 없고, **첫 `#` 제목** 과 **첫 문단** 을 자동으로
제목·요약으로 추출합니다(`src/lib/meta.ts`).

## Vercel 배포

1. https://vercel.com/new 에서 이 레포를 Import.
2. **Root Directory** 를 `web` 으로 설정.
3. Framework Preset 은 자동으로 "Astro" 로 감지됨.
4. Environment Variables 는 필요 없음.
5. Deploy.

이후부터는 `claude/*` 브랜치에 push 할 때마다 Preview Deployment,
`main` 에 머지 시 Production Deployment 가 자동 생성됩니다.
