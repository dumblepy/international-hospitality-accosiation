import { withBasePath } from '../lib/basePath'

export function NotFound() { return <section class="not-found page-gutter"><p class="eyebrow">404</p><h1>ページが見つかりません。</h1><a class="text-link" href={withBasePath('/')}>トップへ戻る →</a></section> }
