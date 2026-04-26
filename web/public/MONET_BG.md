# web/public/ 에 모네 그림 배경 이미지 넣는 법

이 폴더에 `monet-bg.jpg` 파일을 두면, 사이트 전체에 매우 옅은 배경으로 깔립니다.
파일이 없어도 사이트는 정상 동작 (빈 페이퍼 색만 보임).

## 추천 작품: 루앙 대성당 연작

"엄격한 클로드모네" 의 정수. 같은 성당 정면을 빛 따라 30번 그린 시리즈.
레포 이름 `meticulous-monet` 의 정신과 정확히 맞물립니다.

**다운로드**
1. https://commons.wikimedia.org/wiki/Category:Rouen_Cathedral_Series_by_Claude_Monet 접속
2. 마음에 드는 시간대(아침/정오/저녁/노을) 그림 클릭
3. 우측 "Download" 또는 이미지 우클릭 → "Save image as..."
4. **권장 해상도: 1280px ~ 2000px** (그 이상은 페이지 무거워짐)
5. 파일명을 `monet-bg.jpg` 로 저장
6. 이 폴더(`web/public/`)에 둠
7. `git add web/public/monet-bg.jpg` → commit → push

Vercel이 자동 재빌드 후 배경에 옅게 깔립니다.

## 다른 작품도 OK

- 수련 연작 (Water Lilies) — https://commons.wikimedia.org/wiki/Category:Water_Lilies_(Monet_series)
- 건초더미 (Haystacks) — https://commons.wikimedia.org/wiki/Category:Grainstacks_(Monet_series)
- 인상, 해돋이 — 너무 유명해서 클리셰
- 국회의사당 연작 — 어두운 분위기, "엄격함" 잘 맞음

같은 폴더에 `monet-bg.jpg` 만 있으면 됨.

## 저작권

모네는 1926년 사망 → 모든 작품 **public domain**. 사용·재배포 자유.
다만 Wikimedia 직접 hotlink 는 권장되지 않으므로 **레포에 직접 두는 게 정답**.

## 화면이 너무 진하거나 흐릿하다 싶으면

`web/src/styles/global.css` 의 `.monet-bg` 블록에서:
- `opacity: 0.09` — 진하게/흐리게 (0.04 ~ 0.15 권장 범위)
- `filter: grayscale(0.35)` — 색을 더 뺄지 (0=원색, 1=완전 흑백)
- `contrast(0.95)` — 명암 조절

다크모드는 `@media (prefers-color-scheme: dark)` 블록에서 별도 조정 가능.
