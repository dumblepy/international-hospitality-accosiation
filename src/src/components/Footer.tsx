import { navigation } from '../data/content'
import { withBasePath } from '../lib/basePath'

export function Footer() {
	return <footer class="site-footer"><div class="page-gutter footer-grid"><div><p class="footer-mark">ICHCA</p><p class="footer-name">一般社団法人<br />国際ホスピタリティ文化協会</p><p class="footer-status">設立準備中</p></div><nav aria-label="フッターナビゲーション">{navigation.map((item) => <a href={item.href}>{item.label}</a>)}<a href="#contact">お問い合わせ</a></nav><p class="footer-message">多文化を理解し、<br />世界中のお客様を笑顔で迎える。</p></div><div class="page-gutter footer-bottom"><span>© International Hospitality Culture Association</span><a href={`${withBasePath('/')}#top`} target="_top">ページ上部へ ↑</a></div></footer>
}
