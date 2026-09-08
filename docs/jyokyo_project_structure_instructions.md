# `dumblepy/jyokyo` 構成再現 指示書

> 対象リポジトリ: https://github.com/dumblepy/jyokyo  
> 調査基準日: 2026-09-08  
> 目的: `dumblepy/jyokyo` の**現在の実装構成**を基準に、新規Webサイトプロジェクトを同じ技術思想・ディレクトリ構成・CI/CD構成で構築する。

---

# 0. 最重要方針

この指示書では、リポジトリ内の古い設計メモではなく、**実際に現在使われているコードと設定ファイルを正とする**。

`jyokyo` には `.cursor/rules/project.mdc` があり、そこでは Astro + Markdown Content Collections を使う予定が書かれている。しかし現在の実装本体は以下である。

- Preact
- TypeScript / TSX
- Vite
- `preact-iso`
- Vite prerender
- Tailwind CSS 3
- PostCSS
- pnpm
- Docker Compose
- GitHub Actions
- GitHub Pages
- TypeScriptファイルによる静的データ管理

したがって、このプロジェクトを再現するときは **Astroを導入しない**。

「現在の `jyokyo` と同じ構成」を求められた場合は、必ず本書の **Preact + Vite 構成**を採用する。

---

# 1. 技術スタック

| 項目 | 採用技術 |
|---|---|
| Language | TypeScript |
| JSX | TSX |
| UI Framework | Preact |
| Router / SSR / Prerender | preact-iso |
| Build Tool | Vite |
| Package Manager | pnpm |
| CSS Framework | Tailwind CSS 3 |
| CSS Processing | PostCSS + Autoprefixer |
| Icons | lucide-preact |
| className utility | clsx |
| Tailwind class merge | tailwind-merge |
| Animation utilities | tailwindcss-animate |
| Lint | ESLint + eslint-config-preact |
| Local Development | Docker Compose |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

---

# 2. バージョン

元プロジェクトの `package.json` に合わせ、原則として以下を使用する。

## dependencies

```json
{
  "clsx": "^2.1.1",
  "lucide-preact": "^0.468.0",
  "preact": "^10.26.9",
  "preact-iso": "^2.11.1",
  "preact-render-to-string": "^6.6.5",
  "tailwind-merge": "^2.5.5"
}
```

## devDependencies

```json
{
  "@preact/preset-vite": "^2.10.2",
  "@types/node": "^25.5.0",
  "autoprefixer": "^10.4.20",
  "eslint": "^10.0.0",
  "eslint-config-preact": "^2.0.0",
  "postcss": "^8.5.0",
  "tailwindcss": "^3.4.17",
  "tailwindcss-animate": "^1.0.7",
  "typescript": "^5.9.3",
  "vite": "^7.3.1"
}
```

`pnpm-lock.yaml` は lockfile version 9 を使用する。

```yaml
lockfileVersion: '9.0'
```

依存関係を追加・変更した場合は必ず `pnpm-lock.yaml` を更新する。

---

# 3. Node.js / pnpm 方針

元プロジェクトでは環境によってNode.jsバージョンが異なる。

## Docker開発環境

```text
Node.js 24.13.1
```

## GitHub Actions

```text
Node.js 22
pnpm 9
```

完全再現を優先する場合、この差異もそのまま維持してよい。

ただし、新規プロジェクトで環境差による不具合を減らしたい場合は、DockerとGitHub ActionsのNode.jsメジャーバージョンを統一してもよい。

**再現性を最優先する場合は変更しないこと。**

---

# 4. `package.json`

以下の構造を基本とする。

```json
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 3000",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-preact": "^0.468.0",
    "preact": "^10.26.9",
    "preact-iso": "^2.11.1",
    "preact-render-to-string": "^6.6.5",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@preact/preset-vite": "^2.10.2",
    "@types/node": "^25.5.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^10.0.0",
    "eslint-config-preact": "^2.0.0",
    "postcss": "^8.5.0",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.9.3",
    "vite": "^7.3.1"
  },
  "eslintConfig": {
    "extends": "preact"
  }
}
```

---

# 5. ディレクトリ構成

新規プロジェクトは以下を基本構造とする。

```text
project-root/
├── .cursor/
│   └── rules/
│       ├── branch.mdc
│       └── project.mdc
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docker/
│   └── develop.Dockerfile
├── public/
│   ├── CNAME
│   └── images/
│       └── ...
├── src/
│   ├── assets/
│   │   └── ...
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── data/
│   │   ├── backnumber.ts
│   │   ├── books.ts
│   │   ├── event.ts
│   │   └── videos.ts
│   ├── lib/
│   │   ├── basePath.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Home/
│   │   │   └── index.tsx
│   │   ├── Backnumber/
│   │   │   └── index.tsx
│   │   ├── Books/
│   │   │   └── index.tsx
│   │   ├── Company/
│   │   │   └── index.tsx
│   │   ├── Event/
│   │   │   └── index.tsx
│   │   ├── Videos/
│   │   │   └── index.tsx
│   │   └── _404.tsx
│   ├── index.tsx
│   ├── lucide-preact.d.ts
│   └── style.css
├── .gitignore
├── AGENTS.md
├── compose.yaml
├── index.html
├── package.json
├── permission.sh
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

# 6. ディレクトリごとの責務

## `src/pages`

URLに対応するページ単位コンポーネントを置く。

原則:

```text
src/pages/{PageName}/index.tsx
```

ページコンポーネントはできるだけ薄く保ち、`src/components` のセクションコンポーネントを組み合わせる。

例:

```tsx
import { Hero } from '../../components/Hero'
import { LatestEvent } from '../../components/LatestEvent'
import { Latest } from '../../components/Latest'

export function Home() {
  return (
    <main>
      <Hero />
      <LatestEvent />
      <Latest />
    </main>
  )
}
```

## `src/components`

再利用可能なUIまたはページセクションを置く。

元プロジェクトには以下のような粒度のコンポーネントがある。

```text
About.tsx
Articles.tsx
BacknumberIssue.tsx
BookIssue.tsx
Contact.tsx
EventItem.tsx
Footer.tsx
Header.tsx
Hero.tsx
Latest.tsx
LatestEvent.tsx
Mission.tsx
Philosophy.tsx
Services.tsx
VideoItem.tsx
...
```

ルール:

- 1コンポーネント1ファイルを基本とする
- PascalCaseで命名する
- UIと静的データを分離する
- ページ固有でも再利用可能なセクションは `components` に出す
- `Header` と `Footer` はAppレベルで共通表示する
- ルートページコンポーネント内に巨大なJSXを書かない

## `src/data`

コンテンツデータをTypeScriptとして保持する。

```text
src/data/backnumber.ts
src/data/books.ts
src/data/event.ts
src/data/videos.ts
```

データ量が多い場合でもUIコンポーネントにハードコードせず `src/data` に分離する。

```ts
export type Item = {
  title: string
  image: string
  description: string
  url?: string
}

export const items: Item[] = []
```

CMSやDBを初期要件にしない。静的サイトとしてビルド時にコンテンツを組み込む。

## `src/lib`

UIに依存しない共通処理を置く。

```text
basePath.ts
utils.ts
```

主な責務:

- URL処理
- GitHub Pages用base path処理
- className utility
- formatter
- pure function
- 汎用ヘルパー

## `public`

Viteによる変換が不要な静的ファイル。

```text
public/
├── CNAME
└── images/
```

JPG / PNG / SVG / favicon / robots.txt / CNAME 等を置く。

## `src/assets`

JS/TSからimportしてバンドル対象にしたいアセットを置く。

---

# 7. アプリケーションエントリポイント

エントリポイント:

```text
src/index.tsx
```

ここで以下を担当する。

- `LocationProvider`
- `Router`
- Route定義
- Header
- Footer
- hydrate
- prerender export
- GitHub Pages用base path

基本形:

```tsx
import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from 'preact-iso'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { NotFound } from './pages/_404'

import './style.css'

export function App() {
  return (
    <LocationProvider>
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route default component={NotFound} />
      </Router>
      <Footer />
    </LocationProvider>
  )
}

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app')!)
}

export async function prerender(data: Record<string, unknown>) {
  return await ssr(<App {...data} />)
}
```

---

# 8. ルーティング

ルーティングは `preact-iso` を使用する。

Next.js / React Router / TanStack Router は導入しない。

```tsx
<Router>
  <Route path="/" component={Home} />
  <Route path="/backnumber/:period?" component={Backnumber} />
  <Route path="/books" component={Books} />
  <Route path="/company" component={Company} />
  <Route path="/videos" component={Videos} />
  <Route path="/event" component={Event} />
  <Route default component={NotFound} />
</Router>
```

---

# 9. GitHub Pages base path 対応

独自ドメインとRepository Pagesの両方に対応できるよう、URLや画像パスを直接ハードコードしない。

`src/lib/basePath.ts` 相当を用意する。

```ts
const rawBaseUrl = import.meta.env.BASE_URL || '/'

const basePathPrefix =
  rawBaseUrl === '/'
    ? ''
    : rawBaseUrl.endsWith('/')
      ? rawBaseUrl.slice(0, -1)
      : rawBaseUrl
```

以下を実装する。

```text
getBasePathPrefix()
withBasePath()
stripBasePath()
```

外部URLとアンカーリンクはbase pathを付与しない。

---

# 10. Vite / Prerender

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  base: '/',
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#app',
        additionalPrerenderRoutes: [
          '/404',
          '/backnumber',
          '/backnumber/6',
          '/backnumber/5',
          '/backnumber/4',
          '/backnumber/3',
          '/backnumber/2',
          '/backnumber/1',
          '/books',
          '/event',
          '/company',
          '/videos',
          '/contact',
        ],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: '/404',
      },
    }),
  ],
})
```

新しいページを追加した場合は必ず以下を両方更新する。

1. `src/index.tsx` の `<Route>`
2. `vite.config.ts` の `additionalPrerenderRoutes`

---

# 11. TypeScript

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "noEmit": true,
    "allowJs": true,
    "checkJs": true,
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "skipLibCheck": true,
    "paths": {
      "react": ["./node_modules/preact/compat/"],
      "react-dom": ["./node_modules/preact/compat/"]
    }
  },
  "include": ["node_modules/vite/client.d.ts", "src/**/*"],
  "exclude": ["dist"]
}
```

重要:

```json
"jsxImportSource": "preact"
```

---

# 12. Tailwind CSS / PostCSS

Tailwind CSSは **v3系** を使用する。v4へ勝手にアップグレードしない。

`tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

`postcss.config.mjs`:

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

---

# 13. Design Tokens

カラーはCSS Custom Properties経由で管理する。

```css
:root {
  --background: 60 9% 96%;
  --foreground: 0 0% 7%;
  --card: 60 6% 93%;
  --card-foreground: 0 0% 7%;
  --primary: 0 0% 7%;
  --primary-foreground: 60 9% 96%;
  --secondary: 60 4% 88%;
  --secondary-foreground: 0 0% 7%;
  --muted: 60 4% 88%;
  --muted-foreground: 0 0% 40%;
  --accent: 24 8% 50%;
  --accent-foreground: 60 9% 96%;
  --border: 0 0% 82%;
  --input: 0 0% 82%;
  --ring: 0 0% 7%;
  --radius: 0.25rem;
}
```

Tailwind側から `hsl(var(--...))` で参照する。

---

# 14. Typography

Google Fonts:

```text
Noto Sans JP: 300, 400, 500, 700
Noto Serif JP: 400, 500, 700
```

CSS:

```css
:root {
  --font-noto-sans-jp: 'Noto Sans JP', sans-serif;
  --font-noto-serif-jp: 'Noto Serif JP', serif;
}
```

Tailwind:

```ts
fontFamily: {
  sans: ['var(--font-noto-sans-jp)', 'sans-serif'],
  serif: ['var(--font-noto-serif-jp)', 'serif'],
}
```

---

# 15. グローバルCSS

`src/style.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}
```

---

# 16. アイコン / className utility

アイコン:

```text
lucide-preact
```

React用 `lucide-react` は使用しない。

className:

```text
clsx
tailwind-merge
```

推奨 `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

# 17. `index.html`

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#121212" />
    <meta name="description" content="..." />
    <title>...</title>
  </head>
  <body>
    <div id="app"></div>
    <script prerender type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

`script` の `prerender` 属性を維持する。

---

# 18. Docker開発環境

`docker/develop.Dockerfile`:

```dockerfile
FROM ubuntu:24.04

RUN apt update && \
    apt upgrade -y

RUN apt install -y \
    build-essential \
    curl \
    git \
    vim

RUN apt autoremove -y

WORKDIR /root

ARG NODE_VERSION=24.13.1

RUN curl -OL https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz
RUN tar -xvf node-v${NODE_VERSION}-linux-x64.tar.xz
RUN rm node-v${NODE_VERSION}-linux-x64.tar.xz
RUN mv node-v${NODE_VERSION}-linux-x64 .node

ENV PATH $PATH:/root/.node/bin

RUN curl -fsSL https://get.pnpm.io/install.sh | bash -s -- -y

RUN git config --global --add safe.directory /application

WORKDIR /application
```

---

# 19. Docker Compose

`compose.yaml`:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: docker/develop.Dockerfile
    tty: true
    volumes:
      - .:/application
    ports:
      - 3001:3000
```

Vite dev server:

```bash
vite --host 0.0.0.0 --port 3000
```

ブラウザ:

```text
http://localhost:3001
```

---

# 20. ローカル開発

Docker:

```bash
docker compose build
docker compose up -d
docker compose exec app bash
pnpm install
pnpm dev
```

Dockerなし:

```bash
pnpm install
pnpm dev
```

Build:

```bash
pnpm build
```

出力:

```text
dist/
```

Preview:

```bash
pnpm preview
```

---

# 21. GitHub Actions

ファイル:

```text
.github/workflows/deploy.yml
```

完全テンプレート:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master

  pull_request:
    branches:
      - main
      - master

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    env:
      SITE_BASE_PATH: '/'

    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    if: github.event_name == 'push'

    environment:
      name: github-pages
      url: https://example.com

    runs-on: ubuntu-latest

    needs: build

    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

挙動:

```text
Pull Request -> buildのみ
main/master push -> build + deploy
```

---

# 22. GitHub Pages

Repository Settings:

```text
Settings
→ Pages
→ Build and deployment
→ Source
→ GitHub Actions
```

独自ドメイン使用時:

```text
public/CNAME
```

内容:

```text
example.com
```

元リポジトリでは `jokyo.org`。

---

# 23. `.gitignore`

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

.pnpm-store
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

---

# 24. AI Agent用ファイル

以下を持つ。

```text
AGENTS.md
.cursor/rules/project.mdc
.cursor/rules/branch.mdc
```

ただし元リポジトリの `project.mdc` に書かれたAstro方針は現行コードと一致しないため、新規プロジェクトではPreact + Vite構成に書き直す。

推奨 `AGENTS.md`:

```md
# AGENTS

- `.cursor/rules/project.mdc` を必ず読む。
- `.cursor/rules/branch.mdc` を必ず読む。
- 現在のブランチに対応するbranch ruleが存在する場合は読む。
- 実装前に既存構造を確認する。
- Preact + Vite構成を維持する。
- React / Next.js / Astroへ無断移行しない。
- package managerはpnpmを使用する。
- pnpm-lock.yamlを維持する。
- 新規ページ追加時はRouteとprerender routeを両方更新する。
- コンテンツとUIを分離する。
- 常にTypeScriptを優先する。
- git add / git commitは明示指示なしに実行しない。
```

---

# 25. 推奨 `.cursor/rules/project.mdc`

```md
---
alwaysApply: true
---

Project Rules
===

このプロジェクトは Preact + TypeScript + Vite による静的Webサイトである。

## Stack

- TypeScript
- Preact
- preact-iso
- Vite
- @preact/preset-vite
- Tailwind CSS v3
- PostCSS
- pnpm
- Docker Compose
- GitHub Actions
- GitHub Pages

## Architecture

- `src/pages`: URL単位のページ
- `src/components`: 再利用UI
- `src/data`: 静的コンテンツ
- `src/lib`: 共通ロジック
- `public`: 静的配信アセット
- `src/index.tsx`: Router / App entry
- `vite.config.ts`: build / prerender設定

## Rules

1. Astroを導入しない。
2. Next.jsを導入しない。
3. React本体へ置換しない。
4. package managerはpnpm。
5. 新規ルート追加時は `src/index.tsx` と `vite.config.ts` を両方更新する。
6. ページコンポーネントは薄く保つ。
7. データをUIコンポーネントへ大量に直接記述しない。
8. 静的データは `src/data` に置く。
9. 共通処理は `src/lib` に置く。
10. GitHub Pagesで動作するbase pathを考慮する。
11. `pnpm build` が通る状態を維持する。
12. GitHub Actionsでは `pnpm install --frozen-lockfile` を使用する。
```

---

# 26. コーディング方針

- 新規ソースは `.ts` / `.tsx`
- Functional Components
- named exportを基本
- 相対importを基本
- 現プロジェクトに存在しないaliasを勝手に導入しない
- Redux / Zustand / MobX等は初期状態では導入しない
- 静的データは `src/data/*.ts`
- DB / CMS / backendを初期要件にしない

---

# 27. 静的サイトとしての制約

本番構成:

```text
Build
↓
Prerender
↓
dist/
↓
GitHub Pages
```

本番でNode.js serverを起動しない。

原則使用しない:

```text
runtime SSR
Server-only API
API Routes
Server Actions
filesystem runtime read
direct database access
```

必要な処理は以下へ寄せる。

```text
build time
client side
external API
static data
```

---

# 28. 新しいページを追加する手順

例: `/stay`

1. `src/pages/Stay/index.tsx` を作成
2. `src/index.tsx` にimport
3. `<Route path="/stay" component={Stay} />`
4. `vite.config.ts` の `additionalPrerenderRoutes` に `/stay`
5. Navigation更新
6. `pnpm build`
7. `pnpm preview`
8. `/stay` へ直接アクセスして確認

---

# 29. 新しいコンテンツを追加する手順

```text
src/data/stays.ts
src/components/StayItem.tsx
src/pages/Stay/index.tsx
```

データ・表示・ページ組み立てを分離する。

---

# 30. 開発完了条件

最低限:

```bash
pnpm build
```

可能なら:

```bash
pnpm preview
```

確認対象:

- `/`
- 追加ページ
- 404
- desktop
- mobile
- direct navigation
- browser refresh
- asset path
- base path
- custom domain

---

# 31. CI/CD完了条件

Pull Request:

```text
GitHub Actions build成功
```

main/master merge後:

```text
build成功
Pages artifact upload成功
deploy成功
```

CIでは必ず:

```bash
pnpm install --frozen-lockfile
```

を使い、`dist/` をPages artifactとしてuploadする。

---

# 32. やってはいけないこと

明示的な要望なしに以下を行わない。

```text
❌ Next.jsへ移行
❌ Astroへ移行
❌ React本体へ移行
❌ Vue / Svelteへ移行
❌ npm / yarnへ変更
❌ Tailwind v4へ更新
❌ RouterをReact Routerへ変更
❌ Vercel前提へ変更
❌ runtime SSR serverを追加
❌ DBを追加
❌ shadcn/uiを自動導入
❌ Material UIを導入
❌ CSS-in-JSを導入
```

---

# 33. プロジェクト生成AIへ渡す最終指示

```text
このWebサイトを、dumblepy/jyokyo の現在の実装構成と同じアーキテクチャで構築してください。

技術構成は必ず以下を使用してください。

- TypeScript
- TSX
- Preact
- preact-iso
- Vite
- @preact/preset-vite
- Vite prerender
- Tailwind CSS v3
- PostCSS
- Autoprefixer
- lucide-preact
- clsx
- tailwind-merge
- tailwindcss-animate
- pnpm
- Docker Compose
- GitHub Actions
- GitHub Pages

Next.js、Astro、React本体、Vue、Svelteへ置換しないでください。

ディレクトリは以下の責務で分離してください。

src/pages
  URL単位のページコンポーネント。

src/components
  再利用可能なUIおよびページセクション。

src/data
  TypeScriptで管理する静的コンテンツデータ。

src/lib
  URL処理、className utilityなどUI非依存の共通処理。

public
  GitHub Pagesからそのまま配信する画像などの静的ファイル。

src/index.tsx
  Preact App entry。
  LocationProvider、Router、Header、Footer、hydrate、prerenderを配置する。

vite.config.ts
  @preact/preset-viteを設定し、主要ページをadditionalPrerenderRoutesへ登録する。

ページ追加時は必ず、
1. src/pages
2. src/index.tsx Route
3. vite.config.ts additionalPrerenderRoutes
を同時に更新してください。

CSSはTailwind CSS v3を使用し、色・radius・fontなどはCSS Custom PropertiesをDesign Tokenとして管理してください。

package managerはpnpm固定です。
pnpm-lock.yamlをコミット対象とし、GitHub Actionsでは:

pnpm install --frozen-lockfile
pnpm build

を使用してください。

ローカル開発用に:

docker/develop.Dockerfile
compose.yaml

を作成してください。

Dockerコンテナ内ではViteを:

vite --host 0.0.0.0 --port 3000

で起動し、hostの3001をcontainerの3000へforwardしてください。

GitHub ActionsではGitHub Pagesへdeployしてください。

.github/workflows/deploy.yml

を作成し、

actions/checkout@v4
pnpm/action-setup@v2
actions/setup-node@v4
actions/configure-pages@v4
actions/upload-pages-artifact@v3
actions/deploy-pages@v4

を使用してください。

Pull Requestではbuildだけを行い、
main/masterへのpush時のみdeployしてください。

GitHub Pages用にbase pathを考慮し、
src/lib/basePath.ts相当のhelperを用意してください。

本番成果物はdist/です。

最終的に以下が成功する状態にしてください。

pnpm install
pnpm build
pnpm preview

アーキテクチャを勝手に別フレームワークへ置き換えず、軽量な静的サイトとして維持してください。
```

---

# 34. 初期構築チェックリスト

- [ ] Git repository / main branch
- [ ] `.gitignore`
- [ ] `AGENTS.md`
- [ ] `.cursor/rules`
- [ ] `package.json`
- [ ] pnpm / `pnpm-lock.yaml`
- [ ] TypeScript
- [ ] Preact
- [ ] preact-iso
- [ ] preact-render-to-string
- [ ] @preact/preset-vite
- [ ] `vite.config.ts`
- [ ] prerender enabled
- [ ] 404 route
- [ ] additionalPrerenderRoutes
- [ ] Tailwind CSS 3
- [ ] PostCSS
- [ ] Autoprefixer
- [ ] tailwindcss-animate
- [ ] CSS Custom Properties
- [ ] `src/index.tsx`
- [ ] `src/pages`
- [ ] `src/components`
- [ ] `src/data`
- [ ] `src/lib`
- [ ] `src/style.css`
- [ ] `public/images`
- [ ] `public/CNAME` if needed
- [ ] `docker/develop.Dockerfile`
- [ ] `compose.yaml`
- [ ] `.github/workflows/deploy.yml`
- [ ] PR build
- [ ] main/master push deploy
- [ ] GitHub Pages Source = GitHub Actions
- [ ] `pnpm build`
- [ ] `pnpm preview`
- [ ] direct route refresh
- [ ] 404
- [ ] assets
- [ ] mobile

---

# 35. 元リポジトリと完全一致させる核

```text
Frontend:
Preact

Language:
TypeScript / TSX

Router:
preact-iso

Build:
Vite

Static generation:
@preact/preset-vite prerender

Styling:
Tailwind CSS v3 + CSS Custom Properties

Package manager:
pnpm

Data:
src/data/*.ts

Page structure:
src/pages/{Page}/index.tsx

Shared UI:
src/components/*.tsx

Utilities:
src/lib/*.ts

Production output:
dist/

Development:
Docker Compose

CI:
GitHub Actions

Hosting:
GitHub Pages
```

---

# 36. 新規サイトで変更するプロジェクト固有値

技術構成は維持し、以下だけ対象サイトに置き換える。

```text
サイト名
title
meta description
theme-color
CNAME
GitHub Pages URL
GitHub Actions environment.url
画像
ページ名
コンテンツ
prerender route
Design Tokens
Navigation
```

---

# 37. 参考元ファイル

- https://github.com/dumblepy/jyokyo/blob/main/package.json
- https://github.com/dumblepy/jyokyo/blob/main/vite.config.ts
- https://github.com/dumblepy/jyokyo/blob/main/tsconfig.json
- https://github.com/dumblepy/jyokyo/blob/main/tailwind.config.ts
- https://github.com/dumblepy/jyokyo/blob/main/postcss.config.mjs
- https://github.com/dumblepy/jyokyo/blob/main/src/index.tsx
- https://github.com/dumblepy/jyokyo/blob/main/src/style.css
- https://github.com/dumblepy/jyokyo/tree/main/src/components
- https://github.com/dumblepy/jyokyo/tree/main/src/pages
- https://github.com/dumblepy/jyokyo/tree/main/src/data
- https://github.com/dumblepy/jyokyo/tree/main/src/lib
- https://github.com/dumblepy/jyokyo/blob/main/docker/develop.Dockerfile
- https://github.com/dumblepy/jyokyo/blob/main/compose.yaml
- https://github.com/dumblepy/jyokyo/blob/main/.github/workflows/deploy.yml
- https://github.com/dumblepy/jyokyo/blob/main/AGENTS.md
- https://github.com/dumblepy/jyokyo/blob/main/.cursor/rules/project.mdc
- https://github.com/dumblepy/jyokyo/blob/main/.cursor/rules/branch.mdc

---

# 結論

このプロジェクトを再現するときの核は、

```text
Preact
+ TypeScript
+ preact-iso
+ Vite prerender
+ Tailwind CSS 3
+ static TypeScript data
+ pnpm
+ Docker Compose
+ GitHub Actions
+ GitHub Pages
```

である。

Next.jsのようなフルスタックフレームワークを使わず、ViteとPreactで軽量な静的サイトを構築し、主要ルートをビルド時にprerenderして `dist/` をGitHub Pagesへ直接deployする。

ページ、UI、コンテンツ、共通処理を、

```text
pages
components
data
lib
```

へ明確に分割することが、このリポジトリ構成を再現する上で最も重要なアーキテクチャ上の特徴である。
