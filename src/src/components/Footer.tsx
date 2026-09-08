import { navigation } from '../data/content'
import { ScrollButton } from './ScrollButton'

export function Footer() {
	return <footer class="site-footer"><div class="page-gutter footer-grid"><div><p class="footer-mark">ICHCA</p><p class="footer-name">一般社団法人<br />国際ホスピタリティ文化協会</p><p class="footer-status">設立準備中</p></div><nav aria-label="フッターナビゲーション">{navigation.map((item) => <ScrollButton target={item.target}>{item.label}</ScrollButton>)}<ScrollButton target="contact">お問い合わせ</ScrollButton></nav><p class="footer-message">多文化を理解し、<br />世界中のお客様を笑顔で迎える。</p></div><div class="page-gutter footer-bottom"><span>© International Hospitality Culture Association</span><ScrollButton target="top">ページ上部へ ↑</ScrollButton></div></footer>
}
