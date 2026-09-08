import { navigation } from '../data/content'
import { ScrollButton } from './ScrollButton'

export function Header() {
	return <header class="site-header"><ScrollButton target="top" className="brand" label="国際ホスピタリティ文化協会 トップへ"><span class="brand-mark" aria-hidden="true">ICHCA</span><span class="brand-name">国際ホスピタリティ<br />文化協会</span></ScrollButton><nav class="desktop-nav" aria-label="主要ナビゲーション">{navigation.map((item) => <ScrollButton target={item.target}>{item.label}</ScrollButton>)}</nav><ScrollButton target="contact" className="header-contact">お問い合わせ <span aria-hidden="true">↗</span></ScrollButton></header>
}
