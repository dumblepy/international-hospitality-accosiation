import { navigation } from '../data/content'
import { withBasePath } from '../lib/basePath'

export function Header() {
	return <header class="site-header"><a class="brand" href={`${withBasePath('/')}#top`} target="_top" aria-label="国際ホスピタリティ文化協会 トップへ"><span class="brand-mark" aria-hidden="true">ICHCA</span><span class="brand-name">国際ホスピタリティ<br />文化協会</span></a><nav class="desktop-nav" aria-label="主要ナビゲーション">{navigation.map((item) => <a href={item.href}>{item.label}</a>)}</nav><a class="header-contact" href="#contact">お問い合わせ <span aria-hidden="true">↗</span></a></header>
}
